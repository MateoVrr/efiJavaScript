import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Button } from "primereact/button"
import "../styles/Navbar.css"

function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  // Maneja el cierre de sesión y redirección
  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="navbar">
      {/* Links principales de navegación */}
      <div className="navbar-left">
        <Link to="/posts" className="nav-link">
          Posts
        </Link>
        <Link to="/reviews" className="nav-link">
          Reviews
        </Link>
      </div>

      {/* Sección visible solo si el usuario está autenticado */}
      {user && (
        <div className="navbar-right">
          <span className="navbar-user">
            <i className="pi pi-user"></i> {user.nombre}
          </span>

          {/* Botón para cerrar sesión */}
          <Button
            label="Cerrar sesión"
            icon="pi pi-sign-out"
            onClick={handleLogout}
            className="p-button-sm p-button-rounded p-button-danger"
          />
        </div>
      )}
    </nav>
  )
}

export default Navbar
