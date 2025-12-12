import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { AppDataSource } from "./database/data-source";

// importar controllers
import { AuthController } from "./controllers/AuthController";
import { AlunoController } from "./controllers/AlunoController";

AppDataSource.initialize()
  .then(() => {
    console.log("Conexão com o banco estabelecida!");

    // cria o servidor express usando routing-controllers
    const app = createExpressServer({
      controllers: [
        AuthController,
        AlunoController
      ],
    });

    app.listen(3000, () => {
      console.log("🚀 API rodando na porta 3000 usando routing-controllers");
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar no banco:", err);
  });
