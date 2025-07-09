"use client";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Oops! Something broke.</h2>
        <p className="text-text-high">{error.message}</p>
        <button
          onClick={() => reset()}
          className="mt-4 rounded bg-error px-4 py-2 text-white"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
