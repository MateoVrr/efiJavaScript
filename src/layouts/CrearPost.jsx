import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"
import { Button } from "primereact/button"
import { Dropdown } from "primereact/dropdown"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { createPost } from "../services/posts"
import "../styles/PostsList.css"

const validationSchema = Yup.object({
  title: Yup.string().required("El título es obligatorio"),
  content: Yup.string().required("El contenido es obligatorio"),
})

function CrearPost({ autoRedirect = true, onPostCreado }) {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        toast.error("No estás autenticado. Iniciá sesión para crear un post.")
        navigate("/login")
        return
      }

      const response = await createPost(token, {
        titulo: values.title,
        contenido: values.content,
      })

      if (response && !response.error) {
        Swal.fire({
          title: "Post creado con éxito",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        })
        toast.success("Post creado correctamente")
        if (onPostCreado) onPostCreado()
        resetForm()
        if (autoRedirect) setTimeout(() => navigate("/posts"), 2000)
      } else {
        toast.error("Error al crear el post")
      }
    } catch (error) {
      console.error(error)
      toast.error("Error en el servidor")
    }
  }

  return (
    <div className="posts-container page-background">
      <Card title="Crear nuevo Post" className="posts-card">
        <Formik
          initialValues={{ title: "", content: "",}}
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
                <Field
                  as={InputTextarea}
                  id="content"
                  name="content"
                  rows={5}
                  autoResize
                />
                <ErrorMessage name="content" component="small" className="error" />
              </div>

              <div className="posts-actions">
                <Button
                  type="submit"
                  label={isSubmitting ? "Creando..." : "Crear Post"}
                  disabled={isSubmitting}
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
