import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import prisma from "@/prismaClient";

import type { IAttributesResponse } from "@/models/filters";

export interface FilterQuery {
  page?: string;
  perPage?: string;
  from?: string;
  to?: string;
  [key: string]: string | string[] | undefined;
}

async function _getCategoryProducts(slug: string, query: FilterQuery) {
  const count = await prisma.category.count({
    where: { slug },
  });
  if (!count) return notFound();

  const pageNumber = parseInt(query.page || "1", 10);
  const take = 12;
  const skip = (pageNumber - 1) * take;
  const from = query.from ? parseInt(query.from, 10) : undefined;
  const to = query.to ? parseInt(query.to, 10) : undefined;

  const filtersWithoutPagination = Object.entries(query).filter(
    ([key]) => !["page", "perPage", "from", "to"].includes(key),
  );
  const variationFilters = filtersWithoutPagination.map(
    ([variationName, values]) => ({
      options: {
        some: {
          variationName,
          variationOptionValue: {
            in: Array.isArray(values)
              ? values
              : (values?.toString().split(",") ?? []),
          },
        },
      },
    }),
  );

  const [productVariants, total, priceRange, attributesInCategory, colors] =
    await prisma.$transaction([
      prisma.productVariants.findMany({
        take,
        skip,
        where: {
          product: { categories: { some: { slug } } },
          AND: variationFilters,
          price: {
            gte: from,
            lte: to,
          },
        },
        include: {
          options: true,
          product: { select: { reviewCount: true, averageRating: true } },
        },
      }),
      prisma.productVariants.count({
        where: {
          product: { categories: { some: { slug } } },
          AND: variationFilters,
          price: {
            gte: from,
            lte: to,
          },
        },
      }),
      prisma.productVariants.aggregate({
        where: {
          product: { categories: { some: { slug } } },
        },
        _min: { price: true },
        _max: { price: true },
      }),
      prisma.productVariantsOptions.groupBy({
        by: ["variationName", "variationOptionValue"],
        orderBy: { variationName: "asc" },
        where: {
          productVariant: {
            product: {
              categories: {
                some: {
                  slug,
                },
              },
            },
          },
        },
        _count: {
          variationOptionValue: true,
        },
      }),
      prisma.variationOptions.findMany({
        where: {
          hexCode: {
            not: null,
          },
        },

        select: {
          hexCode: true,
          value: true,
        },
      }),
    ]);
  const totalPages = Math.ceil(total / take);

  const attributes = Object.values(
    attributesInCategory.reduce<Record<string, IAttributesResponse>>(
      (acc, item) => {
        const attribute = item.variationName;
        if (!acc[attribute]) {
          acc[attribute] = {
            name: attribute,
            values: [],
          };
        }
        // Normalize _count
        const countObj =
          item._count && typeof item._count !== "boolean"
            ? { variationOptionValue: item._count.variationOptionValue || 0 }
            : { variationOptionValue: 0 };

        acc[attribute].values.push({
          name: item.variationName,
          value: item.variationOptionValue,
          count: countObj,
          hexCode:
            colors.find((color) => color.value === item.variationOptionValue)
              ?.hexCode ?? null,
        });
        return acc;
      },
      {},
    ),
  );

  return {
    meta: {
      total,
      totalPages,
      pageNumber,
      perPage: take,
      priceRange: {
        minPrice: priceRange?._min.price ?? 0,
        maxPrice: priceRange?._max.price ?? 0,
      },
    },
    data: {
      productVariants,
      attributes,
    },
  };
}

export const getCategoryProducts = unstable_cache(
  _getCategoryProducts,
  ["getCategoryProducts"],
  {
    tags: ["getCategoryProducts"],
    revalidate: 60 * 5, // 5min
  },
);
