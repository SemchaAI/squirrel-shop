"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { HeartIcon } from "lucide-react";
import toast from "react-hot-toast";
import clsx from "clsx";

import { useFavoriteStore } from "@/utils/hooks/store/useFavoriteStore";
import { Role } from "@prisma/client";

interface IProps {
  id: string;
  title: string;
}

export const ToggleFavoriteButton = ({ id, title }: IProps) => {
  const { data: session } = useSession();
  const { items, toggleFavorite } = useFavoriteStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const isSelected = items.some((item) => item.id === id);

  const clickHandler = async () => {
    if (!session || session.user.role === Role.GUEST) {
      toast.error("Guests can't add favorite");
      return;
    }
    try {
      setIsLoading(true);
      await toggleFavorite(id);
    } catch (error) {
      console.log("[toggleFavorite]", error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={clickHandler}
      className={clsx(
        "flex h-10.5 cursor-pointer items-center justify-center rounded-full border border-primary px-2 text-primary",
        {
          "pointer-events-none animate-pulse": isLoading,
        },
      )}
      disabled={isLoading}
      aria-label={
        isSelected
          ? `Remove ${title} from favorites`
          : `Add ${title} to favorites`
      }
    >
      <HeartIcon
        className={`transform-gpu transition-transform hover:animate-wiggle ${isSelected ? "fill-primary" : ""}`}
      />
    </button>
  );
};
