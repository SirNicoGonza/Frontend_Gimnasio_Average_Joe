import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import Principal from "../components/ui/Principal";
import Login from "../components/Login";
import Perfil from "../components/Perfil";
import RegistrationForm from "../components/Registro";
import NotFound from "../components/NotFound";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Principal/>
    },
    {
        path: "registro",
        element: <RegistrationForm />
    },
    {
        path: "login",
        element: <Login />
    },
    {
        path: "*",
        element: <NotFound />,
    },
    {
        element: <Layout />,
        children: [
            {
                path:"perfil",
                element: <Perfil />,
            },
            {
                path: "planes",
                element: (
                <ProtectedRoute>
                    <NotFound /> 
                </ProtectedRoute>
                ),
            },
        ]
    }
])

export { Router };