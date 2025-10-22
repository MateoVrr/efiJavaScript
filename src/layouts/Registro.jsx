import { Fragment, useRef, useState } from "react"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Toast } from "primereact/toast"
import { Dropdown } from "primereact/dropdown"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

const Registro = () => {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rol, setRol] = useState('')
    const toast = useRef(null)

    const navigate = useNavigate()

    const emailValido = email.includes('@') && email.includes('.')
    const formValido = nombre.trim() !== '' && emailValido && password.trim() !== '' && rol !== ''

    const guardarEnLocalStorage = (usuario) => {
        const existente = localStorage.getItem('usuarios')
        const lista = existente ? JSON.parse(existente) : []
        lista.push({ ...usuario, createdAt: new Date() })
        localStorage.setItem('usuarios', JSON.stringify(lista))
    }

    const confirmarGuardado = () => {
        Swal.fire({
            title: '¿Deseas registrar este usuario?',
            text: `Nombre: ${nombre || 'Sin nombre'} Email: ${email || 'Sin email'} Rol: ${rol || 'Sin rol'}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, guardar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                guardarEnLocalStorage({
                    nombre,
                    email,
                    password,
                    rol
                })

                Swal.fire({
                    icon: 'success',
                    title: 'Registro exitoso',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {navigate("/login") })
            }
        })
    }

    return (
        <Fragment>
            <Toast ref={toast} />
            <Card title="Registro de Usuario" style={{ width: '400px', margin: '20px auto' }}>
                <div className="p-fluid" style={{ display: 'grid', padding: '16px', gap: '30px' }}>
                    
                    <span className="p-float-label">
                        <InputText
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        <label htmlFor="nombre">Nombre</label>
                    </span>
                    {!nombre.trim() && <p style={{ color: 'red' }}>Debe ingresar un nombre</p>}

                    <span className="p-float-label">
                        <InputText
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email">Email</label>
                    </span>
                    {!email && !emailValido && <p style={{ color: 'red' }}>Email inválido</p>}
                    

                    <span className="p-float-label">
                        <InputText
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="password">Contraseña</label>
                    </span>
                    {!password.trim() && <p style={{ color: 'red' }}>Debe ingresar una contraseña</p>}
                    <span className="p-float-label">
                        <Dropdown
                            id="rol"
                            value={rol}
                            onChange={(e) => setRol(e.value)}
                            options={[
                                { label: "Usuario", value: "usuario" },
                                { label: "Administrador", value: "administrador" }
                            ]}
                            placeholder="Seleccione un rol"
                        />
                        <label htmlFor="rol">Rol</label>
                    </span>
                    {!rol && <p style={{ color: 'red' }}>Debe seleccionar un rol</p>}             
                    <div style={{ display: 'flex', padding: 16, gap: '10px' }}>
                        <Button
                            label="Registrarse"
                            severity="success"
                            disabled={!formValido}
                            onClick={confirmarGuardado}
                        />
                    </div>

                    <div style={{ padding: 16, gap: '10px' }}>
                        <button onClick={() => navigate("/")} style={{ color: "white" }}>Inicio</button>
                    </div>

                </div>
            </Card>
        </Fragment>
    )
}

export default Registro
