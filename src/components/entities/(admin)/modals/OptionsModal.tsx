"use client";
import { PenBoxIcon } from "lucide-react";

import { Modal } from "@/components/features";
import { useModal } from "@/utils/hooks";
import { OptionsForm } from "@/components/entities";
import type { IVariationsWithOptions } from "@/models/product";

interface IProps {
  id: string;
  variations: IVariationsWithOptions[];
}

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
        <div className="flex max-w-5xl border-t border-border">
          <div className="flex min-w-150 flex-grow flex-col overflow-y-auto">
            <OptionsForm id={id} variations={variations} closeModal={close} />
          </div>
        </div>
      </Modal>
    </>
  );
};
