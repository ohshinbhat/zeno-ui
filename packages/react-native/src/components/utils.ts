import type { ZenoTokenConfig } from "../types";

import type { SpaceValue, TextTone } from "./types";

export const toUnit = (value: string | number) => {
  if (typeof value === "number") {
    return value;
  }

  const numeric = Number.parseFloat(value);
  return Number.isNaN(numeric) ? value : numeric;
};

export const toNumber = (value: string | number) => {
  if (typeof value === "number") {
    return value;
  }

  const numeric = Number.parseFloat(value);
  return Number.isNaN(numeric) ? 0 : numeric;
};

export const resolveScaleValue = (
  scale: Record<string, string>,
  value: SpaceValue | undefined,
  fallbackKey: string
) => {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    return toUnit(scale[value] ?? value);
  }

  return toUnit(scale[fallbackKey] ?? "0");
};

export const resolveTextColor = (
  theme: ZenoTokenConfig,
  tone: TextTone
) => {
  switch (tone) {
    case "muted":
      return theme.tokens.color["text.secondary"];
    case "inverse":
      return theme.tokens.color["text.inverse"];
    case "brand":
      return theme.tokens.color["brand.primary"];
    case "success":
      return theme.tokens.color["status.success"];
    case "danger":
      return theme.tokens.color["status.danger"];
    default:
      return theme.tokens.color["text.primary"];
  }
};

