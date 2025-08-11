import { Prisma } from "@prisma/client";
import Item from "../domain/Item";
import AppliedDiscountsMapper from "./AppliedDiscountsMapper";
import { ItemResModel } from "../schemas/item.schema";

class ItemMapper {
  toPrisma(item: Item): Prisma.ItemCreateWithoutQuoteInput {
    return {
      quantity: item.getQuantity(),
      subtotal: item.getSubtotal().getAmount(),
      total: item.getTotal().getAmount(),
      category: item.getCategory(),
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
}

export default new ItemMapper();
