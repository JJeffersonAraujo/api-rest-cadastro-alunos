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
import { OpenAPI } from "routing-controllers-openapi";
import { AlunoService } from "../services/AlunoService";
import { AuthMiddleware } from "./AuthMiddleware";

@JsonController("/alunos")
@UseBefore(AuthMiddleware)
@OpenAPI({ security: [{ bearerAuth: [] }] })
export class AlunoController {

  private alunoService = new AlunoService();

  @Get()
  listar() {
    return this.alunoService.getAlunos();
  }

  @Get("/:id")
  async buscar(@Param("id") id: number) {
    const aluno = await this.alunoService.getAluno(id);
    if (!aluno) throw new NotFoundError("Aluno não encontrado");
    return aluno;
  }

  @Post()
  @HttpCode(201)
  criar(@Body() dados: any) {
    return this.alunoService.criarAluno(dados);
  }

  @Put("/:id")
  atualizar(@Param("id") id: number, @Body() dados: any) {
    return this.alunoService.atualizarAluno(id, dados);
  }

  @Delete("/:id")
  async deletar(@Param("id") id: number) {
    await this.alunoService.deletarAluno(id);
    return { message: "Aluno removido com sucesso" };
  }
}
