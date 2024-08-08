import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUsuario } from "../api/usuarios";
import { getFilmesDoUsuario } from "../api/filmes";
import { Table, Button, Modal } from "react-bootstrap";
import Loader from "../components/Loader";

function UsuarioDetalhes() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [filmes, setFilmes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getUsuario(id)
      .then((data) => {
        setUsuario(data);
      })
      .catch((error) => {
        console.error("Erro ao carregar o usuário:", error);
      });
  }, [id]);

  const carregarFilmes = () => {
    getFilmesDoUsuario(id)
      .then((data) => {
        setFilmes(data);
        setShowModal(true);
      })
      .catch((error) => {
        console.error("Erro ao carregar os filmes do usuário:", error);
      });
  };

  return (
    <main className='container mt-4'>
      <h1>Detalhes do Usuário</h1>
      {usuario ? (
        <>
          <div>
            <h2>{usuario.nome}</h2>
            <p>Email: {usuario.email}</p>
            <p>Telefone: {usuario.telefone}</p>
            <p>Rua: {usuario.endereco?.rua}</p>
            <p>Número: {usuario.endereco?.numero}</p>
            <p>Cidade: {usuario.endereco?.cidade}</p>
            <p>UF: {usuario.endereco?.uf}</p>
            <p>CEP: {usuario.endereco?.cep}</p>
            <Button onClick={carregarFilmes}>Mostrar Filmes</Button>
          </div>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Filmes do Usuário</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {filmes.length > 0 ? (
                <Table>
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Gênero</th>
                      <th>Ano</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filmes.map((filme) => (
                      <tr key={filme.id}>
                        <td>{filme.titulo}</td>
                        <td>{filme.genero}</td>
                        <td>{filme.ano}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>Não há filmes associados a este usuário.</p>
              )}
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <Loader />
      )}
    </main>
  );
}

export default UsuarioDetalhes;
