import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";

const validationSchema = Yup.object({
  email: Yup.string().email("Email inválido").required("El email es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
});

export default function Login() {
  const navigate = useNavigate();
  const { saveToken } = useAuth();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        saveToken(data.access_token);
        toast.success("Login exitoso");
        resetForm();
        setTimeout(() => navigate("/"), 1500);
      } else {
        toast.error("Usuario o contraseña incorrectos");
      }
    } catch {
      toast.error("Error de conexión con el servidor");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="login-form">
            <div className="form-field">
              <label>Email</label>
              <Field as={InputText} name="email" />
              <ErrorMessage name="email" component="small" className="error" />
            </div>

            <div className="form-field">
              <label>Contraseña</label>
              <Field as={InputText} type="password" name="password" />
              <ErrorMessage name="password" component="small" className="error" />
            </div>

            <Button type="submit" label={isSubmitting ? "Ingresando..." : "Ingresar"} />
          </Form>
        )}
      </Formik>
    </div>
  );
}
