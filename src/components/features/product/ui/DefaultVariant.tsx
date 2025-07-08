import Link from "next/link";
import { ROUTES } from "@/utils/config";
import type { VariationValue } from "@/models/product";

interface IProps {
  opt: VariationValue;
}

export const DefaultVariant = ({ opt }: IProps) => {
  const baseClasses = "rounded-md border border-primary px-3 py-1";
  const content = opt.variationOptionValue;
  const isDisabled = opt.stock <= 0;
  return (
    <li>
      {opt.isCurrent ? (
        <div
          className={`${baseClasses} bg-primary text-white select-none ${isDisabled ? "opacity-50" : ""}`}
        >
          {content}
        </div>
      ) : (
        <Link
          href={`${ROUTES.PRODUCT}/${opt.slug}`}
          className={`${baseClasses} block text-primary transition-colors hover:bg-primary hover:text-white ${isDisabled ? "opacity-50" : ""}`}
        >
          {content}
        </Link>
      )}
    </li>
  );
};
