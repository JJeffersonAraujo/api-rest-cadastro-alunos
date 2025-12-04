import { Router } from "express";
import { AppDataSource } from "../database/data-source";
import { Aluno } from "../entity/Aluno";

const router = Router();
const repo = AppDataSource.getRepository(Aluno);


router.post("/alunos", async (req, res) => {
  try {
    const aluno = repo.create(req.body);
    await repo.save(aluno);
    res.status(201).json(aluno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao salvar aluno" });
  }
});


router.get("/alunos", async (req, res) => {
  try {
    const alunos = await repo.find();
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar alunos" });
  }
});


router.get("/alunos/:id", async (req, res) => {
  try {
    const aluno = await repo.findOneBy({ id: Number(req.params.id) });
    if (!aluno) return res.status(404).json({ message: "Aluno não encontrado" });
    res.json(aluno);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar aluno" });
  }
});


router.put("/alunos/:id", async (req, res) => {
  try {
    const aluno = await repo.findOneBy({ id: Number(req.params.id) });

    if (!aluno)
      return res.status(404).json({ message: "Aluno não encontrado" });

    repo.merge(aluno, req.body);
    await repo.save(aluno);

    res.json(aluno);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar aluno" });
  }
});


router.delete("/alunos/:id", async (req, res) => {
  try {
    const aluno = await repo.findOneBy({ id: Number(req.params.id) });

    if (!aluno)
      return res.status(404).json({ message: "Aluno não encontrado" });

    await repo.remove(aluno);

    res.json({ message: "Aluno removido com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover aluno" });
  }
});

export default router;
