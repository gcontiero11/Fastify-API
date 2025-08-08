export class Money {
  private readonly amount: number;
  private readonly currency: string;

  private constructor(amount: number, currency: string) {
    if (!Number.isInteger(amount)) {
      throw new Error("Amount must be stored as an integer (in cents)");
    }
    if (!currency || currency.length !== 3) {
      throw new Error("Currency must be a 3-letter ISO code");
    }
    this.amount = amount;
    this.currency = currency.toUpperCase();
  }

  static fromDecimal(value: number, currency: string): Money {
    return new Money(Math.round(value * 100), currency);
  }

  static fromCents(cents: number, currency: string): Money {
    return new Money(cents, currency);
  }

  getAmount(): number {
    return this.amount;
  }

  toDecimal(): number {
    return this.amount / 100;
  }

  getCurrency(): string {
    return this.currency;
  }

  add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amount + other.amount, this.currency);
  }

  subtract(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amount - other.amount, this.currency);
  }

  multiply(factor: number): Money {
    return new Money(Math.round(this.amount * factor), this.currency);
  }

  format(locale: string = 'pt-BR'): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: this.currency,
    }).format(this.toDecimal());
  }

  private assertSameCurrency(other: Money) {
    if (this.currency !== other.currency) {
      throw new Error("Cannot operate on Money values with different currencies");
    }
  }
}