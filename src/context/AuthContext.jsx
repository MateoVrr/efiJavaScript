import React, { createContext, useContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"))
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

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
  }

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
