"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { DotButton, useDotButton } from "../buttons/CarouselDotButton";
import clsx from "clsx";

type TSlide = {
  id: number;
  title?: string;
  subtitle?: string;
  description?: string;
  linkUrl: string;
  ctaText: string;
  svgImage?: {
    alt: string;
    desktopUrl: string;
    mobileUrl: string;
  };
  bgImage: {
    desktopUrl: string;
    mobileUrl: string;
  };
  isDark?: boolean;
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
    <section className="relative m-auto w-full overflow-hidden">
      <div
        className="h-full max-h-[calc(100svh-80px)] overflow-hidden"
        ref={emblaRef}
      >
        <div className="-ml-0.5 flex h-full touch-pan-y gap-0.5">
          {slides.map((slide) => (
            <div
              className={`min-w-0 flex-[0_0_100%] transform-gpu overflow-hidden pl-0`}
              key={slide.id}
            >
              <div className="flex h-120 w-full cursor-pointer md:h-90 lg:h-[476px] xl:h-150">
                <picture className="absolute inset-0 top-0 left-0 -z-1 h-full w-full">
                  <source
                    srcSet={slide.bgImage.desktopUrl}
                    type="image/webp"
                    media="(min-width: 768px)"
                  />
                  <Image
                    priority={true}
                    alt="Xiaomi 14 mi desktop"
                    src={slide.bgImage.mobileUrl}
                    fill
                    quality={85}
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                </picture>
                <div className="wrapper relative mx-8 flex justify-center px-12 py-4 md:my-auto md:flex-row md:justify-start lg:px-20 lg:py-8">
                  <div className="flex max-w-75 flex-col items-center gap-y-6 text-center whitespace-pre-wrap md:max-w-90 md:items-start md:gap-y-15 md:text-start lg:max-w-160">
                    <div
                      className={clsx(
                        "flex flex-col gap-2 md:gap-y-2.5",
                        slide.isDark ? "text-white" : "text-black",
                      )}
                    >
                      {slide.svgImage && (
                        <picture>
                          <source
                            srcSet={slide.svgImage?.desktopUrl}
                            type="image/webp"
                            media="(min-width: 768px)"
                          />
                          <Image
                            src={slide.svgImage?.mobileUrl}
                            alt={slide.svgImage?.alt}
                            className="w-full"
                            width={540}
                            height={0}
                          />
                        </picture>
                      )}
                      {slide.title && (
                        <p className="text-xl font-bold lg:text-3xl">
                          {slide.title}
                        </p>
                      )}
                      {slide.subtitle && (
                        <p className="text-lg font-semibold lg:text-2xl">
                          {slide.subtitle}
                        </p>
                      )}
                      {slide.description && (
                        <p className="line-clamp-2 overflow-hidden text-sm lg:text-xl">
                          {slide.description}
                        </p>
                      )}
                    </div>
                    <Link
                      href={slide.linkUrl}
                      className={clsx(
                        "flex w-fit rounded-xl px-4 py-1.5 text-sm font-semibold transition-opacity hover:opacity-70 md:text-lg",
                        slide.isDark
                          ? "bg-white text-black"
                          : "bg-black text-white",
                      )}
                    >
                      {slide.ctaText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-md px-3 py-2 backdrop-blur-md">
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

{
  /* <div className="relative aspect-[5/6] h-full w-full sm:aspect-[4/3] md:aspect-[3/1]">
                <picture className="absolute inset-0 h-full w-full">
                  <source
                    srcSet={slide.img.desktop.src}
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet={slide.img.tablet.src}
                    media="(min-width: 640px)"
                  />
                  <Image
                    src={slide.img.mobile.src}
                    priority={index === 0}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    alt={slide.title}
                    fill
                    className="object-cover object-center"
                  />
                </picture>
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <h2 className="text-center text-4xl font-bold md:text-5xl xl:text-6xl">
                    {slide.title}
                  </h2>
                </div>
              </div> */
}
