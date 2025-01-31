import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import NavBar from "../components/ui/NavBar";
import Footer from "../components/ui/Footer";

export default function Layout(){
    return (
        <AuthProvider>
            <style>
             {`
                  
    .layout-container {
        display: flex;
        flex-direction: column;
        background-color: #1a1a1a; 
        color: white;
        height: 100vh; /* Asegura que el layout ocupe toda la altura de la ventana */
    }

    .content {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        padding-top: 100px; /* Ajusta este valor al tamaño del header fijo */
    }

    .footer {
        width: 100%;
        margin-top: auto; /* Esto asegura que el footer se quede al final */
    }
  `}
            </style>
            <div className="layout-container">
                <NavBar appName={"Average Joe"} />
                <div className="content">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </AuthProvider>
    )
};