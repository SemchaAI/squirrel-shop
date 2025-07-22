"use client";
import { useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { Input } from "@/components/shared/inputs/Input";

interface OtpInputProps {
  name: string;
  length?: number;
  onComplete?: (code: string) => void;
}

export const OtpField: React.FC<OtpInputProps> = ({
  name,
  length = 6,
  onComplete,
}) => {
  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext();

  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Track as array of characters
  const rawValue = useWatch({ name }) || "";
  const values: string[] = Array.from(
    { length },
    (_, i) => rawValue?.[i] || "",
  );

  const error = errors[name]?.message as string;

  // // Ensure initial value is set
  // useEffect(() => {
  //   if (!rawValue) {
  //     setValue(name, "".padEnd(length, ""));
  //   }
  // }, [rawValue, setValue, length, name]);

  const handleChange = (char: string, index: number) => {
    if (!/^\d?$/.test(char)) return;

    const updated = [...values];
    updated[index] = char;
    const newValue = updated.join("");

    setValue(name, newValue);

    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    const key = e.key;

    if (key === "Backspace") {
      if (!values[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length); // only digits
    const chars = paste.split("");

    chars.forEach((char, i) => {
      inputRefs.current[i]?.focus();
      const event = new Event("input", { bubbles: true });
      inputRefs.current[i]!.value = char;
      inputRefs.current[i]?.dispatchEvent(event);
    });

    const newValue = chars.join("");
    setValue(name, newValue);

    if (chars.length === length && onComplete) {
      onComplete(newValue);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between gap-2">
        {Array.from({ length }).map((_, i) => (
          <Input
            key={i}
            type="text"
            autoComplete="one-time-code"
            inputMode="numeric"
            pattern="\d*"
            maxLength={1}
            className="h-12 w-10 bg-app text-center focus:border-primary focus:shadow-[0px_3px_6px_0px] focus:shadow-primary"
            value={values[i]}
            onBeforeInput={(e) => {
              if (!/^\d$/.test(e.data || "")) e.preventDefault();
            }}
            onChange={(e) => handleChange(e.target.value, i)}
            onPaste={handlePaste}
            onKeyDown={(e) => handleKeyDown(e, i)}
            ref={(el) => {
              if (el) inputRefs.current[i] = el;
            }}
          />
        ))}

        {/* This is still important for RHF to register the field */}
        <input type="hidden" {...register(name)} />
      </div>
      <div className="flex h-6 items-center pl-2 text-xs text-error">
        {error}
      </div>
    </div>
  );
};
