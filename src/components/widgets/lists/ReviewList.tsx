"use client";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";

import { Button } from "@/components/shared/buttons/Button";
import { ReviewCard } from "@/components/entities/cards/ReviewCard";
import { useReview } from "@/utils/hooks/query/useReview";

import type { IProductReview } from "@/models/review";

interface ReviewListProps {
  productId: string;
  reviews: IProductReview[];
}

export const ReviewList = ({ reviews, productId }: ReviewListProps) => {
  const [enabled, setEnabled] = useState(false);
  const { data, isLoading, fetchNextPage, hasNextPage } = useReview(
    productId,
    reviews,
  );
  const reviewsList = data?.pages.flat() ?? [];

  const clickHandler = () => {
    if (!enabled) setEnabled(true);
    fetchNextPage();
  };

  if (!reviewsList.length)
    return (
      <div className="flex h-45 flex-col items-center justify-center gap-4 rounded-md bg-ui">
        No reviews
      </div>
    );

  return (
    <div className="flex grow flex-col gap-4">
      <ul className="flex flex-col gap-2">
        {reviewsList.map((review) => {
          return (
            <ReviewCard
              className="animate-fade-in-down"
              key={review.id}
              review={review}
            />
          );
        })}
      </ul>
      {hasNextPage ? (
        <Button
          variant="primary"
          className="mx-auto w-33"
          disabled={isLoading}
          onClick={clickHandler}
        >
          {isLoading ? (
            <span className="flex items-center justify-between">
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> Loading...
            </span>
          ) : (
            "Load More"
          )}
        </Button>
      ) : (
        <span className="mx-auto flex h-10.5 w-fit items-center justify-center rounded-md bg-primary p-2 text-center text-on-primary">
          No more reviews
        </span>
      )}
    </div>
  );
};
