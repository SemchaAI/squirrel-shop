"use client";
import { PenBoxIcon } from "lucide-react";
import dynamic from "next/dynamic";

import { Modal } from "@/components/features/modal/Modal";
import { useModal } from "@/utils/hooks/useModal";

import type { IVariationsWithOptions } from "@/models/product";

interface IProps {
  id: string;
  variations: IVariationsWithOptions[];
}

const OptionsForm = dynamic(
  () =>
    import("@/components/entities/(admin)/forms/OptionsForm").then(
      (mod) => mod.OptionsForm,
    ),
  {
    ssr: false,
    loading: () => <div className="p-4">Loading form...</div>,
  },
);

export const OptionsModal = ({ variations, id }: IProps) => {
  const { close, open, isOpen } = useModal();

  return (
    <>
      <div className="relative flex">
        <button
          type="button"
          onClick={open}
          className="aspect-square h-5 w-5 cursor-pointer rounded-md transition-colors hover:text-primary"
        >
          <PenBoxIcon size={20} className="text-primary" />
        </button>
      </div>
      <Modal isOpen={isOpen} onClose={close} title="Product Options">
        <div className="flex max-w-5xl min-w-150 flex-grow flex-col overflow-y-auto">
          <OptionsForm id={id} variations={variations} closeModal={close} />
        </div>
      </Modal>
    </>
  );
};
