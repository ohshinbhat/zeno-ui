import React from "react";
import { View, ViewProps } from "react-native";

import type { SpaceValue } from "./types";
import { cn, spaceClass } from "./utils";

export type CardProps = Omit<ViewProps, "style"> & {
  tone?: "surface" | "subtle";
  padding?: SpaceValue;
};

const toneClasses = {
  surface: "bg-[--zeno-color-bg-surface]",
  subtle: "bg-[--zeno-color-bg-subtle]"
} as const;

export function Card({
  tone = "surface",
  padding = "lg",
  className,
  ...props
}: CardProps) {
  return (
    <View
      {...props}
      className={cn(
        "gap-[--zeno-spacing-md] rounded-[--zeno-radius-lg] border border-[--zeno-color-border-default] shadow-lg shadow-black/10",
        toneClasses[tone],
        spaceClass(padding, "p"),
        className
      )}
    />
  );
}
