"use client";

import { useFavoriteStore } from "@/utils/hooks";
import { Role } from "@prisma/client";
import { HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface IProps {
  id: string;
}

export const ToggleFavoriteButton = ({ id }: IProps) => {
  const { data: session } = useSession();
  const { items, toggleFavorite } = useFavoriteStore((state) => state);
  const isSelected = items.some((item) => item.id === id);

  const clickHandler = async () => {
    if (!session || session.user.role === Role.GUEST) {
      toast.error("Guests can't add favorite");
      return;
    }
    toggleFavorite(id);
  };

  return (
    <button
      onClick={clickHandler}
      className={`flex h-10.5 cursor-pointer items-center justify-center rounded-full border border-primary px-2 text-primary`}
    >
      <HeartIcon className={` ${isSelected ? "fill-primary" : ""}`} />
    </button>
  );
};
