import { createBrowserRouter } from "react-router-dom";
import RegistrationForm from "../components/Registro";
import NotFound from "../components/NotFound";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <RegistrationForm />
    },
    {
        path: "*",
        element: <NotFound />,
    }
])

export { Router };