import type { FastifyInstance } from "fastify";
import OrderController from "../controllers/OrderController.ts";

export default async function orderRoutes(app: FastifyInstance) {
  app.post("/", {
    preHandler: [],
    handler: OrderController.createOrder
  });
}