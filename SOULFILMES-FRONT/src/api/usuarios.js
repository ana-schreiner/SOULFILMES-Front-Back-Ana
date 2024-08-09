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

// Função para obter os usuários associados a um filme específico
export async function getUsuariosDoFilme(filmeId) {
  try {
    const response = await axios.get(
      `http://localhost:3001/filmes/${filmeId}/usuarios`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao obter usuários do filme:", error.message);
    throw error;
  }
}
