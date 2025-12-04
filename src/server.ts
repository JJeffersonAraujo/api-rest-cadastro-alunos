import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./database/data-source";
import alunoRoutes from "./routes/AlunoRoutes";

const app = express();
app.use(express.json());

// Registrar as rotas
app.use(alunoRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Conexão com o banco estabelecida!");

    app.listen(3000, () => {
      console.log("API rodando na porta 3000");
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar no banco:", err);
  });
