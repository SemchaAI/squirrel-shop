"use client";
// import { useCartStore } from "@/utils/hooks";
// import { useEffect } from "react";

export default function SuccessPage() {
  // const clearCart = useCartStore((state) => state.clearCart);

  // useEffect(() => {
  //   clearCart();
  // }, [clearCart]);

  return (
    <div className="wrapper py-10">
      <h1 className="text-xl font-bold">Thank you for your purchase!</h1>
      <p>We`ve received your order.</p>
    </div>
  );
}
