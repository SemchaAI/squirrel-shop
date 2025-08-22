"use client";
import { useEffect } from "react";
import { useCartStore } from "@/utils/hooks/store/useCartStore";
import { useFavoriteStore } from "@/utils/hooks/store/useFavoriteStore";

import type { ICartItem } from "@/models/cart";
import type { IFavoriteItems } from "@/models/favorite";

export const LayoutInitializer = ({
  cart,
  favorite,
}: {
  cart: ICartItem[] | null;
  favorite: IFavoriteItems[] | null;
}) => {
  const setCart = useCartStore((state) => state.setCart);
  const setFavorite = useFavoriteStore((state) => state.setFavorite);

  useEffect(() => {
    if (cart) setCart(cart);
  }, [cart, setCart]);
  useEffect(() => {
    setFavorite(favorite);
  }, [favorite, setFavorite]);

  return null;
};
