import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";

function ProtectedRoute({ children }) {
  const { token, user } = useAuth();
  
  // Si no hay sesión activa, redirige al login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Muestra la navegación y el contenido protegido
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default ProtectedRoute;
