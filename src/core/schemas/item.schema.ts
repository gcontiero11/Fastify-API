import { z } from "zod";
import { appliedDiscountResSchema } from "./discount.schema";

export const itemSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
  category: z.string(),
});

export type ItemInfos = z.infer<typeof itemSchema>;

export const itemResSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
  subtotal: z.number(),
  category: z.string(),
  itemDiscounts: z.array(appliedDiscountResSchema),
});

export type ItemResModel = z.infer<typeof itemResSchema>;
