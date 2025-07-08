"use client";
import { useCartStore, useOverlayStore } from "@/utils/hooks";
import { Minus, Plus } from "lucide-react";

interface IProps {
  id: string;
  stock: number;
  quantity: number;
  // setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export const QuantitySelector = ({ quantity, id, stock }: IProps) => {
  const changeQuantity = useCartStore((state) => state.changeQuantity);
  const setLoading = useOverlayStore((state) => state.setLoading);

  const handleQuantity = async (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setLoading(true);
      await changeQuantity(id, quantity - 1);
      setLoading(false);
    }
    if (type === "i" && quantity < stock) {
      setLoading(true);
      await changeQuantity(id, quantity + 1);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* <h4 className="text-lg">Choose a Quantity</h4> */}
      <div className="flex items-center gap-4">
        <div className="flex w-32 items-center justify-between rounded-3xl bg-ui px-4 py-2">
          <button
            className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
            onClick={() => handleQuantity("d")}
            disabled={quantity === 1}
          >
            <Minus
              size={16}
              className="transition-colors hover:stroke-primary"
            />
          </button>
          <span className="border-x border-border-subtle px-4">{quantity}</span>
          <button
            className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
            onClick={() => handleQuantity("i")}
            disabled={quantity === stock}
          >
            <Plus
              size={16}
              className="transition-colors hover:stroke-primary"
            />
          </button>
        </div>
        {/* {stock < 1 && (
          <div className="text-xs text-red-500">Product is out of stock</div>
        )}

        {stock >= 1 && stock < 10 && (
          <div className="text-xs">
            Only <span className="text-orange-500">{stock} items</span> left!
            <br /> {"Don't"} miss it
          </div>
        )} */}
      </div>
    </div>
  );
};
