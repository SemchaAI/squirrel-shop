import type { ProductReview, User } from "@prisma/client";

export interface IProductReview extends ProductReview {
  user: Pick<User, "name" | "avatar">;
}
