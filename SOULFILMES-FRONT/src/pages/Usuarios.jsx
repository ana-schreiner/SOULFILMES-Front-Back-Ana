import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteUsuario, getUsuarios } from "../api/usuarios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

function Usuarios() {
  const [usuarios, setUsuarios] = useState(null);

  function carregarUsuarios() {
    getUsuarios().then((dados) => {
      const usuariosEndereco = dados.map((usuario) => {
        return {
          ...usuario,
          cidade: usuario.endereco.cidade,
          uf: usuario.endereco.uf,
          cep: usuario.endereco.cep,
          rua: usuario.endereco.rua,
          numero: usuario.endereco.numero,
        };
      });
      setUsuarios(usuariosEndereco);
    }).catch((err) => {
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

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <main className="mt-4 container">
      <h1>Usuários</h1>
      <Button as={Link} to="/usuarios/novo">
        Adicionar Usuário
      </Button>
      <hr />
      {usuarios ? (
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
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => {
              return (
                <tr key={usuario.id}>
                  <td>{usuario.nome}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.telefone}</td>
                  <td>{usuario.cidade}</td>
                  <td>{usuario.uf}</td>
                  <td>{usuario.cep}</td>
                  <td>{usuario.rua}</td>
                  <td>{usuario.numero}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => deletarUsuario(usuario.id)}>
                      Excluir
                    </Button>
                    <Button size="sm" as={Link} to={`/usuarios/editar/${usuario.id}`}>
                      Editar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <Loader />
      )}
    </main>
  );
}

export default Usuarios;
