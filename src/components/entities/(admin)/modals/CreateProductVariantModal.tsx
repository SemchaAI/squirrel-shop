"use client";
import { PlusIcon } from "lucide-react";

import { Modal } from "@/components/features";
import { useModal } from "@/utils/hooks";
import { Tooltip } from "@/components/shared";
import { CreateProductVariantForm } from "@/components/entities";

export const CreateProductVariantModal = ({ id }: { id: string }) => {
  const { close, open, isOpen } = useModal();

  return (
    <>
      <div className="relative">
        <Tooltip position="topLeft" content="Add product variant">
          <button
            onClick={open}
            className="aspect-square h-8 w-8 rounded-md bg-ui p-1.5 transition-colors hover:text-primary"
          >
            <PlusIcon size={20} />
          </button>
        </Tooltip>
      </div>
      <Modal isOpen={isOpen} onClose={close} title="Create Product Variant">
        <div className="flex max-w-5xl border-t border-border">
          <div className="flex min-w-150 flex-grow flex-col overflow-auto">
            {/* <ProductForm closeModal={close} /> */}
            <CreateProductVariantForm id={id} closeModal={close} />
          </div>
        </div>
      </Modal>
    </>
  );
};
