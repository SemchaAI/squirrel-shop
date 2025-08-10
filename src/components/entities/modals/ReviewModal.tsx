"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { PenBoxIcon } from "lucide-react";

import { Modal } from "@/components/features/modal/Modal";
import { useModal } from "@/utils/hooks/useModal";
import { Button } from "@/components/shared/buttons/Button";
import { ROUTES } from "@/utils/config/routes/routes";

import type { Session } from "next-auth";

interface IProps {
  productId: string;
  session: Session | null;
}

const ReviewForm = dynamic(
  () =>
    import("@/components/entities/forms/ReviewForm").then(
      (mod) => mod.ReviewForm,
    ),
  {
    ssr: false,
    loading: () => <div className="p-4">Loading form...</div>,
  },
);

export const ReviewModal = ({ productId, session }: IProps) => {
  const { close, open, isOpen } = useModal();
  const isUser = session && session?.user.role !== "GUEST";

  return (
    <>
      <div className="relative flex">
        {isUser ? (
          <Button
            className="gap-2"
            type="button"
            variant="ghost"
            onClick={open}
          >
            Write a review <PenBoxIcon size={20} />
          </Button>
        ) : (
          <Link href={ROUTES.SIGNIN}>
            <Button className="gap-2" type="button" variant="ghost">
              Write a review <PenBoxIcon size={20} />
            </Button>
          </Link>
        )}
      </div>
      <Modal isOpen={isOpen} onClose={close} title="Write a review">
        <div className="w-[calc(100dvw-2rem)] max-w-2xl border-t border-border px-1 py-4 sm:px-2">
          <ReviewForm productId={productId} closeModal={close} />
        </div>
      </Modal>
    </>
  );
};
