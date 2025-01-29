import NavMenu from "./NavMenu";
import { useAuth } from "../../contexts/AuthContext";
import "../ui/NavBar.css";

function NavBar({ appName }) {

    const {actions} = useAuth();
    const {logout}= actions;
    
    const handleClick= (e) => {
        logout();
    };

    return (
        <header>
            <div className="header">
                <h1 className="title-main">{appName}</h1>
                <button className="button-logout" onClick={handleClick}>Cerrar sesion</button>       
            </div>
            <nav 
                className="navbar"
                role="navigation"
                aria-label="main-navigation"
            >
                <NavMenu
                    items={[
                        {text:"Perfil", url:"/perfil"},
                        {text: "Planes", url: "/planes"},
                        {text: "Actividades", url: "/actividades"},
                        {text: "Pagos", url: "/pagos"}
                    ]} 
                />
            </nav>
        </header>
    )
};

export default NavBar;