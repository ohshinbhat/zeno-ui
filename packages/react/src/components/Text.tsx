import React, { ElementType, HTMLAttributes } from "react";

import { useZenoTheme } from "../provider";

import type { TextTone } from "./types";
import { resolveTextColor } from "./utils";

export type TextProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  variant?: "title" | "body" | "label" | "caption";
  tone?: TextTone;
  weight?: 400 | 500 | 600 | 700;
};

export function Text({
  as,
  variant = "body",
  tone = "default",
  weight = 500,
  style,
  ...props
}: TextProps) {
  const { config } = useZenoTheme();
  const Component = as ?? (variant === "title" ? "h2" : "span");

  return (
    <Component
      {...props}
      style={{
        margin: 0,
        color: resolveTextColor(config, tone),
        fontSize: config.tokens.type[variant],
        fontWeight: weight,
        lineHeight: variant === "title" ? 1.1 : 1.45,
        letterSpacing: variant === "caption" ? "0.02em" : "0em",
        ...style
      }}
    />
  );
}

