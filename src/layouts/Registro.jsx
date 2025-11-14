import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Dropdown } from "primereact/dropdown"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import "../styles/Registro.css"

// Esquema de validación del formulario
const validationSchema = Yup.object({
  nombre: Yup.string()
    .min(4, "El nombre es demasiado corto")
    .required("El nombre es obligatorio"),
  email: Yup.string()
    .email("Email inválido")
    .required("El email es obligatorio"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es obligatoria"),
  role: Yup.string().required("Debes seleccionar un rol"),
})

// Opciones disponibles para elegir rol
const roles = [
  { label: "Usuario", value: "user" },
  { label: "Administrador", value: "admin" },
]

function Registro() {
  const navigate = useNavigate()

  // Envía los datos del formulario al backend
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      // Si todo sale bien, muestra alertas y redirige
      if (response.ok) {
        Swal.fire({
          title: "¡Registro exitoso!",
          text: "Tu cuenta ha sido creada correctamente",
          icon: "success",
          timer: 1800,
          showConfirmButton: false,
        })

        toast.success("Usuario registrado con éxito")
        resetForm()
        setTimeout(() => navigate("/login"), 1800)
      } else {
        // Muestra error del backend si ocurre
        const errData = await response.json().catch(() => ({}))
        toast.error(errData.message || "Error al registrar el usuario")
      }
    } catch (error) {
      // Error si el servidor no responde
      toast.error("Error al conectar con el servidor")
    }
  }

  return (
    <>
      {/* Contenedor principal del registro */}
      <div className="register-container">
        <Card className="register-card" title={<span className="register-title">Crear cuenta</span>}>

          {/* Formulario manejado con Formik */}
          <Formik
            initialValues={{
              nombre: "",
              email: "",
              password: "",
              role: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form className="register-form">
                
                {/* Campo nombre */}
                <div className="form-field">
                  <label htmlFor="name" className="form-label">Nombre</label>
                  <Field
                    as={InputText}
                    id="name"
                    name="nombre"
                    placeholder="Tu nombre completo"
                    className="form-input"
                  />
                  <ErrorMessage name="nombre" component="small" className="error" />
                </div>

                {/* Campo email */}
                <div className="form-field">
                  <label htmlFor="email" className="form-label">Email</label>
                  <Field
                    as={InputText}
                    id="email"
                    name="email"
                    placeholder="tu@email.com"
                    className="form-input"
                  />
                  <ErrorMessage name="email" component="small" className="error" />
                </div>

                {/* Campo contraseña */}
                <div className="form-field">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <Field
                    as={InputText}
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Ingrese su contraseña"
                    className="form-input"
                  />
                  <ErrorMessage name="password" component="small" className="error" />
                </div>

                {/* Selector de rol */}
                <div className="form-field">
                  <label htmlFor="role" className="form-label">Rol</label>
                  <Dropdown
                    id="role"
                    value={values.role}
                    options={roles}
                    onChange={(e) => setFieldValue("role", e.value)}
                    placeholder="Selecciona un rol"
                    className="form-dropdown"
                  />
                  <ErrorMessage name="role" component="small" className="error" />
                </div>

                {/* Botones de acción */}
                <div className="register-actions">
                  <Button
                    type="submit"
                    label={isSubmitting ? "Registrando..." : "Registrarse"}
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
    </>
  )
}

export default Registro
