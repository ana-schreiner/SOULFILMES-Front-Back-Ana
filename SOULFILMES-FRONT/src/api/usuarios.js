import axios from "axios";

// Função para obter todos os usuários
export async function getUsuarios() {
  try {
    const response = await axios.get("http://localhost:3001/usuarios");
    return response.data;
  } catch (error) {
    console.error("Erro ao obter usuários:", error.message);
    throw error;
  }
}

// Função para adicionar um novo usuário
export async function addUsuario(data) {
  try {
    const response = await axios.post("http://localhost:3001/usuarios", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar usuário:", error.message);
    throw error;
  }
}

// Função para deletar um usuário
export async function deleteUsuario(id) {
  try {
    const response = await axios.delete(`http://localhost:3001/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar usuário:", error.message);
    throw error;
  }
}

// Função para obter um usuário específico
export async function getUsuario(id) {
  try {
    const response = await axios.get(`http://localhost:3001/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter usuário:", error.message);
    throw error;
  }
}

// Função para atualizar um usuário
export async function updateUsuario(id, data) {
  try {
    const response = await axios.put(
      `http://localhost:3001/usuarios/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error.message);
    throw error;
  }
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