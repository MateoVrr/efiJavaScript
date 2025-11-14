import { useEffect, useState } from "react"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { getReviews, deleteReview } from "../services/reviews"
import "../styles/PostsList.css"

const ReviewsList = () => {
  // Estado donde se guardan todas las reviews
  const [reviews, setReviews] = useState([])
  const navigate = useNavigate()

  // Carga las reviews desde el backend
  const cargarReviews = async () => {
    const token = localStorage.getItem("token")
    const data = await getReviews(token)
    setReviews(data)
  }

  // Carga la lista apenas entra a la pantalla
  useEffect(() => {
    cargarReviews()
  }, [])

  // Muestra confirmación y elimina una review
  const borrarReview = async (id) => {
    Swal.fire({
      title: "¿Seguro que quieres eliminar esta review?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (action) => {
      if (action.isConfirmed) {
        try {
          const token = localStorage.getItem("token")
          await deleteReview(token, id)
          await cargarReviews() // Recarga la lista después de borrar
          Swal.fire("Eliminada", "La review fue eliminada correctamente", "success")
        } catch (error) {
          Swal.fire("Error", "No puedes eliminar esta review", "error")
        }
      }
    })
  }

  // Botones de acción (editar y eliminar)
  const accionesTemplate = (row) => (
    <div>
      <Button 
        icon="pi pi-trash"
        label="Eliminar"
        onClick={() => borrarReview(row.id)}
        className="p-button-danger p-button-sm"
      />
      <Button
        icon="pi pi-pencil"
        label="Editar"
        onClick={() => navigate(`/editar-review/${row.id}`)}
        className="p-button-secondary p-button-sm"
      />
    </div>
  )

  return (
    // Contenedor principal de la vista
    <div className="posts-container">
      <Card title="Reviews" className="posts-card">
        
        {/* Tabla que muestra todas las reviews */}
        <DataTable
          value={reviews}
          className="posts-table"
          emptyMessage={<p className="no-data">No hay reviews registradas</p>}
        >
          {/* Muestra el título del post asociado */}
          <Column field="post.titulo" header="Título del Post" />

          {/* Muestra el autor del comentario */}
          <Column field="usuario.nombre" header="Autor del comentario" />

          {/* Muestra el contenido de la review */}
          <Column field="texto" header="Comentario" />

          {/* Muestra los botones de acción */}
          <Column header="Acciones" body={accionesTemplate} />
        </DataTable>
      </Card>
    </div>
  )
}

export default ReviewsList
