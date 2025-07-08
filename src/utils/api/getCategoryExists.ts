import prisma from "@/prismaClient";
import { unstable_cache } from "next/cache";

export const getCategoryExists = unstable_cache(
  async (categorySlug: string) => {
    const count = await prisma.category.count({
      where: { slug: categorySlug },
    });
    return count > 0;
  },
  ["categorySlug"],
  { revalidate: 300 },
);
