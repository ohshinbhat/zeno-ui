import React from "react";
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle
} from "react-native";

import { useZenoTheme } from "../provider";

import { Stack } from "./Stack";
import { Text } from "./Text";
import { resolveScaleValue, toUnit } from "./utils";

export type InputProps = Omit<TextInputProps, "style"> & {
  label?: string;
  description?: string;
  error?: string;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

export function Input({
  label,
  description,
  error,
  style,
  containerStyle,
  ...props
}: InputProps) {
  const { config } = useZenoTheme();
  const tone = error ? "danger" : "muted";

  return (
    <Stack gap="xs" style={containerStyle}>
      {label ? (
        <Text variant="label" weight={600}>
          {label}
        </Text>
      ) : null}
      <TextInput
        {...props}
        placeholderTextColor={config.tokens.color["text.secondary"]}
        style={[
          {
            minHeight: toUnit(config.tokens.size.controlMd),
            paddingHorizontal: resolveScaleValue(config.tokens.spacing, "md", "md"),
            paddingVertical: resolveScaleValue(config.tokens.spacing, "sm", "sm"),
            backgroundColor: config.tokens.color["bg.surface"],
            color: config.tokens.color["text.primary"],
            borderColor: error
              ? config.tokens.color["status.danger"]
              : config.tokens.color["border.default"],
            borderWidth: 1,
            borderRadius: toUnit(config.tokens.radius.md)
          },
          style
        ]}
      />
      {description || error ? (
        <Text variant="caption" tone={tone}>
          {error ?? description}
        </Text>
      ) : null}
    </Stack>
  );
}

