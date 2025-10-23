import { unstable_cache } from "next/cache";
import prisma from "@/prismaClient";

export const getHomePage = unstable_cache(
  async () => {
    const [featured, categories] = await prisma.$transaction([
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
      prisma.category.findMany(),
    ]);
    return { featured, categories };
  },
  ["homePage"],
  { revalidate: 60 * 5 },
);

// New arrivals
export const getNewArrivals = unstable_cache(
  async () => {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    return prisma.productVariants.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: {
        product: { select: { reviewCount: true, averageRating: true } },
      },
    });
  },
  ["homePage-newArrivals"],
  { revalidate: 60 * 5 },
);
