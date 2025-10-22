import { Fragment, useRef, useState } from "react"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Toast } from "primereact/toast"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const toast = useRef(null)

    const navigate = useNavigate()

    const emailValido = email.includes('@') && email.includes('.')
    const formValido = emailValido && password.trim() !== ''

    const manejarLogin = () => {
        const data = localStorage.getItem('usuarios')
        const lista = data ? JSON.parse(data) : []

        const usuarioEncontrado = lista.find(
            (u) => u.email === email && u.password === password
        )

        if (usuarioEncontrado) {
            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                text: `Bienvenido ${usuarioEncontrado.nombre}!`,
                showConfirmButton: false,
                timer: 1500
            }).then(() => navigate("/"))
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error de inicio de sesión',
                text: 'Email o contraseña incorrectos'
            })
        }
    }

    return (
        <Fragment>
            <Toast ref={toast} />
            <Card title="Inicio de Sesión" style={{ width: '400px', margin: '20px auto' }}>
                <div className="p-fluid" style={{ display: 'grid', padding: '16px', gap: '30px' }}>
                    
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

                    <div style={{ display: 'flex', padding: 16, gap: '10px' }}>
                        <Button
                            label="Iniciar Sesión"
                            severity="success"
                            disabled={!formValido}
                            onClick={manejarLogin}
                        />
                    </div>

                    <div style={{ padding: 16, gap: '10px' }}>
                        <button onClick={() => navigate("/")} style={{ color: "white" }}>
                            Inicio
                        </button>
                    </div>
                </div>
            </Card>
        </Fragment>
    )
}

export default Login
