import { z } from "zod";
import { itemResSchema } from "./item.schema";
import { appliedDiscountResSchema } from "./discount.schema";

export const quoteResSchema = z.object({
  currency: z.string(),
  items: z.array(itemResSchema),
  discounts: z.array(appliedDiscountResSchema),
  quoteKey: z.string(),
  validUntil: z.string(),
  total: z.number(),
  subtotal: z.number(),
});

export type QuoteResModel = z.infer<typeof quoteResSchema>;
