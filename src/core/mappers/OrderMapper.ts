import Order from "../domain/Order";
import Quote from "../domain/Quote";
import { CreateOrderResModel } from "../schemas/order.schema";
import AppliedDiscountsMapper from "./AppliedDiscountsMapper";
import ItemMapper from "./ItemMapper";

class OrderMapper {
  toResModel(order: Order): CreateOrderResModel {
    return {
      currency: order.getCurrency(),
      items: order.getItems().map((item) => ItemMapper.toResModel(item)),
      discounts: order.getOrderDiscountsResponseModel(),
      subtotal: order.getSubtotal().toDecimal(),
      total: order.getTotal().toDecimal(),
    };
  }

  toResModelFromQuote(quote: Quote): CreateOrderResModel {
    return {
      currency: quote.currency,
      items: quote.items.map((item) => ItemMapper.toResModel(item)),
      discounts: quote.getDiscountsResponseModel(),
      subtotal: quote.subtotal.toDecimal(),
      total: quote.total.toDecimal(),
    };
  }
}

export default new OrderMapper();
