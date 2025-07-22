"use client";
import dynamic from "next/dynamic";
import { PlusIcon } from "lucide-react";

import { Modal } from "@/components/features/modal/Modal";
import { useModal } from "@/utils/hooks/useModal";
import { Tooltip } from "@/components/shared/tooltip/Tooltip";

const ProductForm = dynamic(
  () =>
    import("@/components/entities/(admin)/forms/ProductForm").then(
      (mod) => mod.ProductForm,
    ),
  {
    ssr: false,
    loading: () => <div className="p-4">Loading form...</div>,
  },
);

export const CreateProductModal = () => {
  const { close, open, isOpen } = useModal();

  return (
    <>
      <div className="relative">
        <Tooltip position="topLeft" content="Add new product">
          <button
            onClick={open}
            className="aspect-square h-8 w-8 rounded-md bg-ui p-1.5 transition-colors hover:text-primary"
          >
            <PlusIcon size={20} />
          </button>
        </Tooltip>
      </div>
      <Modal isOpen={isOpen} onClose={close} title="Create Product">
        <div className="flex max-w-5xl border-t border-border">
          <div className="flex min-w-150 flex-grow flex-col overflow-y-auto">
            <ProductForm closeModal={close} />
          </div>
        </div>
      </Modal>
    </>
  );
};
