import Link from "next/link";
import { TruckIcon } from "lucide-react";

import { ROUTES } from "@/utils/config";

// mb  centralize type
import type { IOrderItem } from "@/models/orders";
import type { ICartItem } from "@/models/cart";
import { Button } from "@/components/shared/buttons/Button";

interface IProps {
  items: IOrderItem[] | ICartItem[];
  isCheckout?: boolean;
}

export const OrderSummary = ({ items, isCheckout = false }: IProps) => {
  const totalAmount = items.reduce((acc, item) => {
    return acc + item.productVariant.price * item.quantity;
  }, 0);

  return (
    <div className="sticky top-24 h-fit flex-shrink-0 lg:w-1/3 xl:w-1/4">
      <div className="rounded-xl border border-border p-5">
        <div className="flex items-center justify-between">
          <h3>Total</h3>
          <span className="text-2xl font-bold">
            {totalAmount}
            <span> MDL</span>
          </span>
        </div>
        <div className="my-2 flex flex-col border-y border-border">
          <div className="flex items-center py-2">
            <h3>Shipping</h3>
            <div className="relative mx-1 mt-auto mb-1 flex flex-grow border-b border-dashed border-border" />
            <p>{totalAmount >= 1000 ? "Free" : "100MDL"}</p>
          </div>
          <div className="flex items-center py-2">
            <h3>Positions</h3>
            <div className="relative mx-1 mt-auto mb-1 flex flex-grow border-b border-dashed border-border" />
            <p className="px-1">{items.length}</p>
          </div>
        </div>

        <div className="flex w-full">
          {!isCheckout ? (
            <Link
              href={ROUTES.CHECKOUT}
              className="w-full rounded-md border border-primary bg-primary px-4 py-2 text-center text-on-primary transition-colors hover:bg-transparent hover:text-primary"
            >
              To Checkout
            </Link>
          ) : (
            <Button type="submit" className="w-full" variant="ghost">
              To Payment
            </Button>
          )}
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-2 rounded-xl border border-border p-5">
        <div className="mt-auto w-10">
          <TruckIcon size={40} />
        </div>
        <p className="text-gray-400">
          Free shipping for orders over{" "}
          <span className="font-bold text-primary">1000MDL</span>
        </p>
      </div>
    </div>
  );
};
