import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { toast, ToastContainer } from "react-toastify"
import { useNavigate } from "react-router-dom"
import "../styles/Login.css"


const validationSchema = Yup.object({
    email: Yup.string().email('Email invalido').required('El email es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria')  
})

export default function Login() {

    const navigate = useNavigate()

    const handleSubmit = async (values, {resetForm}) => {
        try {
            // 🔹 Simulación de API (por ahora sin backend)
            // Cuando tengas tu API, reemplaza la URL y lógica
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            })

            // 🔹 Simulación de respuesta con JWT si no hay API
            // const data = { token: "jwt-de-prueba-12345" }
            // localStorage.setItem("token", data.token)

            if(response.ok) {
                const data = await response.json()
                // Guardar el JWT en localStorage
                localStorage.setItem("token", data.token)
                toast.success("Login exitoso")
                resetForm()
                setTimeout(() => navigate('/'), 1500)
            } else {
                toast.error("Usuario o contraseña incorrectos")
            }

        } catch(error) {
            toast.error("Error de conexión con el servidor")
        }
    }

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <ToastContainer position='top-right' autoClose={3000} />
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
            {({ isSubmitting }) => (
                <Form className="login-form">
                    <div className="form-field">
                        <label>Email</label>
                        <Field as={InputText} name="email" id="email" />
                        <ErrorMessage name="email" component="small" className="error" />
                    </div>

                    <div className="form-field">
                        <label>Contraseña</label>
                        <Field as={InputText} type="password" name="password" id="password" />
                        <ErrorMessage name="password" component="small" className="error" />
                    </div>

                    <Button type="submit" label={isSubmitting ? "Ingresando..." : "Ingresar"} />
                </Form>
            )}
            </Formik>
        </div>
    )
}
