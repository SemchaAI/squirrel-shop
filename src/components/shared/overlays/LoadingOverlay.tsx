"use client";
import { useOverlayStore } from "@/utils/hooks";
import { SquirrelIcon } from "lucide-react";

export const LoadingOverlay = () => {
  const isOverlayLoading = useOverlayStore((state) => state.isOverlayLoading);

  return isOverlayLoading ? (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-app/50">
      <div className="absolute top-0 left-0 h-1 w-full animate-pulse bg-primary" />
      <SquirrelIcon size={100} className="animate-pulse text-primary" />
    </div>
  ) : null;
};
