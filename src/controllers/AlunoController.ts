import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  NotFoundError,
  UseBefore,
} from "routing-controllers";

import { AlunoService } from "../services/AlunoService";
import { AuthMiddleware } from "./AuthMiddleware";

@JsonController("/alunos")
@UseBefore(AuthMiddleware) // 🔒 TODAS as rotas protegidas
export class AlunoController {

  private alunoService = new AlunoService();

  @Get()
  async listar() {
    return await this.alunoService.getAlunos();
  }

  @Get("/:id")
  async buscar(@Param("id") id: number) {
    const aluno = await this.alunoService.getAluno(id);

    if (!aluno) {
      throw new NotFoundError("Aluno não encontrado");
    }

    return aluno;
  }

  @Post()
  @HttpCode(201)
  async criar(@Body() dados: any) {
    return await this.alunoService.criarAluno(dados);
  }

  @Put("/:id")
  async atualizar(@Param("id") id: number, @Body() dados: any) {
    const aluno = await this.alunoService.atualizarAluno(id, dados);

    if (!aluno) {
      throw new NotFoundError("Aluno não encontrado");
    }

    return aluno;
  }

  @Delete("/:id")
  async deletar(@Param("id") id: number) {
    const deletado = await this.alunoService.deletarAluno(id);

    if (!deletado) {
      throw new NotFoundError("Aluno não encontrado");
    }

    return { mensagem: "Aluno removido com sucesso" };
  }
}
