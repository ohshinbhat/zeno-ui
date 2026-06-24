import type { ZenoTokenConfig } from "../types";

import type { SpaceValue, TextTone } from "./types";

export const resolveScaleValue = (
  scale: Record<string, string>,
  value: SpaceValue | undefined,
  fallbackKey: string
) => {
  if (typeof value === "number") {
    return `${value}px`;
  }

  if (typeof value === "string") {
    return scale[value] ?? value;
  }

  return scale[fallbackKey] ?? Object.values(scale)[0] ?? "0px";
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

