import {
  AppliedDiscountInfos,
  AppliedDiscountResModel,
} from "../schemas/discount.schema";
import Item from "./Item";
import { v4 as uuidv4 } from "uuid";
import { Money } from "../utils/Money";

class Quote {
  public validUntil: Date = new Date(Date.now());
  public currency: string;
  constructor(
    public readonly subtotal: Money,
    public readonly total: Money,
    public readonly items: Item[],
    public readonly discounts: AppliedDiscountInfos[] = [],
    public readonly quoteKey: string = `QUOTE-${uuidv4()}`,
    validUntil?: Date,
    currency?: string,
  ) {
    this.currency = currency || "BRL";
    this.subtotal = subtotal;
    this.total = total;
    this.items = items;
    this.discounts = discounts;
    this.quoteKey = quoteKey;
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
