import { Request, Response } from "express";
import { AlunoService } from "../services/AlunoService";

export class AlunoController {
  private alunoService = new AlunoService();

  async listar(req: Request, res: Response) {
    try {
      const alunos = await this.alunoService.getAlunos();
      return res.json(alunos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro ao listar alunos" });
    }
  }

  async buscar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const aluno = await this.alunoService.getAluno(id);

      if (!aluno) {
        return res.status(404).json({ mensagem: "Aluno não encontrado" });
      }

      return res.json(aluno);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro ao buscar aluno" });
    }
  }

  async criar(req: Request, res: Response) {
    try {
      const dados = req.body;
      const alunoCriado = await this.alunoService.criarAluno(dados);

      return res.status(201).json(alunoCriado);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro ao criar aluno" });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const dados = req.body;

      const alunoAtualizado = await this.alunoService.atualizarAluno(id, dados);

      if (!alunoAtualizado) {
        return res.status(404).json({ mensagem: "Aluno não encontrado" });
      }

      return res.json(alunoAtualizado);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro ao atualizar aluno" });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const deletado = await this.alunoService.deletarAluno(id);

      if (!deletado) {
        return res.status(404).json({ mensagem: "Aluno não encontrado" });
      }

      return res.json({ mensagem: "Aluno removido com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro ao remover aluno" });
    }
  }
}
