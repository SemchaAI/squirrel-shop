"use client";
import Link from "next/link";
import { BarcodeIcon } from "lucide-react";

import { AddToCart } from "@/components/features/cart/AddToCart";
import { ToggleFavoriteButton } from "@/components/features/favorite/ToggleFavoriteButton";
import { Tooltip } from "@/components/shared/tooltip/Tooltip";
import { StockInfo } from "@/components/entities/product/StockInfo";

import { ROUTES } from "@/utils/config/routes/routes";
import { useCartStore } from "@/utils/hooks/store/useCartStore";

interface IProps {
  id: string;
  title: string;
  stock: number;
}
export const ProductControls = ({ id, stock, title }: IProps) => {
  const items = useCartStore((state) => state.items);
  // console.log("id", id, items);
  const inCart = items.some((item) => item.productVariantId === id);
  return (
    <div className="flex justify-between gap-4">
      {/* <QuantitySelector quantity={currQuantity} setQuantity={quantityHandler} /> */}
      <div className="flex w-full flex-wrap justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <AddToCart id={id} stock={stock} />
          {/* <StockDescription inStock={stock} /> */}
          <StockInfo stock={stock} />
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

          <ToggleFavoriteButton id={id} title={title} />
        </div>
      </div>
    </div>
  );
};
