import type { ProductVariants } from "@prisma/client";
import type { Session } from "next-auth";

export interface ICartItem {
  id: string;
  quantity: number;
  productVariantId: string;
  productVariant: ProductVariants;
}

export interface CartState {
  isLoading: boolean;
  totalAmount: number;
  counter: number;
  items: ICartItem[];

  setCart: (items: ICartItem[]) => void;
  addToCart: (
    id: string,
    quantity: number,
    session: Session | null,
  ) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  changeQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export interface ICartResponse {
  cartProducts: ICartItem[];
}
// export interface ICartPQResponse {
//   cartProduct: ICartItem;
// }
// export interface ICartResponse {
//   cartProducts: ICartItem[];
//   totalAmount: number;
//   counter: number;
// }
export interface IAddCartProduct {
  id: string;
  quantity: number;
}
