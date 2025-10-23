"use client";
import { useEffect, useState } from "react";
import { Filter, Trash2Icon, X } from "lucide-react";

import { Overlay } from "@/components/shared/overlays/Overlay";
import { FiltersGroupList } from "./FiltersGroupList";
import { PriceFilter } from "./PriceFilter";

import { useScrollControl } from "@/utils/hooks/useScrollControl";
import { useFilterQuery } from "@/utils/hooks/useFilterQuery";
import { useOverlayStore } from "@/utils/hooks/store/useOverlayStore";
import type { IAttributesResponse } from "@/models/filters";

interface IProps {
  attributes: IAttributesResponse[];
  price: { minPrice: number; maxPrice: number };
}

export const Filters = ({ attributes, price }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  useScrollControl(isOpen);
  const setLoading = useOverlayStore((s) => s.setLoading);
  const { filters, setFilter, clearKey, clearAll, count } = useFilterQuery();
  // console.log("filters", filters);

  useEffect(() => setLoading(false), [filters, setLoading]);

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
          <p className="flex items-center justify-center gap-1 text-2xl font-bold">
            Filters
            <button
              className="cursor-pointer transition-colors hover:text-primary"
              aria-label="Close filters"
              onClick={clearAll}
            >
              <Trash2Icon />
            </button>
          </p>
          <button
            className="cursor-pointer transition-colors hover:text-primary"
            aria-label="Close filters"
            onClick={() => setIsOpen(false)}
          >
            <X />
          </button>
        </div>

        {/* Desktop Header */}
        <p className="mb-4 hidden text-2xl font-bold md:block">Filters</p>

        {/* Filter Content */}
        <PriceFilter
          key={`${filters.from}-${filters.to}`}
          setFilter={setFilter}
          filters={filters}
          clearKey={clearKey}
          minPrice={price.minPrice}
          maxPrice={price.maxPrice}
        />
        {attributes.length > 0 &&
          attributes.map((item) => {
            const counter = count(item.name);
            return (
              <FiltersGroupList
                key={item.name}
                name={item.name}
                values={item.values}
                count={counter}
                onToggle={(val) => setFilter(item.name, val)}
                activeValues={filters[item.name] || []}
              />
            );
          })}
      </aside>
    </div>
  );
};
