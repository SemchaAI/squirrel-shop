"use client";

import { Type } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/entities/forms/Form";
import { InputField } from "@/components/features/fields/InputField";
import { Button } from "@/components/shared/buttons/Button";
import { createVariation, modifyVariation } from "@/actions/AdminVariations";
import { VariationSchema } from "@/utils/config/schemas/variation";

import type { TVariationSchema } from "@/utils/config/schemas/variation";

interface IProps {
  id?: string;
  closeModal: () => void;
  defaultValues?: TVariationSchema;
}

export const VariationForm = ({ closeModal, id, defaultValues }: IProps) => {
  const form = useForm<TVariationSchema>({
    resolver: zodResolver(VariationSchema),
    mode: "onSubmit",
    defaultValues,
  });

  const submitHandler = async (data: TVariationSchema) => {
    try {
      console.log("data", data);
      let res;
      if (id) res = await modifyVariation(data, id);
      else res = await createVariation(data);

      if (res.isSuccess) {
        toast.success(res.message);
        closeModal();
      } else {
        form.setError("name", { message: res.message });
      }
    } catch (error) {
      console.log("[VariationForm]", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Form className="mt-0 max-w-full" form={form} onSubmit={submitHandler}>
      <div className="flex flex-col gap-2 p-4">
        <InputField id="name" label="Name" type="text" Icon={Type} />
        <Button type="submit">Save</Button>
      </div>
    </Form>
  );
};
