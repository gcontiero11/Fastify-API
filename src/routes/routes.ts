import type { FastifyTypedInstance } from "../types/types";
import orderRoutes from "./orderRoutes";

export default async function (app: FastifyTypedInstance) {
  app.get("/ping", (req, res) => {
    res.send("pong");
  });

  app.register(orderRoutes, { prefix: "/v1/orders" });
}
