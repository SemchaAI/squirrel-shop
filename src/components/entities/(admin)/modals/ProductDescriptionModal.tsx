"use client";
import { PenBoxIcon } from "lucide-react";

import { Modal } from "@/components/features";
import { useModal } from "@/utils/hooks";
import { Tooltip } from "@/components/shared";
import { ProductDescriptionForm } from "@/components/entities";

import type { ProductDescription } from "@prisma/client";

interface IProps {
  id: string;
  description: ProductDescription[] | undefined;
}

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
