"use client";
import { ExpandableList, RangePriceSlider } from "@/components/entities";
import { buildUrlQuery } from "@/utils/helpers/buildUrlQuery";
import { useOverlayStore } from "@/utils/hooks";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IProps {
  maxPrice: number;
  minPrice: number;
  setLoading: (val: boolean) => void;
}

export const PriceFilter = ({ minPrice, maxPrice }: IProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const setLoading = useOverlayStore((s) => s.setLoading);

  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");

  const changeHandler = (range: { min: number; max: number }) => {
    const shouldClear = range.min === minPrice && range.max === maxPrice;

    const url = buildUrlQuery(pathname, searchParams, {
      from: shouldClear ? undefined : range.min.toString(),
      to: shouldClear ? undefined : range.max.toString(),
    });
    const strSearchParams = searchParams.toString();
    const newSearchParams = url.split("?")[1];

    //if empty or same then don't update
    if (
      (newSearchParams === undefined && strSearchParams === "") ||
      newSearchParams === strSearchParams
    ) {
      return;
    } else {
      setLoading(true);
      router.push(url, { scroll: false });
    }
  };

  useEffect(() => setLoading(false), [fromParam, toParam, setLoading]);

  return (
    <ExpandableList title="Price" defaultExpanded={fromParam !== undefined}>
      <div className="mt-2 flex flex-col gap-4">
        <RangePriceSlider
          min={minPrice}
          max={maxPrice}
          currMin={Number(fromParam) || minPrice}
          currMax={Number(toParam) || maxPrice}
          step={1}
          onChange={changeHandler}
        />
      </div>
    </ExpandableList>
  );
};
