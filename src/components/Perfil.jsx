import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  const { state } = useAuth(); // Obtén el estado del contexto
  const { token } = state; // Desestructura el token
  const [usuario, setUsuario] = useState(null); // Estado para guardar los datos del usuario
  const [loading, setLoading] = useState(true); // Para mostrar un indicador de carga
  const [error, setError] = useState(null); // Para manejar errores
  const navigate = useNavigate(); // Para redirigir al usuario si no está logueado

  useEffect(() => {
    // Verificar si hay un token de autenticación
    if (!token) {
      navigate('/login'); // Redirigir al login si no hay token
      return;
    }

    // Si hay token, hacer una solicitud al backend para obtener el perfil del usuario
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/user/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsuario(data.profile); // Guardar los datos del usuario en el estado
        } else {
          console.error('Error al obtener los datos del perfil');
          setError('No se pudo cargar el perfil. Por favor, intenta nuevamente.');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        setError('Hubo un problema de red. Por favor, verifica tu conexión.');
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    fetchUserProfile();
  }, [token, navigate]);

  if (loading) {
    return <div>Cargando perfil...</div>; // Mostrar un mensaje de carga
  }

  if (error) {
    return <div>{error}</div>; // Mostrar un mensaje de error
  }

  if (!usuario) {
    return <div>No se pudo cargar el perfil.</div>; // En caso de que no haya datos del usuario
  }

  return (
    <div>
      <h1>Perfil del Usuario</h1>
      <div>
        <p><strong>Nombre:</strong> {usuario.firstname}</p>
        <p><strong>Apellido:</strong> {usuario.lastname}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Tu plan:</strong> {usuario.plan}</p>
      </div>
    </div>
  );
};

export default Perfil;