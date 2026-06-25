import React, { useState } from "react";
import { Pressable, PressableProps, Text as NativeText, View } from "react-native";

import { Stack } from "./Stack";
import { Text } from "./Text";
import type { ZenoCheckedState } from "./types";
import { cn } from "./utils";

export type CheckboxProps = Omit<PressableProps, "onPress" | "style"> & {
  checked?: ZenoCheckedState;
  defaultChecked?: ZenoCheckedState;
  description?: string;
  error?: string;
  label?: string;
  onCheckedChange?: (checked: ZenoCheckedState) => void;
  boxClassName?: string;
  helperClassName?: string;
  labelClassName?: string;
};

const getBooleanChecked = (value: ZenoCheckedState | undefined) =>
  value === true || value === "indeterminate";

export function Checkbox({
  accessibilityHint,
  accessibilityLabel,
  checked,
  defaultChecked = false,
  description,
  disabled,
  error,
  label,
  onCheckedChange,
  boxClassName,
  helperClassName,
  labelClassName,
  className,
  ...props
}: CheckboxProps) {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState<ZenoCheckedState>(defaultChecked);
  const resolvedChecked = isControlled ? checked : internalChecked;
  const isChecked = getBooleanChecked(resolvedChecked);

  const updateChecked = () => {
    if (disabled) {
      return;
    }

    const nextChecked = !isChecked;

    if (!isControlled) {
      setInternalChecked(nextChecked);
    }

    onCheckedChange?.(nextChecked);
  };

  return (
    <Pressable
      {...props}
      disabled={disabled}
      accessibilityHint={accessibilityHint ?? error ?? description}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="checkbox"
      accessibilityState={{
        checked: resolvedChecked === "indeterminate" ? "mixed" : isChecked,
        disabled
      }}
      onPress={updateChecked}
      className={cn("active:opacity-80", disabled && "opacity-[--zeno-opacity-disabled]", className)}
    >
      <Stack direction="row" gap="sm" align="flex-start">
        <View
          className={cn(
            "mt-px size-[22px] items-center justify-center rounded-[--zeno-radius-sm] border",
            isChecked
              ? "border-[--zeno-color-brand-primary] bg-[--zeno-color-brand-primary]"
              : "border-[--zeno-color-border-strong] bg-[--zeno-color-bg-surface]",
            error && "border-[--zeno-color-status-danger]",
            boxClassName
          )}
        >
          {resolvedChecked === "indeterminate" ? (
            <View className="h-0.5 w-2.5 rounded-sm bg-[--zeno-color-text-inverse]" />
          ) : isChecked ? (
            <NativeText className="text-[--zeno-color-text-inverse] text-[--zeno-type-caption] font-bold">
              ✓
            </NativeText>
          ) : null}
        </View>
        {label || description || error ? (
          <Stack gap="xs" className="flex-1">
            {label ? (
              <Text variant="label" weight={600} className={labelClassName}>
                {label}
              </Text>
            ) : null}
            {description || error ? (
              <Text
                variant="caption"
                tone={error ? "danger" : "muted"}
                className={helperClassName}
              >
                {error ?? description}
              </Text>
            ) : null}
          </Stack>
        ) : null}
      </Stack>
    </Pressable>
  );
}
