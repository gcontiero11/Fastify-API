import { z } from "zod";

const productSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
});

export const createOrderSchema = z.array(productSchema);

export type CreateOrderReqModel = z.infer<typeof createOrderSchema>;