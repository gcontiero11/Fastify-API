import type { CreateOrderReqModel } from "../schemas/order.schema";
import DiscountEngine from "../services/DiscountEngine";
import Item from "../domain/Item";
import Order from "../domain/Order";
import { Money } from "../utils/Money";
import { ResponseException } from "../../exception/ResponseException";
import type { Product } from "@prisma/client";
import ProductRepository from "../repositories/ProductRepository";

class OrderService {
  async createOrder(
    request: CreateOrderReqModel,
  ): Promise<Order | ResponseException> {
    try {
      const products: Product[] = await ProductRepository.findByProductIds(
        request.items.map((item) => item.productId),
      );

      if (products.length !== request.items.length) {
        throw new ResponseException("Product not found", 404);
      }

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
