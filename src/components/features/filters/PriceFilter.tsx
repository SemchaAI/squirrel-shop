"use client";
import { ExpandableList } from "@/components/entities/lists/ExpandableList";
import { RangePriceSlider } from "@/components/entities/range/RangeSlider";

interface IProps {
  maxPrice: number;
  minPrice: number;
  setFilter: (key: string, value: string, replace?: boolean) => void;
  clearKey: (key: string) => void;
  filters: Record<string, string[]>;
}

export const PriceFilter = (data: IProps) => {
  const { maxPrice, minPrice, setFilter, clearKey, filters } = data;
  const fromUrl = filters["from"]?.[0];
  const toUrl = filters["to"]?.[0];

  const isExpanded =
    filters["from"] !== undefined || filters["to"] !== undefined;

  const changeHandler = (range: { min: number; max: number }) => {
    const RangeMinStr = range.min.toString();
    const RangeMaxStr = range.max.toString();
    const from = range.min === minPrice ? undefined : RangeMinStr;
    const to = range.max === maxPrice ? undefined : RangeMaxStr;
    // console.log("from", from, "fromUrl", fromUrl);

    if (from === undefined && fromUrl !== undefined) return clearKey("from");
    if (to === undefined && toUrl !== undefined) return clearKey("to");

    if (from && from !== fromUrl) return setFilter("from", from, true);
    if (to && to !== toUrl) return setFilter("to", to, true);
  };

  return (
    <ExpandableList
      className="mb-5 pb-5"
      title="Price"
      defaultExpanded={isExpanded}
    >
      <div className="mt-2 flex flex-col gap-4">
        <RangePriceSlider
          min={minPrice}
          max={maxPrice}
          currMin={Number(fromUrl) || minPrice}
          currMax={Number(toUrl) || maxPrice}
          step={1}
          onChange={changeHandler}
        />
      </div>
    </ExpandableList>
  );
};
