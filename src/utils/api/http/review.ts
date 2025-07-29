import { fetcher } from "@/utils/helpers/fetcher";
import { API_ROUTES } from "@/utils/config/routes/api";

import type { IDataResponse } from "@/models/response";
import type { IProductReview } from "@/models/review";
import type { TReviewSchema } from "@/utils/config/schemas";

interface IProduct {
  productId: string;
  page: number;
}

export const createReview = async (
  productId: string,
  data: TReviewSchema,
): Promise<IDataResponse<null>> => {
  const res = await fetcher<IDataResponse<null>>(
    `${API_ROUTES.PRODUCT_REVIEW}?productId=${productId}`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
  return res;
};

export async function getReviews({ productId, page }: IProduct) {
  const res = await fetcher<IDataResponse<IProductReview[] | null>>(
    `${API_ROUTES.PRODUCT_REVIEW}?page=${page}&productId=${productId}`,
  );
  if (!res.isSuccess || !res.data) throw new Error(res.message);
  return res.data;
}
