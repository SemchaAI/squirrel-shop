"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { BurgerButton } from "@/components/features/buttons/BurgerButton";
import { NavLink } from "@/components/features/links/NavLink";
import { NavRoutes } from "@/utils/config/routes/nav";
import { useScrollControl } from "@/utils/hooks/useScrollControl";

import { ControlsMenu } from "./ui/ControlsMenu";

const SearchMenu = dynamic(
  () =>
    import("@/components/features/search/SearchMenu").then(
      (mod) => mod.SearchMenu,
    ),
  {
    ssr: false,
  },
);

const MobileMenu = dynamic(
  () => import("./ui/MobileMenu").then((mod) => mod.MobileMenu),
  {
    ssr: false,
  },
);

export const HeaderMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  useScrollControl(isOpen);
  const pathname = usePathname();
  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <div className="flex flex-1 items-center justify-end">
      <div className="hidden w-1/3 items-center justify-center gap-2 px-2 md:flex xl:w-1/2">
        {NavRoutes.map((route, index) => (
          <NavLink
            aria-label={`Go to ${route.name} page`}
            key={`${route.href}-${index}`}
            href={route.href}
          >
            {route.name}
          </NavLink>
        ))}
      </div>
      <div className="flex flex-1 items-center justify-end gap-4 sm:w-2/3 xl:w-1/2">
        <SearchMenu />
        <ControlsMenu />
        <BurgerButton
          isOpen={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>
      {/* MOBILE */}
      <MobileMenu isOpen={isOpen} onClick={() => setIsOpen(false)} />
    </div>
  );
};
