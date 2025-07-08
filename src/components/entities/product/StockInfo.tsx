interface IProps {
  stock: number;
}

export const StockInfo = ({ stock }: IProps) => {
  return (
    <>
      {stock < 1 && (
        <div className="text-xs text-red-500">Product is out of stock</div>
      )}

      {stock >= 1 && stock < 10 && (
        <div className="text-xs">
          Only <span className="text-orange-500">{stock} items</span> left!
          {/* <br /> {"Don't"} miss it */}
        </div>
      )}
    </>
  );
};
