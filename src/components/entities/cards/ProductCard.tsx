import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import { StarRating } from "@/components/entities/product/StarRating";
import { AddToCart } from "@/components/features/cart/AddToCart";
import { ToggleFavoriteButton } from "@/components/features/favorite/ToggleFavoriteButton";
import { ROUTES } from "@/utils/config/routes/routes";
import type { IProductCard } from "@/models/product";
import { SaleBadge } from "../product/SaleBadge";

interface IProps {
  product: IProductCard;
  priority?: boolean;
}

const ProductCardComponent = ({ product, priority = false }: IProps) => {
  const url = product.previewImage
    ? process.env.NEXT_PUBLIC_IMAGE_CDN_URL + product.previewImage
    : "/static/images/no-image360.webp";
  return (
    <li key={product.id} className="flex flex-col gap-3 rounded-md bg-ui p-2">
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

      <div className="flex flex-col justify-between gap-4 font-bold">
        <div>
          <Link
            className="line-clamp-2 transition-colors hover:text-primary"
            href={`${ROUTES.PRODUCT}/${product.slug}`}
          >
            {product.title}
          </Link>
          <p className="text-sm text-text-low">{product.sku}</p>
        </div>

        <div className="flex flex-wrap items-center gap-1">
          <StarRating rating={product.product.averageRating} />
          <span className="font-inter text-sm">
            ({product.product.reviewCount})
          </span>
        </div>

        <div className="flex flex-col gap-1">
          {product.previousPrice && (
            <div className="flex items-center gap-2">
              <SaleBadge
                price={product.price}
                previousPrice={product.previousPrice}
              />
              <p className="text-text-low line-through">
                {product.previousPrice} MDL
              </p>
            </div>
          )}
          <p>{product.price} MDL</p>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <AddToCart id={product.id} stock={product.stock} />
        <ToggleFavoriteButton id={product.id} title={product.title} />
      </div>
    </li>
  );
};

export const ProductCard = memo(ProductCardComponent);
ProductCard.displayName = "ProductCard";
