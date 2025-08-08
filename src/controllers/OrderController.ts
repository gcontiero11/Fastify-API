import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateOrderReqModel } from "../schemas/orderSchemas.ts";
import { createOrderSchema } from "../schemas/orderSchemas.ts";
import OrderService from "../services/order/OrderService.ts";
import { ResponseException } from "../exception/ResponseException.ts";

class OrderController {
  async createOrder(req: FastifyRequest, res: FastifyReply) {
    console.log(req.body);
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

    const result = OrderService.createOrder(products);

    if (result instanceof ResponseException) {
      return res.status(result.getStatusCode()).send(result);
    }

    const responseBody = {
      items: result.getItems().map(item => ({
        productId: item.getProductId(),
        unitPrice: item.getUnitPrice().toDecimal(),
        quantity: item.getQuantity(),
        subtotal: item.getSubtotal().toDecimal(),
        category: item.getCategory(),
        itemDiscounts: item.getItemDiscountsResponseModel()
      })),
      discounts: result.getOrderDiscountsResponseModel(),
      total: result.getTotal().toDecimal(),
      subtotal: result.getSubtotal().toDecimal()
    }
    return res.send(responseBody);
  }
}

export default new OrderController();