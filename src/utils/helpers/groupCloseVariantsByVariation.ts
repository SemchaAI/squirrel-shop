import { IOption, IOptions, VariationValue } from "@/models/product";

type GroupedVariation = {
  name: string;
  options: VariationValue[];
};

// --- Utility Function ---
export function groupCloseVariantsByVariation(
  current: IOption[],
  variants: IOptions[],
): GroupedVariation[] {
  const currentMap = Object.fromEntries(
    current.map((opt) => [opt.variationName, opt.variationOptionValue]),
  );

  const groups: Record<string, Map<string, VariationValue>> = {};

  for (const variation of current) {
    groups[variation.variationName] = new Map();
  }

  // Track current full match variant
  const currentVariant: IOptions | undefined = variants.find((variant) =>
    current.every((opt) =>
      variant.options.some(
        (o) =>
          o.variationName === opt.variationName &&
          o.variationOptionValue === opt.variationOptionValue,
      ),
    ),
  );

  // Add current variant to groups
  if (currentVariant) {
    for (const opt of currentVariant.options) {
      groups[opt.variationName].set(opt.variationOptionValue, {
        variationOptionValue: opt.variationOptionValue,
        slug: currentVariant.slug,
        stock: currentVariant.stock,
        hexCode: opt.variationOption.hexCode,
        isCurrent: true,
      });
    }
  }

  for (const variant of variants) {
    let diffCount = 0;
    let differingVariationName: string | null = null;

    for (const opt of variant.options) {
      const currentValue = currentMap[opt.variationName];
      if (currentValue !== opt.variationOptionValue) {
        diffCount++;
        differingVariationName = opt.variationName;
      }
    }

    if (diffCount === 1 && differingVariationName) {
      const differingOpt = variant.options.find(
        (o) => o.variationName === differingVariationName,
      );

      if (differingOpt) {
        const entry: VariationValue = {
          variationOptionValue: differingOpt.variationOptionValue,
          slug: variant.slug,
          stock: variant.stock,
          hexCode: differingOpt.variationOption.hexCode,
          isCurrent: false,
        };

        groups[differingVariationName].set(entry.variationOptionValue, entry);
      }
    }
  }

  return Object.entries(groups).map(([name, values]) => ({
    name,
    options: Array.from(values.values()),
  }));
}
