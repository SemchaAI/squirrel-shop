"use client";
import { useEffect } from "react";
import { useCartStore, useFavoriteStore } from "../hooks";
import type { ICartItem } from "@/models/cart";
// import { ProductVariants } from "@prisma/client";
import { IFavoriteItems } from "@/models/favorite";
// import type { IFavoriteResponse } from "@/models/favorite";

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
