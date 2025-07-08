"use client";
import { useEffect } from "react";

export default function CategoryError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error caught in error.tsx:", error);
  }, [error]);

  return (
    //2x h-[calc(100dvh-160px)] of header for similarity
    <div className="flex h-[calc(100dvh-160px)] flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold">Something went wrong.</h1>
      <p className="mt-2">{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
