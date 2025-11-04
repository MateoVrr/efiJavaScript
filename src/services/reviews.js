const API = "http://localhost:5000"; // cambiá si tu backend usa otra URL

export async function getReviews(token) {
  const res = await fetch(`${API}/reviews`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
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

export async function deleteReview(token, id) {
  const res = await fetch(`${API}/reviews/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
}
