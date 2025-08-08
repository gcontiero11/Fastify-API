import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateOrderReqModel } from "../schemas/orderSchemas.ts";
import { createOrderSchema } from "../schemas/orderSchemas.ts";
import OrderService from "../services/order/OrderService.ts";

class OrdersController {
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

    const order = OrderService.createOrder(products);

    const responseBody = {
      items: order.getItems().map(item => ({
        productId: item.getProductId(),
        unitPrice: item.getUnitPrice().toDecimal(),
        quantity: item.getQuantity(),
        subtotal: item.getSubtotal().toDecimal(),
        category: item.getCategory(),
        itemDiscounts: item.getItemDiscountsResponseModel()
      })),
      discounts: order.getOrderDiscountsResponseModel(),
      total: order.getTotal().toDecimal(),
      subtotal: order.getSubtotal().toDecimal()
    }
    return res.send(responseBody);
  }
}

export default new OrdersController();