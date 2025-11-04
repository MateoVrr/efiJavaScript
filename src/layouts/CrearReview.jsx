import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import { useNavigate, useParams } from "react-router-dom"
import "../styles/PostsList.css"

const validationSchema = Yup.object({
  content: Yup.string().required("El contenido es obligatorio"),
})

function CrearReview() {
  const navigate = useNavigate()
  const { id } = useParams() 

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const token = localStorage.getItem("token")

      const body = {
        content: values.content,
        post_id: Number(id), 
      }

      const response = await fetch("http://localhost:5000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })

      if (response.ok) {
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
      <Card title={`Crear nueva Review para Post #${id}`} className="posts-card">
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
                <Button
                  type="button"
                  label="Volver"
                  onClick={() => navigate("/reviews")}
                  className="p-button-secondary"
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
