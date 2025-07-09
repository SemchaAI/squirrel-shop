import { API_ROUTES } from "@/utils/config";
import type { IDataResponse, IProductResponse } from "@/models/response";
import type { IRedactProductReq } from "@/models/requests";
import type { ProductVariants } from "@prisma/client";

export async function redactProduct(
  slug: string,
  data: IRedactProductReq,
): Promise<IProductResponse> {
  //on db with prism no data == null
  const res = await fetch(`${API_ROUTES.PRODUCT}/${slug}`, {
    method: "PUT",
    body: JSON.stringify({
      ...data,
      previousPrice: data.previousPrice ? data.previousPrice : null,
      seoTitle: data.seoTitle ? data.seoTitle : null,
    }),
  });
  if (!res.ok) throw new Error("Product wasn`t updated");
  return res.json();
}
export const searchProducts = async (
  query: string,
): Promise<IDataResponse<ProductVariants[]>> => {
  const res = await fetch(
    `${API_ROUTES.SEARCH}?q=${encodeURIComponent(query)}`,
  );
  if (!res.ok) throw new Error("Failed to fetch search results");
  return res.json();
};
