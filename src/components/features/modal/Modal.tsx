"use client";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import clsx from "clsx";

import { useScrollControl } from "@/utils/hooks";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Modal = ({ isOpen, onClose, children, title }: IProps) => {
  useScrollControl(isOpen);
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return ReactDOM.createPortal(
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center p-2.5 transition-opacity duration-500",
        isOpen
          ? "visible opacity-100"
          : "pointer-events-none invisible opacity-0",
      )}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        role="dialog"
        className="relative z-10 h-fit max-h-dvh w-fit min-w-[320px] animate-modal rounded-xl border border-border bg-app shadow-lg"
      >
        {/* absolute top-4 right-4 */}
        <div className="flex items-center justify-between px-2 py-4">
          <p className="text-lg font-bold">{title}</p>
          <button
            type="button"
            onClick={onClose}
            className="group flex cursor-pointer justify-self-end transition-colors"
          >
            <X
              size={28}
              className="stroke-high-contrast transition-colors group-hover:stroke-primary"
            />
          </button>
        </div>

        {/* Scrollable Content  pr-2*/}
        <div className="customScrollbar max-h-[90dvh] overflow-y-auto border-t border-border">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

// export default Modal;
