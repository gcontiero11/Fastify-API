import type {
  AppliedDiscountInfos,
  AppliedDiscountResModel,
} from "../schemas/discount.schema";
import type Item from "./Item";
import { Money } from "../utils/Money";

class Order {
  private readonly currency: string = "BRL";
  private readonly items: Item[];
  private readonly discounts: AppliedDiscountInfos[] = [];
  private total: Money = Money.fromCents(0, "BRL");
  private readonly subtotal: Money;

  constructor(items: Item[]) {
    this.items = items;
    this.subtotal = items.reduce(
      (acc, item) => item.getUnitPrice().multiply(item.getQuantity()).add(acc),
      Money.fromDecimal(0, "BRL"),
    );
  }

  getSubtotal(): Money {
    return this.subtotal;
  }
  getItems(): Item[] {
    return this.items;
  }
  getTotal(): Money {
    return this.total;
  }
  setTotal(total: Money): void {
    this.total = total;
  }
  addAppliedDiscount(appliedDiscount: AppliedDiscountInfos): void {
    this.discounts.push(appliedDiscount);
  }

  getOrderDiscounts(): AppliedDiscountInfos[] {
    return this.discounts;
  }

  getOrderDiscountsResponseModel(): AppliedDiscountResModel[] {
    return this.discounts.map((discount) => ({
      ...discount,
      fixed: discount.fixed.toDecimal(),
      basis: discount.basis.toDecimal(),
      amount: discount.amount.toDecimal(),
    }));
  }
}
export default Order;
