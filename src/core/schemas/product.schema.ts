import { z } from "zod";

export const productReqSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
});

export type ProductReqModel = z.infer<typeof productReqSchema>;
