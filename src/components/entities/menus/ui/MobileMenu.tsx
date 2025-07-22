"use client";
import Link from "next/link";
import { ShoppingBagIcon } from "lucide-react";

import { FavoriteWithCounter } from "@/components/features/favorite/FavoriteWithCounter";
import { ThemeSwitcher } from "@/components/features/buttons/ThemeSwitcher";
import { UserControl } from "@/components/features/user/UserControl";
import { CountBadge } from "@/components/shared/badges/CountBadge";
import { Overlay } from "@/components/shared/overlays/Overlay";
import { RecursiveNavList } from "@/components/entities/lists/RecursiveNavList";
import { NavRoutes } from "@/utils/config/routes/nav";
import { ROUTES } from "@/utils/config/routes/routes";
import { useCartStore } from "@/utils/hooks/store/useCartStore";

interface IProps {
  isOpen: boolean;
  onClick?: () => void;
}

export const MobileMenu = ({ isOpen, onClick }: IProps) => {
  const counter = useCartStore((state) => state.counter);
  return (
    <div className="md:hidden">
      {isOpen && <Overlay onClick={onClick} />}
      <nav
        className="fixed top-0 left-0 z-50 flex h-dvh w-3/4 min-w-75 flex-col overflow-hidden bg-ui p-2 transition-transform duration-300"
        style={{ transform: isOpen ? "translateX(0%)" : "translateX(-100%)" }}
      >
        <RecursiveNavList routes={NavRoutes} />
        <div className="relative flex items-center justify-between border-t-1 px-2 py-3">
          <FavoriteWithCounter />
          <UserControl />
          <Link href={ROUTES.CART} className="relative">
            <ShoppingBagIcon className="cursor-pointer" size={32} />
            {counter > 0 && <CountBadge key={counter} totalItems={counter} />}
          </Link>
          <ThemeSwitcher />
        </div>
      </nav>
    </div>
  );
};
