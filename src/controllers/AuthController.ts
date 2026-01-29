import { JsonController, Post, Body, HttpCode } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { AppDataSource } from "../database/data-source";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";
import { gerarToken } from "../services/jwtService";
import { RegisterUserDTO } from "../dtos/RegisterUserDTO";
import { LoginDTO } from "../dtos/LoginDTO";

@JsonController("/auth")
export class AuthController {

  @Post("/registro")
  @HttpCode(201)
  @OpenAPI({
    summary: "Registrar usuário",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/RegisterUserDTO" },
        },
      },
    },
  })
  async registro(@Body() body: RegisterUserDTO) {
    const repo = AppDataSource.getRepository(User);

    const senhaHash = await bcrypt.hash(body.senha, 10);

    const user = repo.create({
      name: body.name,
      email: body.email,
      senha: senhaHash,
    });

    await repo.save(user);

    return { message: "Usuário criado com sucesso" };
  }

  @Post("/login")
  @HttpCode(200)
  @OpenAPI({
    summary: "Login",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/LoginDTO" },
        },
      },
    },
  })
  async login(@Body() body: LoginDTO) {
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOne({ where: { email: body.email } });

    if (!user || !(await bcrypt.compare(body.senha, user.senha))) {
      return { message: "Credenciais inválidas" };
    }

    const token = gerarToken({ id: user.id, email: user.email });
    return { token };
  }
}
