import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/posts");
    }
  }, [user, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {!user ? (
        <>
          <h1>Bienvenido</h1>
          <button
            onClick={() => navigate("/login")}
            style={{ color: "white" }}
          >
            Iniciar Sesión
          </button>
          <h2>¿No tienes una cuenta?</h2>
          <button
            onClick={() => navigate("/registro")}
            style={{ color: "white" }}
          >
            Registrate
          </button>
        </>
      ) : (
        <h1>Redirigiendo a tus posts...</h1>
      )}
    </div>
  );
}

export default Home;
