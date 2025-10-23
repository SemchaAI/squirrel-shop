import { ProductVariants, ProductVariantsOptions } from "@prisma/client";

export interface IAttributeInput {
  name: string;
  value: string;
  count: {
    variationOptionValue: number;
  };
  hexCode: string | null;
}
export interface IAttributesResponse {
  name: string;
  values: IAttributeInput[];
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
