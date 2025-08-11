import Quote from "../domain/Quote";
import { PrismaClient } from "@prisma/client";
import { ResponseException } from "../../exception/ResponseException";
import QuoteMapper from "../mappers/QuoteMapper";

const prisma = new PrismaClient();

class QuoteRepository {
  async save(quote: Quote): Promise<Quote | ResponseException> {
    try {
      await prisma.quote.create({
        data: QuoteMapper.toPrisma(quote),
      });

      return quote;
    } catch (error) {
      console.log(error);
      if (error instanceof ResponseException) {
        return error;
      }

      return new ResponseException("Error while saving quote", 500);
    }
  }

  async findByQuoteKey(quoteKey: string): Promise<Quote | ResponseException> {
    try {
      const quote = await prisma.quote.findUnique({
        where: { quoteKey },
      });

      const discountsAtQuote = await prisma.appliedDiscount.findMany({
        where: {
          quoteId: quote?.id,
        },
      });

      const items = await prisma.item.findMany({
        where: {
          quoteId: quote?.id,
        },
      });

      const discountsAtItems = await prisma.appliedDiscount.findMany({
        where: {
          itemId: {
            in: items.map((item) => item.id),
          },
        },
      });

      if (!quote) {
        return new ResponseException("Quote not found", 404);
      }

      return QuoteMapper.toDomain(
        quote,
        items,
        discountsAtItems,
        discountsAtQuote,
      );
    } catch (error) {
      console.log(error);
      if (error instanceof ResponseException) {
        return error;
      }

      return new ResponseException("Error while finding quote", 500);
    }
  }
}

export default new QuoteRepository();
