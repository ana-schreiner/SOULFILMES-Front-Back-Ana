
import { Button, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteUsuario, getUsuarios } from "../api/usuarios";
import { getFilmesDoUsuario } from "../api/filmes"; // Importar a função para obter filmes
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faFilm } from '@fortawesome/free-solid-svg-icons';

function Usuarios() {
  const [usuarios, setUsuarios] = useState(null);
  const [filmes, setFilmes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  function carregarUsuarios() {
    getUsuarios()
      .then((dados) => {
        const usuariosEndereco = dados.map((usuario) => {
          // Verifica se o endereço não é nulo antes de acessar suas propriedades
          const endereco = usuario.endereco || {};
          return {
            ...usuario,
            cidade: endereco.cidade || 'Cidade não informada',
            uf: endereco.uf || 'UF não informada',
            cep: endereco.cep || 'CEP não informado',
            rua: endereco.rua || 'Rua não informada',
            numero: endereco.numero || 'Número não informado',
            pagamento: endereco.pagamento || 'Pagamento não informado',
          };
        });
        setUsuarios(usuariosEndereco);
      })
      .catch((err) => {
        toast.error("Erro ao carregar usuários.");
        console.log(err);
      });
  }

  function deletarUsuario(id) {
    const deletar = window.confirm("Tem certeza que deseja excluir?");
    if (deletar) {
      deleteUsuario(id)
        .then((resposta) => {
          toast.success(resposta.message);
          carregarUsuarios();
        })
        .catch((err) => {
          toast.error("Erro ao excluir usuário.");
          console.log(err);
        });
    }
  }

  const carregarFilmes = async (usuarioId) => {
    try {
      const filmesData = await getFilmesDoUsuario(usuarioId);
      setFilmes(filmesData);
      setShowModal(true);
    } catch (error) {
      console.error("Erro ao carregar os filmes do usuário:", error);
      toast.error(
        "Erro ao carregar filmes. Verifique se o usuário possui filmes associados."
      );
    }
  };
  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <main className='mt-4 container'>
      <h1>Usuários</h1>
      <Button variant='outline-dark' as={Link} to='/usuarios/novo'>
        Adicionar Usuário
      </Button>
      <hr />
      {usuarios ? (
        <>
          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Cidade</th>
                <th>UF</th>
                <th>CEP</th>
                <th>Rua</th>
                <th>Número</th>
                <th>Pagamento</th>
                <th>Ações</th>
                <th>Filmes</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.nome}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.telefone}</td>
                  <td>{usuario.cidade}</td>
                  <td>{usuario.uf}</td>
                  <td>{usuario.cep}</td>
                  <td>{usuario.rua}</td>
                  <td>{usuario.numero}</td>
                  <td>{usuario.pagamento}</td>
                  <td>
                    <Button
                      variant='outline-danger'
                      className="me-3"
                      size='sm'
                      onClick={() => deletarUsuario(usuario.id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                    <Button
                      variant='outline-dark'
                      size='sm'
                      as={Link}
                      to={`/usuarios/editar/${usuario.id}`}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant='outline-dark'
                      className="ms-3"
                      size='sm'
                      onClick={() => carregarFilmes(usuario.id)}
                    >
                      <FontAwesomeIcon icon={faFilm} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Filmes do Usuário</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {filmes.length > 0 ? (
                <Table striped bordered hover>
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
                        <td>{filme.anoLancamento}</td>
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

export default Usuarios;
