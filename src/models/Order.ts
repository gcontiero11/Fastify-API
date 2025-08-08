import type { AppliedDiscountInfos } from "../schemas/discountSchemas.ts";
import type Item from "./Item.ts";

class Order {
  private readonly currency: string = "BRL";
  private readonly items: Item[];
  private readonly discounts: AppliedDiscountInfos[] = [];
  private total: number = 0;
  private readonly subtotal: number;

  constructor(items: Item[], subtotal: number) {
    this.items = items;
    this.subtotal = subtotal;
  }

  getSubtotal(): number {
    return this.subtotal;
  }
  getItems(): Item[] {
    return this.items;
  }
  getTotal(): number {
    return this.total;
  }
  setTotal(total: number): void {
    this.total = total;
  }
  addAppliedDiscount(appliedDiscount: AppliedDiscountInfos): void {
    this.discounts.push(appliedDiscount);
  }

  getOrderDiscounts(): AppliedDiscountInfos[] {
    return this.discounts;
  }
}
export default Order;