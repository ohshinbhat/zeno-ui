import React from "react";
import {
  StyleProp,
  Text as NativeText,
  TextProps as NativeTextProps,
  TextStyle
} from "react-native";

import { useZenoTheme } from "../provider";

import type { TextTone } from "./types";
import { resolveTextColor, toNumber, toUnit } from "./utils";

export type TextProps = NativeTextProps & {
  variant?: "title" | "body" | "label" | "caption";
  tone?: TextTone;
  weight?: 400 | 500 | 600 | 700;
  style?: StyleProp<TextStyle>;
};

export function Text({
  variant = "body",
  tone = "default",
  weight = 500,
  style,
  ...props
}: TextProps) {
  const { config } = useZenoTheme();
  const titleSize = toNumber(config.tokens.type.title);
  const bodySize = toNumber(config.tokens.type.body);

  return (
    <NativeText
      {...props}
      style={[
        {
          color: resolveTextColor(config, tone),
          fontSize: toUnit(config.tokens.type[variant]),
          fontWeight: String(weight),
          lineHeight: variant === "title" ? titleSize * 1.1 : bodySize * 1.45,
          letterSpacing: variant === "caption" ? 0.2 : 0
        },
        style
      ]}
    />
  );
}

