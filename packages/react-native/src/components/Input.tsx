import React from "react";
import { TextInput, TextInputProps } from "react-native";

import { Stack } from "./Stack";
import { Text } from "./Text";
import { cn } from "./utils";

export type InputProps = Omit<TextInputProps, "style"> & {
  label?: string;
  description?: string;
  error?: string;
  containerClassName?: string;
  helperClassName?: string;
  labelClassName?: string;
};

export function Input({
  label,
  description,
  error,
  containerClassName,
  helperClassName,
  labelClassName,
  className,
  ...props
}: InputProps) {
  const tone = error ? "danger" : "muted";

  return (
    <Stack gap="xs" className={containerClassName}>
      {label ? (
        <Text variant="label" weight={600} className={labelClassName}>
          {label}
        </Text>
      ) : null}
      <TextInput
        {...props}
        accessibilityLabel={props.accessibilityLabel ?? label}
        accessibilityHint={props.accessibilityHint ?? error ?? description}
        accessibilityState={{
          ...props.accessibilityState,
          disabled: props.editable === false
        }}
        className={cn(
          "min-h-[--zeno-size-controlMd] rounded-[--zeno-radius-md] border bg-[--zeno-color-bg-surface] px-[--zeno-spacing-md] py-[--zeno-spacing-sm] text-[--zeno-type-body] text-[--zeno-color-text-primary]",
          error ? "border-[--zeno-color-status-danger]" : "border-[--zeno-color-border-default]",
          props.editable === false && "opacity-[--zeno-opacity-disabled]",
          className
        )}
      />
      {description || error ? (
        <Text variant="caption" tone={tone} className={helperClassName}>
          {error ?? description}
        </Text>
      ) : null}
    </Stack>
  );
}
