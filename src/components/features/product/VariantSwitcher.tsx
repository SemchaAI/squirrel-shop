import { groupCloseVariantsByVariation } from "@/utils/helpers";

import { ColorVariant } from "./ui/ColorVariant";
import { DefaultVariant } from "./ui/DefaultVariant";

import type { IOption, IOptions } from "@/models/product";

interface IProps {
  options: IOptions[];
  currentOption: IOption[];
}

export const VariantSwitcher = ({ options, currentOption }: IProps) => {
  const grouped = groupCloseVariantsByVariation(currentOption, options);

  // console.log("variationNames", closeVariants);

  // console.log("colorOptions", colorOptions);
  return (
    <div className="flex flex-col gap-6">
      {grouped.map(({ name, options }) => {
        if (!options.length) return null;
        return (
          <div key={name} className="flex flex-col gap-2">
            <h4 className="text-lg">{name}</h4>
            <ul className="flex items-center gap-3 px-2">
              {options.map((opt) => {
                if (opt.hexCode)
                  return <ColorVariant key={opt.slug} opt={opt} />;
                else return <DefaultVariant key={opt.slug} opt={opt} />;
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
