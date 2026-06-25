import React, { InputHTMLAttributes, useId } from "react";

import { Stack } from "./Stack";
import { Text } from "./Text";
import { cn } from "./utils";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "style"> & {
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
  id,
  className,
  containerClassName,
  helperClassName,
  labelClassName,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = description || error ? `${inputId}-helper` : undefined;

  return (
    <Stack gap="xs" className={containerClassName}>
      {label ? (
        <Text as="label" htmlFor={inputId} variant="label" weight={600} className={labelClassName}>
          {label}
        </Text>
      ) : null}
      <input
        {...props}
        id={inputId}
        aria-describedby={helperId}
        aria-invalid={Boolean(error) || undefined}
        className={cn(
          "min-h-[var(--zeno-size-controlMd)] w-full rounded-[var(--zeno-radius-md)] border bg-[var(--zeno-color-bg-surface)] px-[var(--zeno-spacing-md)] py-[var(--zeno-spacing-sm)] text-[length:var(--zeno-type-body)] text-[var(--zeno-color-text-primary)] outline-none transition-[border-color,box-shadow] duration-[var(--zeno-motion-fast)] placeholder:text-[var(--zeno-color-text-secondary)] focus:border-[var(--zeno-color-brand-primary)] focus:shadow-[var(--zeno-shadow-focus)] disabled:cursor-not-allowed disabled:opacity-[var(--zeno-opacity-disabled)]",
          error ? "border-[var(--zeno-color-status-danger)]" : "border-[var(--zeno-color-border-default)]",
          className
        )}
      />
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
