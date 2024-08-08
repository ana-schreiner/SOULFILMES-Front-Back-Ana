import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getUsuarios } from "../api/usuarios";
import { useEffect, useState } from "react";
import { addFilme } from "../api/filmes";
import toast from "react-hot-toast";

function NovoFilme() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);

  function salvarFilme(data) {
    addFilme(data).then((resposta) => {
      toast.success(resposta.message);
      navigate("/filmes");
    }).catch((err) => {
      console.log(err);
      toast.error("Erro ao cadastrar filme");
    });
  }

  function carregarUsuarios() {
    getUsuarios().then((dados) => {
      setUsuarios(dados);
    }).catch((err) => {
      console.log(err);
      toast.error("Erro ao carregar usuários");
    });
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <main className="mt-4 container">
      <h1>Novo Filme</h1>
      <hr />
      <form onSubmit={handleSubmit(salvarFilme)}>
        <div>
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            className="form-control"
            {...register("titulo", { required: true, maxLength: 200 })}
          />
          {errors.titulo && (
            <small className="text-danger">O título é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="genero">Gênero</label>
          <input
            type="text"
            id="genero"
            className="form-control"
            {...register("genero", { required: true, maxLength: 200 })}
          />
          {errors.genero && (
            <small className="text-danger">O gênero é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="anoLancamento">Ano de Lançamento</label>
          <input
            type="number"
            id="anoLancamento"
            className="form-control"
            {...register("anoLancamento", { required: true, valueAsNumber: true })}
          />
          {errors.anoLancamento && (
            <small className="text-danger">O ano de lançamento é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="UsuarioId">Usuário</label>
          <select
            className="form-select"
            {...register("usuarioId", { required: true, valueAsNumber: true })}
          >
            <option value="">Selecione um usuário</option>
            {usuarios.map((usuario) => {
              return (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nome} - {usuario.email}
                </option>
              );
            })}
          </select>
          {errors.usuarioId && (
            <small className="text-danger">Selecione um usuário</small>
          )}
        </div>
        <Button className="mt-3" type="submit">
          Cadastrar
        </Button>
      </form>
    </main>
  );
}

export default NovoFilme;
