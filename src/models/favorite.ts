import type { FavoriteProduct, ProductVariants } from "@prisma/client";

export interface IFavoriteState {
  isLoading: boolean;
  items: ProductVariants[];

  setFavorite: (items: IFavoriteItems[] | null) => void;
  toggleFavorite: (id: string) => Promise<void>;
  clearFavorite: () => Promise<void>;
}
// export interface IFavoriteResponse {
//   favoriteProducts: ProductVariants[];
// }
export interface IFavoriteItems extends FavoriteProduct {
  productVariant: ProductVariants;
}
