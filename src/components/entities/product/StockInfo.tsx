interface IProps {
  stock: number;
}

export const StockInfo = ({ stock }: IProps) => {
  return (
    <>
      {stock < 1 && (
        <p className="my-auto text-xs text-red-500">Product is out of stock</p>
      )}

      {stock >= 1 && stock < 10 && (
        <p className="my-auto text-xs">
          Only{" "}
          <span className="text-orange-500">
            {stock} item{stock > 1 && "s"}
          </span>{" "}
          left!
          {/* Don`t miss it */}
        </p>
      )}
    </>
  );
};
