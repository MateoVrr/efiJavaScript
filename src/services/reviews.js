const API = "http://localhost:5000";

// Trae todas las reviews del servidor
export async function getReviews(token) {
  const res = await fetch(`${API}/reviews`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

// Crea una nueva review en la API
export async function createReview(token, data) {
  const res = await fetch(`${API}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

// Actualiza una review existente
export async function updateReview(token, id, data) {
  const res = await fetch(`${API}/reviews/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

// Obtiene una review puntual por su ID
export async function getReviewById(token, id) {
  const res = await fetch(`${API}/reviews/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Error al obtener la review");
  }

  return res.json();
}

// Elimina una review por su ID
export async function deleteReview(token, id) {
  const res = await fetch(`${API}/reviews/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // Caso cuando la API responde sin contenido
  if (res.status === 204) {
    return { message: "Review eliminada correctamente" };
  }

  // Manejo básico de errores
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al eliminar review");
  }

  return res.json();
}
