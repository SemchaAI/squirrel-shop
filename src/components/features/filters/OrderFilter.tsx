"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { buildUrlQuery } from "@/utils/helpers/buildUrlQuery";
import { ArrowDownWideNarrowIcon, ArrowUpWideNarrowIcon } from "lucide-react";
import { useDebounce } from "@/utils/hooks";

interface IProps {
  defaultOrder?: "desc" | "asc";
}

export const OrderFilter = ({ defaultOrder = "desc" }: IProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentOrder = searchParams.get("order") || defaultOrder;
  const [order, setOrder] = useState(currentOrder);
  const debouncedOrder = useDebounce(order, 300);

  useEffect(() => {
    if (debouncedOrder === currentOrder) return;
    const url = buildUrlQuery(pathname, searchParams, {
      order: debouncedOrder,
    });

    router.push(url, { scroll: false });
  }, [currentOrder, debouncedOrder, pathname, router, searchParams]);

  return (
    <button
      onClick={() => setOrder(order === "desc" ? "asc" : "desc")}
      className="cursor-pointer rounded-md bg-ui p-1.5 transition-colors hover:bg-ui-hover hover:text-primary"
    >
      {order === "desc" ? (
        <ArrowDownWideNarrowIcon size={20} />
      ) : (
        <ArrowUpWideNarrowIcon size={20} />
      )}
    </button>
  );
};
