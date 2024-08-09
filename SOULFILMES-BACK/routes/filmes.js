import { Filme } from "../models/filme.js";
import { Usuario } from "../models/usuario.js";
import { Router } from "express";
import { usuarioRouter } from "./usuarios.js";

export const filmeRouter = Router();

// Rota para listar todos os filmes
filmeRouter.get("/filmes", async (req, res) => {
  try {
    const listaFilme = await Filme.findAll();
    res.json(listaFilme);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao listar filmes!" });
  }
});

// Rota para listar um filme específico
filmeRouter.get("/filmes/:id", async (req, res) => {
  try {
    const filmeEncontrado = await Filme.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Usuario,
          as: "Usuarios",
          attributes: ["id", "nome"],
        },
      ],
    });

    if (filmeEncontrado) {
      res.json(filmeEncontrado);
    } else {
      res.status(404).json({ message: "Filme não encontrado!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar o filme!" });
  }
});

// Rota para adicionar um novo filme
filmeRouter.post("/filmes", async (req, res) => {
  try {
    const { titulo, diretor, genero, anoLancamento } = req.body;

    const novoFilme = await Filme.create({
      titulo,
      diretor,
      genero,
      anoLancamento,
    });
    res.status(201).json({ message: "Filme inserido com sucesso!", novoFilme });
  } catch (err) {
    console.error(err);

    if (err.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ message: "Erro ao inserir o filme!", errors: err.errors });
    }

    res.status(500).json({
      message: "Erro no servidor ao inserir o filme!",
      errors: err.errors,
    });
  }
});

// Rota para atualizar um filme
filmeRouter.put("/filmes/:id", async (req, res) => {
  const idFilme = req.params.id;

  try {
    const filmeAtualizado = await Filme.findByPk(idFilme);

    if (filmeAtualizado) {
      const { titulo, diretor, genero, anoLancamento } = req.body;
      await filmeAtualizado.update({ titulo, diretor, genero, anoLancamento });
      res.json({ message: "Filme atualizado com sucesso!", filmeAtualizado });
    } else {
      res.status(404).json({ message: "Filme não encontrado!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao atualizar o filme!", error: err });
  }
});

// Rota para deletar um filme
filmeRouter.delete("/filmes/:id", async (req, res) => {
  const idFilme = req.params.id;

  try {
    const filmeDeletado = await Filme.findByPk(idFilme);

    if (filmeDeletado) {
      await filmeDeletado.destroy();
      res.json({ message: "Filme deletado com sucesso!" });
    } else {
      res.status(404).json({ message: "Filme não encontrado!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao deletar o filme!", error: err });
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

    if (usuario) {
      const filmes = usuario.Filmes || []; // Verificar se o usuário possui filmes
      res.status(200).json(filmes);
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar os filmes do usuário" });
  }
});
