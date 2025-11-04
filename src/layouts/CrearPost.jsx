import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import "../styles/PostsList.css"

const validationSchema = Yup.object({
  title: Yup.string().required("El título es obligatorio"),
  content: Yup.string().required("El contenido es obligatorio"),
})

function CrearPost() {
  const navigate = useNavigate()

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const token = localStorage.getItem("token")

      const response = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        Swal.fire({
          title: "Post creado con éxito",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        })
        toast.success("Post creado correctamente")
        resetForm()
        navigate("/posts")
      } else {
        toast.error("Error al crear el post")
      }
    } catch (error) {
      toast.error("Error en el servidor")
    }
  }

  
  return (
    <div className="posts-container">
      <Card title="Crear nuevo Post" className="posts-card">
        <Formik
          initialValues={{ title: "", content: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="login-form">
              <div className="form-field">
                <label htmlFor="title">Título</label>
                <Field as={InputText} id="title" name="title" />
                <ErrorMessage name="title" component="small" className="error" />
              </div>

              <div className="form-field">
                <label htmlFor="content">Contenido</label>
                <Field as={InputText} id="content" name="content" />
                <ErrorMessage name="content" component="small" className="error" />
              </div>

              <div className="posts-actions">
                <Button
                  type="submit"
                  label={isSubmitting ? "Creando..." : "Crear Post"}
                />
                <Button
                  type="button"
                  label="Volver"
                  onClick={() => navigate("/posts")}
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

export default CrearPost
