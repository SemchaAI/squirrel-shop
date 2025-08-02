"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import clsx from "clsx";

import { SearchInput } from "@/components/features/search/SearchInput";
import { Button } from "@/components/shared/buttons/Button";

import { useDebounce } from "@/utils/hooks/useDebounce";
import { queryKeys } from "@/utils/api/queryKeys";

export interface MediaItem {
  id: string;
  url: string;
  // [key: string]: any; // make it flexible
}

interface IProps<T extends MediaItem> {
  id: string;
  closeModal: () => void;
  onConfirm: (id: string, images: T[]) => void;
  fetchMedia: (query: string) => Promise<T[]>;
}

export function SelectMedia<T extends MediaItem>({
  id,
  closeModal,
  onConfirm,
  fetchMedia,
}: IProps<T>) {
  const router = useRouter();

  const [selectedImages, setSelectedImages] = useState<T[]>([]);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const { data: images = [], isLoading } = useQuery({
    queryKey: query.length >= 3 ? queryKeys.media(debouncedQuery) : [],
    queryFn: () => fetchMedia(debouncedQuery),
    enabled: debouncedQuery.length >= 3,
  });

  const toggleSelect = (img: T) => {
    setSelectedImages((prev) =>
      prev.find((i) => i.url === img.url)
        ? prev.filter((i) => i.url !== img.url)
        : [...prev, img],
    );
  };

  const handleClear = () => {
    setQuery("");
    setSelectedImages([]);
  };

  const clickHandler = async () => {
    try {
      await onConfirm(id, selectedImages);
      toast.success("Media selection saved.");
      handleClear();
      closeModal();
      router.refresh();
    } catch (e) {
      console.log("[SELECT MEDIA]", e);
      toast.error("Failed to save selection.");
    }
  };

  return (
    <div className="flex h-full flex-col gap-4 pt-5">
      <div className="px-5">
        <SearchInput query={query} onChange={setQuery} onClear={handleClear} />
      </div>
      <div className="flex grow px-5">
        {isLoading && <p className="text-center text-sm">Loading...</p>}
        {images.length === 0 && !isLoading && (
          <div className="text-low flex grow flex-col items-center justify-center rounded-md bg-ui text-sm">
            <p>No media found.</p>
            <p> Write minimal 3 letters to search</p>
          </div>
        )}
        {images.length > 0 && !isLoading && (
          <div className="grid h-[522px] grow grid-cols-4 grid-rows-[repeat(4,minmax(118px,auto))] gap-4 overflow-y-auto">
            {images.map((img) => (
              <button
                key={img.id}
                type="button"
                onClick={() => toggleSelect(img)}
                className={clsx(
                  "flex cursor-pointer items-center justify-center rounded-md border border-border p-2",
                  selectedImages.includes(img) && "border-primary",
                )}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_CDN_URL}${img.url}`}
                  alt="Media"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto flex justify-end p-2 shadow-[0_-2px_3px_0_#e0e0e7]">
        <Button
          type="button"
          disabled={selectedImages.length === 0}
          onClick={clickHandler}
          size="sm"
          variant="primary"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
