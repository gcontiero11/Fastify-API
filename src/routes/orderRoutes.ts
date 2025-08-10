import type { FastifyInstance } from "fastify";
import OrderController from "../controllers/OrderController";

export default async function orderRoutes(app: FastifyInstance) {
  app.post("/", {
    preHandler: [],
    handler: OrderController.createOrder,
  });
  app.post("/quote", {
    preHandler: [],
    handler: OrderController.createQuote,
  });
}
