import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import "../styles/PostsList.css"
import { useAuth } from "../context/AuthContext"
import { createReview, getReviewById, updateReview } from "../services/reviews"

// Validación del formulario
const validationSchema = Yup.object({
  content: Yup.string().required("El contenido es obligatorio"),
})

function CrearReview() {
  const navigate = useNavigate()
  const { id, review_id } = useParams()        // Detecta si es creación o edición
  const { user } = useAuth()
  const [initialValues, setInitialValues] = useState({ content: "" })
  const [isEdit, setIsEdit] = useState(false)

  // Si estamos editando, cargamos los datos de la review
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (review_id && token) {
      setIsEdit(true)
      getReviewById(token, review_id)
        .then((review) => {
          setInitialValues({ content: review.texto })   // Setea los valores actuales
        })
        .catch(() => {
          toast.error("No se pudo cargar la review")
        })
    }
  }, [review_id])

  // Cuando se envía el formulario (crear o editar)
  const handleSubmit = async (values, { resetForm }) => {
    const token = localStorage.getItem("token")

    // Si no está logueado, lo manda al login
    if (!token) {
      toast.error("No estás autenticado. Iniciá sesión para continuar.")
      navigate("/login")
      return
    }

    try {
      if (isEdit) {
        // Actualiza la review existente
        await updateReview(token, review_id, { texto: values.content })
        Swal.fire("Éxito", "Review actualizada correctamente", "success")
      } else {
        // Crea una nueva review asociada al post
        const body = { texto: values.content, post_id: Number(id) }
        await createReview(token, body)
        Swal.fire("Éxito", "Review creada correctamente", "success")
      }

      resetForm()
      setTimeout(() => navigate("/reviews"), 1500)   // Redirige después de un momento
    } catch (error) {
      toast.error("Error al guardar la review")
    }
  }

  return (
    <div className="posts-container page-background">
      <Card title={isEdit ? "Editar Review" : "Crear nueva Review"} className="posts-card">
        
        {/* Formulario manejado por Formik */}
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="login-form">

              {/* Campo de contenido */}
              <div className="form-field">
                <label htmlFor="content">Contenido</label>
                <Field as={InputText} id="content" name="content" />
                <ErrorMessage name="content" component="small" className="error" />
              </div>

              {/* Botón que cambia según si se edita o crea */}
              <div className="posts-actions">
                <Button
                  type="submit"
                  label={
                    isSubmitting
                      ? "Guardando..."
                      : isEdit
                      ? "Actualizar Review"
                      : "Crear Review"
                  }
                />
              </div>

            </Form>
          )}
        </Formik>

      </Card>
    </div>
  )
}

export default CrearReview
