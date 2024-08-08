import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

  useEffect(() => {
    getUsuario(id).then((data) => {
      setUsuario(data);
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
    }).catch((error) => {
      toast.error("Erro ao atualizar o usuário.");
    });
  };

  return (
    <main className="container mt-4">
      <h1>Editar Usuário</h1>
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
        <Button type="submit">Salvar</Button>
      </Form>
    </main>
  );
}

export default EditarUsuario;
