import type { AppliedDiscountInfos } from "../schemas/discountSchemas.ts";
import type Discount from "./Discount.ts";

class Item {
  private readonly productId: string;
  private readonly quantity: number;
  private readonly unitPrice: number;
  private readonly category: string;
  private itemDiscounts: AppliedDiscountInfos[];
  private subtotal: number;
  private total: number;

  constructor(
    productId: string,
    quantity: number,
    unitPrice: number,
    category: string,
  ) {
    this.productId = productId;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.category = category;
    this.subtotal = unitPrice * quantity;
    this.total = this.subtotal;
    this.itemDiscounts = [];
  }

  getProductId(): string {
    return this.productId;
  }

  getSubtotal(): number {
    return this.subtotal;
  }
  setSubtotal(subtotal: number): void {
    this.subtotal = subtotal;
  }

  getQuantity(): number {
    return this.quantity;
  }
  getUnitPrice(): number {
    return this.unitPrice;
  }
  getCategory(): string {
    return this.category;
  }
  getItemDiscounts(): AppliedDiscountInfos[] {
    return this.itemDiscounts;
  }
  getTotal(): number {
    return this.total;
  }
  setTotal(total: number): void {
    this.total = total;
  }
  addAppliedDiscount(appliedDiscount: AppliedDiscountInfos): void {
    this.itemDiscounts.push(appliedDiscount);
  }
}
export default Item;

