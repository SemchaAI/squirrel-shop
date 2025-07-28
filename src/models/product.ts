import type {
  ProductVariants,
  ProductVariantsOptions,
  VariationOptions,
  Variations,
} from "@prisma/client";

export interface IOption extends ProductVariantsOptions {
  variationOption: { hexCode: string | null };
}

export interface IOptions {
  slug: string;
  stock: number;
  options: IOption[];
}
export type VariationValue = {
  variationOptionValue: string;
  slug: string;
  stock: number;
  hexCode?: string | null;
  isCurrent: boolean;
};
export interface IVariationsWithOptions extends Variations {
  options: VariationOptions[];
}

export interface IProductCard extends ProductVariants {
  product: { reviewCount: number; averageRating: number };
}
