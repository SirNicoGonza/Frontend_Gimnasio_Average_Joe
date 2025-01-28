import { useAuth } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { state } = useAuth(); // Obtén el estado del contexto
  const { role, isAuthenticated } = state || {}; // Desestructura con valores por defecto
  const location = useLocation();

  console.log("Estado de autenticación:", { isAuthenticated, role }); // Depuración

  // Si el usuario no está autenticado, redirige a /login
  if (!isAuthenticated) {
    console.log("Redirigiendo a /login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log("Permitiendo acceso a la ruta protegida");
  return children;
}