import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import LayoutSinNav from "./LayoutSinNav";
import ProtectedRoute from "./ProtectedRoute";
import Principal from "../components/ui/Principal";
import Login from "../components/Login";
import Perfil from "../components/Perfil";
import RegistrationForm from "../components/Registro";
import PlanesList from "../components/Planes/PlanesList";
import NewPlan from "../components/Planes/NewPlan";
import EditPlan from "../components/Planes/EditPlanes";
import ActividadesList from "../components/Actividades/ActividadesList";
import NewActividad from "../components/Actividades/NewActividad";
import NotFound from "../components/NotFound";
import EditActividades from "../components/Actividades/EditActividades";

const Router = createBrowserRouter([
  {
    path: "/",
    element: 
        <Principal />
  },
  {
    path: "registro",
    element: <RegistrationForm />,
  },
  {
    element: <LayoutSinNav />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    element: <Layout />,
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
            <PlanesList />
          </ProtectedRoute>
        ),
      },
      {
        path: "planes/newplan",
        element: (
          <ProtectedRoute>
            <NewPlan />
          </ProtectedRoute>
        )
      },
      {
        path: "planes/editar/:id",
        element : (
          <ProtectedRoute>
            <EditPlan />
          </ProtectedRoute>
        )
      },
      {
        path: "actividades",
        element: (
          <ProtectedRoute>
            <ActividadesList />
          </ProtectedRoute>
        )
      },
      {
        path: "actividades/newactividad",
        element: (
          <ProtectedRoute>
            <NewActividad />
          </ProtectedRoute>
        )
      },
      {
        path: "actividades/editar/:id",
        element: (
          <ProtectedRoute>
            <EditActividades />
          </ProtectedRoute>
        )
      },
      {
        path: "*", 
        element: <NotFound />,
      },
    ],
  },
]);

export { Router };