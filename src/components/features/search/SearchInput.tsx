"use client";
import { Input } from "@/components/shared";
import { SearchIcon, Trash2Icon } from "lucide-react";
import clsx from "clsx";

interface IProps {
  query: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  onFocus?: () => void;
  placeholder?: string;
  focused?: boolean;
  className?: string;
}

export const SearchInput = ({
  query,
  onChange,
  onClear,
  focused,
  className,
  onFocus,
}: IProps) => {
  return (
    <div
      className={clsx(
        "group relative grow transition-colors",
        focused && "z-20 rounded-3xl bg-ui-selected",
        className,
      )}
    >
      <SearchIcon
        size={18}
        className="absolute top-1/2 left-2 -translate-y-1/2 group-focus-within:text-primary"
      />
      <Input
        type="text"
        className="w-full bg-app transition-colors focus:border-primary focus:outline-none"
        placeholder="Search..."
        rounded
        value={query}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
      />
      {query.length > 0 && (
        <Trash2Icon
          size={18}
          onClick={onClear}
          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer hover:text-primary"
        />
      )}
    </div>
  );
};
