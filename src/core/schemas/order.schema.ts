import { z } from "zod";
import { appliedDiscountResSchema, discountSchema } from "./discount.schema";
import { itemResSchema } from "./item.schema";
import { productReqSchema } from "./product.schema";

export const createOrderReqSchema = z.object({
  requestedProducts: z.array(productReqSchema),
});

export const createOrderResSchema = z.object({
  currency: z.string(),
  items: z.array(itemResSchema),
  discounts: z.array(appliedDiscountResSchema),
  total: z.number(),
  subtotal: z.number(),
});

export type CreateOrderReqModel = z.infer<typeof createOrderReqSchema>;
export type CreateOrderResModel = z.infer<typeof createOrderResSchema>;
