import Link from "next/link";
import { ROUTES } from "@/utils/config/routes/routes";
import type { VariationValue } from "@/models/product";

interface IProps {
  opt: VariationValue;
}

export const ColorVariant = ({ opt }: IProps) => {
  if (!opt.hexCode) return null;

  const isDisabled = opt.stock <= 0;
  const commonClasses = `relative h-8 w-8 rounded-full ring-2 ring-app ${
    isDisabled ? "opacity-50" : ""
  }`;
  const style = { backgroundColor: opt.hexCode };

  const content = (
    <>
      <div
        className={`hover:ring-border-soft-hover absolute top-1/2 left-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 transform rounded-full ring-2 transition-colors ${opt.isCurrent ? "ring-primary-solid hover:ring-primary-solid" : "ring-transparent"}`}
      />
      {isDisabled && (
        <div className="absolute top-1/2 left-1/2 h-[2px] w-10 -translate-x-1/2 -translate-y-1/2 rotate-45 transform bg-error" />
      )}
    </>
  );

  return (
    <li>
      {opt.isCurrent ? (
        <div className={`${commonClasses} cursor-pointer`} style={style}>
          {content}
        </div>
      ) : (
        <Link
          href={`${ROUTES.PRODUCT}/${opt.slug}`}
          className={`${commonClasses} block cursor-pointer transition-colors`}
          style={style}
        >
          {content}
        </Link>
      )}
    </li>
  );
};
