"use client";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";
import type { ReactNode } from "react";

interface DynamicFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => Promise<void>;
  children: ReactNode;
  formControls?: ReactNode;
  title?: string;
  className?: string;
}

export const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  formControls,
  title,
  className,
}: DynamicFormProps<T>) => {
  return (
    <FormProvider {...form}>
      <form
        className={`m-auto w-full min-w-80 ${className}`}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit(onSubmit)(e);
        }}
      >
        {title && (
          // pr-7
          <h2 className="text-text-highlight mb-2 text-center text-2xl font-semibold">
            {title}
          </h2>
        )}
        {children}
        {formControls}
      </form>
    </FormProvider>
  );
};
