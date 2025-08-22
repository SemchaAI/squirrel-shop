import { forwardRef } from "react";
import { Check, X } from "lucide-react";
import type { ICheckbox } from "@/models/inputs";
import clsx from "clsx";

export const Checkbox = forwardRef<HTMLInputElement, ICheckbox>(
  (
    {
      id,
      name,
      label,
      value,
      onChange,
      checked,
      endAdornment,
      disabled,
      error,
    },
    ref,
  ) => {
    const inputId = id || name; //`${name}-${value}`
    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="checkbox"
          onChange={(e) => onChange?.(e.target.checked)}
          checked={checked}
          value={value}
          id={inputId}
          className="sr-only"
          disabled={disabled}
          name={name}
        />
        <label
          htmlFor={inputId}
          className={clsx(
            "flex cursor-pointer items-center gap-2 text-sm transition-opacity select-none",
            disabled && "cursor-not-allowed opacity-50",
            error && "text-error",
          )}
        >
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-lg border p-0.5 transition-colors ${
              checked
                ? "border-primary bg-primary text-white"
                : "border-border bg-on-primary"
            } ${error ? "border-error" : ""}`}
          >
            {checked && !disabled && <Check role="status" size={18} />}
            {disabled && <X role="status" size={18} className="text-error" />}
          </div>
          {label}
        </label>
        {endAdornment}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
