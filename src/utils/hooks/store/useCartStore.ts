import { create } from "zustand";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

import { fetcher } from "@/utils/helpers";
import { API_ROUTES } from "@/utils/config";

import type { CartState, ICartItem, ICartResponse } from "@/models/cart";
import type { IDataResponse } from "@/models/response";
import type { Session } from "next-auth";

export const useCartStore = create<CartState>()((set, get) => ({
  isLoading: true,
  totalAmount: 0,
  counter: 0,
  items: [],
  // ok
  setCart: (items: ICartResponse["cartProducts"]) => {
    const total = items.reduce(
      (acc, item) => acc + item.quantity * item.productVariant.price,
      0,
    );
    const count = items.reduce((acc, item) => acc + item.quantity, 0);

    set({
      items,
      counter: count,
      totalAmount: total,
      isLoading: false,
    });
  },
  // ok
  addToCart: async (id: string, quantity: number, session: Session | null) => {
    set({ isLoading: true });
    try {
      // const session = await getSession();
      if (!session?.user) {
        await signIn("credentials", { redirect: false }, "anon=true");
      }
      const { data } = await fetcher<IDataResponse<ICartResponse>>(
        API_ROUTES.CART,
        {
          method: "POST",
          body: JSON.stringify({ id, quantity }),
        },
      );

      const totalAmount = data.cartProducts.reduce((acc, item) => {
        return acc + item.productVariant.price * item.quantity;
      }, 0);
      set({
        isLoading: false,
        items: data.cartProducts,
        totalAmount,
        counter: data.cartProducts.length,
      });
    } catch (error) {
      console.log("[addToCart]", error);
      toast.error(`${error}`);
    } finally {
      set({ isLoading: false });
    }
  },
  // ok
  removeFromCart: async (id: string) => {
    set({ isLoading: true });
    try {
      const { data } = await fetcher<IDataResponse<ICartResponse>>(
        `${API_ROUTES.CART}/${id}`,
        {
          method: "DELETE",
        },
      );

      const totalAmount = data.cartProducts.reduce((acc, item) => {
        return acc + item.productVariant.price * item.quantity;
      }, 0);
      set({
        isLoading: false,
        items: data.cartProducts,
        totalAmount: totalAmount,
        counter: data.cartProducts.length,
      });
      console.log("cart", get().items);
    } catch (error) {
      console.log("[removeFromCart]", error);
      toast.error(`${error}`);
    } finally {
      set({ isLoading: false });
    }
  },
  // tmp
  changeQuantity: async (id: string, quantity: number) => {
    set({ isLoading: true });
    try {
      const { data, isSuccess, message } = await fetcher<
        IDataResponse<ICartItem>
      >(API_ROUTES.CART, {
        // IDataResponse<ICartResponse>
        method: "PATCH",
        body: JSON.stringify({ id, quantity }),
      });
      if (!isSuccess) throw new Error(message);
      const currentItems = get().items;
      const updatedItems = currentItems.map((item) =>
        item.id === data.id ? data : item,
      );
      const totalAmount = updatedItems.reduce((acc, item) => {
        return acc + item.productVariant.price * item.quantity;
      }, 0);

      set({
        items: updatedItems,
        totalAmount,
        isLoading: false,
      });
    } catch (error) {
      console.log("[changeQuantity]", error);
      toast.error(`${error}`);
    } finally {
      set({ isLoading: false });
    }
  },
  //tmp
  clearCart: async () => {
    try {
      await fetcher<IDataResponse<null>>(API_ROUTES.CART, { method: "DELETE" });
      set({
        items: [],
        totalAmount: 0,
        counter: 0,
        isLoading: false,
      });
    } catch (error) {
      // fetcher response is string
      console.log("[clearCart]", error);
      toast.error(`${error}`);
    } finally {
      set({ isLoading: false });
    }
  },
}));
