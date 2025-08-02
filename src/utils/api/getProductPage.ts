import prisma from "@/prismaClient";
import { unstable_cache } from "next/cache";
import { REVIEWS_PER_PAGE } from "@/utils/config/reviews";

export const getProductPage = unstable_cache(
  async (slug: string) => {
    const [productVariant, product] = await prisma.$transaction([
      prisma.productVariants.findUnique({
        where: {
          slug,
        },
        include: {
          options: {
            include: {
              variationOption: {
                select: {
                  hexCode: true,
                },
              },
            },
          },
          images: true,
          product: {
            include: {
              categories: true,
              ProductDescription: true,
            },
          },
        },
      }),
      prisma.product.findFirst({
        where: {
          variants: { some: { slug } },
        },
        include: {
          variants: {
            include: {
              options: {
                include: {
                  variationOption: {
                    select: {
                      hexCode: true,
                    },
                  },
                },
              },
            },
          },
          productReview: {
            where: {
              status: "APPROVED",
            },
            take: REVIEWS_PER_PAGE,
            include: {
              user: {
                select: {
                  name: true,
                  avatar: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      }),
    ]);
    return { productVariant, product };
  },
  ["productVariant"],
  { revalidate: 300 },
);
