import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bienvenido</h1>
      <button onClick={() => navigate("/login")} style={{ color: "white" }}>Iniciar Sesión</button>
      <h2>¿No tienes una cuenta?</h2>
      <button onClick={() => navigate("/registro")} style={{ color: "white" }}>Registrate</button>
    </div>
  );
}

export default Home;
