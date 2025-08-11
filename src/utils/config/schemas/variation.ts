import { z } from "zod";

export const VariationSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(15, { message: "Name must be at most 15 characters long" }),
});
export type TVariationSchema = z.infer<typeof VariationSchema>;

export const VariationOptionSchema = z.object({
  value: z
    .string()
    .min(1, { message: "Name must be at least 3 characters long" })
    .max(15, { message: "Name must be at most 15 characters long" }),
  hexCode: z.string().optional(),
  variationId: z.string(),
});
export type TVariationOptionSchema = z.infer<typeof VariationOptionSchema>;
