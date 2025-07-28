"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./Thumb";
import type { EmblaOptionsType } from "embla-carousel";

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
};

export const ProductImagesCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="m-auto">
      <div className="overflow-hidden" ref={emblaMainRef}>
        <div className="-ml-0 flex touch-pan-y touch-pinch-zoom">
          {slides.map((slide, index) => (
            <div
              className={`min-w-0 flex-[0_0_100%] transform-gpu pl-0`}
              key={index}
            >
              <div className="h-100 rounded-md bg-ui">
                <Image
                  className="object-contain"
                  src={process.env.NEXT_PUBLIC_IMAGE_CDN_URL + slide}
                  alt=""
                  fill
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-1">
        <div className="overflow-hidden" ref={emblaThumbsRef}>
          <div className="-ml-1 flex">
            {slides.map((slide, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                slide={process.env.NEXT_PUBLIC_IMAGE_CDN_URL + slide}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
