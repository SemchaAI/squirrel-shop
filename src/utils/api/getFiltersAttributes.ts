"use server";

import prisma from "@/prismaClient";
import type { IAttributeInput } from "@/models/filters";
import { unstable_cache } from "next/cache";

export const getFiltersAttributes = unstable_cache(
  async (slug: string): Promise<IAttributeInput[]> => {
    // console.log("getFiltersAttributes");
    const attributesInCategory = await prisma.productVariantsOptions.findMany({
      select: {
        variationOptionValue: true,
        variationName: true,
        variationOption: {
          select: {
            hexCode: true,
          },
        },
      },
      where: {
        productVariant: {
          product: {
            categories: {
              some: {
                slug: slug,
              },
            },
          },
        },
      },
    });

    return attributesInCategory;
  },
  ["slug"],
  { revalidate: 300 },
);
