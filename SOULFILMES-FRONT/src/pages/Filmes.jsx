import { useEffect, useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteFilme, getFilmes, getUsuariosDoFilme } from "../api/filmes";
import {  } from "../api/usuarios";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";


function Filmes() {
  const [filmes, setFilmes] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Função para carregar filmes
  function carregarFilmes() {
    getFilmes()
      .then((dados) => {
        setFilmes(dados);
      })
      .catch((err) => {
        toast.error("Erro ao carregar filmes.");
        console.log(err);
      });
  }

  // Função para deletar filme
  function deletarFilme(id) {
    const deletar = window.confirm("Tem certeza que deseja excluir?");
    if (deletar) {
      deleteFilme(id)
        .then((resposta) => {
          toast.success(resposta.message);
          carregarFilmes();
        })
        .catch((err) => {
          toast.error("Erro ao excluir filme.");
          console.log(err);
        });
    }
  }

  // Função para carregar usuários que assistiram a um filme
  const carregarUsuarios = async (filmeId) => {
    try {
      const usuariosData = await getUsuariosDoFilme(filmeId);
      setUsuarios(usuariosData);
      setShowModal(true);
    } catch (error) {
      console.error("Erro ao carregar os usuários do filme:", error);
      toast.error(
        "Erro ao carregar usuários. Verifique se o filme possui usuários associados."
      );
    }
  };

  // Carregar filmes ao montar o componente
  useEffect(() => {
    carregarFilmes();
  }, []);

  return (
    <main className='mt-4 container'>
      <h1>Filmes</h1>

      <Button variant='outline-dark' as={Link} to="/filmes/novo">
        Adicionar filme
      </Button>
      <hr />
      {filmes ? (
        <>
          <Table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Diretor</th>
                <th>Gênero</th>
                <th>Ano de Lançamento</th>
                <th>Ações</th>
                <th>Usuários</th>
              </tr>
            </thead>
            <tbody>
              {filmes.map((filme) => (
                <tr key={filme.id}>
                  <td>{filme.titulo}</td>
                  <td>{filme.diretor}</td>
                  <td>{filme.genero}</td>
                  <td>{filme.anoLancamento}</td>
                  <td>

                    <Button 
                    variant='outline-danger'
                    className="me-2"
                    size='sm' 
                    onClick={() => deletarFilme(filme.id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>

                    <Button 
                    variant='outline-dark'
                    size="sm" 
                    as={Link} 
                    to={`/filmes/editar/${filme.id}`}
                    >
                      <FontAwesomeIcon icon={faEdit}/>

                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Usuários que Assistiram</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {usuarios.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>E-mail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((usuario) => (
                      <tr key={usuario.id}>
                        <td>{usuario.nome}</td>
                        <td>{usuario.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>Não há usuários associados a este filme.</p>
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

export default Filmes;
