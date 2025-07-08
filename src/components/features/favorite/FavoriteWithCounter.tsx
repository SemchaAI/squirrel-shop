"use client";
import { CountBadge } from "@/components/shared";
import { ROUTES } from "@/utils/config";
import { useFavoriteStore } from "@/utils/hooks";
import { HeartIcon } from "lucide-react";
import Link from "next/link";

export const FavoriteWithCounter = () => {
  const counter = useFavoriteStore((state) => state.items.length);
  return (
    <div className="relative">
      <Link href={ROUTES.FAVORITE}>
        <HeartIcon className="cursor-pointer" size={32} />
      </Link>
      {counter > 0 && <CountBadge key={counter} totalItems={counter} />}
    </div>
  );
};
