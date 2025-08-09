import type { CreateOrderReqModel } from "../../schemas/orderSchemas";
import DiscountEngine from "../utils/DiscountEngine";
import { products } from "../../db/products";
import Item from "../../models/Item";
import Order from "../../models/Order";
import { Money } from "../../models/Money";
import { ResponseException } from "../../exception/ResponseException";

class OrderService {
  createOrder(request: CreateOrderReqModel): Order | ResponseException {
    try {
      const items = request.items.map((item) => {
        const product = products.find(
          (product) => product.productId === item.productId,
        );
        if (!product) {
          throw new ResponseException("Product not found", 404);
        }
        return new Item(
          product.productId,
          item.quantity,
          Money.fromDecimal(product.unitPrice, "BRL"),
          product.category,
        );
      });
      const subTotal = items.reduce(
        (acc, item) =>
          item.getUnitPrice().multiply(item.getQuantity()).add(acc),
        Money.fromDecimal(0, "BRL"),
      );
      const order = new Order(items, subTotal);

      return DiscountEngine.calculateAndApplyDiscounts(order);
    } catch (error) {
      if (error instanceof ResponseException) return error;
      throw new ResponseException("Internal server error", 500);
    }
  }
}
export default new OrderService();
