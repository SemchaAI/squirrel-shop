"use client";
import Image from "next/image";
import Link from "next/link";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import type { Category } from "@prisma/client";
import { ROUTES } from "@/utils/config";

type PropType = {
  slides: Category[];
  options?: EmblaOptionsType;
};

export const CategoryCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3000, stopOnMouseEnter: true }),
  ]);

  return (
    <div className="relative m-auto w-full max-w-full mask-r-from-97% mask-l-from-95%">
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <ul className="-ml-4 flex h-full touch-pan-y">
          {slides.map((slide) => (
            <li
              key={slide.id}
              className="flex-[0_0_100%] flex-shrink-0 pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_25%] xl:flex-[0_0_25%]"
            >
              <Link href={`${ROUTES.CATEGORY}/${slide.slug}`} key={slide.id}>
                {/* h is h of image +5%~ */}
                <div className="relative flex h-67 w-full justify-center bg-ui">
                  <Image
                    src={slide.image || "/static/images/placeholder.webp"}
                    alt=""
                    // fill
                    // sizes="100vw"
                    width={256}
                    height={256}
                    className="object-contain p-4 transition-transform hover:scale-105"
                  />
                </div>
                <p className="mt-8 text-xl font-light tracking-wide">
                  {slide.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
