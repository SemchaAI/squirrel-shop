"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/shared/buttons/Button";
import { useCartStore } from "@/utils/hooks/store/useCartStore";
import { ROUTES } from "@/utils/config/routes/routes";

import type { ICartItem } from "@/models/cart";

interface IProps {
  item: ICartItem;
  isLoading: boolean;
}

export const MiniProductCart = ({ item, isLoading }: IProps) => {
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const removeHandler = () => {
    if (!isLoading) removeFromCart(item.id);
  };
  const url = item.productVariant.previewImage
    ? process.env.NEXT_PUBLIC_IMAGE_CDN_URL + item.productVariant.previewImage
    : "/static/images/placeholder.webp";

  return (
    <div className="flex gap-4">
      <Link
        className="h-fit rounded-md border border-border bg-app p-1 transition-colors hover:bg-app-subtle"
        href={`${ROUTES.PRODUCT}/${item.productVariant.productId}`}
      >
        <Image
          className="object-contain"
          src={url}
          alt={item.productVariant.title}
          width={72}
          height={72}
        />
      </Link>
      <div className="flex w-full flex-col justify-between">
        {/* TOP */}
        <div className="">
          {/* TITLE */}
          <div className="flex items-start justify-between gap-4">
            <Link
              className="transition-colors hover:text-primary"
              href={`${ROUTES.PRODUCT}/${item.productVariant.slug}`}
            >
              <h3 className="line-clamp-3 max-w-40 font-semibold">
                {item.productVariant.title}
              </h3>
            </Link>
            <div className="flex items-center gap-2 rounded-sm bg-ui-selected p-1">
              {item.quantity && item.quantity > 1 && (
                <div className="text-xs text-success">{item.quantity} x </div>
              )}
              {item.productVariant.price}MDL
            </div>
          </div>
          {/* DESC */}
          <div className="text-sm text-text-low">
            {item.productVariant.stock > 0 ? "In stock" : "Out of stock"}
          </div>
        </div>
        {/* BOTTOM */}
        <div className="flex justify-between text-sm">
          <span className="text-text-low">Qty. {item.quantity}</span>
          <Button variant="text" onClick={removeHandler} size="none">
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};
