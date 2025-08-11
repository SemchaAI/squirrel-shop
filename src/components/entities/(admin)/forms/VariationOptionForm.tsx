"use client";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { PaletteIcon, TypeIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { InputField } from "@/components/features/fields/InputField";
import { Button } from "@/components/shared/buttons/Button";
import { Form } from "@/components/entities/forms/Form";
import {
  createVariationOption,
  modifyVariationOption,
} from "@/actions/AdminVariations";
import { VariationOptionSchema } from "@/utils/config/schemas/variation";

import type { TVariationOptionSchema } from "@/utils/config/schemas/variation";

interface IProps {
  id?: string;
  // type: "CREATE" | "UPDATE";
  closeModal: () => void;
  defaultValues?: TVariationOptionSchema;
}

export const VariationOptionForm = ({
  id,
  defaultValues,
  closeModal,
}: IProps) => {
  const form = useForm({
    resolver: zodResolver(VariationOptionSchema),
    mode: "onSubmit",
    defaultValues,
  });

  const submitHandler = async (data: TVariationOptionSchema) => {
    console.log("data", data);
    try {
      let res;
      if (id) res = await modifyVariationOption(data, id);
      else res = await createVariationOption(data);

      if (res.isSuccess) {
        toast.success(res.message);
        closeModal();
      } else {
        form.setError("value", { message: res.message });
      }
    } catch (error) {
      console.log("[VariationOptionForm]", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Form className="mt-0 max-w-full" form={form} onSubmit={submitHandler}>
      <div className="flex flex-col gap-2 p-4">
        <InputField
          id="variationId"
          label="variationId"
          type="text"
          Icon={TypeIcon}
          hidden
        />
        <InputField id="value" label="Value" type="text" Icon={TypeIcon} />
        <InputField
          id="hexCode"
          label="Hex Code"
          type="text"
          Icon={PaletteIcon}
          placeholder="#000000"
        />
        <Button type="submit">Save</Button>
      </div>
    </Form>
  );
};
