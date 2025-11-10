import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Button } from "primereact/button"
import "../styles/Navbar.css"

function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/posts" className="nav-link">
          Posts
        </Link>
        <Link to="/reviews" className="nav-link">
          Reviews
        </Link>
      </div>

      {user && (
        <div className="navbar-right">
          <span className="navbar-user">
            <i className="pi pi-user"></i> {user.nombre}
          </span>
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
