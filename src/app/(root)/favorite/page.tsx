import { notFound, redirect } from "next/navigation";
// import { Squirrel } from "lucide-react";
import { auth } from "@/auth";

import { ProductList } from "@/components/widgets/lists/ProductList";
import { EmptyFavorite } from "@/components/entities/favorite/EmptyFavorite";
import { ClearFavoriteButton } from "@/components/features/favorite/ClearFavoriteButton";
import { ROUTES } from "@/utils/config/routes/routes";
import prisma from "@/prismaClient";

// import { useFavoriteStore } from "@/utils/hooks/store/useFavoriteStore";

export default async function FavoritePage() {
  const session = await auth();
  if (!session || session.user.role === "GUEST")
    return redirect(`${ROUTES.SIGNIN}`);
  const favorite = await prisma.favorite.findUnique({
    where: { userId: session.user.id },
    include: {
      favoriteProducts: {
        include: {
          productVariant: {
            include: {
              product: {
                select: {
                  reviewCount: true,
                  averageRating: true,
                },
              },
            },
          },
        },
      },
    },
  });
  if (!favorite) return notFound();
  if (favorite.favoriteProducts.length === 0) return <EmptyFavorite />;

  const products = favorite.favoriteProducts.map((item) => item.productVariant);

  return (
    <section className="wrapper mt-5 py-5">
      <ProductList products={products} title="Favorite">
        <ClearFavoriteButton />
      </ProductList>
    </section>
  );
}
// const { items: products, isLoading } = useFavoriteStore((state) => state);

// if (isLoading)
//   return (
//     <div className="mt-2 flex grow items-center justify-center gap-2 p-2">
//       <Squirrel className="animate-pulse" size={80} />
//       <div className="animate-pulse text-2xl">Loading...</div>
//     </div>
//   );
