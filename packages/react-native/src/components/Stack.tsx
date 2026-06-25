import React from "react";
import { View, ViewProps } from "react-native";

import type { SpaceValue } from "./types";
import { cn, spaceClass } from "./utils";

type StackDirection = "row" | "column" | "row-reverse" | "column-reverse";
type StackAlign = "stretch" | "center" | "flex-start" | "flex-end" | "baseline";
type StackJustify =
  | "center"
  | "flex-start"
  | "flex-end"
  | "space-around"
  | "space-between"
  | "space-evenly";
type StackWrap = "nowrap" | "wrap" | "wrap-reverse";

export type StackProps = Omit<ViewProps, "style"> & {
  direction?: StackDirection;
  gap?: SpaceValue;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: StackWrap;
};

const directionClasses: Record<StackDirection, string> = {
  row: "flex-row",
  column: "flex-col",
  "row-reverse": "flex-row-reverse",
  "column-reverse": "flex-col-reverse"
};

const alignClasses: Record<StackAlign, string> = {
  stretch: "items-stretch",
  center: "items-center",
  "flex-start": "items-start",
  "flex-end": "items-end",
  baseline: "items-baseline"
};

const justifyClasses: Record<StackJustify, string> = {
  center: "justify-center",
  "flex-start": "justify-start",
  "flex-end": "justify-end",
  "space-around": "justify-around",
  "space-between": "justify-between",
  "space-evenly": "justify-evenly"
};

const wrapClasses: Record<StackWrap, string> = {
  nowrap: "flex-nowrap",
  wrap: "flex-wrap",
  "wrap-reverse": "flex-wrap-reverse"
};

export function Stack({
  direction = "column",
  gap = "md",
  align = "stretch",
  justify = "flex-start",
  wrap = "nowrap",
  className,
  ...props
}: StackProps) {
  return (
    <View
      {...props}
      className={cn(
        directionClasses[direction],
        spaceClass(gap),
        alignClasses[align],
        justifyClasses[justify],
        wrapClasses[wrap],
        className
      )}
    />
  );
}
