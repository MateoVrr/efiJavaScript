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
import { createPost } from "../services/posts"
import { getCategorias } from "../services/categorias"
import "../styles/PostsList.css"

// Validación general del formulario
const validationSchema = Yup.object({
  title: Yup.string().required("El título es obligatorio"),
  content: Yup.string().required("El contenido es obligatorio"),
  categoria: Yup.object().required("Debes seleccionar una categoría"),
})

function CrearPost({ autoRedirect = true, onPostCreado }) {
  const navigate = useNavigate()
  const [categorias, setCategorias] = useState([])

  // Carga inicial de categorías disponibles
  const cargarCategorias = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) return
      const data = await getCategorias(token)
      setCategorias(data || [])
    } catch (error) {
      console.error("Error cargando categorías:", error)
    }
  }

  useEffect(() => {
    cargarCategorias()
  }, [])

  // Maneja el envío del formulario y creación del post
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
        categoria_id: values.categoria.id,
      })

      // Notificaciones y acciones tras crear el post
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
      <Card title="Postea Algo!" className="posts-card">

        {/* Formulario de creación con Formik */}
        <Formik
          initialValues={{ title: "", content: "", categoria: null }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="login-form">

              {/* Campo título */}
              <div className="form-field">
                <label htmlFor="title">Título</label>
                <Field as={InputText} id="title" name="title" />
                <ErrorMessage name="title" component="small" className="error" />
              </div>

              {/* Campo contenido */}
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

              {/* Selector de categoría */}
              <div className="form-field">
                <label htmlFor="categoria">Categoría</label>
                <Dropdown
                  id="categoria"
                  value={values.categoria}
                  options={categorias}
                  onChange={(e) => setFieldValue("categoria", e.value)}
                  optionLabel="nombre"
                  placeholder="Selecciona una categoría"
                />
                <ErrorMessage name="categoria" component="small" className="error" />
              </div>

              {/* Botón de acción */}
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
