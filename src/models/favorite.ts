// import type { FavoriteProduct } from "@prisma/client";
// import { IProductCard } from "./product";

export interface IFavoriteState {
  isLoading: boolean;
  items: IFavoriteItems[];

  setFavorite: (items: IFavoriteItems[] | null) => void;
  toggleFavorite: (id: string) => Promise<void>;
  clearFavorite: () => Promise<void>;
}

export interface IFavoriteItems {
  productVariantId: string;
}

// export interface IFavoriteItems extends FavoriteProduct {
//   productVariant: IProductCard;
// }
