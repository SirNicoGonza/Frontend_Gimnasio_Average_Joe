import { Link } from "react-router-dom";
import './Principal.css'

export default function Principal() {
    return (
        <div className="maindiv">
            <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"></link>
            <div>
                <h1 className="gymname">Average Joe Gym</h1>
            </div>
            <div>
                <Link to="/login">
                    <button className="botonprincipal">Iniciar Sesion</button>
                </Link>  
            </div>
            <div className='register'>
					<p className="parrofo1">¿No tienes cuenta?</p>
					<Link to= "/registro">
                        <button className="botonprincipal">Registraste aquí</button>
                    </Link>
			</div>
        </div>
        
    );
}