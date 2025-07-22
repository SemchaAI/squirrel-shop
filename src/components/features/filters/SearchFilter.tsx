"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";

import { SearchInput } from "@/components/features/search/SearchInput";
import { useDebounce } from "@/utils/hooks";

import { buildUrlQuery } from "@/utils/helpers/buildUrlQuery";

export const SearchFilter = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("q") || "";

  const [query, setQuery] = useState(search);
  const debouncedQuery = useDebounce(query, 700);

  const router = useRouter();
  const pathname = usePathname();

  const RefreshClick = () => {
    setQuery("");
  };

  useEffect(() => {
    if (debouncedQuery === search) return;

    const url = buildUrlQuery(pathname, searchParams, {
      q: debouncedQuery ? debouncedQuery : undefined,
    });

    router.push(url, { scroll: false });
  }, [debouncedQuery, pathname, searchParams, router, search]);

  return (
    <SearchInput
      query={query || ""}
      onChange={setQuery}
      onClear={RefreshClick}
    />
  );
};
