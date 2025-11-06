import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card } from "primereact/card"
import { InputTextarea } from "primereact/inputtextarea"
import { InputNumber } from "primereact/inputnumber"
import { Button } from "primereact/button"
import Swal from "sweetalert2"
import { updateReview } from "../services/reviews"
import "../styles/EditarPost.css" 

function EditarReview() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(null)
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
        const res = await fetch(`http://localhost:5000/reviews/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error("Error al cargar la review")

        const data = await res.json()
        setComment(data.comment || "")
        setRating(data.rating || null)
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

    if (!comment.trim() || rating == null) {
      Swal.fire("Error", "Completa todos los campos antes de guardar", "warning")
      return
    }

    setLoading(true)
    try {
      await updateReview(token, id, { comment, rating })
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
          <label htmlFor="comment">Comentario</label>
          <InputTextarea
            id="comment"
            rows={5}
            autoResize
            value={comment}
            onChange={(e) => setComment(e.target.value)}
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
