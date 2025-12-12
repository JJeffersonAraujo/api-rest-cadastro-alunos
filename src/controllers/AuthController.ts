import { Controller, Post, Body } from "routing-controllers";
import { AppDataSource } from "../database/data-source";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";

@Controller("/auth")
export class AuthController {

  @Post("/registro")
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
