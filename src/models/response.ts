import type { Category, Product, ProductVariantsOptions } from "@prisma/client";
import type { ProductImage, ProductVariants } from "@prisma/client";

export interface IResponse {
  isSuccess: boolean;
  message: string;
}

export interface IDataResponse<T> extends IResponse {
  data: T;
}

export interface IProductResponse extends ProductVariants {
  product: Product & {
    categories: Category[];
  };
  images: ProductImage[];
  options: ProductVariantsOptions[];
}
