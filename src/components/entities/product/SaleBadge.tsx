interface IProps {
  price: number;
  previousPrice: number;
}

export const SaleBadge = ({ price, previousPrice }: IProps) => {
  const discount = ((previousPrice - price) / previousPrice) * 100;
  return (
    <div className="rounded-md border border-success-hover bg-success px-1 py-0.5 text-xs text-on-primary">
      -{discount.toFixed(0)}%
    </div>
  );
};
