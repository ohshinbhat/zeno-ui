import { cn } from "./utils";

export type ZenoSize = "$2" | "$3" | "$4" | "$5";
export type ZenoTone = "neutral" | "brand" | "success" | "warning" | "danger";
export type ZenoVariant = "solid" | "soft" | "outline" | "ghost" | "glass";

export const toneVariantClasses: Record<ZenoTone, Record<ZenoVariant, string>> = {
  neutral: {
    solid: "bg-text text-background border-text",
    soft: "bg-surface-raised text-text border-border",
    outline: "bg-transparent text-text border-border",
    ghost: "bg-transparent text-text border-transparent",
    glass: "bg-surface-glass text-text border-border backdrop-blur-glass shadow-elevated"
  },
  brand: {
    solid: "bg-brand text-brand-contrast border-brand shadow-elevated",
    soft: "bg-surface-raised text-brand border-brand",
    outline: "bg-transparent text-brand border-brand",
    ghost: "bg-transparent text-brand border-transparent",
    glass: "bg-surface-glass text-brand border-brand backdrop-blur-glass shadow-glow"
  },
  success: {
    solid: "bg-success text-brand-contrast border-success",
    soft: "bg-surface-raised text-success border-success",
    outline: "bg-transparent text-success border-success",
    ghost: "bg-transparent text-success border-transparent",
    glass: "bg-surface-glass text-success border-success backdrop-blur-glass"
  },
  warning: {
    solid: "bg-warning text-brand-contrast border-warning",
    soft: "bg-surface-raised text-warning border-warning",
    outline: "bg-transparent text-warning border-warning",
    ghost: "bg-transparent text-warning border-transparent",
    glass: "bg-surface-glass text-warning border-warning backdrop-blur-glass"
  },
  danger: {
    solid: "bg-danger text-brand-contrast border-danger",
    soft: "bg-surface-raised text-danger border-danger",
    outline: "bg-transparent text-danger border-danger",
    ghost: "bg-transparent text-danger border-transparent",
    glass: "bg-surface-glass text-danger border-danger backdrop-blur-glass"
  }
};

export const sizeClasses: Record<ZenoSize, string> = {
  $2: "h-control-2 px-control-2 py-control-2 text-label",
  $3: "h-control-3 px-control-3 py-control-3 text-body",
  $4: "h-control-4 px-control-4 py-control-4 text-title",
  $5: "h-control-5 px-control-5 py-control-5 text-title"
};

export const gapClasses: Record<ZenoSize, string> = {
  $2: "gap-theme-2",
  $3: "gap-theme-3",
  $4: "gap-theme-4",
  $5: "gap-theme-5"
};

export function interactiveFrame({
  size = "$3",
  tone = "brand",
  variant = "solid",
  className
}: {
  size?: ZenoSize | undefined;
  tone?: ZenoTone | undefined;
  variant?: ZenoVariant | undefined;
  className?: string | undefined;
} = {}): string {
  return cn(
    "inline-flex shrink-0 items-center justify-center rounded-control border font-medium transition-theme animate-press",
    "focus-visible:outline-none focus-visible:shadow-focus disabled:pointer-events-none disabled:opacity-disabled",
    sizeClasses[size],
    gapClasses[size],
    toneVariantClasses[tone][variant],
    className
  );
}

export function inputFrame(className?: string): string {
  return cn(
    "w-full rounded-control border border-border bg-surface h-control-3 px-control-3 py-control-3 text-body text-text transition-theme",
    "placeholder:text-text-muted focus:outline-none focus:shadow-focus disabled:opacity-disabled",
    className
  );
}
