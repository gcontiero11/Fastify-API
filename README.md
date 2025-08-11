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

## 🔌 Endpoints da API

### Health Check

#### `GET /ping`
Verifica se a API está funcionando.

**Resposta:**
```json
"pong"
```

### Pedidos

#### `POST /v1/orders`
Cria um novo pedido com cálculo automático de descontos.

**Parâmetros de Entrada:**
```json
{
  "requestedProducts": [
    {
      "productId": "string",
      "quantity": "number"
    }
  ]
}
```

**Parâmetros de Query (Opcional):**
- `quoteKey` (string): Chave de uma cotação existente para criar pedido a partir dela

**Resposta de Sucesso (201):**
```json
{
  "currency": "BRL",
  "items": [
    {
      "productId": "string",
      "quantity": "number",
      "unitPrice": "number",
      "subtotal": "number",
      "category": "string",
      "itemDiscounts": [
        {
          "code": "string",
          "name": "string",
          "fixed": "number",
          "rate": "number",
          "basis": "number",
          "amount": "number",
          "metadata": "object"
        }
      ]
    }
  ],
  "discounts": [
    {
      "code": "string",
      "name": "string",
      "fixed": "number",
      "rate": "number",
      "basis": "number",
      "amount": "number",
      "metadata": "object"
    }
  ],
  "subtotal": "number",
  "total": "number"
}
```

#### `POST /v1/orders/quote`
Cria uma cotação com cálculo automático de descontos.

**Parâmetros de Entrada:**
```json
{
  "requestedProducts": [
    {
      "productId": "string",
      "quantity": "number"
    }
  ]
}
```

**Resposta de Sucesso (201):**
```json
{
  "currency": "BRL",
  "items": [
    {
      "productId": "string",
      "quantity": "number",
      "unitPrice": "number",
      "subtotal": "number",
      "category": "string",
      "itemDiscounts": [
        {
          "code": "string",
          "name": "string",
          "fixed": "number",
          "rate": "number",
          "basis": "number",
          "amount": "number",
          "metadata": "object"
        }
      ]
    }
  ],
  "discounts": [
    {
      "code": "string",
      "name": "string",
      "fixed": "number",
      "rate": "number",
      "basis": "number",
      "amount": "number",
      "metadata": "object"
    }
  ],
  "quoteKey": "string",
  "validUntil": "string (dd-MM-YYYY)",
  "subtotal": "number",
  "total": "number"
}
```

### 📋 Descrição dos Campos

#### Produto Solicitado (`requestedProducts`)
- `productId` (string): Identificador único do produto
- `quantity` (number): Quantidade desejada do produto

#### Item da Resposta
- `productId` (string): Identificador do produto
- `quantity` (number): Quantidade do item
- `unitPrice` (number): Preço unitário em centavos
- `subtotal` (number): Subtotal do item em centavos
- `category` (string): Categoria do produto
- `itemDiscounts` (array): Descontos aplicados especificamente ao item

#### Desconto Aplicado
- `code` (string): Código do desconto
- `name` (string): Nome do desconto
- `fixed` (number): Valor fixo do desconto
- `rate` (number): Taxa percentual do desconto (0.0 a 1.0)
- `basis` (number): Valor base para cálculo do desconto
- `amount` (number): Valor final após desconto
- `metadata` (object): Informações adicionais sobre o desconto

#### Resposta Geral
- `currency` (string): Moeda utilizada (sempre "BRL")
- `total` (number): Valor total final
- `subtotal` (number): Subtotal sem descontos
- `quoteKey` (string): Chave única da cotação (apenas para quotes)
- `validUntil` (string): Data de validade da cotação (apenas para quotes)

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

## 📚 Tecnologias Utilizadas

* [Fastify](https://fastify.dev/) — Framework web rápido e eficiente para Node.js.
* [Prisma](https://www.prisma.io/) — ORM moderno e tipado para banco de dados.
* [PostgreSQL](https://www.postgresql.org/) — Banco de dados relacional.
* [Docker](https://www.docker.com/) — Para containerização do banco.
* [ESLint](https://eslint.org/) — Padronização e qualidade de código.
* [Jest](https://jestjs.io/) — Testes unitários.
