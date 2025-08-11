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
      return new ResponseException("Error while saving quote", 500);
    }
  }
}

export default new QuoteRepository();
