import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import Swal from "sweetalert2"
import "../styles/EditarPost.css"

function EditarPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    const cargarPost = async () => {
      const token = localStorage.getItem("token")
      const res = await fetch(`http://localhost:5000/posts/${id}`, {
        headers: { Authorization: "Bearer " + token }
      })
      const data = await res.json()
      setTitle(data.title)
      setContent(data.content)
    }
    cargarPost()
  }, [id])

  const guardarCambios = async () => {
    const token = localStorage.getItem("token")
    await fetch(`http://localhost:5000/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ title, content })
    })

    Swal.fire("Guardado!", "El post fue actualizado", "success")
    navigate("/")
  }

  return (
    <div className="editarpost-container">
      <Card title="Editar Post" className="editarpost-card">

        <label>Título</label>
        <InputText value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Contenido</label>
        <InputText value={content} onChange={(e) => setContent(e.target.value)} />

        <div className="editarpost-actions">
          <Button label="Guardar" onClick={guardarCambios} />
          <Button label="Cancelar" className="p-button-secondary" onClick={() => navigate("/")} />
        </div>

      </Card>
    </div>
  )
}

export default EditarPost
