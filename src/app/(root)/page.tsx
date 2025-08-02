import PromoCarousel from "@/components/features/carousels/PromoCarousel";
import { CategoryList } from "@/components/widgets/lists/CategoryList";
import { ProductList } from "@/components/widgets/lists/ProductList";

import { getHomePage } from "@/utils/api/getHomePage";

const slides = [
  {
    id: 1,
    title: "Summer Sale Collections",
    description: "Sale! Up to 50% off!",
    img: {
      src: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
      pos: "50% 0%",
    },
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "Winter Sale Collections",
    description: "Sale! Up to 50% off!",
    img: {
      src: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
      pos: "50% 10%",
    },
    url: "/",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  {
    id: 3,
    title: "Spring Sale Collections",
    description: "Sale! Up to 50% off!",
    img: {
      src: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
      pos: "50% 40%",
    },
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
  {
    id: 4,
    title: "Spring Sale Collections",
    description: "Sale! Up to 50% off!",
    img: {
      src: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
      pos: "50% 40%",
    },
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
];

export default async function Home() {
  const { featured, newArrivals, categories } = await getHomePage();
  return (
    <div className="mb-16 flex flex-col justify-start gap-16">
      <PromoCarousel slides={slides} />
      <div className="wrapper">
        <ProductList products={featured} title="Featured" />
      </div>
      <CategoryList categories={categories} />

      <div className="wrapper">
        <ProductList products={newArrivals} title="New Arrivals" />
      </div>
    </div>
  );
}
