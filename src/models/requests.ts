import { TProductVariantSchema } from "@/utils/config";

export interface IRedactProductReq extends TProductVariantSchema {
  categories: string[];
}
