import { Controller, Post, Body } from "routing-controllers";
import { AppDataSource } from "../database/data-source";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";
import { OpenAPI } from "routing-controllers-openapi";
import { gerarToken } from "../services/jwtService";

@Controller("/auth")
export class AuthController {

  @Post("/registro")
  @OpenAPI({
    summary: "Registrar novo usuário",
    description: "Cria um usuário com nome, email e senha criptografada.",
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
      user: {
        id: userSalvo.id,
        name: userSalvo.name,
        email: userSalvo.email,
      },
    };
  }

  // 🔑 LOGIN COM JWT
  @Post("/login")
  @OpenAPI({
    summary: "Login",
    description: "Autentica o usuário e retorna um token JWT",
  })
  async login(@Body() body: any) {
    const { email, senha } = body;

    const repoUser = AppDataSource.getRepository(User);

    const user = await repoUser.findOne({ where: { email } });

    if (!user) {
      return { message: "Credenciais inválidas" };
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return { message: "Credenciais inválidas" };
    }

    const token = gerarToken({
      id: user.id,
      email: user.email,
    });

    return { token };
  }
}
