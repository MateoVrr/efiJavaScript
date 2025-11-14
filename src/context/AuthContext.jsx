import { createContext, useContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  // Guarda el token y los datos del usuario
  const [token, setToken] = useState(localStorage.getItem("token"))

  // Inicializa el usuario si hay un token guardado
  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem("token")
    if (!storedToken) return null
    try {
      const decoded = jwtDecode(storedToken)
      return {
        nombre: decoded.nombre,
        email: decoded.email,
        role: decoded.role,
        exp: decoded.exp,
        id: decoded.id
      }
    } catch {
      return null
    }
  })

  // Guarda el token nuevo y actualiza la información del usuario
  const saveToken = (newToken) => {
    localStorage.setItem("token", newToken)
    setToken(newToken)
    const decoded = jwtDecode(newToken)
    setUser({
      nombre: decoded.nombre,
      email: decoded.email,
      role: decoded.role,
      exp: decoded.exp,
      id: decoded.id
    })
  }

  // Elimina los datos de sesión
  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
  }

  // Verifica que el token siga siendo válido
  useEffect(() => {
    if (!token) return
    try {
      const decoded = jwtDecode(token)
      if (decoded.exp < Math.floor(Date.now() / 1000)) logout()
    } catch {
      logout()
    }
  }, [token])

  return (
    <AuthContext.Provider value={{ token, user, saveToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
