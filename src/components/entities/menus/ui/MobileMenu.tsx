import { HeartIcon, MoonIcon, ShoppingBagIcon, UserIcon } from "lucide-react";

import { NavLink } from "@/components/features";
import { Overlay } from "@/components/shared";
import { NavRoutes } from "@/utils/config/routes";

interface IProps {
  isOpen: boolean;
  onClick?: () => void;
}

export const MobileMenu = ({ isOpen, onClick }: IProps) => {
  return (
    <div className="md:hidden">
      {isOpen && <Overlay onClick={onClick} />}
      <nav
        className="fixed top-0 left-0 z-50 flex h-dvh w-3/4 min-w-75 flex-col overflow-hidden bg-red-200 p-2 transition-transform duration-300"
        style={{ transform: isOpen ? "translateX(0%)" : "translateX(-100%)" }}
      >
        <ul className="flex w-full flex-1 flex-col items-center justify-center gap-8 text-xl">
          {NavRoutes.map((route) => (
            <NavLink
              className="flex w-full items-center gap-2 bg-red-300 p-2"
              key={route.href}
              href={route.href}
            >
              {route.Icon && <route.Icon />}
              {route.name}
            </NavLink>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t-1 p-2">
          <HeartIcon size={32} />
          <ShoppingBagIcon size={32} />
          <MoonIcon size={32} />
          <UserIcon size={32} />
        </div>
      </nav>
    </div>
  );
};
