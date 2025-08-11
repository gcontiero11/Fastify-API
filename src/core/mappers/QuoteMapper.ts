import Quote from "../domain/Quote";
import {
  AppliedDiscount as PrismaAppliedDiscount,
  Item as PrismaItem,
  Prisma,
} from "@prisma/client";
import ItemMapper from "./ItemMapper";
import AppliedDiscountsMapper from "./AppliedDiscountsMapper";
import { QuoteResModel } from "../schemas/quote.schema";
import { Quote as PrismaQuote } from "@prisma/client";
import { Money } from "../utils/Money";

class QuoteMapper {
  toPrisma(quote: Quote): Prisma.QuoteCreateInput {
    return {
      quoteKey: quote.quoteKey,
      validUntil: quote.validUntil,
      subtotal: quote.subtotal.getAmount(),
      total: quote.total.getAmount(),
      appliedDiscounts: {
        create: quote.discounts.map((discount) =>
          AppliedDiscountsMapper.toPrisma(discount),
        ),
      },
      items: {
        create: quote.items.map((item) => ItemMapper.toPrisma(item)),
      },
    };
  }

  toResModel(quote: Quote): QuoteResModel {
    return {
      currency: quote.currency,
      items: quote.items.map((item) => ItemMapper.toResModel(item)),
      discounts: quote.getDiscountsResponseModel(),
      quoteKey: quote.quoteKey,
      validUntil: `${quote.validUntil.getDate()}-${quote.validUntil.getMonth()}-${quote.validUntil.getFullYear()}`,
      subtotal: quote.subtotal.toDecimal(),
      total: quote.total.toDecimal(),
    };
  }

  toDomain(
    quote: PrismaQuote,
    items: PrismaItem[],
    discountsAtItems: PrismaAppliedDiscount[],
    discountsAtQuote: PrismaAppliedDiscount[],
  ): Quote {
    return new Quote(
      Money.fromCents(quote.subtotal, "BRL"),
      Money.fromCents(quote.total, "BRL"),
      items.map((item) => {
        const discountAppliedInThisItem = discountsAtItems.filter(
          (discount) => discount.itemId === item.id,
        );
        return ItemMapper.toDomain(item, discountAppliedInThisItem);
      }),
      discountsAtQuote.map((discount) =>
        AppliedDiscountsMapper.toDomain(discount),
      ),
      quote.quoteKey,
      quote.validUntil,
    );
  }
}

export default new QuoteMapper();
