import { z } from "zod";

export const itemSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
  category: z.string(),
});

export type ItemInfos = z.infer<typeof itemSchema>;
