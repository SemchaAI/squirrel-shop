import PromoCarousel from "@/components/features/carousels/PromoCarousel";
import { CategoryList } from "@/components/widgets/lists/CategoryList";
import { ProductList } from "@/components/widgets/lists/ProductList";

import { getHomePage } from "@/utils/api/getHomePage";

const slides = [
  {
    id: 1,
    description: "Leica 1-inch main, 200MP telephoto",
    svgImage: {
      alt: "Xiaomi 15 Ultra, equipped with Xiaomi HyperAI, represents the ultimate photography experience, in partnership with Leica.",
      desktopUrl: "/static/banners/t14-landscape.svg",
      mobileUrl: "/static/banners/t14-portrait.svg",
    },
    bgImage: {
      alt: "Xiaomi 15 Ultra",
      desktopUrl: "/static/banners/t14-landscape.webp",
      mobileUrl: "/static/banners/t14-portrait.webp",
    },
    linkUrl: "/product/xiaomi-15ultra-16gb-512gb-silver-chrome",
    ctaText: "Learn more",
    isDark: false,
  },
  {
    id: 2,
    subtitle: "Focus your flow",
    description:
      "3.2K 144Hz crystal-clear display\nSeamless desktop-like experience",
    svgImage: {
      alt: "Xiaomi Pad 7 Pro, equipped with Xiaomi HyperAI technology.",
      desktopUrl: "/static/banners/pad7-landscape.svg",
      mobileUrl: "/static/banners/pad7-portrait.svg",
    },
    bgImage: {
      alt: "Xiaomi Pad 7 Pro",
      desktopUrl: "/static/banners/pad7-landscape.webp",
      mobileUrl: "/static/banners/pad7-portrait.webp",
    },
    linkUrl: "/product/pad7-pro-8gb-256gb-green",
    ctaText: "Learn more",
    isDark: true,
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
