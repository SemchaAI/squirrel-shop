"use client";
import { useState } from "react";
import { useShallow } from "zustand/shallow";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import {
  Check,
  Loader2Icon,
  ShoppingCartIcon,
  XCircleIcon,
} from "lucide-react";

import { useCartStore } from "@/utils/hooks/store/useCartStore";

interface IProps {
  id: string;
  stock: number;
}

export const AddToCart = ({ id, stock }: IProps) => {
  const [loading, setLoading] = useState(false);
  const { items, addToCart } = useCartStore(
    useShallow((state) => {
      return { items: state.items, addToCart: state.addToCart };
    }),
  );
  const { data } = useSession();
  const isSelected = items.some((item) => item.productVariantId === id);
  const isOutOfStock = stock <= 0;

  const clickHandler = async () => {
    if (isSelected || isOutOfStock) return;
    try {
      setLoading(true);
      await addToCart(id, 1, data);
    } catch (error) {
      console.log("[addToCart]", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  let buttonContent;

  if (loading) {
    buttonContent = (
      <>
        <Loader2Icon className="animate-spin" />
        <span>Loading...</span>
      </>
    );
  } else if (isSelected) {
    buttonContent = (
      <>
        <Check size={20} />
        <span>In Cart</span>
      </>
    );
  } else if (isOutOfStock) {
    buttonContent = (
      <>
        <XCircleIcon size={20} />
        <span>Out of Stock</span>
      </>
    );
  } else {
    buttonContent = (
      <>
        <ShoppingCartIcon size={20} />
        <span>Add to Cart</span>
      </>
    );
  }

  return (
    <button
      onClick={clickHandler}
      disabled={isSelected || isOutOfStock}
      className={`flex w-fit cursor-pointer items-center gap-2 rounded-full border border-primary px-4 py-2 transition-colors ${isSelected || loading || isOutOfStock ? "bg-primary text-white" : "text-primary hover:bg-primary hover:text-white"} `}
    >
      {buttonContent}
    </button>
  );
};
