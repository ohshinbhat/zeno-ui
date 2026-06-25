import React, { useState } from "react";
import { Pressable, Text as NativeText, View } from "react-native";

import { Stack } from "./Stack";
import { Text } from "./Text";
import type { ControlSize, SelectOption } from "./types";
import { cn, controlHeightClass } from "./utils";

export type SelectProps = {
  accessibilityHint?: string;
  accessibilityLabel?: string;
  className?: string;
  defaultValue?: string;
  description?: string;
  disabled?: boolean;
  error?: string;
  helperClassName?: string;
  label?: string;
  labelClassName?: string;
  listClassName?: string;
  onValueChange?: (value: string) => void;
  optionClassName?: string;
  options: SelectOption[];
  placeholder?: string;
  size?: ControlSize;
  value?: string;
};

export function Select({
  accessibilityHint,
  accessibilityLabel,
  className,
  defaultValue,
  description,
  disabled,
  error,
  helperClassName,
  label,
  labelClassName,
  listClassName,
  onValueChange,
  optionClassName,
  options,
  placeholder = "Select an option",
  size = "md",
  value
}: SelectProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [isOpen, setIsOpen] = useState(false);
  const resolvedValue = isControlled ? value : internalValue;
  const selectedOption = options.find((option) => option.value === resolvedValue);

  const updateValue = (nextValue: string) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    setIsOpen(false);
    onValueChange?.(nextValue);
  };

  return (
    <Stack gap="xs">
      {label ? (
        <Text variant="label" weight={600} className={labelClassName}>
          {label}
        </Text>
      ) : null}
      <Pressable
        disabled={disabled}
        accessibilityHint={accessibilityHint ?? error ?? description}
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen, disabled }}
        onPress={() => setIsOpen((open) => !open)}
        className={cn(
          "flex-row items-center justify-between rounded-[--zeno-radius-md] border bg-[--zeno-color-bg-surface] px-[--zeno-spacing-md] py-[--zeno-spacing-sm] active:opacity-90",
          controlHeightClass(size),
          error ? "border-[--zeno-color-status-danger]" : "border-[--zeno-color-border-default]",
          disabled && "opacity-[--zeno-opacity-disabled]",
          className
        )}
      >
        <Text tone={selectedOption ? "default" : "muted"} variant="body">
          {selectedOption?.label ?? placeholder}
        </Text>
        <NativeText className="text-[--zeno-type-label] text-[--zeno-color-text-secondary]">
          {isOpen ? "⌃" : "⌄"}
        </NativeText>
      </Pressable>
      {isOpen && !disabled ? (
        <View
          className={cn(
            "overflow-hidden rounded-[--zeno-radius-md] border border-[--zeno-color-border-default] bg-[--zeno-color-bg-surface]",
            listClassName
          )}
        >
          {options.map((option) => {
            const isSelected = option.value === resolvedValue;

            return (
              <Pressable
                key={option.value}
                disabled={option.disabled}
                accessibilityRole="button"
                accessibilityState={{
                  selected: isSelected,
                  disabled: option.disabled
                }}
                onPress={() => updateValue(option.value)}
                className={cn(
                  "px-[--zeno-spacing-md] py-[--zeno-spacing-sm] active:bg-[--zeno-color-bg-subtle]",
                  isSelected ? "bg-[--zeno-color-brand-secondary]" : "bg-[--zeno-color-bg-surface]",
                  option.disabled && "opacity-[--zeno-opacity-disabled]",
                  optionClassName
                )}
              >
                <Text tone={isSelected ? "brand" : "default"} variant="body">
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}
      {description || error ? (
        <Text variant="caption" tone={error ? "danger" : "muted"} className={helperClassName}>
          {error ?? description}
        </Text>
      ) : null}
    </Stack>
  );
}
