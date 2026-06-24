import React, { ElementType, HTMLAttributes } from "react";

import { useZenoTheme } from "../provider";

import type { SpaceValue } from "./types";
import { resolveScaleValue } from "./utils";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  as?: ElementType;
  tone?: "surface" | "subtle";
  padding?: SpaceValue;
};

export function Card({
  as,
  tone = "surface",
  padding = "lg",
  style,
  ...props
}: CardProps) {
  const { config } = useZenoTheme();
  const Component = as ?? "div";

  return (
    <Component
      {...props}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: resolveScaleValue(config.tokens.spacing, "md", "md"),
        padding: resolveScaleValue(config.tokens.spacing, padding, "lg"),
        backgroundColor:
          tone === "subtle"
            ? config.tokens.color["bg.subtle"]
            : config.tokens.color["bg.surface"],
        color: config.tokens.color["text.primary"],
        border: `1px solid ${config.tokens.color["border.default"]}`,
        borderRadius: config.tokens.radius.lg,
        boxShadow: config.tokens.shadow.card,
        ...style
      }}
    />
  );
}

