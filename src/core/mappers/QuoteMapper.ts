import Quote from "../domain/Quote";
import { Prisma } from "@prisma/client";
import ItemMapper from "./ItemMapper";
import AppliedDiscountsMapper from "./AppliedDiscountsMapper";
import { QuoteResModel } from "../schemas/quote.schema";

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
      validUntil: quote.validUntil,
      subtotal: quote.subtotal.toDecimal(),
      total: quote.total.toDecimal(),
    };
  }
}

export default new QuoteMapper();
