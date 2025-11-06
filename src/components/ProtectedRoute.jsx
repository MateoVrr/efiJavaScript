import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar"

function ProtectedRoute({ children }) {
  const { token, user } = useAuth();
  
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
    <Navbar />
    {children}
    </>
  )
}

export default ProtectedRoute;
