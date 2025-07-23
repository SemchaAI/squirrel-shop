import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import { AddToCart } from "@/components/features/cart/AddToCart";
import { ToggleFavoriteButton } from "@/components/features/favorite/ToggleFavoriteButton";
import { ROUTES } from "@/utils/config/routes/routes";

import type { ProductVariants } from "@prisma/client";

interface IProps {
  product: ProductVariants;
  priority?: boolean;
}

const ProductCardComponent = ({ product, priority = false }: IProps) => {
  const url = product.previewImage
    ? process.env.NEXT_PUBLIC_IMAGE_CDN_URL + product.previewImage
    : "/static/images/no-image360.webp";
  return (
    <li key={product.id} className="flex flex-col gap-4 rounded-md bg-ui p-2">
      <Link
        className="relative flex w-full justify-center"
        href={`${ROUTES.PRODUCT}/${product.slug}`}
      >
        <Image
          className="rounded-md"
          src={url}
          alt={product.title}
          priority={priority}
          width={280}
          height={280}
        />
      </Link>
      <div className="flex justify-between gap-1 font-bold">
        <p>{product.title}</p>
        <p>{product.price} MDL</p>
      </div>
      <p className="text-sm text-text-low">{product.sku}</p>
      <div className="mt-auto flex items-center justify-between">
        <AddToCart id={product.id} stock={product.stock} />
        <ToggleFavoriteButton id={product.id} title={product.title} />
      </div>
    </li>
  );
};

export const ProductCard = memo(ProductCardComponent);
ProductCard.displayName = "ProductCard";
