import {
  Prisma,
  Item as PrismaItem,
  AppliedDiscount as PrismaAppliedDiscount,
} from "@prisma/client";
import Item from "../domain/Item";
import AppliedDiscountsMapper from "./AppliedDiscountsMapper";
import { ItemResModel } from "../schemas/item.schema";
import { Money } from "../utils/Money";

class ItemMapper {
  toPrisma(item: Item): Prisma.ItemCreateWithoutQuoteInput {
    return {
      quantity: item.getQuantity(),
      subtotal: item.getSubtotal().getAmount(),
      total: item.getTotal().getAmount(),
      category: item.getCategory(),
      unitPrice: item.getUnitPrice().getAmount(),
      product: {
        connect: {
          productId: item.getProductId(),
        },
      },
      appliedDiscounts: {
        create: item
          .getItemDiscounts()
          .map((discount) => AppliedDiscountsMapper.toPrisma(discount)),
      },
    };
  }

  toResModel(item: Item): ItemResModel {
    return {
      productId: item.getProductId(),
      unitPrice: item.getUnitPrice().toDecimal(),
      quantity: item.getQuantity(),
      subtotal: item.getSubtotal().toDecimal(),
      category: item.getCategory(),
      itemDiscounts: item.getItemDiscountsResponseModel(),
    };
  }

  toDomain(item: PrismaItem, discounts: PrismaAppliedDiscount[]): Item {
    return new Item(
      item.productId,
      item.quantity,
      Money.fromCents(item.unitPrice, "BRL"),
      item.category,
      discounts.map((discount) => AppliedDiscountsMapper.toDomain(discount)),
      Money.fromCents(item.subtotal, "BRL"),
      Money.fromCents(item.total, "BRL"),
    );
  }
}

export default new ItemMapper();
