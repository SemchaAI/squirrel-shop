"use client";
import { Type } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/entities/forms/Form";
import { InputField } from "@/components/features/fields/InputField";
import { Button } from "@/components/shared/buttons/Button";

import { CategorySchema } from "@/utils/config/schemas/category";
import type { TCategorySchema } from "@/utils/config/schemas/category";
import { FileField } from "@/components/features/fields/FileField";
import { modifyCategory, createCategory } from "@/actions/AdminCategories";

interface IProps {
  id?: string;
  closeModal: () => void;
  defaultValues?: TCategorySchema;
}

export const CategoryForm = ({ closeModal, id, defaultValues }: IProps) => {
  const form = useForm({
    resolver: zodResolver(CategorySchema),
    mode: "onSubmit",
    defaultValues,
  });

  const submitHandler = async (data: TCategorySchema) => {
    try {
      let res;
      if (id) res = await modifyCategory(data, id);
      else res = await createCategory(data);
      if (res.isSuccess) {
        toast.success(res.message);
        closeModal();
      } else {
        form.setError("name", { message: res.message });
      }
    } catch (error) {
      console.log("[ProductForm]", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Form className="mt-0 max-w-full" form={form} onSubmit={submitHandler}>
      {
        <div className="flex flex-col gap-2 p-4">
          <div className="grid grid-cols-2 gap-2">
            <InputField id="name" label="Name" type="text" Icon={Type} />
            <InputField id="slug" label="Slug" type="text" Icon={Type} />
          </div>
          <FileField id="image" accept="image/png,image/webp" />
          <Button type="submit">Save</Button>
        </div>
      }
    </Form>
  );
};
