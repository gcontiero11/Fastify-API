import { Prisma } from "@prisma/client";
import { AppliedDiscountInfos } from "../schemas/discount.schema";

class AppliedDiscountsMapper {
  toPrisma(
    appliedDiscount: AppliedDiscountInfos,
  ):
    | Prisma.AppliedDiscountCreateWithoutQuoteInput
    | Prisma.AppliedDiscountCreateWithoutItemInput {
    return {
      name: appliedDiscount.name,
      fixed: appliedDiscount.fixed.getAmount(),
      rate: appliedDiscount.rate,
      basis: appliedDiscount.basis.getAmount(),
      amount: appliedDiscount.amount.getAmount(),
      discount: {
        connect: {
          code: appliedDiscount.code,
        },
      },
      metadata: appliedDiscount.metadata,
    };
  }
}

export default new AppliedDiscountsMapper();
