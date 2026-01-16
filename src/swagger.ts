import "reflect-metadata";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";

import "./controllers/AlunoController";
import "./controllers/AuthController";

export function createSwaggerApp() {
  const app = express();

  const swaggerSpec = routingControllersToSpec(
    getMetadataArgsStorage(),
    {},
    {
      info: {
        title: "API - Alunos",
        version: "1.0.0",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [{ bearerAuth: [] }],
    }
  );

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  return app;
}
