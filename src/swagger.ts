// src/swagger.ts

import "reflect-metadata";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";

// Importar os controllers para registrar os decorators
import "./controllers/AlunoController";
import "./controllers/AuthController";

export function createSwaggerApp() {
  const app = express();

  // Gera automaticamente a documentação OpenAPI com base nos decorators
  const swaggerSpec = routingControllersToSpec(
    getMetadataArgsStorage(),
    {
      controllers: [
        __dirname + "/controllers/*.ts"
      ]
    },
    {
      info: {
        title: "API - Alunos",
        description: "Documentação gerada automaticamente",
        version: "1.0.0",
      },
    }
  );

  // Rota Swagger
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  return app;
}
