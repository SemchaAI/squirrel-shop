"use client";
import Link from "next/link";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { ArrowRightIcon, BoxIcon, Trash2Icon, XIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  DeleteModal,
  Form,
  OptionsModal,
  ProductImages,
} from "@/components/entities";
import { CheckboxField, InputField } from "@/components/features";
import { useProductMutation } from "@/utils/hooks";
import { ROUTES, ProductVariantSchema, ADMIN_ROUTES } from "@/utils/config";
import {
  DeleteProductVariant,
  DeleteVariantOption,
} from "@/actions/AdminProducts";

import type { IProductResponse } from "@/models/response";
import type { IRedactProductReq } from "@/models/requests";
import type { Category } from "@prisma/client";
import type { IVariationsWithOptions } from "@/models/product";

interface IProps {
  slug: string;
  product: IProductResponse;
  categories: Category[];
  variations: IVariationsWithOptions[];
}

export const ProductVariantForm = ({
  product,
  slug,
  categories,
  variations,
}: IProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const form = useForm({
    resolver: zodResolver(ProductVariantSchema),
    defaultValues: {
      title: product.title,
      previousPrice: product.previousPrice ? product.previousPrice : undefined,
      price: product.price,
      seoTitle: product.seoTitle ? product.seoTitle : undefined,
      sku: product.sku,
      stock: product.stock,
      categories: product.product.categories.map((category) => category.id),
      visible: product.visible,
    },
    mode: "onSubmit",
  });
  const { mutate, isPending } = useProductMutation(slug);

  const submitHandler = async (data: IRedactProductReq) => {
    try {
      console.log("payload", data);
      mutate(data);
    } catch (error) {
      console.log("[ProductVariantForm]", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Form className="mt-0 max-w-full" form={form} onSubmit={submitHandler}>
      {
        <div ref={ref} className="flex flex-col gap-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{product.title}</h1>
              <DeleteModal
                button={
                  <Trash2Icon
                    className="transition-colors hover:text-primary"
                    size={20}
                  />
                }
                id={product.id}
                title="Delete product"
                confirmText="Are you sure you want to delete this product?"
                onDelete={DeleteProductVariant}
                redirectUrl={ADMIN_ROUTES.ADMIN}
              />
            </div>
            <Link
              href={`${ROUTES.PRODUCT}/${product.slug}`}
              className="flex items-center gap-1 border-b border-transparent text-lg font-bold text-primary transition-colors hover:border-primary"
            >
              To Product <ArrowRightIcon size={24} />
            </Link>
          </div>
          <div className="flex gap-6">
            {/* LEFT: Images */}
            <div className="w-2/3">
              <ProductImages product={product} />
              {/*  */}
              <div className="mt-5 rounded-md border border-border bg-app p-4 shadow-sm">
                <div className="grid grid-cols-2 gap-x-6">
                  <InputField
                    id="title"
                    type="text"
                    label="Title"
                    Icon={BoxIcon}
                  />
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
              </div>
            </div>

            {/* RIGHT: Controls */}
            <div className="w-1/3 space-y-4">
              <div className="relative rounded-xl border border-border shadow-sm">
                <div className="p-4">
                  <h3 className="text-muted text-sm font-semibold tracking-wide uppercase">
                    Availability
                  </h3>
                  <div className="mt-2 space-y-2">
                    <CheckboxField name="visible" label="Show in online shop" />
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span>
                        Show in Point of Sale{" "}
                        <span className="text-primary">(UI only)</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-muted text-sm font-semibold tracking-wide uppercase">
                    Categories
                  </h3>
                  <span className="text-primary">({categories.length})</span>
                </div>
                <ul className="mt-2 flex max-h-39 flex-col gap-2 overflow-auto">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <CheckboxField
                        name="categories"
                        label={category.name}
                        value={category.id}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-muted text-sm font-semibold tracking-wide uppercase">
                    Options
                  </h3>
                  <OptionsModal variations={variations} id={product.id} />
                </div>
                <ul className="mt-2 flex max-h-40 flex-col gap-2 overflow-auto border-t border-border pt-2">
                  {product.options.map((option) => (
                    <li key={option.id} className="font-semibold">
                      <div className="flex items-center justify-between gap-2">
                        <span>{option.variationName}</span>
                        <div className="flex items-center gap-1 text-primary">
                          <span>{option.variationOptionValue}</span>
                          <DeleteModal
                            button={
                              <XIcon
                                className="transition-colors hover:text-primary"
                                size={20}
                              />
                            }
                            id={option.id}
                            title="Delete Product variant option"
                            confirmText="Are you sure you want to delete this option?"
                            onDelete={(id) => DeleteVariantOption(id, slug)}
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                {/* <div className="mt-2 flex flex-col gap-2 overflow-auto border-t border-border pt-2">
                  <div className="flex items-center justify-between text-success">
                    Selected: <span>({product.options.length})</span>
                  </div>
                  <div className="text-high flex items-center justify-between">
                    From <span>({variations.length})</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      }
      {
        // buttons
        <div className="flex justify-end gap-2">
          <button type="submit" className="btn-primary">
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      }
    </Form>
  );
};
