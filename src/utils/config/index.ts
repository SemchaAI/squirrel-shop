export { ADMIN_ROUTES } from "./routes/adminRoutes";
export { ROUTES } from "./routes/routes";
export { API_ROUTES } from "./routes/api";
export { NavRoutes } from "./routes/nav";
export { ProtectedRoutes } from "./routes/protected";

//zod schemas
export { SignInSchema, type TSignInSchema } from "./schemas";
export { SignUpSchema, type TSignUpSchema } from "./schemas";
export { OrderSchema, type TOrderSchema } from "./schemas";
export { ProductVariantSchema, type TProductVariantSchema } from "./schemas";
export { ProductSchema, type TProductSchema } from "./schemas";
export {
  CreateProductVariantSchema,
  type TCreateProductVariantSchema,
} from "./schemas";
export { ProductOptionsSchema, type TProductOptionsSchema } from "./schemas";

export {
  ProductDescriptionSchema,
  type TProductDescriptionSchema,
} from "./schemas";

export { OtpSchema, type TOtpSchema } from "./schemas";

export { ForgotPasswordSchema, type TForgotPasswordSchema } from "./schemas";
export { ResetPasswordSchema, type TResetPasswordSchema } from "./schemas";

//mail
export { sendActivationMailHtml } from "./mail";
