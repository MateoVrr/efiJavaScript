const API = "http://localhost:5000";

// Obtiene todos los posts del servidor
export async function getPosts(token) {
  const res = await fetch(`${API}/posts`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
}

// Crea un nuevo post en la API
export async function createPost(token, data) {
  const res = await fetch(`${API}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

// Elimina un post según su ID
export async function deletePost(token, id) {
  const res = await fetch(`${API}/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  // Caso típico cuando la API no devuelve contenido
  if (res.status === 204) {
    return { message: "Post eliminado correctamente" };
  }

  // Manejo simple de errores
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message);
  }

  return res.json();
}

// Actualiza un post ya existente
export async function updatePost(token, id, data) {
  const res = await fetch(`${API}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}
