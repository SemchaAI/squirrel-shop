"use client";
import { useForm } from "react-hook-form";
import { Loader2Icon, Mail, MapIcon, User2Icon } from "lucide-react";
// import toast from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "./Form";
import { InputField } from "@/components/features/fields/InputField";
import { StarRatingField } from "@/components/features/fields/StarRatingField";
import { Button } from "@/components/shared/buttons/Button";
import { useSubmitReview } from "@/utils/hooks/query/useSubmitReview";
import { ReviewSchema } from "@/utils/config/schemas";

import type { TReviewSchema } from "@/utils/config/schemas";

interface IProps {
  productId: string;
  closeModal: () => void;
}

export const ReviewForm = ({ productId, closeModal }: IProps) => {
  const form = useForm({
    resolver: zodResolver(ReviewSchema),
  });

  const { mutate, isPending } = useSubmitReview(productId);

  const submitHandler = async (data: TReviewSchema) => {
    // console.log("data", data, productId);
    mutate(data);
    closeModal();
  };

  return (
    <Form className="max-w-full" form={form} onSubmit={submitHandler}>
      {
        // inputs
        <div className="flex flex-col gap-2">
          <StarRatingField label="Rating" name="rating" />
          <InputField
            id="advantages"
            label="Advantages"
            type="text"
            Icon={Mail}
          />
          <InputField
            id="disadvantages"
            label="Disadvantages"
            type="text"
            Icon={User2Icon}
          />
          <InputField id="comment" label="Comment" type="text" Icon={MapIcon} />
          <Button type="submit">
            {isPending ? (
              <div className="flex items-center gap-1">
                Sending... <Loader2Icon className="animate-spin" />
              </div>
            ) : (
              "Send"
            )}
          </Button>
        </div>
      }
    </Form>
  );
};
