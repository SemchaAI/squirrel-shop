"use client";
import { useMemo, useState } from "react";

import { ExpandableList } from "@/components/entities/lists/ExpandableList";
import { Checkbox } from "@/components/shared/inputs/Checkbox";
import { Input } from "@/components/shared/inputs/Input";

import type { IAttributeInput } from "@/models/filters";

interface IProps {
  count: number;
  name: string;
  values: IAttributeInput[];
  activeValues: string[];
  onToggle: (value: string) => void;
}

export const FiltersGroupList = ({
  count,
  values,
  name,
  activeValues,
  onToggle,
}: IProps) => {
  const [search, setSearch] = useState("");
  const filteredValues = useMemo(() => {
    const q = search.trim().toLowerCase();
    return q ? values.filter((v) => v.value.toLowerCase().includes(q)) : values;
  }, [search, values]);

  return (
    <ExpandableList
      className="mb-5 pb-5"
      title={`${name} (${count})`}
      defaultExpanded={activeValues.length > 0}
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
          className={`customScrollbar space-y-2 ${values.length > 5 ? "max-h-38 overflow-y-auto pr-1" : ""} `}
        >
          {filteredValues.map((variant) => (
            <li key={variant.value} className="flex items-center gap-2">
              <Checkbox
                id={variant.value}
                name={variant.value}
                label={variant.value}
                checked={activeValues.includes(variant.value)}
                onChange={() => onToggle(variant.value)}
              />
              <span>({variant.count.variationOptionValue})</span>
            </li>
          ))}
        </ul>
      </div>
    </ExpandableList>
  );
};
