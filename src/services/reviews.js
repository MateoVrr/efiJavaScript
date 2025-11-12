const API = "http://localhost:5000";

export async function getReviews(token) {
  const res = await fetch(`${API}/reviews`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

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

export async function getReviewById(token, id) {
  const res = await fetch(`${API}/reviews/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Error al obtener la review");
  }

  return res.json();
}


export async function deleteReview(token, id) {
  const res = await fetch(`${API}/reviews/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 204) {
    return { message: "Review eliminada correctamente" };
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al eliminar review");
  }

  return res.json();
}
