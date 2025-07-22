import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { CheckIcon } from "lucide-react";

import { ROUTES } from "@/utils/config/routes/routes";
import { RemoveFromCart } from "@/components/features/cart/RemoveFromCart";
import { QuantitySelector } from "@/components/features/product/QuantitySelector";
import { StockInfo } from "@/components/entities/product/StockInfo";

import type { ICartItem } from "@/models/cart";

interface IProps {
  item: ICartItem;
}

const CartCardComponent = ({ item }: IProps) => {
  const url = item.productVariant.previewImage
    ? process.env.NEXT_PUBLIC_IMAGE_CDN_URL + item.productVariant.previewImage
    : "/static/images/no-image360.webp";
  return (
    <li className="flex border-b border-border p-3 lg:border-0 lg:p-0">
      <div className="relative flex w-full flex-col gap-4 lg:mt-5 lg:mb-5 lg:flex-row">
        <div className="flex grow gap-4">
          <div className="flex h-22 w-22">
            <Link
              className="h-22 w-22 rounded-xl border border-border bg-ui px-2 py-1"
              href={`${ROUTES.PRODUCT}/${item.productVariant.slug}`}
            >
              <Image
                src={url}
                alt={item.productVariant.title}
                className="mx-auto h-full object-contain"
                width={100}
                height={100}
              />
            </Link>
          </div>
          <div className="flex w-full items-center justify-between lg:items-start">
            <div>
              <Link
                href={`${ROUTES.PRODUCT}/${item.productVariant.slug}`}
                className="font-semibold text-text-high"
              >
                {item.productVariant.title}
              </Link>

              <div className="mt-2 flex flex-wrap items-center space-x-4">
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
                  <span>{item.productVariant.sku}</span>
                </span>
                <StockInfo stock={item.productVariant.stock} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-4 sm:grow sm:justify-between">
          <QuantitySelector
            stock={item.productVariant.stock}
            quantity={item.quantity}
            id={item.id}
          />
          <div className="flex grow items-center justify-between gap-x-4">
            <div>
              {item.productVariant.previousPrice && (
                <span className="text-gray block text-center text-sm line-through">
                  {item.productVariant.price} MDL
                </span>
              )}
              <span
                className={`text-md block text-center font-bold ${item.productVariant.previousPrice && "text-error"}`}
              >
                {item.productVariant.previousPrice || item.productVariant.price}{" "}
                MDL
              </span>
            </div>
            <RemoveFromCart id={item.id} />
          </div>
        </div>
      </div>
    </li>
  );
};

export const CartCard = memo(CartCardComponent);
CartCardComponent.displayName = "CartCard";
