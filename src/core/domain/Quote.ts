import {
  AppliedDiscountInfos,
  AppliedDiscountResModel,
} from "../schemas/discount.schema";
import Item from "./Item";
import { v4 as uuidv4 } from "uuid";
import { Money } from "../utils/Money";

class Quote {
  public validUntil: Date = new Date(Date.now());
  constructor(
    public readonly currency: string = "BRL",
    public readonly subtotal: Money,
    public readonly total: Money,
    public readonly items: Item[],
    public readonly discounts: AppliedDiscountInfos[] = [],
    public readonly publicId: string = `QUOTE-${uuidv4()}`,
    validUntil?: Date,
  ) {
    this.currency = currency;
    this.subtotal = subtotal;
    this.total = total;
    this.items = items;
    this.discounts = discounts;
    this.publicId = publicId;
    if (validUntil) {
      this.validUntil = validUntil;
    } else {
      this.validUntil.setDate(this.validUntil.getDate() + 3);
    }
  }

  getDiscountsResponseModel(): AppliedDiscountResModel[] {
    return this.discounts.map((discount) => ({
      ...discount,
      fixed: discount.fixed.toDecimal(),
      amount: discount.amount.toDecimal(),
      basis: discount.basis.toDecimal(),
    }));
  }
}

export default Quote;
