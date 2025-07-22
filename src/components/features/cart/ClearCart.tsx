"use client";
import { useCartStore } from "@/utils/hooks/store/useCartStore";
import { useOverlayStore } from "@/utils/hooks/store/useOverlayStore";
import toast from "react-hot-toast";

export const ClearCart = () => {
  const clearCart = useCartStore((state) => state.clearCart);
  const setLoading = useOverlayStore((state) => state.setLoading);
  const handleClick = async () => {
    try {
      setLoading(true);
      await clearCart();
    } catch (error) {
      console.log("[clearCart]", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      className="cursor-pointer rounded-md border border-primary px-4 py-2 text-primary transition-colors hover:bg-primary hover:text-white"
      onClick={handleClick}
    >
      Clear Cart
    </button>
  );
};
