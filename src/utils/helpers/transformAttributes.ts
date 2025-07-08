import type { IAttributeInput, IAttributeOutput } from "@/models/filters";

export function transformAttributes(
  input: IAttributeInput[],
): IAttributeOutput[] {
  const groupedMap = new Map<
    string,
    Map<string, { value: string; hexCode: string | null }>
  >();

  for (const {
    variationName,
    variationOptionValue,
    variationOption,
  } of input) {
    if (!groupedMap.has(variationName)) {
      groupedMap.set(variationName, new Map());
    }
    const valuesMap = groupedMap.get(variationName)!;

    if (!valuesMap.has(variationOptionValue)) {
      valuesMap.set(variationOptionValue, {
        value: variationOptionValue,
        hexCode: variationOption.hexCode,
      });
    }
  }

  // Convert to desired array format
  return Array.from(groupedMap.entries()).map(([name, valuesMap]) => ({
    name,
    values: Array.from(valuesMap.values()),
  }));
}
