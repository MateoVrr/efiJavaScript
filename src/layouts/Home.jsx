import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {user ? (
        <>
          <h1>Bienvenido, {user.name}</h1>
          <p>Email: {user.email}</p>
          <p>Rol: {user.role}</p>
          <button onClick={logout} style={{ color: "white" }}>Cerrar Sesión</button>
        </>
      ) : (
        <>
          <h1>Bienvenido</h1>
          <button onClick={() => navigate("/login")} style={{ color: "white" }}>Iniciar Sesión</button>
          <h2>¿No tienes una cuenta?</h2>
          <button onClick={() => navigate("/registro")} style={{ color: "white" }}>Registrate</button>
        </>
      )}
    </div>
  );
}

export default Home;
