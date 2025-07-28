"use client";
import { useController, useFormContext } from "react-hook-form";
import { StarRating } from "@/components/entities/product/StarRating";
import { useState } from "react";

interface StarRatingFieldProps {
  label: string;
  name: string;
  size?: number;
}

export const StarRatingField: React.FC<StarRatingFieldProps> = ({
  label,
  name,
  size,
}) => {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: 0,
  });

  const [hoveredIndex, setHoveredIndex] = useState(0);

  const errorMessage = error?.message;
  return (
    <div className="flex flex-col gap-px">
      <p className="pl-2 text-xs text-text-high" id={name}>
        {label}:
      </p>
      <StarRating
        id={name}
        rating={value}
        onRate={onChange}
        size={size}
        className="cursor-pointer px-2 py-1"
        hoveredIndex={hoveredIndex}
        setHoveredIndex={setHoveredIndex}
        aria-labelledby={name}
      />
      <div className="flex h-6 items-center border-t border-border pl-2 text-xs text-error">
        {errorMessage}
      </div>
    </div>
  );
};
