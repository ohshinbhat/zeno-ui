import React from "react";
import { StyleProp, View, ViewProps, ViewStyle } from "react-native";

import { useZenoTheme } from "../provider";

import type { SpaceValue } from "./types";
import { resolveScaleValue, toUnit } from "./utils";

export type CardProps = ViewProps & {
  tone?: "surface" | "subtle";
  padding?: SpaceValue;
  style?: StyleProp<ViewStyle>;
};

export function Card({
  tone = "surface",
  padding = "lg",
  style,
  ...props
}: CardProps) {
  const { config } = useZenoTheme();

  return (
    <View
      {...props}
      style={[
        {
          gap: resolveScaleValue(config.tokens.spacing, "md", "md"),
          padding: resolveScaleValue(config.tokens.spacing, padding, "lg"),
          backgroundColor:
            tone === "subtle"
              ? config.tokens.color["bg.subtle"]
              : config.tokens.color["bg.surface"],
          borderColor: config.tokens.color["border.default"],
          borderWidth: 1,
          borderRadius: toUnit(config.tokens.radius.lg),
          shadowColor: "#10213a",
          shadowOpacity: 0.1,
          shadowRadius: 14,
          shadowOffset: {
            width: 0,
            height: 8
          },
          elevation: 4
        },
        style
      ]}
    />
  );
}

