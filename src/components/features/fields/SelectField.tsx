"use client";
import { Controller, useFormContext } from "react-hook-form";

import { Select } from "@/components/shared/inputs/Select";
import type { ISelectProps, IOption } from "@/models/inputs";

interface IProps extends Omit<ISelectProps, "value" | "onChange"> {
  name: string;
  label: string;
}

export const SelectField = ({ options, name, isMulti, ...rest }: IProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-px">
      <p className="text-text-primary pl-2 text-xs">{rest.label}</p>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          // Convert form value to Select component value
          const selectValue = isMulti
            ? options.filter((o) => (value || []).includes(o.value))
            : options.find((o) => o.value == value) || undefined;
          const handleChange = (val: IOption | IOption[] | undefined) => {
            if (isMulti) {
              const newVal = (val as IOption[]).map((v) => v.value);
              // console.log("newVal", newVal);
              onChange(newVal);
            } else {
              onChange((val as IOption | undefined)?.value ?? undefined);
            }
          };

          return (
            <Select
              options={options}
              value={selectValue}
              onChange={handleChange}
              isMulti={isMulti}
              {...rest}
            />
          );
        }}
      />
      <p className="text-danger flex h-6 items-center pl-2 text-xs">
        {error || ""}
      </p>
    </div>
  );
};
