import { useEffect, useState } from "react"
import { Card } from "primereact/card"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import CrearCategoria from "./CrearCategoria"
import "../styles/admin-panel.css"

const AdminPanel = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [categorias, setCategorias] = useState([])

  // Comprueba que el usuario sea administrador
  useEffect(() => {
    if (!user || user.role !== "admin") {
      toast.error("No estás autorizado para acceder a este panel")
      navigate("/posts")
    }
  }, [user, navigate])

  const actualizarCategorias = (nuevaCategoria) => {
    setCategorias(prev => [...prev, nuevaCategoria])
  }

  return (
    <div className="list-section">
      <Card className="posts-card" title="Panel de Administración - Categorías">

        {/* Formulario */}
        <div className="crear-categoria-form">
          <CrearCategoria onCategoriaCreada={actualizarCategorias} />
        </div>

        {/* Lista */}
        <div className="categorias-list">
          {categorias.length === 0 ? (
            <p>No hay categorías registradas.</p>
          ) : (
            <ul>
              {categorias.map((cat) => (
                <li key={cat.id}>{cat.nombre}</li>
              ))}
            </ul>
          )}
        </div>

      </Card>
    </div>
  )
}

export default AdminPanel
