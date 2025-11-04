const API = "http://localhost:5000"; // cambiá la URL según tu backend

export async function getPosts(token) {
  const res = await fetch(`${API}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
}

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

export async function deletePost(token, id) {
  const res = await fetch(`${API}/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
}
