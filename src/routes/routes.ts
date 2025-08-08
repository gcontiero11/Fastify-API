import type { FastifyInstance } from "fastify";
import orderRoutes from "./orderRoutes.ts";

export default async function (app: FastifyInstance) {
  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.register(orderRoutes, { prefix: "/v1/orders" })
}