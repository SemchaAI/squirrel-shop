import { CategoryCarousel } from "@/components/features";
import type { Category } from "@prisma/client";

export const CategoryList = ({ categories }: { categories: Category[] }) => {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-2xl font-bold">Categories</h3>

      <CategoryCarousel slides={categories} options={{ align: "start" }} />
    </section>
  );
};
