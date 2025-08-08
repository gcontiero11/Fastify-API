import type { AppliedDiscountInfos, DiscountInfos } from "../schemas/discountSchemas.ts";
import { Money } from "./Money.ts";

class Discount {
  private readonly code: string;
  private readonly name: string;
  private readonly fixed: Money;
  private readonly rate: number;

  constructor(discount: DiscountInfos) {
    this.code = discount.code;
    this.name = discount.name;
    this.fixed = discount.fixed;
    this.rate = discount.rate;
  }

  applyInto(basis: Money): AppliedDiscountInfos {
    const amount = this.isFixedDiscount() ? this.applyFixed(basis) : this.applyRate(basis);
    console.log(`Applying discount ${this.code} from ${basis} to ${amount} with rate ${this.rate} and fixed ${this.fixed}`);
    return {
      code: this.code,
      name: this.name,
      fixed: this.fixed,
      rate: this.rate,
      basis: basis,
      amount: amount,
      metadata: {}
    };
  }

  private isFixedDiscount(): boolean {
    return this.fixed.getAmount() > 0;
  }

  private applyFixed(value: Money): Money {
    return value.subtract(this.fixed);
  }

  private applyRate(value: Money): Money {
    return value.multiply(1 - this.rate);
  }

  getCode(): string {
    return this.code;
  }

  getName(): string {
    return this.name;
  }

  getFixed(): Money {
    return this.fixed;
  }

  getRate(): number {
    return this.rate;
  }
}

export default Discount;