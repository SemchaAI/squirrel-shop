"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Filter, X } from "lucide-react";

import { Overlay } from "@/components/shared";
import { useOverlayStore, useScrollControl } from "@/utils/hooks";
import { transformAttributes } from "@/utils/helpers";

import type { IAttributeInput } from "@/models/filters";
import { buildUrlQuery } from "@/utils/helpers/buildUrlQuery";
import { FiltersGroupList } from "./FiltersGroupList";
import { PriceFilter } from "./PriceFilter";

interface IProps {
  attributesInCategory: IAttributeInput[];
  price: { minPrice: number; maxPrice: number };
}

export const Filters = ({ attributesInCategory, price }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  useScrollControl(isOpen);
  const filtersArray = transformAttributes(attributesInCategory);

  const searchParams = useSearchParams();
  const search = searchParams.toString();

  const pathname = usePathname();
  const router = useRouter();
  const setLoading = useOverlayStore((s) => s.setLoading);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    const existing = params.get(key)?.split(",") ?? [];

    const updated = existing.includes(value)
      ? existing.filter((v) => v !== value)
      : [...existing, value];

    const url = buildUrlQuery(pathname, searchParams, {
      [key]: updated.length ? updated : undefined,
    });

    setLoading(true);
    router.push(url, { scroll: false });
  };
  useEffect(() => setLoading(false), [search, setLoading]);

  return (
    <div>
      {/* Filter Button - Only on Mobile */}
      <button
        aria-label="Open filters"
        className="cursor-pointer rounded-md bg-ui p-2 md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Filter />
      </button>

      {/* Fullscreen Overlay on Mobile */}
      {isOpen && <Overlay onClick={() => setIsOpen(false)} />}
      {/* Filter Sidebar / Drawer */}
      <aside
        className={`fixed inset-0 z-10 w-4/5 bg-ui p-4 transition-transform duration-300 md:rounded-md ${isOpen ? "translate-x-0" : "-translate-x-full"} md:sticky md:top-24 md:z-0 md:h-auto md:w-auto md:min-w-75 md:translate-x-0 md:p-2`}
      >
        {/* Mobile Header */}
        <div className="mb-4 flex items-center justify-between border-b pb-2 md:hidden">
          <p className="text-2xl font-bold">Filters</p>
          <button aria-label="Close filters" onClick={() => setIsOpen(false)}>
            <X />
          </button>
        </div>

        {/* Desktop Header */}
        <p className="mb-4 hidden text-2xl font-bold md:block">Filters</p>

        {/* Filter Content */}
        <PriceFilter
          setLoading={setLoading}
          minPrice={price.minPrice}
          maxPrice={price.maxPrice}
        />
        {filtersArray.map(({ name, values }) => (
          <FiltersGroupList
            key={name}
            values={values}
            searchParams={searchParams}
            name={name}
            updateFilter={updateFilter}
          />
        ))}
      </aside>
    </div>
  );
};
