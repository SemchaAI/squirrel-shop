interface IProps {
  totalItems: number;
}

export const CountBadge = ({ totalItems = 0 }: IProps) => {
  return (
    <div
      className={`once text absolute -top-1 -right-2 flex animate-bounce items-center justify-center rounded-full border border-primary bg-primary text-xs text-white ${totalItems > 9 ? "h-[18px] w-[18px]" : "h-4 w-4"}`}
    >
      {totalItems > 9 ? "9+" : totalItems}
    </div>
  );
};
