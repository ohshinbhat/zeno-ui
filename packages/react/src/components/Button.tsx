import React, { ButtonHTMLAttributes } from "react";

import { cn, controlHeightClass } from "./utils";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style"> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};

const variantClasses = {
  primary:
    "border-[var(--zeno-color-brand-primary)] bg-[var(--zeno-color-brand-primary)] text-[var(--zeno-color-text-inverse)] shadow-[var(--zeno-shadow-card)]",
  secondary:
    "border-[var(--zeno-color-border-default)] bg-[var(--zeno-color-brand-secondary)] text-[var(--zeno-color-text-primary)]",
  ghost:
    "border-transparent bg-transparent text-[var(--zeno-color-text-primary)] hover:bg-[var(--zeno-color-bg-subtle)]"
} as const;

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--zeno-radius-pill)] border px-[var(--zeno-spacing-lg)] py-[var(--zeno-spacing-sm)] text-[length:var(--zeno-type-label)] font-semibold transition-[transform,box-shadow,opacity,background-color] duration-[var(--zeno-motion-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zeno-color-focus-ring)] disabled:cursor-not-allowed disabled:opacity-[var(--zeno-opacity-disabled)]",
        fullWidth ? "w-full" : "w-fit",
        controlHeightClass(size),
        variantClasses[variant],
        className
      )}
    />
  );
}
