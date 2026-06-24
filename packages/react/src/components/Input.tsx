import React, { InputHTMLAttributes } from "react";

import { useZenoTheme } from "../provider";

import { Stack } from "./Stack";
import { Text } from "./Text";
import { resolveScaleValue } from "./utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  description?: string;
  error?: string;
};

export function Input({
  label,
  description,
  error,
  style,
  ...props
}: InputProps) {
  const { config } = useZenoTheme();
  const tone = error ? "danger" : "muted";

  return (
    <Stack gap="xs">
      {label ? (
        <Text as="label" variant="label" weight={600}>
          {label}
        </Text>
      ) : null}
      <input
        {...props}
        style={{
          width: "100%",
          minHeight: config.tokens.size.controlMd,
          paddingInline: resolveScaleValue(config.tokens.spacing, "md", "md"),
          paddingBlock: resolveScaleValue(config.tokens.spacing, "sm", "sm"),
          backgroundColor: config.tokens.color["bg.surface"],
          color: config.tokens.color["text.primary"],
          border: `1px solid ${
            error
              ? config.tokens.color["status.danger"]
              : config.tokens.color["border.default"]
          }`,
          borderRadius: config.tokens.radius.md,
          outline: "none",
          boxSizing: "border-box",
          transition: `border-color ${config.tokens.motion.fast}, box-shadow ${config.tokens.motion.fast}`,
          ...style
        }}
      />
      {description || error ? (
        <Text variant="caption" tone={tone}>
          {error ?? description}
        </Text>
      ) : null}
    </Stack>
  );
}

