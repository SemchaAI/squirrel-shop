"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchIcon, SquirrelIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";

import { Overlay } from "@/components/shared/overlays/Overlay";
import { SearchProductCard } from "@/components/entities/cards/SearchProductCard";
import { SearchInput } from "./SearchInput";
import { searchProducts } from "@/utils/api";
import { useDebounce } from "@/utils/hooks";

export const SearchMenu = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 700);

  const [focused, setFocused] = useState(false);
  const pathname = usePathname();

  useEffect(() => setFocused(false), [pathname]);

  const {
    data: response,
    isFetching,
    isError,
    isFetched,
  } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => searchProducts(debouncedQuery),
    enabled: debouncedQuery.length >= 3,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const CloseHandler = () => {
    setFocused(false);
    // setQuery("");
  };
  const RefreshClick = () => {
    setQuery("");
  };

  const products = response?.data || [];

  const hasNoResults =
    isFetched && !isError && products.length === 0 && query.length >= 3;
  const showResults = products.length > 0 && !isFetching;
  const showPrompt = !isFetching && !isError && !hasNoResults && !showResults;
  return (
    <div className="flex flex-1 items-center justify-end">
      <SearchInput
        query={query}
        onChange={setQuery}
        onClear={RefreshClick}
        focused={focused}
        onFocus={() => setFocused(true)}
      />
      <AnimatePresence>
        {focused && (
          <>
            <Overlay onClick={CloseHandler} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="wrapper absolute top-20 right-0 left-0 z-10 w-full"
            >
              <ul className="customScrollbar flex max-h-96 flex-col gap-2.5 overflow-x-hidden overflow-y-auto rounded-xl border border-border bg-ui p-2 shadow-md shadow-primary">
                {isFetching && (
                  <li className="flex h-96 animate-pulse flex-col items-center justify-center">
                    <SquirrelIcon size={100} className="text-primary" />
                    <p className="text-2xl font-medium text-primary">
                      Loading ...
                    </p>
                  </li>
                )}
                {isError && (
                  <li className="flex h-96 flex-col items-center justify-center text-primary">
                    <SquirrelIcon size={100} className="text-primary" />
                    <p className="text-2xl font-medium">
                      Something went wrong.
                    </p>
                    <p className="flex items-center">
                      <SearchIcon size={16} />
                      Try to write something else
                    </p>
                  </li>
                )}
                {hasNoResults && (
                  <li className="flex h-96 flex-col items-center justify-center">
                    <SquirrelIcon size={100} className="text-primary" />
                    <span className="text-2xl font-medium text-primary">
                      No results found
                    </span>
                  </li>
                )}
                {showPrompt && (
                  <li className="flex h-96 flex-col items-center justify-center">
                    <SquirrelIcon size={100} className="text-primary" />
                    <p className="flex items-center gap-2 text-2xl font-medium text-primary">
                      <SearchIcon size={24} /> Search for products
                    </p>
                  </li>
                )}
                {showResults &&
                  products.map((product) => (
                    <SearchProductCard key={product.id} product={product} />
                  ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// useEffect(() => {
//   if (debouncedQuery.length < 3) return;

//   // Fetch search results
//   const fetchResults = async () => {
//     setIsLoading(true);
//     setFocused(true);
//     try {
//       const res = await fetch(
//         `${API_ROUTES.SEARCH}?q=${encodeURIComponent(debouncedQuery)}`,
//       );
//       const data = await res.json();
//       setProducts(data);
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//       toast.error("Something went wrong!");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   fetchResults();
// }, [debouncedQuery]);

// const CloseHandler = () => {
//   setFocused((prev) => !prev);
//   setQuery("");
//   setProducts([]);
// };
// const RefreshClick = () => {
//   setQuery("");
//   setProducts([]);
// };
