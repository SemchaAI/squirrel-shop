"use client";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { BoxIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/entities/forms/Form";
import { InputField } from "@/components/features/fields/InputField";
import {
  CreateProductVariantSchema,
  TCreateProductVariantSchema,
} from "@/utils/config";
import { Button } from "@/components/shared/buttons/Button";
import { CreateProductVariant } from "@/actions/AdminProducts";

// import type { IRedactProductReq } from "@/models/requests";

interface IProps {
  id: string;
  closeModal: () => void;
}

export const CreateProductVariantForm = ({ id, closeModal }: IProps) => {
  const form = useForm({
    resolver: zodResolver(CreateProductVariantSchema),

    mode: "onSubmit",
  });

  const submitHandler = async (data: TCreateProductVariantSchema) => {
    try {
      const res = await CreateProductVariant(data, id);
      if (!res.isSuccess) {
        form.setError("slug", { message: res.message });
        return;
      } else {
        toast.success("Product variant created!");
        closeModal();
      }
    } catch (error) {
      console.log("[CreateProductVariantForm]", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Form className="mt-0 max-w-full" form={form} onSubmit={submitHandler}>
      {
        <div className="flex flex-col p-6">
          <div className="grid grid-cols-2 gap-x-6">
            <InputField id="slug" type="text" label="Slug" Icon={BoxIcon} />
            <InputField id="title" type="text" label="Title" Icon={BoxIcon} />
            <InputField
              id="seoTitle"
              type="text"
              label="Seo title"
              placeholder="unnecessary"
              Icon={BoxIcon}
            />
            <InputField id="sku" type="text" label="SKU" Icon={BoxIcon} />
            <InputField
              id="stock"
              type="number"
              label="In stock"
              placeholder="min 0"
              Icon={BoxIcon}
            />
            <InputField
              id="price"
              type="number"
              min={0}
              step={0.01}
              label="Actual Price"
              Icon={BoxIcon}
            />
            <InputField
              id="previousPrice"
              type="number"
              min={0}
              step={0.01}
              label="Previous Price"
              Icon={BoxIcon}
            />
          </div>
          <Button type="submit">Create</Button>
        </div>
      }
    </Form>
  );
};
