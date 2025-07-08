"use client";
import type { ReadonlyURLSearchParams, useRouter } from "next/navigation";
import qs from "qs";

// type QueryParams = Record<string, string[] | string | undefined>;

export function buildUrlQuery(
  basePath: string,
  currentParams: URLSearchParams,
  updates: Partial<Record<string, string | string[] | undefined>>,
): string {
  const parsed = qs.parse(currentParams.toString(), {
    ignoreQueryPrefix: true,
    comma: true,
  });

  // Apply updates
  for (const [key, value] of Object.entries(updates)) {
    if (value === undefined || (Array.isArray(value) && value.length === 0)) {
      delete parsed[key];
    } else {
      parsed[key] = value;
    }
  }

  // Stringify back with comma-separated arrays
  const query = qs.stringify(parsed, {
    arrayFormat: "comma",
    encodeValuesOnly: true,
  });

  return `${basePath}${query ? `?${query}` : ""}`;
}

interface UpdateSearchParamsOptions {
  key: string;
  value?: string;
  toggle?: boolean; // for multiselect toggle
  multi?: boolean; // use "," for values like color=red,blue
  replace?: boolean; // default: false (push by default)
  scroll?: boolean; // default: false
}

export function updateSearchParams(
  {
    key,
    value,
    toggle = false,
    multi = false,
    replace = false,
    scroll = false,
  }: UpdateSearchParamsOptions,
  {
    pathname,
    searchParams,
    router,
  }: {
    pathname: string;
    searchParams: ReadonlyURLSearchParams;
    router: ReturnType<typeof useRouter>;
  },
) {
  const params = new URLSearchParams(searchParams.toString());

  if (!value) {
    params.delete(key);
  } else if (toggle && multi) {
    const values = params.get(key)?.split(",") ?? [];
    const updated = values.includes(value)
      ? values.filter((v) => v !== value)
      : [...values, value];

    if (updated.length) {
      params.set(key, updated.join(","));
    } else {
      params.delete(key);
    }
  } else {
    params.set(key, value);
  }

  const url = `${pathname}?${params.toString()}`;
  router[replace ? "replace" : "push"](url, { scroll });
}
