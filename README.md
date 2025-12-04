# API REST CRUD

Este documento serve como um guia oficial da API, contendo instruções de instalação, configuração, estrutura do banco, migrations do TypeORM, rotas disponíveis e orientações para outros desenvolvedores utilizarem e expandirem o projeto de forma segura.

________________________________________

## Índice

1.	Descrição Geral
2.	Tecnologias Utilizadas
3.	Pré-requisitos
4.	Instalação e Configuração
5.	Scripts Disponíveis
6.	Estrutura do Projeto
7.	Configuração do Banco (TypeORM)
8.	Migrations
9.	Entidades (Models)
10.	Rotas da API
11.	Como Consumir a API
12.	Boas Práticas e Padrões

________________________________________

## Descrição Geral

Esta é uma API RESTful CRUD construída utilizando Node.js, Express, TypeScript e TypeORM. O objetivo é fornecer uma base sólida para criação de APIs profissionais, seguindo padrões de arquitetura e boas práticas de desenvolvimento.
A API oferece: - Estrutura em camadas (Controller, Service, Repository) - Migrations e Entities com TypeORM - Validações - Rotas REST - Documentação completa
________________________________________

## Tecnologias Utilizadas

•	Node.js - v22.18.0
•	Express
•	TypeScript
•	TypeORM
•	PostgreSQL (ou outro conforme necessário)
•	ts-node-dev
•	dotenv
________________________________________

## Pré-requisitos

Antes de começar, certifique-se de ter instalado: - Node.js 18+ - npm ou yarn - Banco de dados PostgreSQL (recomendado)
________________________________________

## Instalação e Configuração

### 1️ - Clonar o repositório

git clone https://seu-repositorio.git
cd nome-do-projeto

### 2️ - Instalar dependências

npm install

### 3️ - Criar o arquivo .env

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=senha
DATABASE_NAME=minha_api

### 4️ - Gerar e executar migrations

Gerar um banco no Neon
Preenche o endereço do banco no .env
rodar os camandos para gerar a tabela e migrar:
npx typeorm-ts-node-commonjs migration:generate -d src/database/data-source.ts src/migrations/CriarTabelaAlunos
npm run migration:run

### 5️ - Iniciar o servidor

npm run dev

________________________________________

## Estrutura do Projeto

src/
|	├── controllers/
|	├── database/
|	├── entity/
|	├── migrations/
|	├── routes/
|	├── services/
├── server.ts

________________________________________

## Configuração do Banco (TypeORM)

Arquivo data-source.ts:

import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
});

________________________________________


## Licença
Projeto livre para uso interno.