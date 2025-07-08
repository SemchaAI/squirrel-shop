import Link from "next/link";
import Image from "next/image";
import { CheckIcon } from "lucide-react";
import { memo } from "react";

import { ROUTES } from "@/utils/config";
import type { ProductVariants } from "@prisma/client";

import { StockInfo } from "../product/StockInfo";

interface IProps {
  product: ProductVariants;
}

export const SearchProductCardComponent = ({ product }: IProps) => {
  const productLink = `${ROUTES.PRODUCT}/${product.slug}`;
  const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_CDN_URL}${product.previewImage}`;

  return (
    <li className="flex grow gap-2 rounded-xl p-1 transition-colors hover:bg-ui-selected sm:gap-4">
      <div className="flex">
        <Link
          className="h-19 w-19 rounded-xl border border-border bg-ui px-2 py-1"
          href={productLink}
        >
          <Image
            src={imageUrl}
            alt={product.title}
            className="mx-auto h-full object-contain"
            width={100}
            height={100}
          />
        </Link>
      </div>

      <div className="flex grow items-center justify-between lg:items-start">
        <div>
          <Link
            href={`${ROUTES.PRODUCT}/${product.slug}`}
            className="font-semibold text-text-high"
          >
            {product.title}
          </Link>
          <div className="flex flex-wrap items-center space-x-4 sm:mt-2">
            <div>
              <span className="flex items-center">
                <CheckIcon className="text-success" size={16} />
                <span className="pl-1 text-xs text-success lowercase">
                  În stock
                </span>
              </span>
            </div>
            <span className="text-sm text-text-low md:block">
              SKU:
              <span>{product.sku}</span>
            </span>
            <StockInfo stock={product.stock} />
          </div>
        </div>
      </div>
      <div className="hidden items-center justify-between gap-x-4 pr-2 sm:flex">
        <div>
          {product.previousPrice && (
            <span className="text-gray block text-center text-sm line-through">
              {product.price} MDL
            </span>
          )}
          <span
            className={`text-md block text-center font-bold ${product.previousPrice && "text-error"}`}
          >
            {product.previousPrice || product.price} MDL
          </span>
        </div>
      </div>
    </li>
  );
};
export const SearchProductCard = memo(SearchProductCardComponent);
SearchProductCard.displayName = "SearchProductCard";
