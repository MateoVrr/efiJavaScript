import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "primereact/button";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/posts">Posts</Link>
        <Link to="/reviews">Reviews</Link>
      </div>

      {user && (
        <div className="navbar-right">
          <span className="navbar-user">👤 {user.name}</span>
          <Button
            label="Cerrar sesión"
            icon="pi pi-sign-out"
            onClick={handleLogout}
            className="p-button-danger p-button-sm"
          />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
