import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addUsuario } from "../api/usuarios";
import toast from "react-hot-toast";

function NovoUsuario() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  function salvarUsuario(dadosForm) {
    // Estrutura os dados do endereço em um objeto aninhado
    const dadosUsuario = {
      nome: dadosForm.nome,
      email: dadosForm.email,
      telefone: dadosForm.telefone,
      endereco: {
        cidade: dadosForm.cidade,
        uf: dadosForm.uf,
        cep: dadosForm.cep,
        rua: dadosForm.rua,
        numero: dadosForm.numero,
        pagamento: dadosForm.pagamento,
      },
    };

    addUsuario(dadosUsuario).then((resposta) => {
      toast.success(resposta.message);
      navigate("/usuarios");
    }).catch((err) => {
      toast.error(err.response.data.message);
    });
  }


  return (
    <main className="mt-4 mb-4 w-50 p-5 justify-content-center container rounded bg-main">
      <h1>Novo Usuário</h1>
      <hr />
      <Form onSubmit={handleSubmit(salvarUsuario)}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            className="form-control"
            {...register("nome", { required: true, maxLength: 200 })}
          />
          {errors.nome && (
            <small className="text-danger">O nome é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            {...register("email", { required: true, maxLength: 200 })}
          />
          {errors.email && (
            <small className="text-danger">O email é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="telefone">Telefone</label>
          <input
            type="tel"
            id="telefone"
            className="form-control"
            {...register("telefone", { required: true, maxLength: 15 })}
          />
          {errors.telefone && (
            <small className="text-danger">O telefone é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="cidade">Cidade</label>
          <input
            type="text"
            id="cidade"
            className="form-control"
            {...register("cidade", { required: true, maxLength: 100 })}
          />
          {errors.cidade && (
            <small className="text-danger">A cidade é inválida!</small>
          )}
        </div>
        <div>
          <label htmlFor="uf">UF</label>
          <input
            type="text"
            id="uf"
            className="form-control"
            {...register("uf", { required: true, maxLength: 2 })}
          />
          {errors.uf && (
            <small className="text-danger">A UF é inválida!</small>
          )}
        </div>
        <div>
          <label htmlFor="cep">CEP</label>
          <input
            type="text"
            id="cep"
            className="form-control"
            {...register("cep", { required: true, maxLength: 8 })}
          />
          {errors.cep && (
            <small className="text-danger">O CEP é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="rua">Rua</label>
          <input
            type="text"
            id="rua"
            className="form-control"
            {...register("rua", { required: true, maxLength: 200 })}
          />
          {errors.rua && (
            <small className="text-danger">A rua é inválida!</small>
          )}
        </div>
        <div>
          <label htmlFor="numero">Número</label>
          <input
            type="text"
            id="numero"
            className="form-control"
            {...register("numero", { required: true, maxLength: 10 })}
          />
          {errors.numero && (
            <small className="text-danger">O número é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="pagamento">Forma de pagamento</label>
          <select
            id="pagamento"
            className="form-control"
            {...register("pagamento", { required: true })}
          >
            <option value="" disabled>Selecione</option>
            <option value="boleto">Boleto</option>
            <option value="cartao">Cartão</option>
            <option value="pix">Pix</option>
          </select>
          {errors.pagamento && (
            <small className="text-danger">A forma de pagamento é inválida!</small>
          )}
          </div>
        <div className="d-flex mt-2 justify-content-center">
          <Button variant="outline-dark" type="submit">
            Cadastrar
          </Button>
        </div>
      </Form>
    </main>
  );
}

export default NovoUsuario;
