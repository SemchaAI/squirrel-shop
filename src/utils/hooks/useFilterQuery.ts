"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useOverlayStore } from "./store/useOverlayStore";

export const useFilterQuery = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const setLoading = useOverlayStore((s) => s.setLoading);

  const updateParams = useCallback(
    (newParams: URLSearchParams, replace = false) => {
      const url = `${pathname}?${newParams.toString()}`;
      setLoading(true);
      router[replace ? "replace" : "push"](url, { scroll: false });
    },
    [pathname, router, setLoading],
  );

  const count = (key: string) => {
    const value = searchParams.get(key);
    return value ? value.split(",").filter(Boolean).length : 0;
  };

  const filters = useMemo(() => {
    const result: Record<string, string[]> = {};
    for (const [key, value] of searchParams.entries()) {
      result[key] = value.split(",").filter(Boolean);
    }
    return result;
  }, [searchParams]);

  const setFilter = useCallback(
    (key: string, value: string, replace = false) => {
      const params = new URLSearchParams(searchParams);
      if (replace) params.set(key, value);
      else {
        const existing =
          params
            .get(key)
            ?.split(",")
            .map((v) => v.trim())
            .filter(Boolean) ?? [];
        const updated = existing.includes(value)
          ? existing.filter((v) => v !== value)
          : [...existing, value];
        params.delete(key);
        if (updated.length > 0) params.set(key, updated.join(","));
      }

      // Reset page
      params.set("page", "1");

      updateParams(params);
    },
    [searchParams, updateParams],
  );

  const clearKey = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams);
      params.delete(key);
      params.set("page", "1");
      updateParams(params);
    },
    [searchParams, updateParams],
  );

  const clearAll = useCallback(() => {
    updateParams(new URLSearchParams(), true);
  }, [updateParams]);
  return { filters, setFilter, clearKey, clearAll, count };
};
