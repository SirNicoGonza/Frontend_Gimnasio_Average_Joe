import { Link } from "react-router-dom";
import './Principal.css'

export default function Principal() {
    return (
        
        <div>
            <div>
                <h1>Average Joe Gym</h1>
            </div>
            <div className='register'>
					¿No tienes cuenta?
					<Link to= "/registro">
                        <button id='register-link'>Registraste aquí</button>
                    </Link>
				</div>
        </div>
        
    );
}