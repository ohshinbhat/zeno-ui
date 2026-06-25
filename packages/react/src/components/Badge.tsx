import React, { HTMLAttributes } from "react";

import type { ComponentTone, ControlSize } from "./types";
import { cn, toneClasses } from "./utils";

export type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, "style"> & {
  tone?: ComponentTone;
  variant?: "soft" | "solid" | "outline";
  size?: ControlSize;
};

const sizeClasses = {
  sm: "min-h-6 px-[var(--zeno-spacing-sm)] text-[length:var(--zeno-type-caption)]",
  md: "min-h-7 px-[var(--zeno-spacing-md)] text-[length:var(--zeno-type-label)]",
  lg: "min-h-[34px] px-[var(--zeno-spacing-md)] text-[length:var(--zeno-type-label)]"
} as const;

export function Badge({
  tone = "brand",
  variant = "soft",
  size = "md",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-[var(--zeno-radius-pill)] border font-bold leading-none",
        toneClasses(tone, variant),
        sizeClasses[size],
        className
      )}
    />
  );
}
