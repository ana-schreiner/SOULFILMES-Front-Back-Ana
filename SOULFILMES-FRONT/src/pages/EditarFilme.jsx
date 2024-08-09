import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getFilme, updateFilme } from "../api/filmes";
import toast from "react-hot-toast";

function EditarFilme() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const { id } = useParams();

  function atualizarFilme(data) {
    if (data.anoLancamento === "") data.anoLancamento = null;
    updateFilme(id, data)
      .then((resposta) => {
        toast.success(resposta.message);
        navigate("/filmes");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  function carregarFilme() {
    getFilme(id)
      .then((dados) => {
        reset(dados);
      })
      .catch((err) => {
        navigate("/filmes", err);
      });
  }

  useEffect(() => {
    carregarFilme();
  }, []);

  return (
    <main className='mt-4 container'>
      <h1>Editar filme</h1>
      <hr />
      <form onSubmit={handleSubmit(atualizarFilme)}>
        <div>
          <label htmlFor='titulo'>titulo</label>
          <input
            type='text'
            id='titulo'
            className='form-control'
            {...register("titulo", { required: true, maxLength: 200 })}
          />
          {errors.titulo && (
            <small className='text-danger'>O titulo é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor='diretor'>diretor</label>
          <input
            type='text'
            id='diretor'
            className='form-control'
            {...register("diretor", { required: true, maxLength: 200 })}
          />
          {errors.diretor && (
            <small className='text-danger'>O diretor é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor='genero'>genero</label>
          <input
            type='text'
            id='genero'
            className='form-control'
            {...register("genero", { required: true, maxLength: 200 })}
          />
          {errors.genero && (
            <small className='text-danger'>O genero é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor='anoLancamento'>Ano de Lançamento</label>
          <input
            type='number'
            id='anoLancamento'
            className='form-control'
            {...register("anoLancamento", { required: false })}
          />
          {errors.anoLancamento && (
            <small className='text-danger'>O ano é inválido!</small>
          )}
        </div>
        <Button className='mt-3' type='submit'>
          Atualizar
        </Button>
      </form>
    </main>
  );
}

export default EditarFilme;
