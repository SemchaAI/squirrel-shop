"use client";
import { Type } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/entities";
import { InputField } from "@/components/features";
import { Button } from "@/components/shared";
import { CreateProduct } from "@/actions/AdminProducts";

import { ProductSchema, type TProductSchema } from "@/utils/config";

export const ProductForm = ({ closeModal }: { closeModal: () => void }) => {
  const form = useForm({
    resolver: zodResolver(ProductSchema),
    mode: "onSubmit",
  });

  const submitHandler = async (data: TProductSchema) => {
    try {
      console.log("payload", data);
      const res = await CreateProduct(data.title);
      if (!res.isSuccess) {
        form.setError("title", { message: res.message });
        return;
      } else {
        toast.success(res.message);
        closeModal();
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
          <InputField id="title" label="Title" type="text" Icon={Type} />
          <Button type="submit">Save</Button>
        </div>
      }
    </Form>
  );
};
