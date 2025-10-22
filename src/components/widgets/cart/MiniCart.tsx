"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { MiniProductCart } from "@/components/entities/cards/MiniProductCart";
import { Container } from "@/components/shared/containers/Container";
import { useCartStore } from "@/utils/hooks/store/useCartStore";
import { ROUTES } from "@/utils/config/routes/routes";

interface IProps {
  isOpen: boolean;
}

export const MiniCart = ({ isOpen }: IProps) => {
  const items = useCartStore((state) => state.items);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const isLoading = useCartStore((state) => state.isLoading);

  //top-14
  return (
    <AnimatePresence>
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.35 }}
        variants={{
          open: {
            opacity: 1,
            transform: "translateY(0)",
            pointerEvents: "auto",
          },
          closed: {
            opacity: 0,
            transform: "translateY(-150%)",
            pointerEvents: "none",
          },
        }}
        className="absolute top-20 right-0 z-10 w-110"
      >
        <Container className="flex flex-col bg-ui">
          <h2 className="text-xl">Shopping Cart</h2>
          {items.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-md bg-app font-bold">
              Cart is empty
            </div>
          ) : (
            <div className="customScrollbar flex max-h-40 flex-col gap-4 overflow-y-auto pt-2 pr-[15px]">
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
                href={ROUTES.CHECKOUT}
              >
                Checkout
              </Link>
            </div>
          </div>
        </Container>
      </motion.div>
    </AnimatePresence>
  );
};
