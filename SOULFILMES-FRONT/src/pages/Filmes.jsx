import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteFilme, getFilmes } from "../api/filmes";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function Filmes() {
  const [filmes, setFilmes] = useState(null);

  function carregarFilmes() {
    getFilmes().then((dados) => {
      setFilmes(dados);
    });
  }

  function deletarFilme(id) {
    const deletar = confirm("Tem certeza que deseja excluir?");

    if (deletar) {
      deleteFilme(id).then((resposta) => {
        toast.success(resposta.message);
        carregarFilmes();
      });
    }
  }

  useEffect(() => {
    carregarFilmes();
  }, []);

  return (
    <main className="mt-4 container">
      <h1>Filmes</h1>
      <Button variant='outline-dark' as={Link} to="/filmes/novo">
        Adicionar filme
      </Button>
      <hr />
      {filmes ? (
        <Table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Diretor</th>
              <th>Gênero</th>
              <th>Ano de lançamento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filmes.map((filme) => {
              return (
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
                      <FontAwesomeIcon icon={faEdit} />
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

export default Filmes;
