import prisma from "@/prismaClient";

export interface FilterQuery {
  page?: string;
  perPage?: string;
  from?: string;
  to?: string;
  [key: string]: string | string[] | undefined;
}

export async function getFilteredCategory(slug: string, query: FilterQuery) {
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

  const [data, total] = await prisma.$transaction([
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
      include: { options: true },
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
  ]);

  const totalPages = Math.ceil(total / take);
  // await new Promise((res) => setTimeout(res, 3000));
  return {
    data,
    meta: { total, totalPages, pageNumber, perPage: take },
  };
}
