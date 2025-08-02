"use client";
import { useState } from "react";
import toast from "react-hot-toast";

import { Modal } from "@/components/features/modal/Modal";
import { UploadDropzone } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { useModal } from "@/utils/hooks";
// import { PlusIcon } from "lucide-react";
import { TFileRoutes } from "@/utils/config/routes/uploadthing";

enum Tabs {
  upload = "upload",
  select = "select",
}

interface MediaModalProps {
  id: string;
  uploadEndpoint: TFileRoutes;
  onUploadComplete?: () => void;
  children?: (props: { id: string; closeModal: () => void }) => React.ReactNode;
  button: React.ReactNode;
}
export const MediaModal = ({
  id,
  uploadEndpoint,
  onUploadComplete,
  children,
  button,
}: MediaModalProps) => {
  const router = useRouter();
  const { close, open, isOpen } = useModal();
  const [tab, setTab] = useState<Tabs>(Tabs.upload);
  return (
    <>
      <button
        className="relative flex cursor-pointer items-center"
        type="button"
        onClick={open}
      >
        {button}
      </button>
      <Modal isOpen={isOpen} onClose={close} title="Media Manager">
        <div className="flex min-h-167.5 max-w-5xl border-t border-border">
          <aside className="w-50 border-r border-border bg-ui px-2">
            <nav className="flex flex-col gap-2">
              {Object.values(Tabs).map((type) => (
                <button
                  key={type}
                  onClick={() => setTab(type)}
                  className={`hover:bg-muted rounded px-2 py-1 text-left text-sm transition ${
                    tab === type ? "bg-muted font-semibold text-primary" : ""
                  }`}
                >
                  {type === "upload" ? "Upload Media" : "Select Media"}
                </button>
              ))}
            </nav>
          </aside>

          <div className="flex min-w-150 flex-grow flex-col overflow-y-auto">
            {tab === "upload" && (
              <div className="flex h-155 flex-col gap-4 p-4">
                <UploadDropzone
                  className="h-155 w-full max-w-full cursor-pointer rounded-md border border-border transition-colors hover:border-primary"
                  endpoint={uploadEndpoint}
                  appearance={{
                    container: ({ isDragActive }) => {
                      return isDragActive
                        ? "bg-primary-soft border-primary"
                        : "bg-ui ";
                    },
                    uploadIcon: "text-primary-hover",
                    button: "bg-primary text-white py-1.5 px-3 cursor-pointer",
                  }}
                  input={{ id }}
                  onClientUploadComplete={() => {
                    toast.success("Uploaded");
                    onUploadComplete?.();
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
            {tab === "select" &&
              children &&
              children({ id, closeModal: close })}
          </div>
        </div>
      </Modal>
    </>
  );
};
