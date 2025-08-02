import { z } from "zod";

export const CategorySchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 characters long" })
    .max(25, { message: "Name must be at most 30 characters long" }),
  slug: z
    .string()
    .min(5, { message: "Slug must be at least 5 characters long" })
    .max(25, { message: "Slug must be at most 30 characters long" }),
  image: z
    .custom<File[]>()
    .transform((val: FileList | File[]) =>
      Array.isArray(val) ? val : Array.from(val),
    )
    .refine((files: File[]) => {
      const types = ["image/png", "image/webp"];
      return files.every((file) => types.includes(file.type));
    }, "Invalid file type")
    .refine(
      (files: File[]) => files.every((file) => file.size <= 1024 * 1024),
      "Each file must be <= 1MB",
    )
    .optional(),
});

export type TCategorySchema = z.infer<typeof CategorySchema>;
