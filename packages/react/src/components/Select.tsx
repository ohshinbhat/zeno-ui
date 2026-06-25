import React, { SelectHTMLAttributes, useId, useState } from "react";

import { Stack } from "./Stack";
import { Text } from "./Text";
import type { ControlSize, SelectOption } from "./types";
import { cn, controlHeightClass } from "./utils";

export type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "children" | "defaultValue" | "onChange" | "size" | "style" | "value"
> & {
  defaultValue?: string;
  description?: string;
  error?: string;
  label?: string;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  size?: ControlSize;
  value?: string;
  containerClassName?: string;
  helperClassName?: string;
  labelClassName?: string;
};

export function Select({
  defaultValue,
  description,
  disabled,
  error,
  id,
  label,
  onValueChange,
  options,
  placeholder,
  size = "md",
  value,
  className,
  containerClassName,
  helperClassName,
  labelClassName,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const helperId = description || error ? `${selectId}-helper` : undefined;
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const resolvedValue = isControlled ? value : internalValue;

  const updateValue = (nextValue: string) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
  };

  return (
    <Stack gap="xs" className={containerClassName}>
      {label ? (
        <Text as="label" htmlFor={selectId} variant="label" weight={600} className={labelClassName}>
          {label}
        </Text>
      ) : null}
      <select
        {...props}
        id={selectId}
        disabled={disabled}
        value={resolvedValue}
        aria-describedby={helperId}
        aria-invalid={Boolean(error) || undefined}
        onChange={(event) => updateValue(event.currentTarget.value)}
        className={cn(
          "w-full appearance-none rounded-[var(--zeno-radius-md)] border bg-[var(--zeno-color-bg-surface)] px-[var(--zeno-spacing-md)] py-[var(--zeno-spacing-sm)] text-[length:var(--zeno-type-body)] text-[var(--zeno-color-text-primary)] outline-none transition-[border-color,box-shadow] duration-[var(--zeno-motion-fast)] focus:border-[var(--zeno-color-brand-primary)] focus:shadow-[var(--zeno-shadow-focus)] disabled:cursor-not-allowed disabled:opacity-[var(--zeno-opacity-disabled)]",
          controlHeightClass(size),
          error ? "border-[var(--zeno-color-status-danger)]" : "border-[var(--zeno-color-border-default)]",
          className
        )}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      {description || error ? (
        <Text
          id={helperId}
          variant="caption"
          tone={error ? "danger" : "muted"}
          className={helperClassName}
        >
          {error ?? description}
        </Text>
      ) : null}
    </Stack>
  );
}
