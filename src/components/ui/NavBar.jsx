import NavMenu from "./NavMenu";
import { useAuth } from "../../contexts/AuthContext";
import "../ui/NavBar.css";

function NavBar({ appName }) {

    const {login}= useAuth("actions");
    
    const handleClick= (e) => {
        login();
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
                        {text:"Home", url:"/home"}
                    ]} 
                />
            </nav>
        </header>
    )
};

export default NavBar;