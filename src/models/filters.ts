import { ProductVariants, ProductVariantsOptions } from "@prisma/client";

export interface IAttributeInput {
  variationOptionValue: string;
  variationName: string;
  variationOption: { hexCode: string | null };
}

export interface IAttributeOutput {
  name: string;
  values: IAttributeValue[];
}
export interface IAttributeValue {
  value: string;
  hexCode: string | null;
}

///
interface ProductVariantWithOptions extends ProductVariants {
  options: ProductVariantsOptions[];
}
export interface IFilteredCategory {
  data: ProductVariantWithOptions[];
  meta: IMeta;
}
export interface IMeta {
  total: number;
  totalPages: number;
  perPage: number;
  pageNumber: number;
}
