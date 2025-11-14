import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Swal from "sweetalert2"
import "../styles/Login.css"

// Validación del formulario
const validationSchema = Yup.object({
  email: Yup.string().email("Email inválido").required("El email es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
})

function Login() {
  const navigate = useNavigate()
  const { saveToken } = useAuth() // Para guardar el token después del login

  // Función que maneja el inicio de sesión
  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Envío de datos al backend
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      // Si los datos son correctos, se guarda el token y se redirige
      if (response.ok) {
        const data = await response.json()
        saveToken(data.access_token)

        toast.success("Inicio de sesión exitoso")

        Swal.fire({
          title: "Bienvenido",
          text: "Inicio de sesión exitoso",
          icon: "success",
          timer: 1800,
          showConfirmButton: false,
        })

        resetForm()
        setTimeout(() => navigate("/"), 1800)
      } 
      // Si el backend responde error
      else {
        Swal.fire("Error", "Usuario o contraseña incorrectos", "error")
      }

    } catch (error) {
      // Error de conexión o servidor caído
      toast.error("Error al conectar con el servidor")
    }
  }

  return (
    <div className="login-container">
      <Card className="login-card" title={<span className="login-title">Iniciar Sesión</span>}>
        
        {/* Formik maneja todo el formulario */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="login-form">

              {/* Campo Email */}
              <div className="form-field">
                <label htmlFor="email" className="form-label">Email</label>
                <Field
                  as={InputText}
                  id="email"
                  name="email"
                  placeholder="tu@email.com"
                />
                <ErrorMessage name="email" component="small" className="error" />
              </div>

              {/* Campo Password */}
              <div className="form-field">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <Field
                  as={InputText}
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Ingrese su contraseña"
                />
                <ErrorMessage name="password" component="small" className="error" />
              </div>

              {/* Botones del formulario */}
              <div className="login-actions">
                <Button
                  type="submit"
                  label={isSubmitting ? "Ingresando..." : "Ingresar"}
                  className="p-button-rounded p-button-primary"
                  disabled={isSubmitting}
                />

                <Button
                  type="button"
                  label="Volver al inicio"
                  className="p-button-rounded p-button-secondary"
                  onClick={() => navigate("/")}
                />
              </div>

            </Form>
          )}
        </Formik>

      </Card>
    </div>
  )
}

export default Login
