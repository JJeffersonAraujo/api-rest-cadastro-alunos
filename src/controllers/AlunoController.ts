/**
 * Controller responsável pelas rotas relacionadas aos alunos.
 * 
 * Este arquivo demonstra como usar routing-controllers de maneira simples,
 * limpa e organizada — sem usar req/res diretamente.
 */

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
} from "routing-controllers";

import { AlunoService } from "../services/AlunoService";

/**
 * @JsonController() indica que esta classe contém rotas REST que retornam JSON automaticamente.
 * O prefixo "/alunos" será aplicado a todas as rotas deste controller.
 *
 * Exemplo final das rotas geradas:
 *  - GET /alunos
 *  - GET /alunos/:id
 *  - POST /alunos
 *  - PUT /alunos/:id
 *  - DELETE /alunos/:id
 */
@JsonController("/alunos")
export class AlunoController {
  
  /**
   * Dependência: AlunoService controla a lógica de negócio e o acesso ao banco.
   * Aqui estamos apenas instanciando ele para uso nos métodos abaixo.
   */
  private alunoService = new AlunoService();

  // -------------------------------------------------------------
  //  GET /alunos
  // -------------------------------------------------------------
  /**
   * Lista todos os alunos cadastrados.
   *
   * @Get() significa que este método responde ao método HTTP GET.
   * Não usamos req/res — routing-controllers retorna o valor automaticamente.
   */
  @Get()
  async listar() {
    try {
      return await this.alunoService.getAlunos();
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao listar alunos");
    }
  }

  // -------------------------------------------------------------
  //  GET /alunos/:id
  // -------------------------------------------------------------
  /**
   * Busca um aluno específico pelo ID.
   *
   * @Param("id") extrai o parâmetro da rota automaticamente.
   * Caso o aluno não exista, uma exceção NotFoundError gera HTTP 404.
   */
  @Get("/:id")
  async buscar(@Param("id") id: number) {
    try {
      const aluno = await this.alunoService.getAluno(id);

      if (!aluno) {
        throw new NotFoundError("Aluno não encontrado");
      }

      return aluno;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // -------------------------------------------------------------
  //  POST /alunos
  // -------------------------------------------------------------
  /**
   * Cria um novo aluno.
   *
   * @Body() automaticamente pega o corpo da requisição (JSON enviado).
   * @HttpCode(201) define o status correto para criação.
   */
  @Post()
  @HttpCode(201)
  async criar(@Body() dados: any) {
    try {
      return await this.alunoService.criarAluno(dados);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar aluno");
    }
  }

  // -------------------------------------------------------------
  //  PUT /alunos/:id
  // -------------------------------------------------------------
  /**
   * Atualiza os dados de um aluno existente pelo ID.
   *
   * Caso o ID não exista, retorna 404 automaticamente com NotFoundError.
   */
  @Put("/:id")
  async atualizar(
    @Param("id") id: number,
    @Body() dados: any
  ) {
    try {
      const alunoAtualizado = await this.alunoService.atualizarAluno(id, dados);

      if (!alunoAtualizado) {
        throw new NotFoundError("Aluno não encontrado");
      }

      return alunoAtualizado;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // -------------------------------------------------------------
  //  DELETE /alunos/:id
  // -------------------------------------------------------------
  /**
   * Remove um aluno pelo ID.
   *
   * Caso não exista, retorna 404.
   */
  @Delete("/:id")
  async deletar(@Param("id") id: number) {
    try {
      const deletado = await this.alunoService.deletarAluno(id);

      if (!deletado) {
        throw new NotFoundError("Aluno não encontrado");
      }

      return { mensagem: "Aluno removido com sucesso" };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
