import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card } from "primereact/card"
import { InputTextarea } from "primereact/inputtextarea"
import { Button } from "primereact/button"
import Swal from "sweetalert2"
import { updateReview, getReviewById } from "../services/reviews"
import "../styles/EditarPost.css"

function EditarReview() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [texto, setTexto] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const cargarReview = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        Swal.fire("Error", "No estás autenticado", "error")
        navigate("/login")
        return
      }

      try {
        const data = await getReviewById(token, id)
        setTexto(data.texto || "")
      } catch (err) {
        Swal.fire("Error", "No se pudo cargar la review", "error")
        navigate("/reviews")
      }
    }

    cargarReview()
  }, [id, navigate])

  const guardarCambios = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      Swal.fire("Error", "No estás autenticado", "error")
      navigate("/login")
      return
    }

    if (!texto.trim()) {
      Swal.fire("Error", "El comentario no puede estar vacío", "warning")
      return
    }

    setLoading(true)
    try {
      await updateReview(token, id, { texto })
      Swal.fire("Guardado", "La review fue actualizada correctamente", "success")
      navigate("/reviews")
    } catch {
      Swal.fire("Error", "No se pudo guardar la review", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="editarpost-container">
      <Card title="Editar Review" className="editarpost-card">
        <div className="form-field">
          <label htmlFor="texto">Comentario</label>
          <InputTextarea
            id="texto"
            rows={5}
            autoResize
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
        </div>

        <div className="editarpost-actions">
          <Button
            label={loading ? "Guardando..." : "Guardar"}
            onClick={guardarCambios}
            disabled={loading}
          />
          <Button
            label="Cancelar"
            className="p-button-secondary"
            onClick={() => navigate("/reviews")}
          />
        </div>
      </Card>
    </div>
  )
}

export default EditarReview
