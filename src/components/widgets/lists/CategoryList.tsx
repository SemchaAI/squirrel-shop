"use server";
import { CategoryCarousel } from "@/components/features";
import prisma from "@/prismaClient";

export const CategoryList = async () => {
  const categories = await prisma.category.findMany();

  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-2xl font-bold">Categories</h3>

      <CategoryCarousel slides={categories} options={{ align: "start" }} />
    </section>
  );
};
