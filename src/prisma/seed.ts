import { PrismaClient } from "@prisma/client";
import { discounts } from "./discounts";
import { products } from "./products";

const prisma = new PrismaClient();

export async function resetDb() {
  await prisma.discount.deleteMany();
  await prisma.product.deleteMany();

  await prisma.discount.createMany({
    data: discounts.map((discount) => ({
      ...discount,
      fixed: discount.fixed.getAmount(),
    })),
  });
  await prisma.product.createMany({
    data: products.map((product) => ({
      ...product,
      unitPrice: product.unitPrice.getAmount(),
    })),
  });
}
