import type { ZenoTokenConfig } from "../types";

export type SpaceValue = keyof ZenoTokenConfig["tokens"]["spacing"] | number | string;

export type TextTone =
  | "default"
  | "muted"
  | "inverse"
  | "brand"
  | "success"
  | "danger";

