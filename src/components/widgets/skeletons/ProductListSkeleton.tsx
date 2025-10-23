import { Skeleton } from "@/components/shared/skeletons/Skeleton";

export const ProductListSkeleton = () => {
  return (
    <section className="wrapper flex grow flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold capitalize">New Arrivals</h3>
      </div>
      <ul className="grid [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))] gap-2 sm:gap-6 xl:gap-10">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <Skeleton className="flex h-121.5 grow rounded-md" key={index} />
        ))}
      </ul>
    </section>
  );
};
