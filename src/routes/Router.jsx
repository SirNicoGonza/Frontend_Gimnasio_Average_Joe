import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import LayoutSinNav from "./LayoutSinNav";
import ProtectedRoute from "./ProtectedRoute";
import Principal from "../components/ui/Principal";
import Login from "../components/Login";
import Perfil from "../components/Perfil";
import RegistrationForm from "../components/Registro";
import NotFound from "../components/NotFound";

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute> {/* Protege la ruta raíz */}
        <Principal />
      </ProtectedRoute>
    ),
  },
  {
    path: "registro",
    element: <RegistrationForm />,
  },
  {
    element: <LayoutSinNav />, // Layout sin barra de navegación
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    element: <Layout />, // Layout con barra de navegación
    children: [
      {
        path: "perfil",
        element: (
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        ),
      },
      {
        path: "planes",
        element: (
          <ProtectedRoute>
            <h1>Página de Planes</h1> {/* Reemplaza con el componente correcto */}
          </ProtectedRoute>
        ),
      },
      {
        path: "*", // Ruta para páginas no encontradas
        element: <NotFound />,
      },
    ],
  },
]);

export { Router };