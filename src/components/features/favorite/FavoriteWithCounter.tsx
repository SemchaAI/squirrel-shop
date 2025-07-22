"use client";
import { HeartIcon } from "lucide-react";
import Link from "next/link";

import { CountBadge } from "@/components/shared/badges/CountBadge";
import { ROUTES } from "@/utils/config/routes/routes";
import { useFavoriteStore } from "@/utils/hooks/store/useFavoriteStore";

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
