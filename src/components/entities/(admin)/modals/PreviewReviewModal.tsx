"use client";
import { EyeIcon } from "lucide-react";

import { Modal } from "@/components/features/modal/Modal";
import { useModal } from "@/utils/hooks/useModal";

import { ReviewCard } from "../../cards/ReviewCard";
import type { IProductReview } from "@/models/review";

interface IProps {
  review: IProductReview;
}

export const PreviewReviewModal = ({ review }: IProps) => {
  const { close, open, isOpen } = useModal();

  return (
    <>
      <div className="relative flex">
        <button
          type="button"
          onClick={open}
          aria-label="Preview review"
          className="aspect-square cursor-pointer rounded-full bg-app p-1.5 transition-colors hover:text-primary"
        >
          <EyeIcon size={20} />
        </button>
      </div>
      <Modal isOpen={isOpen} onClose={close} title="Product Options">
        <div className="flex max-w-5xl border-t border-border">
          <div className="flex min-w-150 flex-grow flex-col overflow-y-auto p-2">
            <div className="rounded-md bg-ui p-2 transition-none">
              <ReviewCard review={review} />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
