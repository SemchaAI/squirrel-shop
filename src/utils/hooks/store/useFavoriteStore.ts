import { create } from "zustand";
import toast from "react-hot-toast";

import { ProductVariants } from "@prisma/client";
import { fetcher } from "@/utils/helpers";
import { API_ROUTES } from "@/utils/config";

import type { IDataResponse } from "@/models/response";
import type { IFavoriteState } from "@/models/favorite";

export const useFavoriteStore = create<IFavoriteState>()((set, get) => ({
  isLoading: true,
  items: [],
  // ok
  setFavorite: (data) => {
    if (data === null) {
      set({ isLoading: false });
      return;
    }
    const items = data.map((item) => item.productVariant);
    set({ items, isLoading: false });
  },
  toggleFavorite: async (id: string) => {
    const isLoading = get().isLoading;
    if (isLoading) {
      toast.loading("Wait for full load favorite", { duration: 2000 });
      return;
    }
    const isFavorite = get().items.some((item) => item.id === id);

    try {
      let res: IDataResponse<ProductVariants[] | null> = {
        data: [],
        message: "",
        isSuccess: false,
      };
      if (isFavorite) {
        res = await fetcher<IDataResponse<ProductVariants[] | null>>(
          `${API_ROUTES.FAVORITE}/${id}`,
          { method: "DELETE" },
        );
      } else {
        res = await fetcher<IDataResponse<ProductVariants[] | null>>(
          API_ROUTES.FAVORITE,
          {
            method: "POST",
            body: JSON.stringify({ id }),
          },
        );
      }

      // const items = res.data.favoriteProducts.map(
      //   (item) => item.productVariantId,
      // );
      // console.log("res items", items);
      set({ items: res.data || [] });
    } catch (error) {
      console.log("[toggleFavorite]", error);
      toast.error(`${error}`);
    }
  },
  //tmp
  clearFavorite: async () => {
    try {
      await fetcher<IDataResponse<null>>(API_ROUTES.FAVORITE, {
        method: "DELETE",
      });
      set({ items: [] });
    } catch (error) {
      console.log("[clearFavorite]", error);
      toast.error(`${error}`);
    }
  },
}));
