import dynamic from "next/dynamic";

import PromoCarousel from "@/components/features/carousels/PromoCarousel";
import { CategoryList } from "@/components/widgets/lists/CategoryList";
import { ProductList } from "@/components/widgets/lists/ProductList";
import { ProductListSkeleton } from "@/components/widgets/skeletons/ProductListSkeleton";

import { getHomePage } from "@/utils/api/getHomePage";
import { slides } from "@/utils/config/slides/homeSlider";

const NewArrivalsSection = dynamic(
  () =>
    import("@/components/widgets/sections/NewArrivalsSection").then(
      (mod) => mod.NewArrivalsSection,
    ),
  {
    loading: () => <ProductListSkeleton />,
  },
);

export default async function Home() {
  const { featured, categories } = await getHomePage();
  return (
    <div className="mb-16 flex flex-col justify-start gap-16">
      <PromoCarousel slides={slides} />
      <div className="wrapper">
        <ProductList products={featured} title="Featured" />
      </div>
      <CategoryList categories={categories} />
      <NewArrivalsSection />
    </div>
  );
}
