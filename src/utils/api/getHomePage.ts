import { unstable_cache } from "next/cache";
import prisma from "@/prismaClient";

export const getHomePage = unstable_cache(
  async () => {
    const [featured, newArrivals, categories] = await prisma.$transaction([
      prisma.productVariants.findMany({
        take: 4,
        where: {
          product: {
            categories: {
              some: {
                slug: "featured",
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          product: { select: { reviewCount: true, averageRating: true } },
        },
      }),
      prisma.productVariants.findMany({
        take: 8,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          product: { select: { reviewCount: true, averageRating: true } },
        },
      }),
      prisma.category.findMany(),
    ]);
    return { featured, newArrivals, categories };
  },
  ["homePage"],
  { revalidate: 300 },
);
