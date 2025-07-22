import Image from "next/image";

import { DeleteImage } from "@/components/features/(admin)/product/DeleteImage";
import { SwitchImages } from "@/components/features/(admin)/product/SwitchImages";
import { ProductImagesModal } from "@/components/entities/(admin)/modals/ProductImagesModal";

import type { Product, ProductImage, ProductVariants } from "@prisma/client";

interface IProps {
  product: ProductVariants & {
    images: ProductImage[];
    product: Product;
  };
}

export const ProductImages = ({ product }: IProps) => {
  const previewUrl = product.previewImage
    ? process.env.NEXT_PUBLIC_IMAGE_CDN_URL + product.previewImage
    : "/static/images/placeholder.webp";

  return (
    <div className="rounded-xl border border-border p-4 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Images and Videos</h2>

      <div className="grid grid-cols-4 grid-rows-2 gap-5">
        <div className="col-span-2 row-span-2">
          <div className="flex items-center justify-center rounded-md border border-border">
            <Image
              src={previewUrl}
              alt="Preview"
              width={500}
              height={500}
              className="aspect-square h-full w-full cursor-pointer rounded-lg bg-ui object-contain p-4"
            />
          </div>
        </div>
        {product.images.map(
          (img) =>
            img.url !== product.previewImage && (
              <div
                key={img.url}
                className="group relative flex items-center justify-center overflow-hidden rounded-md border border-border"
              >
                <div className="absolute top-2 right-2 flex translate-x-full gap-1 rounded-md border bg-app px-2 py-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  <SwitchImages id={product.id} url={img.url} />
                  <DeleteImage id={product.id} url={img.url} />
                </div>
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_CDN_URL}${img.url}`}
                  alt="Product"
                  width={200}
                  height={200}
                  className="h-full w-full bg-ui object-contain p-1"
                />
              </div>
            ),
        )}
        <ProductImagesModal id={product.id} />
      </div>
      {/* Preview image */}
    </div>
  );
};
