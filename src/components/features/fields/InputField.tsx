"use client";
import { memo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Eye, EyeOff, X } from "lucide-react";

import { Input } from "@/components/shared";
import type { IField } from "@/models/inputs";

const InputFieldComponent = ({
  id,
  label,
  autoComplete,
  type,
  hidden,
  placeholder = label,
  defaultValue,
  EyeIcon,
  Icon,
  // asNumber = false,
  ...rest
}: IField) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const rawValue = useWatch({ name: id }) || "";
  const error = errors[id]?.message as string;
  const [currType, setCurrType] = useState(type);

  const onClickClear = () => {
    setValue(id, "");
  };

  return (
    <div className={`${hidden ? "hidden" : "flex min-w-60 flex-col gap-px"}`}>
      <label className="pl-2 text-xs text-text-high" htmlFor={id}>
        {label}:
      </label>
      <div className="group relative flex">
        {Icon && (
          <Icon className="pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 transition-colors group-focus-within:stroke-primary-hover" />
        )}
        <Input
          id={id}
          type={currType}
          {...register(id)}
          className="w-full pt-2.5 pr-8 pb-2.5 pl-10 transition-colors focus:border-primary-hover"
          {...rest}
          placeholder={placeholder}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
        />
        {EyeIcon && (
          <button
            className="absolute right-3 flex translate-y-1/2"
            onClick={() =>
              setCurrType((prev) => (prev === "text" ? "password" : "text"))
            }
            type="button"
          >
            {currType === "text" ? (
              <Eye className="cursor-pointer transition-colors hover:stroke-primary-hover focus:stroke-primary-hover" />
            ) : (
              <EyeOff className="cursor-pointer transition-colors hover:stroke-primary-hover focus:stroke-primary-hover" />
            )}
          </button>
        )}
        {!EyeIcon && rawValue && type !== "date" ? (
          <X
            className="absolute right-2 flex translate-y-1/2 cursor-pointer transition-colors hover:stroke-primary-hover focus:stroke-primary-hover"
            onClick={onClickClear}
            role="button"
          />
        ) : null}
      </div>
      <div className="flex h-6 items-center pl-2 text-xs text-error">
        {error}
      </div>
    </div>
  );
};

// asNumber
//   ? {
//       setValueAs: (value) =>
//         value === "" ? undefined : parseInt(value),
//     }
//   : {},

export const InputField = memo(InputFieldComponent);
InputField.displayName = "InputField";
