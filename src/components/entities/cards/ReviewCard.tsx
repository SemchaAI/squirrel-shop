import Image from "next/image";
import { memo } from "react";

import { StarRating } from "@/components/entities/product/StarRating";
import type { IProductReview } from "@/models/review";
import clsx from "clsx";

interface IProps {
  review: IProductReview;
  className?: string;
}

const ReviewCardComponent = ({ review, className }: IProps) => {
  const { user, rating, advantages, disadvantages, comment, createdAt } =
    review;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <li className={clsx(className, "flex gap-2 border-b border-border pl-2")}>
      <Image
        src={user.avatar || "/static/images/avatar.png"}
        alt={user.name}
        width={40}
        height={40}
        className="h-10 w-10 shrink-0 rounded-full"
      />
      <div className="flex min-w-0 grow flex-col gap-2">
        <div className="flex h-10 flex-wrap items-center justify-between">
          <span className="truncate font-bold">{user.name}</span>
          <div className="flex flex-col-reverse items-center sm:flex-row sm:gap-1">
            <span className="w-full text-end text-sm whitespace-nowrap text-text-low">
              {formattedDate}
            </span>
            <StarRating rating={rating} size={20} />
          </div>
        </div>

        <div className="space-y-1 py-2 text-sm break-words">
          <p>
            <span className="font-semibold">Advantages:</span> {advantages}
          </p>
          <p>
            <span className="font-semibold">Disadvantages:</span>{" "}
            {disadvantages}
          </p>
          <p>
            <span className="font-semibold">Comment:</span> {comment}
          </p>
        </div>
      </div>
    </li>
  );
};
export const ReviewCard = memo(ReviewCardComponent);
ReviewCard.displayName = "ReviewCard";
