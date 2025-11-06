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
  const [reviews, setReviews] = useState([])
  const navigate = useNavigate()

  const cargarReviews = async () => {
    const token = localStorage.getItem("token")
    const data = await getReviews(token)
    setReviews(data)
  }

  useEffect(() => {
    cargarReviews()
  }, [])

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
        const token = localStorage.getItem("token")
        await deleteReview(token, id)
        cargarReviews()
        Swal.fire("Eliminada", "La review fue eliminada correctamente", "success")
      }
    })
  }

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
    <div className="posts-container">
      <Card title="Listado de Reviews" className="posts-card">
        <DataTable
          value={reviews}
          className="posts-table"
          emptyMessage={<p className="no-data">No hay reviews registradas</p>}
        >
          <Column field="post_title" header="Título del Post" />
          <Column field="post_author" header="Autor del Post" />
          <Column field="comment" header="Comentario" />
          <Column header="Acciones" body={accionesTemplate} />
        </DataTable>
      </Card>
    </div>
  )
}

export default ReviewsList
