import { Controller, Post, Body } from "routing-controllers";
import { AppDataSource } from "../database/data-source";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";
import { OpenAPI } from "routing-controllers-openapi";

@Controller("/auth")
export class AuthController {

  @Post("/registro")
  @OpenAPI({
    summary: "Registrar novo usuário",
    description: "Cria um usuário com nome, email e senha criptografada.",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              email: { type: "string" },
              senha: { type: "string" }
            },
            required: ["name", "email", "senha"]
          }
        }
      }
    },
    responses: {
      200: {
        description: "Usuário criado com sucesso",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
                user: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    name: { type: "string" },
                    email: { type: "string" }
                  }
                }
              }
            }
          }
        }
      }
    }
  })
  async registro(@Body() body: any) {
    const { name, email, senha } = body;

    if (!name || !email || !senha) {
      return { message: "Todos os campos são obrigatórios." };
    }

    const repoUser = AppDataSource.getRepository(User);

    const senhaHash = await bcrypt.hash(senha, 10);

    const user = repoUser.create({ name, email, senha: senhaHash });
    const userSalvo = await repoUser.save(user);

    return {
      message: "Usuário registrado com sucesso.",
      user: userSalvo
    };
  }
}
