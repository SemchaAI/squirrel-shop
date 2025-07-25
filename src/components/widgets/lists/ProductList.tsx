import { ProductCard } from "@/components/entities/cards/ProductCard";
import type { ProductVariants } from "@prisma/client";

interface IProps {
  title: string;
  products: ProductVariants[];
  priorityIndex?: number;
  children?: React.ReactNode;
}

export const ProductList = ({
  title,
  products,
  priorityIndex = 0,
  children,
}: IProps) => {
  return (
    <section className="flex grow flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold capitalize">{title}</h3>
        {/* //link mb */}
        {children}
      </div>
      <ul className="grid [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))] gap-x-2 gap-y-4 sm:gap-x-6 sm:gap-y-10 xl:gap-10">
        {products.map(
          (product, index) =>
            product.visible && (
              <ProductCard
                priority={index < priorityIndex}
                key={product.id}
                product={product}
              />
            ),
        )}
      </ul>
    </section>
  );
};
