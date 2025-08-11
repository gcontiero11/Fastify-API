import { z } from "zod";
import { itemSchema } from "./item.schema";
import { appliedDiscountResSchema } from "./discount.schema";

export const quoteSchema = z.object({
  currency: z.string(),
  items: z.array(itemSchema),
  discounts: z.array(appliedDiscountResSchema),
  quoteKey: z.string(),
  validUntil: z.date(),
  total: z.number(),
  subtotal: z.number(),
});

export type QuoteResModel = z.infer<typeof quoteSchema>;
