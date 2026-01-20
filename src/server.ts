import "reflect-metadata";
import express from "express";
import { useExpressServer } from "routing-controllers";
import { AppDataSource } from "./database/data-source";
import { createSwaggerApp } from "./swagger";

const app = express();

// ✅ JSON BODY PARSER (OBRIGATÓRIO)
app.use(express.json());

useExpressServer(app, {
  controllers: [__dirname + "/controllers/*.ts"],
});

const swaggerApp = createSwaggerApp();
app.use(swaggerApp);

AppDataSource.initialize().then(() => {
  console.log("Conectado ao banco");

  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
    console.log("Swagger disponível em: http://localhost:3000/docs");
  });
});
