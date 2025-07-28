import { useInfiniteQuery } from "@tanstack/react-query";

import { queryKeys } from "@/utils/api/queryKeys";
import { getReviews } from "@/utils/api/http/review";

import type { IProductReview } from "@/models/review";

export const useReview = (
  productId: string,
  initialReviews: IProductReview[],
  // enabled: boolean,
) => {
  return useInfiniteQuery({
    queryKey: queryKeys.review(productId),
    queryFn: async ({ pageParam = 1 }) =>
      getReviews({ productId, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const hasMore = lastPage.length > 0;
      return hasMore ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    initialData: {
      pageParams: [1],
      pages: [initialReviews],
    },
    refetchOnMount: false,
    enabled: !!productId,
  });
};
