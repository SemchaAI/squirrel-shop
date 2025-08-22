"use client";
import { useShallow } from "zustand/shallow";
import { Squirrel } from "lucide-react";

import { useCartStore } from "@/utils/hooks/store/useCartStore";

import { EmptyCart } from "@/components/entities/cart/EmptyCart";
import { CartCard } from "@/components/entities/cart/CartCard";
import { OrderSummary } from "@/components/entities/order/OrderSummary";

import { ClearCart } from "@/components/features/cart/ClearCart";

export default function CartPage() {
  const { items, isLoading } = useCartStore(
    useShallow((state) => {
      return {
        items: state.items,
        isLoading: state.isLoading,
      };
    }),
  );

  if (isLoading && items.length === 0)
    return (
      <div className="mt-2 flex grow items-center justify-center gap-2 p-2">
        <Squirrel className="animate-pulse" size={80} />
        <div className="animate-pulse text-2xl">Loading...</div>
      </div>
    );
  if (items.length === 0 && !isLoading) return <EmptyCart />;

  return (
    <section className="wrapper mt-5 py-5">
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex-1">
          <div className="mb-6 flex justify-between gap-2">
            <h2 className="text-4xl font-bold">Cart</h2>
            <ClearCart />
          </div>

          <ul className="w-full">
            {items.map((item) => (
              <CartCard key={item.id} item={item} />
            ))}
          </ul>
        </div>

        <OrderSummary items={items} />
      </div>
    </section>
  );
}
