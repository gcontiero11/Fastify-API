import type { CreateOrderReqModel } from "../../schemas/orderSchemas.ts";
import DiscountEngine from "../utils/DiscountEngine.ts";
import { products } from "../../db/products.ts";
import Item from "../../models/Item.ts";
import Order from "../../models/Order.ts";

class OrderService {
  createOrder(request: CreateOrderReqModel) {
    const items = request.items.map(item => {
      const product = products.find(product => product.productId === item.productId);
      if (!product) {
        throw new Error("Product not found");
      }
      return new Item(product.productId, item.quantity, product.unitPrice, product.category);
    });
    const subTotal = items.reduce((acc, item) => acc + item.getUnitPrice() * item.getQuantity(), 0);
    const order = new Order(items, subTotal);

    return DiscountEngine.calculateAndApplyDiscounts(order);
  }
}
export default new OrderService();  