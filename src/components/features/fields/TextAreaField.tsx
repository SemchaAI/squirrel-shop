"use client";
import { useFormContext } from "react-hook-form";

interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  className?: string;
  placeholder?: string;
}

export const TextAreaField = ({
  id,
  placeholder,
  className,
  ...props
}: IProps) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const value = watch(id);

  return (
    <div className="relative w-full">
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        {...register(id)}
        {...props}
        className={`min-h-[100px] w-full resize-none rounded-lg border border-border bg-app p-3 text-text-high outline-none focus:border-primary ${className || ""} `}
      />
      {errors[id] && (
        <p className="mt-1 text-sm text-error">
          {errors[id]?.message as string}
        </p>
      )}
    </div>
  );
};

TextAreaField.displayName = "TextAreaField";
