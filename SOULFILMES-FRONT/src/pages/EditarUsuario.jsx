import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUsuario, updateUsuario } from "../api/usuarios";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-hot-toast";

function EditarUsuario() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: {
      rua: "",
      numero: "",
      cidade: "",
      uf: "",
      cep: "",
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    getUsuario(id).then((data) => {
      // Verifica se o objeto 'endereco' existe e tem todas as propriedades necessárias
      const enderecoCompleto = {
        rua: "",
        numero: "",
        cidade: "",
        uf: "",
        cep: "",
        pagamento: "",
        ...data.endereco, // Isso irá sobrescrever os valores vazios se 'endereco' existir e tiver dados
      };

      // Atualiza o estado 'usuario' com os dados do usuário e o 'endereco' completo
      setUsuario({
        ...data,
        endereco: enderecoCompleto,
      });
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in usuario.endereco) {
      setUsuario({
        ...usuario,
        endereco: { ...usuario.endereco, [name]: value },
      });
    } else {
      setUsuario({ ...usuario, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUsuario(id, usuario).then(() => {
      toast.success("Usuário atualizado com sucesso!");
      navigate("/usuarios");
    }).catch((error) => {
      // console log especificando o erro
      console.error("Erro ao atualizar o usuário:", error.response);
      toast.error("Erro ao atualizar o usuário.", error.response.data.message);
    });
  };

  return (
    <main className="mt-4 w-50 p-5 justify-content-center container">
      <h1>Editar Usuário</h1>
      <hr />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nome">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            name="nome"
            value={usuario.nome}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={usuario.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="telefone">
          <Form.Label>Telefone</Form.Label>
          <Form.Control
            type="text"
            name="telefone"
            value={usuario.telefone}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="rua">
          <Form.Label>Rua</Form.Label>
          <Form.Control
            type="text"
            name="rua"
            value={usuario.endereco.rua}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="numero">
          <Form.Label>Número</Form.Label>
          <Form.Control
            type="text"
            name="numero"
            value={usuario.endereco.numero}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="cidade">
          <Form.Label>Cidade</Form.Label>
          <Form.Control
            type="text"
            name="cidade"
            value={usuario.endereco.cidade}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="uf">
          <Form.Label>UF</Form.Label>
          <Form.Control
            type="text"
            name="uf"
            value={usuario.endereco.uf}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="cep">
          <Form.Label>CEP</Form.Label>
          <Form.Control
            type="text"
            name="cep"
            value={usuario.endereco.cep}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="pagamento">
          <Form.Label>Pagamento</Form.Label>
          <Form.Control
            as="select"
            name="pagamento"
            value={usuario.endereco.pagamento}
            onChange={handleChange}
          >
            <option value="" disabled selected>Selecione...</option>
            <option value="Boleto">Boleto</option>
            <option value="Cartão">Cartão</option>
            <option value="Pix">Pix</option>
          </Form.Control>
        </Form.Group>
        <div className="d-flex mt-2 justify-content-center">
          <Button variant="outline-dark" type="submit">
            Atualizar
          </Button>
        </div>
      </Form>
    </main>
  );
}

export default EditarUsuario;
