import type { CreateOrderReqModel } from "../../schemas/orderSchemas";
import DiscountEngine from "../utils/DiscountEngine";
import Item from "../../models/Item";
import Order from "../../models/Order";
import { Money } from "../../models/Money";
import { ResponseException } from "../../exception/ResponseException";
import { PrismaClient } from "@prisma/client";
import { Product } from "../../generated/prisma";

const prisma = new PrismaClient();

class OrderService {
  async createOrder(
    request: CreateOrderReqModel,
  ): Promise<Order | ResponseException> {
    try {
      const products: Product[] = await prisma.product.findMany({
        where: {
          productId: {
            in: request.items.map((item) => item.productId),
          },
        },
      });

      const items: Item[] = [];

      for (const item of request.items) {
        const product = products.find((p) => p.productId === item.productId);

        if (!product) {
          throw new ResponseException("Product not found", 404);
        }

        items.push(
          new Item(
            product.productId,
            item.quantity,
            Money.fromCents(product.unitPrice, "BRL"),
            product.category,
          ),
        );
      }

      const order = new Order(items);

      return DiscountEngine.calculateAndApplyDiscounts(order);
    } catch (error) {
      if (error instanceof ResponseException) return error;
      throw new ResponseException("Internal server error", 500);
    }
  }
}
export default new OrderService();
