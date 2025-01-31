import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import '/fronted/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMensaje, setErrorMensaje] = useState('');

  const [{ data, error, isLoading }, doFetch] = useFetch(
    `http://127.0.0.1:5000/user/login`,
    {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'include',
    }
  );

  const { actions } = useAuth();
  const { login } = actions;
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/perfil';

  useEffect(() => {
	if (data) {
	  console.log("Respuesta de la API:", data); // Verifica la estructura de data
	  const token = data.token;
	  const role = data.role;
	  login(token, role); // Actualiza el estado y el localStorage
	  console.log("Redirigiendo a:", from); // Verifica la ruta de destino
	  navigate(from, { replace: true }); // Redirige después del login
	  console.log("Redirección ejecutada")
	}
  }, [data, login, navigate, from]);
  
  useEffect(() => {
	if (error) {
	  console.log("Error en la API:", error); // Verifica el error
	  setErrorMensaje('Email y/o contraseña incorrectos');
	}
  }, [error]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    doFetch();
  };

  return (
    <div>
      <h1 className='gymname'>Average Joe</h1>
      <br />
      <div id='container-login'>
        <link
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
          rel='stylesheet'
        />
        <div className='titlenormal'>
          <i className='material-icons lock'>lock</i> <h2>Login</h2>
        </div>

        <form id='login-form' onSubmit={handleSubmit}>
          <div className='input'>
            <div>
              <label>Email</label>
            </div>
            <div>
              <input
                required
                type='text'
                className='formInput'
                id='email'
                placeholder='Ingresa tu email'
                value={email}
                onChange={handleEmailChange}
                autoComplete='email'
              />
            </div>
          </div>
          <div className='clearfix'></div>
          <div className='input'>
            <div>
              <label>Contraseña:</label>
            </div>
            <div>
              <input
                required
                type='password'
                className='formInput'
                id='password'
                placeholder='Ingresa tu contraseña'
                value={password}
                onChange={handlePasswordChange}
                autoComplete='current-password'
              />
            </div>
          </div>
          <br />
          <div className='form-group'>
            <button className='btn1' type='submit'>
              Iniciar Sesión
            </button>
            {isLoading && <p>Cargando...</p>}
            {errorMensaje && (
              <p className='error-message'>{errorMensaje}</p>
            )}
          </div>
        </form>
        <br />
        <div className='forgot-password'>
          <a href='#'>¿Olvidaste tu contraseña?</a>
        </div>
        <div className='privacy'>
          <a href='#'>Políticas de privacidad</a>
        </div>
        <div className='titlenormal'>
          ¿No tienes cuenta?
          <Link to="/registro" className="btn1">
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;