import { ProductCard } from "@/components/entities/cards/ProductCard";
import type { IProductCard } from "@/models/product";

interface IProps {
  title: string;
  products: IProductCard[];
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
      <ul className="grid [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))] gap-2 sm:gap-6 xl:gap-10">
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
