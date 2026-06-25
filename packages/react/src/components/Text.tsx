import React, { ElementType, HTMLAttributes, LabelHTMLAttributes } from "react";

import type { TextTone } from "./types";
import { cn, textToneClass } from "./utils";

export type TextProps = Omit<HTMLAttributes<HTMLElement>, "style"> &
  Pick<LabelHTMLAttributes<HTMLLabelElement>, "htmlFor"> & {
    as?: ElementType;
    variant?: "title" | "body" | "label" | "caption";
    tone?: TextTone;
    weight?: 400 | 500 | 600 | 700;
  };

const variantClasses = {
  title: "text-[length:var(--zeno-type-title)] leading-[1.1]",
  body: "text-[length:var(--zeno-type-body)] leading-[1.45]",
  label: "text-[length:var(--zeno-type-label)] leading-[1.45]",
  caption: "text-[length:var(--zeno-type-caption)] leading-[1.45] tracking-[0.02em]"
} as const;

const weightClasses = {
  400: "font-normal",
  500: "font-medium",
  600: "font-semibold",
  700: "font-bold"
} as const;

export function Text({
  as,
  variant = "body",
  tone = "default",
  weight = 500,
  className,
  ...props
}: TextProps) {
  const Component = as ?? (variant === "title" ? "h2" : "span");

  return (
    <Component
      {...props}
      className={cn(
        "m-0",
        variantClasses[variant],
        textToneClass(tone),
        weightClasses[weight],
        className
      )}
    />
  );
}
