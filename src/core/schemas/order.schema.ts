import { z } from "zod";
import { discountSchema } from "./discount.schema";
import { itemSchema } from "./item.schema";
import { productReqSchema } from "./product.schema";

export const createOrderReqSchema = z.object({
  items: z.array(productReqSchema),
});

export const createOrderResSchema = z.object({
  items: z.array(itemSchema),
  discounts: z.array(discountSchema),
  total: z.number(),
});

export type CreateOrderReqModel = z.infer<typeof createOrderReqSchema>;
export type CreateOrderResModel = z.infer<typeof createOrderResSchema>;
