import React, { ElementType, HTMLAttributes } from "react";

import type { SpaceValue } from "./types";
import { cn, spaceClass } from "./utils";

export type CardProps = Omit<HTMLAttributes<HTMLDivElement>, "style"> & {
  as?: ElementType;
  tone?: "surface" | "subtle";
  padding?: SpaceValue;
};

const toneClasses = {
  surface: "bg-[var(--zeno-color-bg-surface)]",
  subtle: "bg-[var(--zeno-color-bg-subtle)]"
} as const;

export function Card({
  as,
  tone = "surface",
  padding = "lg",
  className,
  ...props
}: CardProps) {
  const Component = as ?? "div";

  return (
    <Component
      {...props}
      className={cn(
        "flex flex-col gap-[var(--zeno-spacing-md)] rounded-[var(--zeno-radius-lg)] border border-[var(--zeno-color-border-default)] text-[var(--zeno-color-text-primary)] shadow-[var(--zeno-shadow-card)]",
        toneClasses[tone],
        spaceClass(padding, "p"),
        className
      )}
    />
  );
}
