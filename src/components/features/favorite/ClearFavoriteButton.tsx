"use client";
import toast from "react-hot-toast";
import { useFavoriteStore } from "@/utils/hooks/store/useFavoriteStore";
import { useOverlayStore } from "@/utils/hooks/store/useOverlayStore";

export const ClearFavoriteButton = () => {
  const clearFavorite = useFavoriteStore((state) => state.clearFavorite);
  const setLoading = useOverlayStore((state) => state.setLoading);
  const handleClick = async () => {
    try {
      setLoading(true);
      await clearFavorite();
    } catch (error) {
      console.log("[clearFavorite]", error);
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
      Clear Favorite
    </button>
  );
};
