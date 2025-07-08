import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" })
    .max(20, { message: "Password must be at most 255 characters long" }),
});
export type TSignInSchema = z.infer<typeof SignInSchema>;

export const SignUpSchema = SignInSchema.extend({
  name: z
    .string()
    .min(5, { message: "Name must be at least 3 characters long" })
    .max(20, { message: "Name must be at most 20 characters long" }),
  confirmPassword: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" })
    .max(20, { message: "Password must be at most 255 characters long" }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  }
});
export type TSignUpSchema = z.infer<typeof SignUpSchema>;

const normalizePhone = (phone: string): string => phone.replace(/\D/g, ""); // remove all non-digit characters

const isValidMDPhone = (raw: string): boolean => {
  const phone = normalizePhone(raw);

  // Local: 060123456 (9 digits, starts with 0 and 60–69)
  const localMatch = /^0(60|61|62|67|68|69)\d{6}$/.test(phone);

  // International: +37360123456 => 37360xxxxxx
  const intlMatch = /^373(60|61|62|67|68|69)\d{6}$/.test(phone);

  return localMatch || intlMatch;
};

// const phoneRegexMD = /^(?:\+373|0)(60|61|62|67|68|69)\d{6}$/;

export const OrderSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name must be at least 3 characters long" })
    .max(20, { message: "Name must be at most 20 characters long" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(7, { message: "Phone number must be at least 7 digits" })
    .refine(isValidMDPhone, { message: "Invalid phone number" }),
  comment: z.string().optional(),
});
export type TOrderSchema = z.infer<typeof OrderSchema>;

export const ProductVariantSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Name must be at least 5 characters long" })
    .max(35, { message: "Name must be at most 30 characters long" }),
  seoTitle: z.string().optional(),
  sku: z.string().min(3, { message: "Sku must be at least 3 characters long" }),
  price: z.coerce
    .number({ invalid_type_error: "Price must be a number" })
    .positive({ message: "Price must be greater than 0" }),

  previousPrice: z.coerce.number().min(0).optional(),
  stock: z.coerce.number().min(0, { message: "Stock must be at least 0" }),
  categories: z
    .array(z.string())
    .min(1, { message: "At least one category is required" }),
  visible: z.boolean(),
});
export type TProductVariantSchema = z.infer<typeof ProductVariantSchema>;

export const ProductSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Name must be at least 5 characters long" })
    .max(35, { message: "Name must be at most 30 characters long" }),
});
export type TProductSchema = z.infer<typeof ProductSchema>;

export const CreateProductVariantSchema = z.object({
  slug: z
    .string()
    .min(5, { message: "Slug must be at least 5 characters long" }),
  title: z
    .string()
    .min(5, { message: "Name must be at least 5 characters long" })
    .max(35, { message: "Name must be at most 30 characters long" }),
  seoTitle: z.string().optional(),
  sku: z.string().min(3, { message: "Sku must be at least 3 characters long" }),
  price: z.coerce
    .number({ invalid_type_error: "Price must be a number" })
    .positive({ message: "Price must be greater than 0" }),

  previousPrice: z.coerce.number().min(0).optional(),
  stock: z.coerce.number().min(0, { message: "Stock must be at least 0" }),
});
export type TCreateProductVariantSchema = z.infer<
  typeof CreateProductVariantSchema
>;

// product description
const DescriptionSchema = z.object({
  title: z.string().min(1, "Title required"),
  description: z.string().min(1, "Description required"),
  id: z.string().optional(),
});
export const ProductDescriptionSchema = z.object({
  info: z
    .array(DescriptionSchema)
    .min(1, "At least one characteristic is required"),
});
export type TProductDescriptionSchema = z.infer<
  typeof ProductDescriptionSchema
>;
//prod options
// const OptionSchema = z.object({
//   label: z.string().min(1, "Variation name is required"),
//   value: z.string().min(1, "Option value is required"),
// });
export const ProductOptionsSchema = z.object({
  label: z.string().min(1, "Variation name is required"),
  value: z.string().min(1, "Option value is required"),
});
export type TProductOptionsSchema = z.infer<typeof ProductOptionsSchema>;
