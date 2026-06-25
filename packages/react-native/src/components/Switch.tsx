import React, { useState } from "react";
import { Pressable, PressableProps, View } from "react-native";

import { Stack } from "./Stack";
import { Text } from "./Text";
import { cn } from "./utils";

export type SwitchProps = Omit<PressableProps, "onPress" | "style"> & {
  checked?: boolean;
  defaultChecked?: boolean;
  description?: string;
  label?: string;
  onCheckedChange?: (checked: boolean) => void;
  helperClassName?: string;
  labelClassName?: string;
  thumbClassName?: string;
};

export function Switch({
  accessibilityHint,
  accessibilityLabel,
  checked,
  defaultChecked = false,
  description,
  disabled,
  label,
  onCheckedChange,
  helperClassName,
  labelClassName,
  thumbClassName,
  className,
  ...props
}: SwitchProps) {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const resolvedChecked = isControlled ? checked : internalChecked;

  const updateChecked = () => {
    if (disabled) {
      return;
    }

    const nextChecked = !resolvedChecked;

    if (!isControlled) {
      setInternalChecked(nextChecked);
    }

    onCheckedChange?.(nextChecked);
  };

  return (
    <Stack direction="row" gap="sm" align="center">
      <Pressable
        {...props}
        disabled={disabled}
        accessibilityHint={accessibilityHint ?? description}
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityRole="switch"
        accessibilityState={{
          checked: resolvedChecked,
          disabled
        }}
        onPress={updateChecked}
        className={cn(
          "h-[30px] w-[52px] justify-center rounded-[--zeno-radius-pill] p-[3px] active:opacity-90",
          resolvedChecked ? "items-end bg-[--zeno-color-brand-primary]" : "items-start bg-[--zeno-color-border-default]",
          disabled && "opacity-[--zeno-opacity-disabled]",
          className
        )}
      >
        <View
          className={cn(
            "size-6 rounded-[--zeno-radius-pill] bg-[--zeno-color-bg-surface] shadow-md shadow-black/20",
            thumbClassName
          )}
        />
      </Pressable>
      {label || description ? (
        <Stack gap="xs" className="flex-1">
          {label ? (
            <Text variant="label" weight={600} className={labelClassName}>
              {label}
            </Text>
          ) : null}
          {description ? (
            <Text variant="caption" tone="muted" className={helperClassName}>
              {description}
            </Text>
          ) : null}
        </Stack>
      ) : null}
    </Stack>
  );
}
