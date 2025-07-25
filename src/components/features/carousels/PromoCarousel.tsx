"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { DotButton, useDotButton } from "../buttons/CarouselDotButton";

type TSlide = {
  id: number;
  title: string;
  description: string;
  img: {
    src: string;
    pos: string;
  };
  url: string;
  bg: string;
};

type PropType = {
  slides: TSlide[];
  options?: EmblaOptionsType;
};

const PromoCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 5000, stopOnMouseEnter: true }),
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <section className="relative m-auto h-[calc(100svh-80px)] max-w-full">
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="-ml-0 flex h-full touch-pan-y">
          {slides.map((slide, index) => (
            <div
              className={`min-w-0 flex-[0_0_100%] transform-gpu pl-0 ${slide.bg}`}
              key={index}
            >
              <div className="flex h-full w-full flex-col select-none xl:flex-row">
                {/* TEXT CONTAINER */}
                <div className="flex h-1/3 flex-col items-center justify-center gap-8 text-center text-black xl:h-full xl:w-1/2 2xl:gap-12">
                  <h3 className="text-xl lg:text-3xl 2xl:text-5xl">
                    {slide.description}
                  </h3>
                  <h2 className="text-5xl font-semibold lg:text-6xl 2xl:text-8xl">
                    {slide.title}
                  </h2>
                  <Link
                    href={slide.url}
                    className="rounded-md bg-black px-4 py-3 text-white transition-colors hover:bg-primary"
                  >
                    SHOP NOW
                  </Link>
                </div>
                {/* IMAGE CONTAINER */}
                <div className="relative h-2/3 xl:h-full xl:w-1/2">
                  <Image
                    src={slide.img.src}
                    priority={index === 0}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    alt={`${slide.title} promo image`}
                    fill
                    sizes="(min-width: 1280px) 50vw, 100vw"
                    //srcset
                    className="object-cover"
                    style={{ objectPosition: slide.img.pos }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <div className="flex gap-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`flex h-3 w-3 cursor-pointer items-center justify-center rounded-full ring-1 ring-gray-600 transition-transform ${
                selectedIndex === index ? "scale-150 ring-primary" : ""
              }`}
            >
              {selectedIndex === index && (
                <div className="h-[6px] w-[6px] rounded-full bg-primary"></div>
              )}
            </DotButton>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoCarousel;
