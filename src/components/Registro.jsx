import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = ({ type }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    passwords: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validaciones básicas
    if (!formData.firstname || !formData.lastname || !formData.email || !formData.passwords) {
      setError("Los campos nombre, apellido, email y contraseña son obligatorios.");
      setLoading(false);
      return;
    }
    if (!formData.email.includes('@')) {
      setError("El correo electrónico debe ser válido.");
      setLoading(false);
      return;
    }

    // Aquí podrías ajustar la URL dependiendo si es cliente o empleado
    const endpoint = type === 'cliente' ? '/api/clientes' : '/api/empleados';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirige al login si la creación es exitosa
        navigate('/login');
      } else {
        // Manejo de errores desde el backend (ej. usuario duplicado)
        setError(data.message || "Ocurrió un error al registrar.");
      }
    } catch (error) {
      setError("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Registro {type === 'cliente' ? 'Cliente' : 'Empleado'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
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
            name="passwords"
            value={formData.passwords}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;