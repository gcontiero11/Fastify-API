import type {
  AppliedDiscountInfos,
  AppliedDiscountResModel,
} from "../schemas/discount.schema";
import { Money } from "../utils/Money";

class Item {
  private readonly productId: string;
  private readonly quantity: number;
  private readonly unitPrice: Money;
  private readonly category: string;
  private itemDiscounts: AppliedDiscountInfos[];
  private subtotal: Money;
  private total: Money;

  constructor(
    productId: string,
    quantity: number,
    unitPrice: Money,
    category: string,
    itemDiscounts: AppliedDiscountInfos[] = [],
  ) {
    this.productId = productId;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.category = category;
    this.subtotal = unitPrice.multiply(quantity);
    this.total = this.subtotal;
    this.itemDiscounts = itemDiscounts;
  }

  getProductId(): string {
    return this.productId;
  }

  getSubtotal(): Money {
    return this.subtotal;
  }
  setSubtotal(subtotal: Money): void {
    this.subtotal = subtotal;
  }

  getQuantity(): number {
    return this.quantity;
  }
  getUnitPrice(): Money {
    return this.unitPrice;
  }
  getCategory(): string {
    return this.category;
  }

  getItemDiscounts(): AppliedDiscountInfos[] {
    return this.itemDiscounts;
  }

  getItemDiscountsResponseModel(): AppliedDiscountResModel[] {
    return this.itemDiscounts.map((discount) => ({
      ...discount,
      fixed: discount.fixed.toDecimal(),
      basis: discount.basis.toDecimal(),
      amount: discount.amount.toDecimal(),
    }));
  }
  getTotal(): Money {
    return this.total;
  }
  setTotal(total: Money): void {
    this.total = total;
  }
  addAppliedDiscount(appliedDiscount: AppliedDiscountInfos): void {
    this.itemDiscounts.push(appliedDiscount);
  }
}
export default Item;
