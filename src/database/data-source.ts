import "reflect-metadata";
import 'dotenv/config';
import { DataSource } from "typeorm";
import { Aluno } from "../entity/Aluno";
import { User } from "../entity/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  ssl: {
    rejectUnauthorized: false
  },
  entities: [Aluno, User],
  migrations: ["src/migrations/*.ts"]
});
