interface IProps {
  inStock: number;
}

export const StockDescription = ({ inStock }: IProps) => {
  if (inStock >= 10) return null;
  return (
    <div className="flex items-center">
      {/* {inStock < 1 && (
        <div className="text-xs text-red-500">Product is out of stock</div>
      )} */}
      {inStock >= 1 && inStock < 10 && (
        <div className="text-xs">
          Only <span className="text-orange-500">{inStock} items</span> left!
          <br /> {"Don't"} miss it
        </div>
      )}
    </div>
  );
};
