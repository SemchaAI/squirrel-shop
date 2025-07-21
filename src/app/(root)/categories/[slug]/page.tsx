import { notFound } from "next/navigation";

import { PromoBanner } from "@/components/widgets/banners/PromoBanner";
import { ProductList } from "@/components/widgets/lists/ProductList";
import { Filters, Pagination } from "@/components/features";

import { getCategoryExists, getFilteredCategory } from "@/utils/api";
import { getFiltersAttributes } from "@/utils/api";

export default async function CategoryPage({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}>) {
  const { slug } = await params;
  const isCategoryExists = await getCategoryExists(slug);
  if (!isCategoryExists) return notFound();

  const search = await searchParams;
  const { data, meta } = await getFilteredCategory(slug, search);

  const attributesInCategory = await getFiltersAttributes(slug);

  return (
    <div className="wrapper my-5 flex flex-col justify-start gap-8">
      <PromoBanner />
      <div className="flex flex-col gap-5 md:flex-row">
        {/* <div className="flex grow justify-end"> */}
        <Filters
          price={meta.priceRange}
          attributesInCategory={attributesInCategory}
        />
        {/* </div> */}
        <div className="flex flex-1 flex-col">
          <ProductList products={data} title={slug} />
          <Pagination
            currPage={meta.pageNumber}
            count={meta.total}
            limit={meta.perPage}
          />
        </div>
      </div>
      <div className="flex flex-col justify-start gap-16">
        {/* <PromoBanner /> */}
        {/* <div className="h-32 w-full bg-pink-300">here can be additional data/adds</div> */}
      </div>
    </div>
  );
}
