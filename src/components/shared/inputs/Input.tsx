import { forwardRef } from "react";
import type { IInput } from "@/models/inputs";

export const Input = forwardRef<HTMLInputElement, IInput>(
  ({ className = "", rounded, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`${
          rounded ? "rounded-full p-1 pl-8" : "rounded-md p-2"
        } border-border text-text-primary border bg-background outline-none ${className}`}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
