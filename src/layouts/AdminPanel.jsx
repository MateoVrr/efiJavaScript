import { useEffect, useState } from "react"
import { Card } from "primereact/card"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import CrearCategoria from "./CrearCategoria"

const AdminPanel = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [categorias, setCategorias] = useState([])

  // Redirige si no es admin
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
    <div className="admin-panel page-background">
      <Card title="Panel de Administración - Categorías">
        <CrearCategoria onCategoriaCreada={actualizarCategorias} />
        <div className="categorias-list p-mt-3">
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
