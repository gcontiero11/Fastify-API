import type { FastifyInstance } from "fastify";
import orderRoutes from "./orderRoutes.ts";

export default async function (app: FastifyInstance) {
  app.get("/ping", (req, res) => {
    res.send("pong");
  });

  app.register(orderRoutes, { prefix: "/v1/orders" })
}