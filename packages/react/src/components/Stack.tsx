import React, { CSSProperties, ElementType, HTMLAttributes } from "react";

import { useZenoTheme } from "../provider";

import type { SpaceValue } from "./types";
import { resolveScaleValue } from "./utils";

export type StackProps = HTMLAttributes<HTMLDivElement> & {
  as?: ElementType;
  direction?: CSSProperties["flexDirection"];
  gap?: SpaceValue;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  wrap?: CSSProperties["flexWrap"];
};

export function Stack({
  as,
  direction = "column",
  gap = "md",
  align = "stretch",
  justify = "flex-start",
  wrap = "nowrap",
  style,
  ...props
}: StackProps) {
  const { config } = useZenoTheme();
  const Component = as ?? "div";

  return (
    <Component
      {...props}
      style={{
        display: "flex",
        flexDirection: direction,
        gap: resolveScaleValue(config.tokens.spacing, gap, "md"),
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap,
        ...style
      }}
    />
  );
}

