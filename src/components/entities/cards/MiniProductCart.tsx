"use client";
import Image from "next/image";

import { useCartStore } from "@/utils/hooks";
import type { ICartItem } from "@/models/cart";
import { Button } from "@/components/shared";

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
      <Image
        className="object-contain"
        src={url}
        alt={item.productVariant.title}
        width={72}
        height={72}
      />
      <div className="flex w-full flex-col justify-between">
        {/* TOP */}
        <div className="">
          {/* TITLE */}
          <div className="flex items-start justify-between gap-4">
            <h3 className="line-clamp-3 max-w-40 font-semibold">
              {item.productVariant.title}
            </h3>
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
