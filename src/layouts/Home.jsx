import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "../styles/Home.css"

function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()   

  // Si el usuario está logueado, lo manda directo a Posts
  useEffect(() => {
    if (user) {
      navigate("/posts");
    }
  }, [user, navigate]);

  return (
    <div className="home-container">

      {/* Si NO hay usuario, muestra botones de login/registro */}
      {!user ? (
        <>
          <h1 className="home-title">Bienvenido</h1>

          <button
            className="home-button"
            onClick={() => navigate("/login")}
          >
            Iniciar Sesión
          </button>

          <h2>¿No tienes una cuenta?</h2>

          <button
            className="home-button home-register"
            onClick={() => navigate("/registro")}
            style={{ color: "white" }}
          >
            Registrate
          </button>
        </>
      ) : (
        // Si ya hay usuario, muestra mensaje mientras redirige
        <h1>Redirigiendo a tus posts...</h1>
      )}

    </div>
  );
}

export default Home;
