"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { PlusIcon } from "lucide-react";

import { SelectMedia } from "@/components/features/(admin)/product/SelectMedia";
import { Modal } from "@/components/features/modal/Modal";
import { useModal } from "@/utils/hooks/useModal";
import { UploadDropzone } from "@/utils/uploadthing";

interface IProps {
  id: string;
}

export const ProductImagesModal = ({ id }: IProps) => {
  const router = useRouter();
  const { close, open, isOpen } = useModal();
  const [tab, setTab] = useState<"upload" | "select">("upload");
  return (
    <>
      <button
        type="button"
        onClick={open}
        className="bg-muted flex aspect-square h-full w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed hover:border-primary hover:text-primary"
      >
        <PlusIcon size={20} />
      </button>
      <Modal isOpen={isOpen} onClose={close} title="Product Images">
        <div className="flex min-h-167.5 max-w-5xl border-t border-border">
          {/* LEFT NAVIGATION */}
          <aside className="w-50 shrink-0 border-r border-border bg-ui px-2">
            <div className="mb-2 text-sm font-medium text-text-low uppercase">
              Media
            </div>
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => setTab("upload")}
                className={`hover:bg-muted rounded px-2 py-1 text-left text-sm transition ${
                  tab === "upload" ? "bg-muted font-semibold text-primary" : ""
                }`}
              >
                Upload Media
              </button>
              <button
                onClick={() => setTab("select")}
                className={`hover:bg-muted rounded px-2 py-1 text-left text-sm transition ${
                  tab === "select" ? "bg-muted font-semibold text-primary" : ""
                }`}
              >
                Select Media
              </button>
            </nav>
          </aside>

          {/* RIGHT CONTENT AREA */}
          <div className="flex min-w-150 flex-grow flex-col overflow-y-auto">
            <div className="flex-1 overflow-y-auto">
              {tab === "upload" && (
                <div className="flex h-155 flex-col gap-4 p-4">
                  <UploadDropzone
                    className="h-155 w-full max-w-full rounded-md border border-border transition-colors hover:border-primary"
                    endpoint="productImageUploader"
                    appearance={{
                      container: ({ isDragActive }) => {
                        return isDragActive
                          ? "bg-primary-soft border-primary"
                          : "bg-ui ";
                      },
                      uploadIcon: "text-primary-hover",
                      button:
                        "bg-primary text-white py-1.5 px-3 cursor-pointer",
                    }}
                    input={{ productVariantId: id }}
                    onClientUploadComplete={() => {
                      toast.success("Media uploaded successfully");
                      close();
                      router.refresh();
                    }}
                    onUploadAborted={() => {
                      toast.error("Media upload aborted");
                    }}
                    onUploadError={(err) => {
                      toast.error(err.message);
                    }}
                  />
                </div>
              )}
              {tab === "select" && <SelectMedia id={id} closeModal={close} />}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
