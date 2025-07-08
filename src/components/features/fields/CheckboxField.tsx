"use client";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import type { ICheckbox } from "@/models/inputs";
import { Checkbox } from "@/components/shared";

type CheckboxFieldProps = Omit<ICheckbox, "onChange" | "checked"> & {
  value?: string | number | boolean; // optional for boolean mode
};

export const CheckboxField = ({
  name,
  value,
  label,
  ...rest
}: CheckboxFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const watchedValue = useWatch({ name });

  const isArrayField = Array.isArray(watchedValue);
  const isChecked = isArrayField
    ? watchedValue.includes(value)
    : !!watchedValue;
  // const isChecked =
  //   Array.isArray(selectedValues) && selectedValues.includes(value);
  const error = errors[name]?.message as string;

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value: fieldValue, ref, ...fieldRest },
      }) => {
        const handleChange = () => {
          if (isArrayField) {
            // Handle multi-select checkbox
            if (fieldValue?.includes(value)) {
              onChange(fieldValue.filter((v: string | number) => v !== value));
            } else {
              onChange([...(fieldValue || []), value]);
            }
          } else {
            // Handle boolean checkbox
            onChange(!fieldValue);
          }
        };

        return (
          <Checkbox
            {...fieldRest}
            id={`${name}-${value}`}
            ref={ref}
            name={name}
            label={label}
            checked={isChecked}
            onChange={handleChange}
            {...rest}
            error={error}
          />
        );
      }}
    />
  );
};
