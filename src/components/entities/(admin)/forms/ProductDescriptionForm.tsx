"use client";
import toast from "react-hot-toast";
import { useFieldArray, useForm } from "react-hook-form";
import { PenLineIcon, XIcon } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/entities/forms/Form";
import { InputField } from "@/components/features/fields/InputField";
import { Button } from "@/components/shared/buttons/Button";
import { ProductDescriptionSchema } from "@/utils/config";
import { ModifyProductDescription } from "@/actions/AdminProducts";

import type { TProductDescriptionSchema } from "@/utils/config";
import type { ProductDescription } from "@prisma/client";

interface IProps {
  id: string;
  closeModal: () => void;
  description: ProductDescription[] | undefined;
}

export const ProductDescriptionForm = ({
  id,
  closeModal,
  description,
}: IProps) => {
  const form = useForm({
    resolver: zodResolver(ProductDescriptionSchema),
    defaultValues: {
      info: description
        ? description.map((item) => {
            return {
              title: item.title,
              description: item.description,
              id: item.id,
            };
          })
        : [{ title: "", description: "" }],
    },
    mode: "onSubmit",
  });
  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "info",
  });

  const submitHandler = async (data: TProductDescriptionSchema) => {
    try {
      const res = await ModifyProductDescription(id, data);
      if (!res.isSuccess) {
        toast.error(res.message);
        return;
      } else {
        toast.success(res.message);
        closeModal();
      }
    } catch (error) {
      console.log("[ProductDescriptionForm]", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Form className="mt-0 max-w-full" form={form} onSubmit={submitHandler}>
      {
        <div className="flex flex-col gap-4 p-4">
          <div className="scroll-stable flex max-h-110 w-150 flex-col overflow-y-auto">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <InputField
                  id={`info.${index}.title`}
                  label="Title"
                  type="text"
                  Icon={PenLineIcon}
                />
                <InputField
                  id={`info.${index}.description`}
                  label="Description"
                  type="text"
                  Icon={PenLineIcon}
                />
                <Button
                  className="mb-2 h-11.5 w-11.5"
                  size="sm"
                  type="button"
                  variant="ghost"
                  onClick={() => remove(index)}
                >
                  <XIcon size={20} />
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="ghost"
            onClick={() => append({ title: "", description: "" })}
          >
            Add Characteristic
          </Button>
          <Button type="submit">Save</Button>
        </div>
      }
    </Form>
  );
};
