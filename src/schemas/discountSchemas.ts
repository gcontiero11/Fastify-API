import { z } from "zod";

export const discountSchema = z.object({
  code: z.string(),
  name: z.string(),
  fixed: z.number().default(0),
  rate: z.number().default(0)
});

export type DiscountInfos = z.infer<typeof discountSchema>;

export const appliedDiscountSchema = z.object({
  code: z.string(),
  name: z.string(),
  fixed: z.number().default(0),
  rate: z.number().default(0),
  basis: z.number(),
  amount: z.number(),
  metadata: z.any()
});

export type AppliedDiscountInfos = z.infer<typeof appliedDiscountSchema>;