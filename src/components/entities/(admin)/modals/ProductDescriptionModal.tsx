"use client";
import dynamic from "next/dynamic";
import { PenBoxIcon } from "lucide-react";

import { Modal } from "@/components/features/modal/Modal";
import { useModal } from "@/utils/hooks/useModal";
import { Tooltip } from "@/components/shared/tooltip/Tooltip";

import type { ProductDescription } from "@prisma/client";

interface IProps {
  id: string;
  description: ProductDescription[] | undefined;
}

const ProductDescriptionForm = dynamic(
  () =>
    import("@/components/entities/(admin)/forms/ProductDescriptionForm").then(
      (mod) => mod.ProductDescriptionForm,
    ),
  {
    ssr: false,
    loading: () => <div className="p-4">Loading form...</div>,
  },
);

export const ProductDescriptionModal = ({ id, description }: IProps) => {
  const { close, open, isOpen } = useModal();

  return (
    <>
      <div className="relative">
        <Tooltip position="topLeft" content="Modify product description">
          <button
            onClick={open}
            className="aspect-square h-8 w-8 rounded-md bg-ui p-1.5 transition-colors hover:text-primary"
          >
            <PenBoxIcon size={20} />
          </button>
        </Tooltip>
      </div>
      <Modal isOpen={isOpen} onClose={close} title="Product Description">
        <div className="flex max-w-5xl border-t border-border">
          <div className="flex min-w-150 flex-grow flex-col overflow-y-auto">
            <ProductDescriptionForm
              description={description}
              closeModal={close}
              id={id}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
