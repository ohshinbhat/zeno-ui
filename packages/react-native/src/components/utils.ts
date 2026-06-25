import type { ComponentTone, ControlSize, SpaceValue, TextTone } from "./types";

type ClassValue = false | null | string | undefined;

export const cn = (...values: ClassValue[]) =>
  values.filter(Boolean).join(" ");

export const spaceClass = (value: SpaceValue, prefix: "gap" | "p" = "gap") => {
  const classes: Record<"gap" | "p", Record<SpaceValue, string>> = {
    gap: {
      xs: "gap-[--zeno-spacing-xs]",
      sm: "gap-[--zeno-spacing-sm]",
      md: "gap-[--zeno-spacing-md]",
      lg: "gap-[--zeno-spacing-lg]",
      xl: "gap-[--zeno-spacing-xl]",
      "2xl": "gap-[--zeno-spacing-2xl]"
    },
    p: {
      xs: "p-[--zeno-spacing-xs]",
      sm: "p-[--zeno-spacing-sm]",
      md: "p-[--zeno-spacing-md]",
      lg: "p-[--zeno-spacing-lg]",
      xl: "p-[--zeno-spacing-xl]",
      "2xl": "p-[--zeno-spacing-2xl]"
    }
  };

  return classes[prefix][value];
};

export const controlHeightClass = (size: ControlSize) => {
  const classes: Record<ControlSize, string> = {
    sm: "min-h-[--zeno-size-controlSm]",
    md: "min-h-[--zeno-size-controlMd]",
    lg: "min-h-[--zeno-size-controlLg]"
  };

  return classes[size];
};

export const textToneClass = (tone: TextTone) => {
  const classes: Record<TextTone, string> = {
    default: "text-[--zeno-color-text-primary]",
    muted: "text-[--zeno-color-text-secondary]",
    inverse: "text-[--zeno-color-text-inverse]",
    brand: "text-[--zeno-color-brand-primary]",
    success: "text-[--zeno-color-status-success]",
    danger: "text-[--zeno-color-status-danger]"
  };

  return classes[tone];
};

export const toneClasses = (tone: ComponentTone, variant: "soft" | "solid" | "outline") => {
  const colors: Record<ComponentTone, { bg: string; border: string; solid: string; text: string }> = {
    default: {
      bg: "bg-[--zeno-color-bg-surface]",
      border: "border-[--zeno-color-border-default]",
      solid: "bg-[--zeno-color-border-default]",
      text: "text-[--zeno-color-text-primary]"
    },
    brand: {
      bg: "bg-[--zeno-color-brand-secondary]",
      border: "border-[--zeno-color-brand-primary]",
      solid: "bg-[--zeno-color-brand-primary]",
      text: "text-[--zeno-color-brand-strong]"
    },
    success: {
      bg: "bg-[--zeno-color-bg-subtle]",
      border: "border-[--zeno-color-status-success]",
      solid: "bg-[--zeno-color-status-success]",
      text: "text-[--zeno-color-status-success]"
    },
    danger: {
      bg: "bg-[--zeno-color-bg-subtle]",
      border: "border-[--zeno-color-status-danger]",
      solid: "bg-[--zeno-color-status-danger]",
      text: "text-[--zeno-color-status-danger]"
    },
    muted: {
      bg: "bg-[--zeno-color-bg-subtle]",
      border: "border-[--zeno-color-border-default]",
      solid: "bg-[--zeno-color-border-default]",
      text: "text-[--zeno-color-text-secondary]"
    }
  };
  const color = colors[tone];

  if (variant === "solid") {
    return cn("text-[--zeno-color-text-inverse]", color.border, color.solid);
  }

  if (variant === "outline") {
    return cn("bg-transparent", color.border, color.text);
  }

  return cn(color.bg, color.border, color.text);
};

export const toneTextClass = (tone: ComponentTone, variant: "soft" | "solid" | "outline") => {
  if (variant === "solid") {
    return "text-[--zeno-color-text-inverse]";
  }

  const classes: Record<ComponentTone, string> = {
    default: "text-[--zeno-color-text-primary]",
    brand: "text-[--zeno-color-brand-strong]",
    success: "text-[--zeno-color-status-success]",
    danger: "text-[--zeno-color-status-danger]",
    muted: "text-[--zeno-color-text-secondary]"
  };

  return classes[tone];
};

export const getInitials = (value?: string) => {
  if (!value) {
    return "?";
  }

  const parts = value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  if (parts.length === 0) {
    return "?";
  }

  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("");
};
