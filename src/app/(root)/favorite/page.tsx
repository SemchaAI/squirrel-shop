"use client";
import { Squirrel } from "lucide-react";

import { ProductList } from "@/components/widgets/lists/ProductList";
import { EmptyFavorite } from "@/components/entities";
import { ClearFavoriteButton } from "@/components/features";

import { useFavoriteStore } from "@/utils/hooks";

export default function FavoritePage() {
  const { items: products, isLoading } = useFavoriteStore((state) => state);

  if (isLoading)
    return (
      <div className="mt-2 flex grow items-center justify-center gap-2 p-2">
        <Squirrel className="animate-pulse" size={80} />
        <div className="animate-pulse text-2xl">Loading...</div>
      </div>
    );
  if (products.length === 0) return <EmptyFavorite />;

  return (
    <section className="wrapper mt-5 py-5">
      <ProductList products={products} title="Favorite">
        <ClearFavoriteButton />
      </ProductList>
    </section>
  );
}
