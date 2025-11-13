import { Fragment, useEffect, useState } from "react"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { getPosts, deletePost } from "../services/posts"
import "../styles/PostsList.css"
import CrearPost from "./CrearPost"

const PostsList = () => {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()

  const cargarPosts = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) return
      const data = await getPosts(token)
      setPosts(data || [])
    } catch (error) {
      console.error("Error cargando posts:", error)
    }
  }

  useEffect(() => {
    cargarPosts()
  }, [])

  const borrarPost = async (id) => {
    Swal.fire({
      title: "¿Seguro que quieres eliminar este post?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (action) => {
      if (action.isConfirmed) {
        try {
          const token = localStorage.getItem("token")
          await deletePost(token, id)
          await cargarPosts()
          Swal.fire("Eliminado", "El post fue eliminado correctamente", "success")
        } catch (error) {
          Swal.fire("Error", "No puedes eliminar el post", "error")
        }
      }
    })
  }

  return (
    <div className="list-section">
      <CrearPost onPostCreado={cargarPosts} />
      <Card title="Listado de Posts" className="posts-card">
        {posts.length === 0 ? (
          <p className="no-data">No hay posts registrados</p>
        ) : (
          <div className="post-grid">
            {posts.map((post) => (
              <div className="post-card" key={post.id}>
                <h3 className="post-title">{post.titulo}</h3>
                <p className="post-content">{post.contenido}</p>

                <div className="post-footer">
                  <span className="post-author">
                    <i className="pi pi-user"></i> {post.author}
                  </span>
                  <span className="post-category">
                    <i className="pi pi-tag"></i> {post.categoria ? post.categoria.nombre : "Sin categoría"}
                  </span>
                  <span className="post-date">
                    <i className="pi pi-calendar"></i> {new Date(post.fecha_creacion).toLocaleDateString()}
                  </span>
                </div>

                <div className="post-actions">
                  <Button
                    icon="pi pi-pencil"
                    label="Editar"
                    className="p-button-secondary p-button-sm"
                    onClick={() => navigate(`/editar-post/${post.id}`)}
                  />
                  <Button
                    icon="pi pi-trash"
                    label="Eliminar"
                    className="p-button-danger p-button-sm"
                    onClick={() => borrarPost(post.id)}
                  />
                  <Button
                    icon="pi pi-comment"
                    label="Crear Review"
                    className="p-button-success p-button-sm"
                    onClick={() => navigate(`/posts/${post.id}/reviews/nueva`)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}

export default PostsList
