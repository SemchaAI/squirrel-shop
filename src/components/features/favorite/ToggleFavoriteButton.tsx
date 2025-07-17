"use client";

import { useFavoriteStore } from "@/utils/hooks";
import { Role } from "@prisma/client";
import clsx from "clsx";
import { HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

interface IProps {
  id: string;
}

export const ToggleFavoriteButton = ({ id }: IProps) => {
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
    >
      <HeartIcon
        className={`transform-gpu transition-transform hover:animate-wiggle ${isSelected ? "fill-primary" : ""}`}
      />
    </button>
  );
};
