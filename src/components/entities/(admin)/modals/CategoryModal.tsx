"use client";
import dynamic from "next/dynamic";
import { PlusIcon } from "lucide-react";

import { Modal } from "@/components/features/modal/Modal";
import { useModal } from "@/utils/hooks/useModal";
import { Tooltip } from "@/components/shared/tooltip/Tooltip";
import type { TCategorySchema } from "@/utils/config/schemas/category";

const CategoryForm = dynamic(
  () =>
    import("@/components/entities/(admin)/forms/CategoryForm").then(
      (mod) => mod.CategoryForm,
    ),
  {
    ssr: false,
    loading: () => <div className="p-4">Loading form...</div>,
  },
);

interface IProps {
  id?: string;
  title: string;
  defaultValues?: TCategorySchema;
}

export const CategoryModal = ({ title, id, defaultValues }: IProps) => {
  const { close, open, isOpen } = useModal();

  return (
    <>
      <div className="relative">
        <Tooltip position="topLeft" content={title}>
          <button
            onClick={open}
            className="aspect-square h-8 w-8 cursor-pointer rounded-md bg-ui p-1.5 transition-colors hover:text-primary"
          >
            <PlusIcon size={20} />
          </button>
        </Tooltip>
      </div>
      <Modal isOpen={isOpen} onClose={close} title={title}>
        <div className="flex max-w-5xl border-t border-border">
          <div className="flex min-w-150 flex-grow flex-col overflow-y-auto sm:w-150">
            <CategoryForm
              id={id}
              closeModal={close}
              defaultValues={defaultValues}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
