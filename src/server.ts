import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { useExpressServer } from "routing-controllers";
import { AppDataSource } from "./database/data-source";
import swaggerUi from "swagger-ui-express";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { getMetadataArgsStorage } from "routing-controllers";

const app = express();

useExpressServer(app, {
  controllers: [__dirname + "/controllers/*.{ts,js}"],
  routePrefix: "/api",
  validation: true,
  defaultErrorHandler: true,
});

const swaggerSpec = routingControllersToSpec(
  getMetadataArgsStorage(),
  { routePrefix: "/api" },
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
      schemas: {
        RegisterUserDTO: {
          type: "object",
          required: ["name", "email", "senha"],
          properties: {
            name: { type: "string", example: "Jefferson" },
            email: { type: "string", example: "jefferson@email.com" },
            senha: { type: "string", example: "123456" },
          },
        },
        LoginDTO: {
          type: "object",
          required: ["email", "senha"],
          properties: {
            email: { type: "string", example: "email@email.com" },
            senha: { type: "string", example: "123456" },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  }
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

AppDataSource.initialize().then(() => {
  console.log("Banco conectado");
  app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
    console.log("Swagger em http://localhost:3000/docs");
  });
});
