import type { ComponentTone, ControlSize, SpaceValue, TextTone } from "./types";

type ClassValue = false | null | string | undefined;

export const cn = (...values: ClassValue[]) =>
  values.filter(Boolean).join(" ");

export const spaceClass = (value: SpaceValue, prefix: "gap" | "p" = "gap") => {
  const classes: Record<"gap" | "p", Record<SpaceValue, string>> = {
    gap: {
      xs: "gap-[var(--zeno-spacing-xs)]",
      sm: "gap-[var(--zeno-spacing-sm)]",
      md: "gap-[var(--zeno-spacing-md)]",
      lg: "gap-[var(--zeno-spacing-lg)]",
      xl: "gap-[var(--zeno-spacing-xl)]",
      "2xl": "gap-[var(--zeno-spacing-2xl)]"
    },
    p: {
      xs: "p-[var(--zeno-spacing-xs)]",
      sm: "p-[var(--zeno-spacing-sm)]",
      md: "p-[var(--zeno-spacing-md)]",
      lg: "p-[var(--zeno-spacing-lg)]",
      xl: "p-[var(--zeno-spacing-xl)]",
      "2xl": "p-[var(--zeno-spacing-2xl)]"
    }
  };

  return classes[prefix][value];
};

export const controlHeightClass = (size: ControlSize) => {
  const classes: Record<ControlSize, string> = {
    sm: "min-h-[var(--zeno-size-controlSm)]",
    md: "min-h-[var(--zeno-size-controlMd)]",
    lg: "min-h-[var(--zeno-size-controlLg)]"
  };

  return classes[size];
};

export const textToneClass = (tone: TextTone) => {
  const classes: Record<TextTone, string> = {
    default: "text-[var(--zeno-color-text-primary)]",
    muted: "text-[var(--zeno-color-text-secondary)]",
    inverse: "text-[var(--zeno-color-text-inverse)]",
    brand: "text-[var(--zeno-color-brand-primary)]",
    success: "text-[var(--zeno-color-status-success)]",
    danger: "text-[var(--zeno-color-status-danger)]"
  };

  return classes[tone];
};

export const toneClasses = (tone: ComponentTone, variant: "soft" | "solid" | "outline") => {
  const colors: Record<ComponentTone, { bg: string; border: string; solid: string; text: string }> = {
    default: {
      bg: "bg-[var(--zeno-color-bg-surface)]",
      border: "border-[var(--zeno-color-border-default)]",
      solid: "bg-[var(--zeno-color-border-default)]",
      text: "text-[var(--zeno-color-text-primary)]"
    },
    brand: {
      bg: "bg-[var(--zeno-color-brand-secondary)]",
      border: "border-[var(--zeno-color-brand-primary)]",
      solid: "bg-[var(--zeno-color-brand-primary)]",
      text: "text-[var(--zeno-color-brand-strong)]"
    },
    success: {
      bg: "bg-[var(--zeno-color-bg-subtle)]",
      border: "border-[var(--zeno-color-status-success)]",
      solid: "bg-[var(--zeno-color-status-success)]",
      text: "text-[var(--zeno-color-status-success)]"
    },
    danger: {
      bg: "bg-[var(--zeno-color-bg-subtle)]",
      border: "border-[var(--zeno-color-status-danger)]",
      solid: "bg-[var(--zeno-color-status-danger)]",
      text: "text-[var(--zeno-color-status-danger)]"
    },
    muted: {
      bg: "bg-[var(--zeno-color-bg-subtle)]",
      border: "border-[var(--zeno-color-border-default)]",
      solid: "bg-[var(--zeno-color-border-default)]",
      text: "text-[var(--zeno-color-text-secondary)]"
    }
  };
  const color = colors[tone];

  if (variant === "solid") {
    return cn("text-[var(--zeno-color-text-inverse)]", color.border, color.solid);
  }

  if (variant === "outline") {
    return cn("bg-transparent", color.border, color.text);
  }

  return cn(color.bg, color.border, color.text);
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
