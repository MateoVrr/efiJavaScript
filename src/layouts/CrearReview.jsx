import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import { useNavigate, useParams } from "react-router-dom"
import "../styles/PostsList.css"
import { useAuth } from "../context/AuthContext"
import { createReview } from "../services/reviews"

const validationSchema = Yup.object({
  content: Yup.string().required("El contenido es obligatorio"),
})

function CrearReview() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useAuth() 

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const token = localStorage.getItem("token") 
      if (!token) {
        toast.error("No estás autenticado. Iniciá sesión para continuar.")
        navigate("/login")
        return
      }

      const body = {
        comment: values.content,
        post_id: Number(id),
        rating: 5,
        user_id: user?.id || null,
      }

      const response = await createReview(token, body)

      if (response) {
        Swal.fire({
          title: "Review creada con éxito",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        })
        toast.success("Review creada correctamente")
        resetForm()
        setTimeout(() => navigate("/reviews"), 2000)
      } else {
        toast.error("Hubo un error al crear la review")
      }
    } catch (error) {
      toast.error("Error en el servidor")
    }
  }

  return (
    <div className="posts-container">
      <Card title={`Crear nueva Review para este Post`} className="posts-card">
        <Formik
          initialValues={{ content: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="login-form">
              <div className="form-field">
                <label htmlFor="content">Contenido</label>
                <Field as={InputText} id="content" name="content" />
                <ErrorMessage name="content" component="small" className="error" />
              </div>

              <div className="posts-actions">
                <Button
                  type="submit"
                  label={isSubmitting ? "Creando..." : "Crear Review"}
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
