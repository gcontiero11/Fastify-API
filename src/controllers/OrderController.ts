import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateOrderReqModel } from "../core/schemas/order.schema";
import { createOrderReqSchema } from "../core/schemas/order.schema";
import OrderService from "../core/services/OrderService";
import { ResponseException } from "../exception/ResponseException";
import QuoteMapper from "../core/mappers/QuoteMapper";
import OrderMapper from "../core/mappers/OrderMapper";

class OrderController {
  async createOrder(req: FastifyRequest, res: FastifyReply) {
    console.log(req.body);
    const products = req.body as CreateOrderReqModel;

    const parseIn = createOrderReqSchema.safeParse(products);

    if (!parseIn.success) {
      return res.status(422).send({
        message: "Invalid products",
        errors: parseIn.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    const result = await OrderService.createOrder(products);

    if (result instanceof ResponseException) {
      return res.status(result.getStatusCode()).send(result);
    }

    const responseBody = OrderMapper.toResModel(result);
    return res.send(responseBody);
  }

  async createQuote(req: FastifyRequest, res: FastifyReply) {
    console.log(req.body);
    const products = req.body as CreateOrderReqModel;

    const parseIn = createOrderReqSchema.safeParse(products);

    if (!parseIn.success) {
      return res.status(422).send({
        message: "Invalid products",
        errors: parseIn.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }
    const result = await OrderService.createQuote(products);

    if (result instanceof ResponseException) {
      return res.status(result.getStatusCode()).send(result);
    }

    const responseBody = QuoteMapper.toResModel(result);
    return res.send(responseBody);
  }
}

export default new OrderController();
