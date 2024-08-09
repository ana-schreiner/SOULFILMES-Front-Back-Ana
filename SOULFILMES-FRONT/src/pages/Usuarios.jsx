import { useState, useEffect } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteUsuario, getUsuarios } from "../api/usuarios";
import UsuarioDetalhes from "./UsuarioDetalhes"; // Importar o componente
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faFilm } from "@fortawesome/free-solid-svg-icons";

function Usuarios() {
  const [usuarios, setUsuarios] = useState(null);
  const [selectedUsuarioId, setSelectedUsuarioId] = useState(null); // Estado para armazenar o usuário selecionado
  const [showModal, setShowModal] = useState(false); // Estado para controlar a exibição do modal

  function carregarUsuarios() {
    getUsuarios()
      .then((dados) => {
        const usuariosEndereco = dados.map((usuario) => {
          const endereco = usuario.endereco || {};
          return {
            ...usuario,
            cidade: endereco.cidade || "Cidade não informada",
            uf: endereco.uf || "UF não informada",
            cep: endereco.cep || "CEP não informado",
            rua: endereco.rua || "Rua não informada",
            numero: endereco.numero || "Número não informado",
            pagamento: endereco.pagamento || "Pagamento não informado",
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
          // Atualiza a lista de usuários sem recarregar todos os dados
          setUsuarios(usuarios.filter(usuario => usuario.id !== id));
        })
        .catch((err) => {
          toast.error("Erro ao excluir usuário.");
          console.log(err);
        });
    }
  }


  // Função para abrir o modal e definir o usuário selecionado
  const mostrarFilmes = (usuarioId) => {
    setSelectedUsuarioId(usuarioId);
    setShowModal(true);
  };

  function cleanSelectedUsuario() {
    setSelectedUsuarioId(null);
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (      
    <main className='mt-4 mb-4 container rounded bg-main'>
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
                <th>Filmes Assistidos</th>
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
                  <td className="d-flex justify-content-start">
                    <Button
                      variant='outline-danger'

                      className="me-2"

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
                      className="me-3"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button
                      variant='outline-dark'
                      className='ms-3'
                      size='sm'
                      onClick={() => mostrarFilmes(usuario.id)} // Chamando a função para mostrar o modal
                    >
                      <FontAwesomeIcon icon={faFilm} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* Renderizando o modal de filmes usando o componente UsuarioDetalhes */}
          {selectedUsuarioId && (
            <UsuarioDetalhes
              cleanSelectedUsuario={cleanSelectedUsuario}
              usuarioId={selectedUsuarioId}
              showModal={showModal}
              setShowModal={setShowModal}
              atualizarListaUsuarios={carregarUsuarios} // Passando a função para atualizar a lista de usuários
            />
          )}
        </>
      ) : (
        <Loader />
      )}
    </main>
  );
}

export default Usuarios;
