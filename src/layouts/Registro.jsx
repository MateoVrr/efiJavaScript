import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Fragment, useRef, useState } from "react"
import * as Yup from 'yup'
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { toast } from "react-toastify"
import { Dropdown } from "primereact/dropdown"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import '../styles/Registro.css'

const validationSchema = Yup.object({
    name: Yup.string().required('El nombre es obligatorio'),
    email: Yup.string().email('Email invalido').required('El email es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria'),
    role: Yup.string().required('Debes seleccionar un rol')  
})

const roles = [
    { label: 'Usuario', value: 'usuario' },
    { label: 'Administrador', value: 'admin' }
]

function Registro(){

    const navigate = useNavigate()

    const handleSubmit = async (values, {resetForm}) => {
        try {
            const response = await fetch('http://localhost:5000/register',{
                method:'POST',
                headers:{ "Content-Type": "application/json"},
                body: JSON.stringify(values)
            })
            if  (response.ok) {
                toast.success("Usuario registrado con exito")
                resetForm()
                setTimeout(() => navigate('/'), 2000)
            } else {
                toast.error("Hubo un error al registrar el usuario")
            }   
        } catch (error) {
            toast.error("hubo un error con el servidor", error)
        }
    }

    return(
        <div className='register-container'>
            <h2>Crear cuenta</h2>
            <Formik 
                initialValues={{name: '', email: '', password: '', role: ''}}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
            {({ isSubmitting, setFieldValue, values }) => (
                <Form className='register-form'>
                    <div className='form-field'>
                        <label>Nombre</label>
                        <Field as={InputText} id='name' name='name'/>
                        <ErrorMessage name='name' component={'small'} className='error'/>
                    </div>
                    <div className='form-field'>
                        <label>Email</label>
                        <Field as={InputText} id='email' name='email'/>
                        <ErrorMessage name='email' component={'small'} className='error'/>
                    </div>
                    <div className='form-field'>
                        <label>Contraseña</label>
                        <Field as={InputText} id='password' name='password'/>
                        <ErrorMessage name='password' component={'small'} className='error'/>
                    </div>
                    <div className='form-field'>
                        <label>Rol</label>
                        <Dropdown
                            value={values.role}
                            options={roles}
                            onChange={(e) => setFieldValue('role', e.value)}
                            placeholder="Selecciona un rol"
                        />
                        <ErrorMessage name='role' component={'small'} className='error'/>
                    </div>

                    <Button type='submit' label={ isSubmitting ? "Registrando..." : 'Registrarse'} />
                    <button type="button" onClick={() => navigate("/")} style={{ color: "white" }}>Volver al Inicio</button>
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default Registro