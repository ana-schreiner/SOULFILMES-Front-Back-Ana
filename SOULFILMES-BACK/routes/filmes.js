import { Filme } from "../models/filme.js";
import { Usuario } from "../models/usuario.js";
import { Router } from "express";

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

    res
      .status(500)
      .json({
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
      res.json({ message: "Filme atualizado com sucesso!" });
    } else {
      res.status(404).json({ message: "Filme não encontrado!" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erro ao atualizar o filme!", error: err.message });
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
    res.status(500).json({ message: "Erro ao deletar o filme!" });
  }
});

// Rota para listar os usuários associados a um filme específico
filmeRouter.get("/filmes/:id/usuarios", async (req, res) => {
  const filmeId = req.params.id;

  try {
    const filme = await Filme.findByPk(filmeId, {
      include: [
        {
          model: Usuario,
          as: "Usuarios",
          attributes: ["id", "nome"],
          through: { attributes: [] },
        },
      ],
    });

    if (filme && filme.Usuarios && filme.Usuarios.length > 0) {
      res.status(200).json(filme.Usuarios);
    } else {
      res
        .status(404)
        .json({ message: "Filme não encontrado ou não possui usuários!" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        message: "Erro ao buscar os usuários do filme!",
        error: err.message,
      });
  }
});
