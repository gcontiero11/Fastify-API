import type { FastifyInstance } from "fastify";

export default async function orderRoutes(app: FastifyInstance) {
  app.get("/", (req, res) => {
    res.send({
      message: "Orders route"
    })
  });
}