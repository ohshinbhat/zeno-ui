export type SpaceValue = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type TextTone =
  | "default"
  | "muted"
  | "inverse"
  | "brand"
  | "success"
  | "danger";

export type ControlSize = "sm" | "md" | "lg";

export type ZenoCheckedState = boolean | "indeterminate";

export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type ComponentTone =
  | "default"
  | "brand"
  | "success"
  | "danger"
  | "muted";
