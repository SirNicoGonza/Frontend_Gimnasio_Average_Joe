//import '../assets/Login.css';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useAuth } from '../contexts/AuthContext';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [triggerFetch, setTriggerFetch] = useState(false);
	const [errorMensaje, setErrorMensaje] = useState('');

	const [{ data, error, isLoading }, doFetch] = useFetch(
		`${import.meta.env.VITE_API_URL}/user/login/`,
		{
			method: 'POST',
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

	const { login } = useAuth('actions');
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/perfil';

	useEffect(() => {
		if (data) {
			const token = data.token;
			login(token);
			navigate(from, { replace: true });
		}
	}, [data, login, navigate, from]);

	useEffect(() => {
		if (error) {
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
		setTriggerFetch(true);
		doFetch();
	};

	return (
		<>
			<h1 id='maintitle'>Average Joe</h1>
			<br />
			<div id='container-login'>
				<link
					href='https://fonts.googleapis.com/icon?family=Material+Icons'
					rel='stylesheet'
				/>
				<div id='title'>
					<i className='material-icons lock'>lock</i> Login
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
						<button type='submit' className='my-button'>
							Iniciar Sesión
						</button>
						{isLoading && triggerFetch && <p>Cargando...</p>}
						{errorMensaje && (
							<p className='error-message'>{errorMensaje}</p>
						)}
					</div>
				</form>
				<br />
				<div className='forgot-password'>
					<a href='#'>¿Olvistaste tu contraseña?</a>
				</div>
				<div className='privacy'>
					<a href='#'>Politias de privacidad</a>
				</div>
				<div className='register'>
					¿No tienes cuenta?
					<a href='#'>
						<button id='register-link'>Registraste aquí</button>
					</a>
				</div>
			</div>
		</>
	);
}

export default Login;