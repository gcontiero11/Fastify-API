import Quote from "../domain/Quote";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class QuoteRepository {
  async save(quote: Quote): Promise<Quote> {
    const persistedQuote = await prisma.quote.create({
      data: {
        publicId: quote.getPublicId(),
        validUntil: quote.getValidUntil(),
        items: {
          create: quote.getItems().map((item) => ({
            productId: item.getProductId(),
            quantity: item.getQuantity(),
            subtotal: item.getSubtotal().getAmount(),
            total: item.getTotal().getAmount(),
            product: {
              connect: {
                productId: item.getProductId(),
                publicId: quote.getPublicId(),
              },
            },
          })),
        },
      },
    });
    return quote;
  }
}

export default new QuoteRepository();
