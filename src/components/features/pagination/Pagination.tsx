"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface IProps {
  currPage: number;
  count: number;
  limit: number;
}

export const Pagination = ({ currPage, count, limit }: IProps) => {
  const router = useRouter();
  const offset = Math.ceil(count / limit);

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > offset || newPage === currPage) return;
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.replace(`${window.location.pathname}?${params}`, { scroll: false });
  };
  const getPagesToDisplay = () => {
    const delta = 1;
    const range: (number | "...")[] = [1];

    const left = Math.max(2, currPage - delta);
    const right = Math.min(offset - 1, currPage + delta);

    if (left > 2) {
      range.push("...");
    }
    for (let i = left; i <= right; i++) {
      range.push(i);
    }
    if (right < offset - 1) {
      range.push("...");
    }
    if (offset > 1) {
      range.push(offset);
    }
    return range;
  };

  const pages = getPagesToDisplay();

  return (
    <div className="flex w-full items-center justify-between gap-1 p-4 text-text-high md:justify-center md:gap-4">
      <button
        disabled={currPage === 1}
        onClick={() => changePage(currPage - 1)}
        className="cursor-pointer rounded-full bg-ui p-2 transition-colors hover:bg-ui-selected disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft size={20} className="stroke-text-high" />
      </button>
      <div className="flex flex-wrap items-center gap-1 gap-y-1 text-sm md:gap-2">
        {pages.map((page, i) =>
          page === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="flex h-9 w-9 items-center justify-center text-text-low"
            >
              {page}
            </span>
          ) : (
            <button
              key={page}
              className={`aspect-square h-9 w-9 overflow-hidden rounded-full p-2 transition-colors ${
                currPage === page
                  ? "bg-primary text-on-primary"
                  : "cursor-pointer bg-ui hover:bg-ui-selected"
              }`}
              onClick={() => changePage(page)}
            >
              {page}
            </button>
          ),
        )}
      </div>
      <button
        disabled={currPage >= offset}
        onClick={() => changePage(currPage + 1)}
        className="cursor-pointer rounded-full bg-ui p-2 transition-colors hover:bg-ui-selected disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronRight size={20} className="stroke-text-high" />
      </button>
    </div>
  );
};
