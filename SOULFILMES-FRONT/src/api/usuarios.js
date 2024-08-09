// Este arquivo possui funções para realizar
// as operações do CRUD de usuarios
import axios from "axios";

export async function getUsuarios() {
  try {
    const response = await axios.get("http://localhost:3001/usuarios");
    return response.data;
  } catch (error) {
    // Aqui você pode lidar com o erro, por exemplo, registrando-o ou exibindo uma mensagem ao usuário
    console.error("Erro ao obter usuários:", error);
    throw error; // Re-lança o erro para ser tratado onde a função é chamada
  }
}

export async function addUsuario(data) {
  // O 2º parâmetro do post é corpo da requisição
  const response = await axios.post("http://localhost:3001/usuarios", data);
  return response.data;
}

export async function deleteUsuario(id) {
  const response = await axios.delete(`http://localhost:3001/usuarios/${id}`);
  return response.data;
}

export async function getUsuario(id) {
  const response = await axios.get(`http://localhost:3001/usuarios/${id}`);
  return response.data;
}

export async function updateUsuario(id, data) {
  const response = await axios.put(`http://localhost:3001/usuarios/${id}`, data);
  return response.data;
}


// Função para associar um filme a um usuário
export async function addFilmeAoUsuario(usuarioId, filmeId) {
  try {
    const response = await axios.post(`http://localhost:3001/usuarios/${usuarioId}/filmes/${filmeId}`);
    return response.data; // Objeto com mensagem de sucesso
  } catch (error) {
    console.error("Erro ao associar filme ao usuário:", error.response?.data || error.message);
    throw error;
  }
}


// Função para desassociar um filme de um usuário específico
export async function removeFilmeDoUsuario(usuarioId, filmeId) {
  try {
    const response = await axios.delete(`http://localhost:3001/usuarios/${usuarioId}/filmes/${filmeId}`);
    return response.data; // Objeto com message ou status
  } catch (error) {
    console.error("Erro ao desassociar filme do usuário:", error.response.data);
    throw error;
  }
}