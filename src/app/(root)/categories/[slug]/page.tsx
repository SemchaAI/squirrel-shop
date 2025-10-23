import { PromoBanner } from "@/components/widgets/banners/PromoBanner";
import { ProductList } from "@/components/widgets/lists/ProductList";
import { Pagination } from "@/components/features/pagination/Pagination";
import { Filters } from "@/components/features/filters/Filters";

import { getCategoryProducts } from "@/utils/api/getCategoryPage";

export default async function CategoryPage({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}>) {
  const { slug } = await params;
  const search = await searchParams;
  const { data, meta } = await getCategoryProducts(slug, search);

  return (
    <div className="wrapper my-5 flex flex-col justify-start gap-8">
      <PromoBanner />
      <div className="flex flex-col gap-5 md:flex-row">
        {/* <div className="flex grow justify-end"> */}
        <Filters price={meta.priceRange} attributes={data.attributes} />
        {/* </div> */}
        <div className="flex flex-1 flex-col">
          <ProductList
            priorityIndex={2}
            products={data.productVariants}
            title={slug}
          />
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
