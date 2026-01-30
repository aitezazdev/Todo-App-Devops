import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export async function getTodos() {
  const response = await axios.get(`${API_URL}/todos`);
  return response.data;
}

export async function createTodo(todoText) {
  const response = await axios.post(`${API_URL}/create-todo`, { todoText });
  return response.data;
}

export async function updateTodo(id, todoText, completed) {
  const response = await axios.post(`${API_URL}/update-todo/${id}`, { todoText, completed });
  return response.data;
}

export async function deleteTodo(id) {
  const response = await axios.delete(`${API_URL}/delete-todo/${id}`);
  return response.data;
}
