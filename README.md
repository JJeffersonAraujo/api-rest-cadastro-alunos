# API REST CRUD – Cadastro de Alunos
=================================

Este documento serve como guia oficial da API REST CRUD de Cadastro de Alunos.
Ele descreve como configurar, executar, autenticar (JWT) e testar a aplicação,
além de apresentar a documentação Swagger.

----------------------------------------------------------------

### ÍNDICE
1. Descrição Geral
2. Tecnologias Utilizadas
3. Pré-requisitos
4. Instalação e Configuração
5. Variáveis de Ambiente
6. Autenticação (JWT)
7. Documentação Swagger
8. Estrutura do Projeto
9. Migrations e Banco de Dados
10. Rotas da API
11. Como Testar a Aplicação
12. Boas Práticas

----------------------------------------------------------------

## 1. DESCRIÇÃO GERAL
------------------
Esta é uma API RESTful CRUD desenvolvida com Node.js, TypeScript e TypeORM,
utilizando PostgreSQL (Neon) como banco de dados.

A API possui:
- CRUD completo de alunos
- Cadastro e autenticação de usuários
- Autenticação baseada em JWT
- Senhas criptografadas com bcryptjs
- Documentação automática via Swagger

----------------------------------------------------------------

## 2. TECNOLOGIAS UTILIZADAS
------------------------
- Node.js v22.18.0
- TypeScript
- Express
- routing-controllers
- TypeORM
- PostgreSQL (Neon)
- jsonwebtoken (JWT)
- bcryptjs
- swagger-ui-express
- routing-controllers-openapi
- dotenv

----------------------------------------------------------------

## 3. PRÉ-REQUISITOS
-----------------
- Node.js 18+
- npm ou yarn
- Conta no Neon (PostgreSQL)
- Git

----------------------------------------------------------------

## 4. INSTALAÇÃO E CONFIGURAÇÃO
---------------------------

1) Clonar o repositório:
git clone https://seu-repositorio.git
cd api-rest-cadastro-alunos

2) Instalar dependências:
npm install

----------------------------------------------------------------

## 5. VARIÁVEIS DE AMBIENTE (.env)
------------------------------

Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

DATABASE_URL="postgresql://neondb_owner:npg_7LyJwWs1RkYK@ep-aged-silence-adcwgpdm-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
NODE_ENV=development

JWT_SECRET=super_secret_key_alunos
JWT_EXPIRES_IN=1d

----------------------------------------------------------------

## 6. AUTENTICAÇÃO (JWT)
--------------------
A API utiliza autenticação baseada em JWT (JSON Web Token).

Fluxo de autenticação:
1. O usuário se registra via `POST /auth/register`
2. O usuário faz login via `POST /auth/login`
3. A API retorna um token JWT
4. O token deve ser enviado no header `Authorization` no formato:

Authorization: Bearer SEU_TOKEN_AQUI

5. As rotas de alunos só podem ser acessadas com um token válido

----------------------------------------------------------------

## 7. DOCUMENTAÇÃO SWAGGER
----------------------
A documentação da API é gerada automaticamente via Swagger.

Acesse:
http://localhost:3000/docs

Funcionalidades:
- Visualizar todos os endpoints
- Testar requisições diretamente pelo navegador
- Autenticar usando JWT via botão "Authorize"


### Testes de Autenticação

1. Acesse um endpoint de alunos sem autenticação  
   → Retorna 401 (Unauthorized)

2. Crie um usuário via `POST /auth/register`

3. Faça login via `POST /auth/login`  
   → Copie o token JWT retornado

4. No Swagger, clique em "Authorize" e informe:
   Bearer SEU_TOKEN

5. Acesse novamente os endpoints de alunos  
   → Acesso permitido


----------------------------------------------------------------

## 8. ESTRUTURA DO PROJETO
----------------------

src/
├─ controllers/
│  ├─ AlunoController.ts
│  └─ AuthController.ts
├─ database/
│  └─ data-source.ts
├─ entity/
│  ├─ Aluno.ts
│  └─ User.ts
├─ migrations/
├─ services/
│  ├─ AlunoService.ts
│  ├─ jwtService.ts
│  ├─ password.ts
│  └─ authMiddleware.ts
├─ server.ts
└─ swagger.ts

----------------------------------------------------------------

## 9. MIGRATIONS E BANCO DE DADOS
-----------------------------

1) Criar banco no Neon
2) Atualizar DATABASE_URL no .env
3) Gerar migration:
npx typeorm-ts-node-commonjs migration:generate -d src/database/data-source.ts src/migrations/CriarTabelas

4) Executar migration:
npm run migration:run

----------------------------------------------------------------

## 10. ROTAS DA API
----------------

Auth:
POST /auth/registro  -> Registrar usuário
POST /auth/login     -> Login e geração do token JWT

Alunos (rotas protegidas):
GET    /alunos
GET    /alunos/:id
POST   /alunos
PUT    /alunos/:id
DELETE /alunos/:id

----------------------------------------------------------------

## 11. COMO TESTAR A APLICAÇÃO
--------------------------

1) Iniciar a API:
npm run dev

2) Acessar Swagger:
http://localhost:3000/docs

3) Registrar usuário:
POST /auth/registro

4) Fazer login:
POST /auth/login

5) Copiar o token JWT retornado

6) No Swagger, clicar em "Authorize":
Bearer SEU_TOKEN_JWT

7) Testar as rotas de alunos:
GET /alunos
POST /alunos
PUT /alunos/{id}
DELETE /alunos/{id}

----------------------------------------------------------------

## 12. BOAS PRÁTICAS
----------------
- Nunca versionar o arquivo .env
- Utilizar JWT para rotas protegidas
- Manter serviços desacoplados dos controllers
- Usar migrations para alterações no banco
- Documentar novas rotas no Swagger

----------------------------------------------------------------

### LICENÇA
-------
Projeto livre para uso educacional e interno.
