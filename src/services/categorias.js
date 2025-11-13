const API = "http://localhost:5000";

// Obtener todas las categorías
export async function getCategorias(token) {
  const res = await fetch(`${API}/categories`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error("Error al obtener categorías")
  return res.json()
}

// Crear una categoría (solo admin)
export async function createCategoria(token, data) {
  const res = await fetch(`${API}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Error al crear categoría")
  return res.json()
}

// Actualizar categoría (solo admin)
export async function updateCategoria(token, id, data) {
  const res = await fetch(`${API}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Error al actualizar categoría")
  return res.json()
}

// Eliminar categoría (solo admin)
export async function deleteCategoria(token, id) {
  const res = await fetch(`${API}/categories/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  if (res.status === 204) return { message: "Categoría eliminada correctamente" }
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || "Error al eliminar categoría")
  }
  return res.json()
}
