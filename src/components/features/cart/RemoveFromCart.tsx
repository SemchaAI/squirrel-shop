"use client";
import { useCartStore, useOverlayStore } from "@/utils/hooks";
import { Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";

interface IProps {
  id: string;
}

export const RemoveFromCart = ({ id }: IProps) => {
  const { isOverlayLoading, setLoading } = useOverlayStore((state) => state);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clickHandler = async () => {
    try {
      setLoading(true);
      await removeFromCart(id);
    } catch (error) {
      console.log("[removeFromCart]", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={clickHandler}
      disabled={isOverlayLoading}
      className={`flex cursor-pointer items-center rounded-full p-2 transition-colors hover:text-primary ${isOverlayLoading ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <Trash2Icon size={20} />
    </button>
  );
};
