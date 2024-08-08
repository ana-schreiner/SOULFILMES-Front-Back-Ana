import axios from "axios";

export async function getFilmes() {
  const response = await axios.get("http://localhost:3001/filmes");
  return response.data; // Array de filmes
}

export async function getFilme(id) {
  const response = await axios.get(`http://localhost:3001/filmes/${id}`);
  return response.data; // Objeto do Filme
}

export async function addFilme(data) {
  const response = await axios.post("http://localhost:3001/filmes", data);
  return response.data; // Objeto com message
}

export async function updateFilme(id, data) {
  const response = await axios.put(`http://localhost:3001/filmes/${id}`, data);
  return response.data; // Objeto com message
}

export async function deleteFilme(id) {
  const response = await axios.delete(`http://localhost:3001/filmes/${id}`);
  return response.data; // Objeto com message
}

// Função para obter filmes associados a um usuário específico
export async function getFilmesDoUsuario(usuarioId) {
    try {
      const response = await axios.get(`/usuarios/${usuarioId}/filmes`); // Ajustar a URL se necessário
      return response.data;
    } catch (error) {
      console.error("Erro ao obter filmes do usuário:", error.response.data);
      throw error;
    }
  }
