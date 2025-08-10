import { PrismaClient, Product } from "@prisma/client";

class ProductRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findByProductIds(productIds: string[]): Promise<Product[]> {
    if (productIds.length === 0) {
      return [];
    }

    return this.prisma.product.findMany({
      where: {
        productId: { in: productIds },
      },
    });
  }
}

export default new ProductRepository();
