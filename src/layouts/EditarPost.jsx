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


  // Al cargar la página, trae los datos del post a editar
  useEffect(() => {
    const cargarPost = async () => {
      const token = localStorage.getItem("token")

      // Si no hay token, manda al login
      if (!token) {
        Swal.fire("Error", "No estás autenticado", "error")
        navigate("/login")
        return
      }

      try {
        // Trae el post desde el backend
        const res = await fetch(`http://localhost:5000/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error("Error al cargar el post")

        const data = await res.json()

        // Rellena los campos con los datos actuales del post
        setTitle(data.titulo)
        setContent(data.contenido)
      } catch (err) {
        Swal.fire("Error", "No se pudo cargar el post", "error")
        navigate("/posts")
      }
    }

    cargarPost()
  }, [id, navigate])


  // Función para guardar los cambios del post
  const guardarCambios = async () => {
    const token = localStorage.getItem("token")

    // Verifica autenticación
    if (!token) {
      Swal.fire("Error", "No estás autenticado", "error")
      navigate("/login")
      return
    }

    // Valida que no haya campos vacíos
    if (!title.trim() || !content.trim()) {
      Swal.fire("Error", "Completa todos los campos antes de guardar", "warning")
      return
    }

    setLoading(true)

    try {
      // Envía los cambios al backend
      await updatePost(token, id, { titulo: title, contenido: content })
      Swal.fire("Guardado", "El post fue actualizado correctamente", "success")
      navigate("/posts")   // Redirige a la lista de posts
    } catch {
      Swal.fire("Error", "No se pudo guardar el post", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="editarpost-container">
      <Card title="Editar Post" className="editarpost-card">

        {/* Campo del título */}
        <div className="form-field">
          <label htmlFor="title">Título</label>
          <InputText
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Campo del contenido */}
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

        {/* Botones de acción */}
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
