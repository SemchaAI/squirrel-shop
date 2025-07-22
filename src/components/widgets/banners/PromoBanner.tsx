import { Button } from "@/components/shared/buttons/Button";
import Image from "next/image";

// interface IProps {}

export const PromoBanner = () => {
  return (
    <div className="relative flex h-64 justify-between overflow-hidden rounded-md bg-primary-soft px-2 sm:px-4">
      <div className="absolute top-1/2 left-1/2 z-2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col justify-center gap-8 sm:relative sm:top-0 sm:left-0 sm:w-fit sm:translate-none">
        <h1 className="text-2xl font-semibold md:text-4xl md:leading-12">
          Grab upon to 50% off on <br /> Selected Products
        </h1>
        <Button className="w-fit" rounded="full">
          Buy Now
        </Button>
      </div>
      <Image
        className="pointer-events-none mt-auto ml-auto max-h-64 min-w-0 object-cover opacity-70 sm:ml-0 sm:opacity-100"
        src="/static/images/banners/woman.webp"
        alt=""
        width={256}
        height={256}
      />
    </div>
  );
};
