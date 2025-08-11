# 🚀 Projeto Fastify + Prisma

Este projeto utiliza **Fastify** como framework backend e **Prisma ORM** para manipulação do banco de dados.
O banco de dados é gerenciado via **PostgreSQL** executando em um container **Docker**.

---

## 📦 Scripts Disponíveis

No `package.json` estão configurados os seguintes scripts:

| Comando            | Descrição                                                         |
| ------------------ | ----------------------------------------------------------------- |
| `npm run dev`      | Executa o servidor em modo de desenvolvimento.                    |
| `npm run build`    | Compila o projeto para produção.                                  |
| `npm run start`    | Executa o servidor em modo de produção (após o build).            |
| `npm run lint`     | Executa o **ESLint** para verificar problemas no código.          |
| `npm run lint:fix` | Executa o **ESLint** e corrige automaticamente problemas simples. |
| `npm run test`     | Executa os testes unitários usando o **Jest**.                    |

---

## 🛠 Comandos Úteis do Prisma

O Prisma oferece alguns comandos importantes para gerenciar o banco de dados:

| Comando                    | Descrição                                                                           |
| -------------------------- | ----------------------------------------------------------------------------------- |
| `npx prisma migrate dev`   | Cria e aplica migrations no banco de dados para ambiente de desenvolvimento.        |
| `npx prisma generate`      | Gera o cliente Prisma baseado no schema definido em `schema.prisma`.                |
| `npx prisma studio`        | Abre uma interface gráfica para visualizar e editar dados do banco.                 |
| `npx prisma migrate reset` | **Apaga todos os dados**, recria o banco de dados e aplica as migrations novamente. |

---

## ▶️ Como Executar o Projeto em Ambiente de Desenvolvimento

Siga o passo a passo:

1. **Acesse o diretório do projeto**

   ```bash
   cd seu-projeto
   ```

2. **Suba o PostgreSQL com Docker**
   Certifique-se que o arquivo `docker-compose.yml` está configurado corretamente.

   ```bash
   docker compose up -d
   ```

3. **Instale as dependências do Node.js**

   ```bash
   npm install
   ```

4. **Inicialize o Prisma (migrations)**

   ```bash
   npx prisma migrate dev
   ```

5. **Execute o servidor em modo desenvolvimento**

   ```bash
   npm run dev
   ```

---

## 📬 Coleção Postman

Este projeto inclui uma coleção do **Postman** para facilitar os testes das requisições na API.

* **Arquivo da coleção:** `docs/desafio-estagio-backend-salespacepostman_collection.json`
* Para importar no Postman:

  1. Abra o Postman.
  2. Vá em **File > Import**.
  3. Selecione o arquivo da coleção.

> A coleção contém exemplos de todas as rotas implementadas, com parâmetros e bodies prontos para teste.

---

## 📚 Tecnologias [Utiliza](https://fastify.dev/)das

* [Fastify](https://fastify.dev/) — Framework web rápido e eficiente par[a Node](https://www.prisma.io/).js.
* [Prisma](https://www.prisma.io/) — ORM moderno e tipado para banco[ de dados.](https://www.postgresql.org/)
* [PostgreSQL](https://www.postgresql.org/) — Banco de dados r[elacio](https://www.docker.com/)nal.
* [Docker](https://www.docker.com/) — Para containerização[ do ba](https://eslint.org/)nco.
* [ESLint](https://eslint.org/) — Padronização e qualidade [de c](https://jestjs.io/)ódigo.
* [Jest](https://jestjs.io/) — Testes unitários.
