import React, { CSSProperties, ElementType, HTMLAttributes } from "react";

import type { SpaceValue } from "./types";
import { cn, spaceClass } from "./utils";

type StackDirection = NonNullable<CSSProperties["flexDirection"]>;
type StackAlign = NonNullable<CSSProperties["alignItems"]>;
type StackJustify = NonNullable<CSSProperties["justifyContent"]>;
type StackWrap = NonNullable<CSSProperties["flexWrap"]>;

export type StackProps = Omit<HTMLAttributes<HTMLDivElement>, "style"> & {
  as?: ElementType;
  direction?: StackDirection;
  gap?: SpaceValue;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: StackWrap;
};

const directionClasses: Partial<Record<StackDirection, string>> = {
  row: "flex-row",
  column: "flex-col",
  "row-reverse": "flex-row-reverse",
  "column-reverse": "flex-col-reverse"
};

const alignClasses: Partial<Record<StackAlign, string>> = {
  stretch: "items-stretch",
  center: "items-center",
  "flex-start": "items-start",
  "flex-end": "items-end",
  baseline: "items-baseline"
};

const justifyClasses: Partial<Record<StackJustify, string>> = {
  center: "justify-center",
  "flex-start": "justify-start",
  "flex-end": "justify-end",
  "space-between": "justify-between",
  "space-around": "justify-around",
  "space-evenly": "justify-evenly"
};

const wrapClasses: Partial<Record<StackWrap, string>> = {
  nowrap: "flex-nowrap",
  wrap: "flex-wrap",
  "wrap-reverse": "flex-wrap-reverse"
};

export function Stack({
  as,
  direction = "column",
  gap = "md",
  align = "stretch",
  justify = "flex-start",
  wrap = "nowrap",
  className,
  ...props
}: StackProps) {
  const Component = as ?? "div";

  return (
    <Component
      {...props}
      className={cn(
        "flex",
        directionClasses[direction] ?? "flex-col",
        spaceClass(gap),
        alignClasses[align] ?? "items-stretch",
        justifyClasses[justify] ?? "justify-start",
        wrapClasses[wrap] ?? "flex-nowrap",
        className
      )}
    />
  );
}
