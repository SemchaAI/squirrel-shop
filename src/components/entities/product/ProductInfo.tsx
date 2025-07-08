import type { ProductDescription } from "@prisma/client";

interface IProps {
  items: ProductDescription[];
}

export const ProductInfo = ({ items }: IProps) => {
  if (!items.length) return null;
  return (
    <div className="mt-4 rounded-md bg-ui p-2">
      {items.map((item) => (
        <div
          className="flex items-center justify-between border-b border-border py-2 text-sm last:border-0"
          key={item.title}
        >
          <h4 className="font-bold uppercase">{item.title}</h4>
          <p className="font-normal">{item.description}</p>
        </div>
      ))}
    </div>
  );
};
