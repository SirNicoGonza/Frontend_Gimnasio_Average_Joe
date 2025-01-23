import { useAuth } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { state } = useAuth(); // Obtén el estado del contexto
  const { isAuthenticated } = state; // Desestructura isAuthenticated
  const location = useLocation();

  console.log("Usuario autenticado:", isAuthenticated); 

  if (!isAuthenticated) {
    console.log("Redirigiendo a /login"); 
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  console.log("Permitiendo acceso a la ruta protegida"); 
  return children;
}