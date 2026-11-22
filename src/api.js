const API_URL = "http://localhost:5000/api";

export const authAPI = {
  register: async (userData) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return res.json();
  },
  login: async (credentials) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return res.json();
  },
};

export const todosAPI = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/todos`);
    return res.json();
  },
  create: async (todoData) => {
    const res = await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todoData),
    });
    return res.json();
  },
  update: async (id, updateData) => {
    const res = await fetch(`${API_URL}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });
    return res.json();
  },
  delete: async (id) => {
    const res = await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },
};

export const usersAPI = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/users`);
    return res.json();
  },
  create: async (userData) => {
    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return res.json();
  },
};

export const postsAPI = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/posts`);
    return res.json();
  },
  create: async (postData) => {
    const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
    return res.json();
  },
  delete: async (id) => {
    const res = await fetch(`${API_URL}/posts/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },
};
