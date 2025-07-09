"use client";
import Link from "next/link";

import { AddToCart, ToggleFavoriteButton } from "@/components/features";
import { StockDescription } from "./StockDescription";
import { ROUTES } from "@/utils/config";
import { BarcodeIcon } from "lucide-react";
import { useCartStore } from "@/utils/hooks";
import { Tooltip } from "@/components/shared";

interface IProps {
  stock: number;
  id: string;
}
export const ProductControls = ({ id, stock }: IProps) => {
  const items = useCartStore((state) => state.items);
  console.log("id", id, items);
  const inCart = items.some((item) => item.productVariantId === id);
  return (
    <div className="flex justify-between gap-4">
      {/* <QuantitySelector quantity={currQuantity} setQuantity={quantityHandler} /> */}
      <div className="flex w-full flex-wrap justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <AddToCart id={id} stock={stock} />
          <StockDescription inStock={stock} />
        </div>
        <div className="flex flex-wrap gap-2">
          {inCart ? (
            <Link
              href={ROUTES.CHECKOUT}
              className="flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-primary transition-colors hover:bg-primary hover:text-white"
            >
              <BarcodeIcon size={20} /> Checkout
            </Link>
          ) : (
            <Tooltip content="Add to cart firstly">
              <div className="flex cursor-not-allowed items-center gap-2 rounded-full border border-primary px-4 py-2 text-primary transition-colors hover:bg-primary hover:text-white">
                <BarcodeIcon size={20} /> Checkout
              </div>
            </Tooltip>
          )}

          <ToggleFavoriteButton id={id} />
        </div>
      </div>
    </div>
  );
};
