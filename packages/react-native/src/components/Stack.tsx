import React from "react";
import { StyleProp, View, ViewProps, ViewStyle } from "react-native";

import { useZenoTheme } from "../provider";

import type { SpaceValue } from "./types";
import { resolveScaleValue } from "./utils";

export type StackProps = ViewProps & {
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  gap?: SpaceValue;
  align?: ViewStyle["alignItems"];
  justify?: ViewStyle["justifyContent"];
  wrap?: ViewStyle["flexWrap"];
  style?: StyleProp<ViewStyle>;
};

export function Stack({
  direction = "column",
  gap = "md",
  align = "stretch",
  justify = "flex-start",
  wrap = "nowrap",
  style,
  ...props
}: StackProps) {
  const { config } = useZenoTheme();

  return (
    <View
      {...props}
      style={[
        {
          flexDirection: direction,
          gap: resolveScaleValue(config.tokens.spacing, gap, "md"),
          alignItems: align,
          justifyContent: justify,
          flexWrap: wrap
        },
        style
      ]}
    />
  );
}

