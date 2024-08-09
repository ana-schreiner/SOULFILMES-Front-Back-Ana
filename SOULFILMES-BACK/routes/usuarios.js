import { Usuario } from "../models/usuario.js";
import { Endereco } from "../models/endereco.js";
import { Filme } from "../models/filme.js";
import { Router } from "express";

export const usuarioRouter = Router();

// Rota para listar todos os usuários
usuarioRouter.get("/usuarios", async (req, res) => {
  try {
    const listaUsuario = await Usuario.findAll({
      include: [Endereco],
    });
    res.json(listaUsuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao listar usuários!" });
  }
});

// Rota para listar um usuário específico
usuarioRouter.get("/usuarios/:id", async (req, res) => {
  try {
    const usuarioEncontrado = await Usuario.findOne({
      where: { id: req.params.id },
      include: [Endereco],
    });

    if (usuarioEncontrado) {
      res.json(usuarioEncontrado);
    } else {
      res.status(404).json({ message: "Usuário não encontrado!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar usuário!" });
  }
});

// Rota para inserir um usuário
usuarioRouter.post("/usuarios", async (req, res) => {
  const { nome, email, telefone, endereco } = req.body;

  try {
    const novoUsuario = await Usuario.create(
      {
        nome,
        email,
        telefone,
        Endereco: endereco,
      },
      {
        include: [Endereco],
      }
    );

    res
      .status(201)
      .json({ message: "Usuário inserido com sucesso!", usuario: novoUsuario });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Erro ao inserir o usuário!" });
  }
});

// Rota para atualizar um usuário
usuarioRouter.put("/usuarios/:id", async (req, res) => {
  const idUsuario = req.params.id;
  const { nome, email, telefone, endereco } = req.body;

  try {
    const usuarioAtualizado = await Usuario.findOne({
      where: { id: idUsuario },
      include: [Endereco],
    });

    if (usuarioAtualizado) {
      await usuarioAtualizado.update({ nome, email, telefone });

      let enderecoAtualizado = await Endereco.findOne({
        where: { usuarioId: idUsuario },
      });

      if (enderecoAtualizado) {
        await enderecoAtualizado.update(endereco);
      } else {
        await Endereco.create({ ...endereco, usuarioId: idUsuario });
      }

      res.json({ message: "Usuário atualizado com sucesso!" });
    } else {
      res.status(404).json({ message: "Usuário não encontrado!" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erro ao atualizar o usuário!", error: err.message });
  }
});

// Rota para deletar um usuário
usuarioRouter.delete("/usuarios/:id", async (req, res) => {
  const idUsuario = req.params.id;

  try {
    const usuarioDeletado = await Usuario.findOne({ where: { id: idUsuario } });

    if (usuarioDeletado) {
      await usuarioDeletado.destroy();
      res.json({ message: "Usuário deletado com sucesso!" });
    } else {
      res.status(404).json({ message: "Usuário não encontrado!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao deletar o usuário!" });
  }
});

// Rota para adicionar um filme assistido pelo usuário
usuarioRouter.post("/usuarios/:usuarioId/filmes/:filmeId", async (req, res) => {
  const { usuarioId, filmeId } = req.params;

  try {
    const usuario = await Usuario.findByPk(usuarioId);
    const filme = await Filme.findByPk(filmeId);
    const filmes = await usuario.getFilmes();

    if (!usuario || !filme) {
      return res.status(404).json({ message: "Usuário ou Filme não encontrado!" });
    } else if (filmes.some(f => f.id === filme.id)) {
      return res.status(400).json({ message: "Filme já adicionado ao usuário!" });
    } else {
      await usuario.addFilme(filme);
      return res.status(200).json({ message: "Filme adicionado ao usuário com sucesso!" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        message: "Erro ao adicionar o Filme ao usuário!",
        error: err.message,
      });
  }
});

// Rota para listar filmes assistidos por um usuário
usuarioRouter.get("/usuarios/:id/filmes", async (req, res) => {
  const usuarioId = req.params.id;

  try {
    const usuario = await Usuario.findByPk(usuarioId, {
      include: [
        {
          model: Filme,
          as: "Filmes",
          through: { attributes: [] },
        },
      ],
    });

    if (usuario && usuario.Filmes && usuario.Filmes.length > 0) {
      res.status(200).json(usuario.Filmes);
    } else {
      res
        .status(404)
        .json({ message: "Usuário não encontrado ou não possui filmes!" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        message: "Erro ao buscar os filmes do usuário!",
        error: err.message,
      });
  }
});

// Rota para remover um filme assistido pelo usuário
usuarioRouter.delete("/usuarios/:usuarioId/filmes/:filmeId", async (req, res) => {
  const { usuarioId, filmeId } = req.params;

  try {
    const usuario = await Usuario.findByPk(usuarioId);
    const filme = await Filme.findByPk(filmeId);

    if (usuario && filme) {
      await usuario.removeFilme(filme);
      res
        .status(200)
        .json({ message: "Filme removido do usuário com sucesso!" });
    }

  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        message: "Erro ao remover o Filme do usuário!",
        error: err.message,
      });
  }
});
