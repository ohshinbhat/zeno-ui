import * as React from "react";
import { gapClasses, type ZenoSize } from "../recipes.js";
import { cn } from "../utils.js";

type ElementTag = React.ElementType;

export type StackProps = React.HTMLAttributes<HTMLElement> & {
  as?: ElementTag;
  direction?: "row" | "column";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  gap?: ZenoSize | "none";
  wrap?: boolean;
};

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch"
};

const justifyClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between"
};

export const Stack = React.forwardRef<HTMLElement, StackProps>(function Stack(
  {
    as,
    direction = "column",
    align = "stretch",
    justify = "start",
    gap = "$3",
    wrap = false,
    className,
    ...props
  },
  ref
) {
  const Component = as ?? "div";

  return (
    <Component
      ref={ref}
      className={cn(
        "flex min-w-0",
        direction === "row" ? "flex-row" : "flex-col",
        alignClasses[align],
        justifyClasses[justify],
        gap !== "none" && gapClasses[gap],
        wrap && "flex-wrap",
        className
      )}
      {...props}
    />
  );
});
