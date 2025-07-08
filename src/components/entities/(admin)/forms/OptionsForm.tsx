"use client";
import toast from "react-hot-toast";
import { useForm, useWatch } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/entities";
import { SelectField } from "@/components/features";
import { Button } from "@/components/shared";
import { ProductOptionsSchema } from "@/utils/config";

import { type TProductOptionsSchema } from "@/utils/config";
import type { IVariationsWithOptions } from "@/models/product";
import { CreateVariantOption } from "@/actions/AdminProducts";

interface IProps {
  id: string;
  closeModal: () => void;
  variations: IVariationsWithOptions[];
}

export const OptionsForm = ({ variations, id, closeModal }: IProps) => {
  const form = useForm({
    resolver: zodResolver(ProductOptionsSchema),
    mode: "onSubmit",
  });
  const variationType = useWatch({ control: form.control, name: "label" });
  const currVariation = variations.find((v) => v.name === variationType);
  const currVariationOptions =
    currVariation?.options.map((option) => {
      return {
        label: option.value,
        value: option.value,
      };
    }) || [];

  const submitHandler = async (data: TProductOptionsSchema) => {
    try {
      console.log("payload2", data, id);
      const res = await CreateVariantOption(data, id);
      if (!res.isSuccess) {
        form.setError("label", { message: res.message });
        return;
      } else {
        toast.success(res.message);
        closeModal();
      }
    } catch (error) {
      console.log("[OptionsForm]", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Form className="mt-0 max-w-full" form={form} onSubmit={submitHandler}>
      {
        <div className="grid grid-cols-2 gap-2 px-4 pt-4">
          {
            <SelectField
              name="label"
              label="Variation type"
              options={variations.map((option) => {
                return {
                  label: option.name,
                  value: option.name,
                };
              })}
              isSearchable
              menuPortalTarget={document.body}
              isClearable
            />
          }
          <SelectField
            name="value"
            label="Variation value"
            options={currVariationOptions}
            isSearchable
            menuPortalTarget={document.body}
            isClearable
            placeholder="Select variation type first"
          />
        </div>
      }
      {
        <div className="flex items-center gap-2 px-4 pb-4">
          <Button className="w-full" type="submit">
            Save
          </Button>
        </div>
      }
    </Form>
  );
};
