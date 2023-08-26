export const specialSymbols = ["h"] as const;

export const isSpecialSymbol = (
  s: string,
): s is (typeof specialSymbols)[number] =>
  specialSymbols.includes(s as (typeof specialSymbols)[number]);
