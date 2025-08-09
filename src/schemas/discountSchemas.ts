import { z } from "zod";
import type { Money } from "../models/Money";

export const discountSchema = z.object({
  code: z.string(),
  name: z.string(),
  fixed: z.custom<Money>(),
  rate: z.number().default(0),
});

export type DiscountInfos = z.infer<typeof discountSchema>;

export const appliedDiscountSchema = z.object({
  code: z.string(),
  name: z.string(),
  fixed: z.custom<Money>(),
  rate: z.number().default(0),
  basis: z.custom<Money>(),
  amount: z.custom<Money>(),
  metadata: z.any(),
});

export type AppliedDiscountInfos = z.infer<typeof appliedDiscountSchema>;

export const appliedDiscountResSchema = z.object({
  code: z.string(),
  name: z.string(),
  fixed: z.number().default(0),
  rate: z.number().default(0),
  basis: z.number(),
  amount: z.number(),
  metadata: z.any(),
});

export type AppliedDiscountResModel = z.infer<typeof appliedDiscountResSchema>;
