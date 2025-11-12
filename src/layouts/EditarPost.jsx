import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"
import { Button } from "primereact/button"
import Swal from "sweetalert2"
import { updatePost } from "../services/posts"
import "../styles/EditarPost.css"

function EditarPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const cargarPost = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        Swal.fire("Error", "No estás autenticado", "error")
        navigate("/login")
        return
      }

      try {
        const res = await fetch(`http://localhost:5000/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error("Error al cargar el post")

        const data = await res.json()
        setTitle(data.titulo)
        setContent(data.contenido)
      } catch (err) {
        Swal.fire("Error", "No se pudo cargar el post", "error")
        navigate("/posts")
      }
    }

    cargarPost()
  }, [id, navigate])

  const guardarCambios = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      Swal.fire("Error", "No estás autenticado", "error")
      navigate("/login")
      return
    }

    if (!title.trim() || !content.trim()) {
      Swal.fire("Error", "Completa todos los campos antes de guardar", "warning")
      return
    }

    setLoading(true)
    try {
      await updatePost(token, id, { titulo: title, contenido: content })
      Swal.fire("Guardado", "El post fue actualizado correctamente", "success")
      navigate("/posts")
    } catch {
      Swal.fire("Error", "No se pudo guardar el post", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="editarpost-container">
      <Card title="Editar Post" className="editarpost-card">
        <div className="form-field">
          <label htmlFor="title">Título</label>
          <InputText
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="content">Contenido</label>
          <InputTextarea
            id="content"
            rows={5}
            autoResize
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
            onClick={() => navigate("/posts")}
          />
        </div>
      </Card>
    </div>
  )
}

export default EditarPost
