"use client";
import clsx from "clsx";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import { updateReviewStatus } from "@/actions/AdminReview";
import { Select } from "@/components/shared/inputs/Select";

import type { IProductReview } from "@/models/review";
import type { IOption } from "@/models/inputs";
import { ReviewStatus } from "@prisma/client";

interface IProps {
  review: IProductReview;
}

export const UpdateStatusReview = ({ review }: IProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onChangeHandler = async (option: IOption | IOption[] | undefined) => {
    if (!option) return toast.error("Please select an option");
    const currentOption = Array.isArray(option) ? option[0] : option;
    const newStatus = currentOption.value as ReviewStatus;
    try {
      await updateReviewStatus({
        reviewId: review.id,
        newStatus,
      });
      toast.success("Review status updated");
    } catch (error) {
      toast.error("Something went wrong!");
      console.log("[UpdateStatusReview]", error);
    }
  };
  return (
    <div
      className={clsx(
        "text-sm font-semibold",
        review.status === "APPROVED" ? "text-success" : "text-warning",
      )}
    >
      <Select
        placeholder={review.status}
        value={{
          label: review.status,
          value: review.status,
        }}
        options={[
          { value: "PENDING", label: "PENDING" },
          { value: "APPROVED", label: "APPROVED" },
          { value: "REJECTED", label: "REJECTED" },
        ]}
        onChange={onChangeHandler}
        menuPortalTarget={isMounted ? document.body : undefined}
      />
    </div>
  );
};
