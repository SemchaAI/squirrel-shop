import type { TOrderSchema } from "@/utils/config";

import { CartProduct, ProductVariants } from "@prisma/client";

export interface IOrder extends TOrderSchema {
  items: IOrderItem[];
  userId: string;
}

export interface IOrderItem extends CartProduct {
  productVariant: Pick<
    ProductVariants,
    "id" | "title" | "price" | "previousPrice" | "previewImage" | "sku"
  >;
}
export interface ISerializedStripeOrderItem {
  id: string;
  quantity: number;
  productVariantId: string;
  cartId: string;
  productVariant: IOrderItem["productVariant"];
}
