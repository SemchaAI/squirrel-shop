"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ShoppingBagIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { CountBadge } from "@/components/shared/badges/CountBadge";
import { useCartStore } from "@/utils/hooks/store/useCartStore";
import { useClickOutside } from "@/utils/hooks/useClickOutside";

const MiniCart = dynamic(
  () =>
    import("@/components/widgets/cart/MiniCart").then((mod) => mod.MiniCart),
  {
    ssr: false,
  },
);

export const ShoppingBagControl = () => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const counter = useCartStore((state) => state.counter);

  useClickOutside(ref, () => {
    if (open) setOpen(false);
  });
  useEffect(() => {
    if (open) setOpen(false);
  }, [path]);

  return (
    <div ref={ref}>
      <div className="relative">
        <button
          className="flex h-8 w-8 cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Open mini cart"
        >
          <ShoppingBagIcon className="cursor-pointer" size={32} />
        </button>
        {counter > 0 && <CountBadge key={counter} totalItems={counter} />}
      </div>

      <MiniCart isOpen={open} />
    </div>
  );
};
