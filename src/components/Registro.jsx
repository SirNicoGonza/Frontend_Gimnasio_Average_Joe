import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Estilo.css'

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    rol: 'socio',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validación de campos
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.password) {
      setError('Todos los campos son obligatorios.');
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Ingresa un correo válido.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/user/registro`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
     
      const data = await response.json();

      if (response.ok) {
        alert('Registro exitoso. Redirigiendo al login...');
        navigate('/login');
      } else {
        setError(data.message || 'Error al registrar.');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setError('Error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1 className='gymname'>Average Joe</h1>
      <h2 className='titlenormal'>Crear una cuenta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button className='btn1' type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
 