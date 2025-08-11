import Order from "../domain/Order";
import { CreateOrderResModel } from "../schemas/order.schema";
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
}

export default new OrderMapper();
