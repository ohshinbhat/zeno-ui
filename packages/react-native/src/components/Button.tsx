import React from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  Text as NativeText,
  TextStyle,
  ViewStyle
} from "react-native";

import { useZenoTheme } from "../provider";

import { resolveScaleValue, toUnit } from "./utils";

export type ButtonProps = Omit<PressableProps, "style"> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  style,
  textStyle,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const { config } = useZenoTheme();
  const sizeKey =
    size === "sm"
      ? "controlSm"
      : size === "lg"
        ? "controlLg"
        : "controlMd";

  const backgroundColor =
    variant === "primary"
      ? config.tokens.color["brand.primary"]
      : variant === "secondary"
        ? config.tokens.color["brand.secondary"]
        : "transparent";

  const textColor =
    variant === "primary"
      ? config.tokens.color["text.inverse"]
      : config.tokens.color["text.primary"];

  const borderColor =
    variant === "ghost"
      ? "transparent"
      : variant === "secondary"
        ? config.tokens.color["border.default"]
        : config.tokens.color["brand.primary"];

  return (
    <Pressable
      {...props}
      disabled={disabled}
      style={({ pressed }) => [
        {
          minHeight: toUnit(config.tokens.size[sizeKey]),
          paddingHorizontal: resolveScaleValue(config.tokens.spacing, "lg", "lg"),
          paddingVertical: resolveScaleValue(config.tokens.spacing, "sm", "sm"),
          borderRadius: toUnit(config.tokens.radius.pill),
          borderWidth: 1,
          borderColor,
          backgroundColor,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: fullWidth ? "stretch" : "flex-start",
          opacity: disabled
            ? Number(config.tokens.opacity.disabled)
            : pressed
              ? 0.88
              : 1
        },
        style
      ]}
    >
      <NativeText
        style={[
          {
            color: textColor,
            fontSize: toUnit(config.tokens.type.label),
            fontWeight: "600"
          },
          textStyle
        ]}
      >
        {children}
      </NativeText>
    </Pressable>
  );
}

