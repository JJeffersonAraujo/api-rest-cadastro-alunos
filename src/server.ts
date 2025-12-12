// src/server.ts

import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { AppDataSource } from "./database/data-source";
import { createSwaggerApp } from "./swagger";

const app = createExpressServer({
  controllers: [__dirname + "/controllers/*.ts"],
});

const swaggerApp = createSwaggerApp();
app.use(swaggerApp); // adiciona o /docs à API

AppDataSource.initialize().then(() => {
  console.log("Conectado ao banco");

  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
    console.log("Swagger disponível em: http://localhost:3000/docs");
  });
});
