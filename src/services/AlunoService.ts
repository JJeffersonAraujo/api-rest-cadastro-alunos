import { AppDataSource } from "../database/data-source";
import { Aluno } from "../entity/Aluno";

export class AlunoService {
  private repo = AppDataSource.getRepository(Aluno);

  async getAlunos() {
    return this.repo.find();
  }

  async getAluno(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async criarAluno(dados: Partial<Aluno>) {
    const aluno = this.repo.create(dados);
    return this.repo.save(aluno);
  }

  async atualizarAluno(id: number, dados: Partial<Aluno>) {
    const aluno = await this.repo.findOne({ where: { id } });

    if (!aluno) return null;

    Object.assign(aluno, dados);
    return this.repo.save(aluno);
  }

  async deletarAluno(id: number) {
    const result = await this.repo.delete(id);
    return true;
    
  }
}
