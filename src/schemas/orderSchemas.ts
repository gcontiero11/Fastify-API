import { z } from "zod";
import { discountSchema } from "./discountSchemas";

const itemSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
  category: z.string(),
});

export type ItemInfos = z.infer<typeof itemSchema>;

const productSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
});
export const createOrderSchema = z.object({
  items: z.array(productSchema),
});

export type CreateOrderReqModel = z.infer<typeof createOrderSchema>;

const createOrderResModel = z.object({
  items: z.array(itemSchema),
  discounts: z.array(discountSchema),
  total: z.number(),
});

export type CreateOrderResModel = z.infer<typeof createOrderResModel>;
