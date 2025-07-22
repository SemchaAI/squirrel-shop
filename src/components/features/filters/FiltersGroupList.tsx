"use client";
import { useMemo, useState } from "react";

import { ExpandableList } from "@/components/entities/lists/ExpandableList";
import { Checkbox } from "@/components/shared/inputs/Checkbox";
import { Input } from "@/components/shared/inputs/Input";

import type { IAttributeValue } from "@/models/filters";

interface IProps {
  name: string;
  values: IAttributeValue[];
  searchParams: URLSearchParams;
  updateFilter: (key: string, value: string) => void;
}

export const FiltersGroupList = ({
  values,
  searchParams,
  name,
  updateFilter,
}: IProps) => {
  const [search, setSearch] = useState("");
  const selectedValues = searchParams.get(name)?.split(",") ?? [];

  const filteredValues = useMemo(() => {
    if (!search.trim()) return values;
    return values.filter((v) =>
      v.value.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, values]);

  return (
    <ExpandableList
      className="mb-5 pb-5"
      title={name}
      defaultExpanded={selectedValues.length > 0}
    >
      <div className="mt-4">
        {values.length > 5 && (
          <Input
            type="text"
            placeholder="Search..."
            className="mb-4 h-8 w-full border-border"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
        <ul
          className={`space-y-2 ${values.length > 5 ? "max-h-38 overflow-y-auto pr-1" : ""} `}
        >
          {filteredValues.map((variant) => (
            <li key={variant.value} className="flex items-center gap-2">
              <Checkbox
                id={variant.value}
                name={variant.value}
                label={variant.value}
                checked={selectedValues.includes(variant.value)}
                onChange={() => updateFilter(name, variant.value)}
              />
            </li>
          ))}
        </ul>
      </div>
    </ExpandableList>
  );
};
