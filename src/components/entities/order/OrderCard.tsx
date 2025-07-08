import type { IOrderItem } from "@/models/orders";

interface IProps {
  item: IOrderItem;
}

export const OrderCard = ({ item }: IProps) => {
  return (
    <li
      className="flex items-center justify-between border-b border-dashed border-border-hover text-sm"
      key={item.productVariant.id}
    >
      <h4 className="font-bold uppercase">{item.productVariant.title}</h4>
      <p className="font-normal">
        {item.quantity} x {item.productVariant.price} MDL
      </p>
    </li>
  );
};
