import {
  AppliedDiscount as PrismaAppliedDiscount,
  Prisma,
} from "@prisma/client";
import { AppliedDiscountInfos } from "../schemas/discount.schema";
import { Money } from "../utils/Money";

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

  toDomain(appliedDiscount: PrismaAppliedDiscount): AppliedDiscountInfos {
    return {
      code: appliedDiscount.code,
      name: appliedDiscount.name,
      fixed: Money.fromCents(appliedDiscount.fixed, "BRL"),
      rate: appliedDiscount.rate,
      basis: Money.fromCents(appliedDiscount.basis, "BRL"),
      amount: Money.fromCents(appliedDiscount.amount, "BRL"),
      metadata: appliedDiscount.metadata,
    };
  }
}

export default new AppliedDiscountsMapper();
