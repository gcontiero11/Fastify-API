import type { CreateOrderReqModel } from "../schemas/orderSchemas.ts";

class DiscountEngine {
  calculateDiscount(order: CreateOrderReqModel) {
    return 0;
  }
}

export default new DiscountEngine();