import { useState } from "react"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"
import { Button } from "primereact/button"
import { toast } from "react-toastify"
import { createCategoria } from "../services/categorias" 

function CrearCategoria({ onCategoriaCreada }) {
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    if (!token) {
      toast.error("No estás autenticado")
      return
    }

    if (!nombre.trim()) {
      toast.error("El nombre de la categoría es obligatorio")
      return
    }

    setLoading(true)
    try {
      const nuevaCategoria = await createCategoria(token, { nombre, descripcion })
      if (nuevaCategoria && nuevaCategoria.id) {
        toast.success("Categoría creada correctamente")
        setNombre("")
        setDescripcion("")
        if (onCategoriaCreada) onCategoriaCreada(nuevaCategoria)
      } else {
        toast.error("Error al crear la categoría")
      }
    } catch (error) {
      console.error(error)
      toast.error("Error del servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card title="Crear nueva categoría">
      <form onSubmit={handleSubmit} className="crear-categoria-form">
        <div className="form-field">
          <label>Nombre</label>
          <InputText
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre de la categoría"
          />
        </div>

        <div className="form-field">
          <label>Descripción (opcional)</label>
          <InputTextarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción de la categoría"
            rows={3}
            autoResize
          />
        </div>

        <Button
          type="submit"
          label={loading ? "Creando..." : "Crear Categoría"}
          disabled={loading}
          className="p-mt-2"
        />
      </form>
    </Card>
  )
}

export default CrearCategoria
