import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateOrderReqModel } from "../schemas/orderSchemas.ts";
import { createOrderSchema } from "../schemas/orderSchemas.ts";

class OrdersController {
  async createOrder(req: FastifyRequest, res: FastifyReply) {
    const products = req.body as CreateOrderReqModel;

    const parseIn = createOrderSchema.safeParse(products);

    if (!parseIn.success) {
      return res.status(422).send({
        message: "Invalid products",
        errors: parseIn.error.issues.map(issue => ({
          path: issue.path.join("."),
          message: issue.message
        }))
      })
    }

    return res.send({
      message: "Order created",
      products
    })
  }
}

export default new OrdersController();