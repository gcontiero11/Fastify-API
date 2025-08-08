import type { FastifyInstance } from "fastify";
import OrdersController from "../controllers/OrdersController.ts";

export default async function orderRoutes(app: FastifyInstance) {
  app.post("/", {
    preHandler: [],
    handler: OrdersController.createOrder
  });
}