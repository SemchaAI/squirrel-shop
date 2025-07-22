"use client";
import Link from "next/link";

import { MiniProductCart } from "@/components/entities/cards/MiniProductCart";
import { Container } from "@/components/shared/containers/Container";
import { useAnimatedPresence } from "@/utils/hooks/useAnimatedPresence";
import { useCartStore } from "@/utils/hooks/store/useCartStore";
import { ROUTES } from "@/utils/config/routes/routes";

interface IProps {
  isOpen: boolean;
}

export const MiniCart = ({ isOpen }: IProps) => {
  const items = useCartStore((state) => state.items);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const isLoading = useCartStore((state) => state.isLoading);

  const shouldRender = useAnimatedPresence(isOpen, 300);
  //top-14
  return (
    <Container
      className={`absolute top-10 right-0 z-10 w-110 bg-ui transition-all duration-300 ${isOpen ? "animate-fade-in-down" : "animate-fade-out-up"} ${shouldRender ? "" : "hidden"} `}
    >
      {items && (
        <div className="flex flex-col">
          <h2 className="text-xl">Shopping Cart</h2>
          {items.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-md bg-app font-bold">
              Cart is empty
            </div>
          ) : (
            <div className="flex max-h-40 flex-col gap-4 overflow-y-auto pt-2 pr-[15px]">
              {items.map((item) => (
                <MiniProductCart
                  key={item.id}
                  item={item}
                  isLoading={isLoading}
                />
              ))}
            </div>
          )}
          <div className="mt-2 border-t border-border pt-2">
            <div className="flex items-center justify-between font-semibold">
              <span className="">Subtotal</span>
              <span className="">{totalAmount}MDL</span>
            </div>
            <p className="mt-2 mb-4 text-sm text-text-low">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-between text-sm">
              <Link
                className="rounded-md border border-border px-4 py-3 transition-colors hover:border-primary hover:bg-primary hover:text-on-primary"
                href={ROUTES.CART}
              >
                View Cart
              </Link>

              <Link
                className="rounded-md bg-black px-4 py-3 text-white transition-colors hover:bg-primary"
                // disabled={isLoading || items.length === 0}
                href={ROUTES.CHECKOUT}
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};
