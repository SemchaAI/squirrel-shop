"use client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useModal } from "@/utils/hooks/useModal";
import { Modal } from "@/components/features/modal/Modal";
import { Button } from "@/components/shared/buttons/Button";

import type { IResponse } from "@/models/response";

interface IProps<T extends number | string> {
  id: T;
  button: React.ReactNode;
  title?: string;
  confirmText?: string;
  redirectUrl?: string;
  onDelete: (id: T) => Promise<IResponse>;
}

export const DeleteModal = <T extends number | string>({
  button,
  title = "Delete item?",
  confirmText = "Are you sure you want to delete this item?",
  onDelete,
  redirectUrl,
  id,
}: IProps<T>) => {
  const { close, open, isOpen } = useModal();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const { isSuccess, message } = await onDelete(id);
      if (isSuccess) {
        toast.success(message);
        close();
        if (redirectUrl) router.push(redirectUrl);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("[DeleteModal]", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="flex cursor-pointer items-center justify-center"
      >
        {button}
      </button>
      <Modal title={title} isOpen={isOpen} onClose={close}>
        <div className="flex flex-col gap-4 border-t border-border p-4">
          <p className="text-base">{confirmText}</p>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
};
