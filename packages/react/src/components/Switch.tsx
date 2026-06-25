import React, { ButtonHTMLAttributes, useId, useState } from "react";

import { Stack } from "./Stack";
import { Text } from "./Text";
import { cn } from "./utils";

export type SwitchProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "style"> & {
  checked?: boolean;
  defaultChecked?: boolean;
  label?: string;
  description?: string;
  name?: string;
  onCheckedChange?: (checked: boolean) => void;
  containerClassName?: string;
  helperClassName?: string;
  labelClassName?: string;
  thumbClassName?: string;
};

export function Switch({
  checked,
  defaultChecked = false,
  label,
  description,
  name,
  disabled,
  id,
  onCheckedChange,
  className,
  containerClassName,
  helperClassName,
  labelClassName,
  thumbClassName,
  ...props
}: SwitchProps) {
  const generatedId = useId();
  const switchId = id ?? generatedId;
  const helperId = description ? `${switchId}-helper` : undefined;
  const labelId = label ? `${switchId}-label` : undefined;
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
    <Stack direction="row" gap="sm" align="center" className={containerClassName}>
      {name ? <input type="hidden" name={name} disabled={disabled} value={resolvedChecked ? "on" : "off"} /> : null}
      <button
        {...props}
        id={switchId}
        type="button"
        role="switch"
        aria-checked={resolvedChecked}
        aria-describedby={helperId}
        aria-labelledby={labelId}
        disabled={disabled}
        data-state={resolvedChecked ? "checked" : "unchecked"}
        onClick={updateChecked}
        className={cn(
          "inline-flex h-7 w-[50px] shrink-0 cursor-pointer items-center rounded-[var(--zeno-radius-pill)] border-0 p-[3px] transition-[background-color,opacity] duration-[var(--zeno-motion-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zeno-color-focus-ring)] disabled:cursor-not-allowed disabled:opacity-[var(--zeno-opacity-disabled)]",
          resolvedChecked ? "bg-[var(--zeno-color-brand-primary)]" : "bg-[var(--zeno-color-border-default)]",
          className
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "block size-[22px] rounded-[var(--zeno-radius-pill)] bg-[var(--zeno-color-bg-surface)] shadow-[var(--zeno-shadow-card)] transition-transform duration-[var(--zeno-motion-normal)]",
            resolvedChecked ? "translate-x-[22px]" : "translate-x-0",
            thumbClassName
          )}
        />
      </button>
      {label || description ? (
        <Stack gap="xs" className="min-w-0">
          {label ? (
            <Text id={labelId} variant="label" weight={600} className={labelClassName}>
              {label}
            </Text>
          ) : null}
          {description ? (
            <Text id={helperId} variant="caption" tone="muted" className={helperClassName}>
              {description}
            </Text>
          ) : null}
        </Stack>
      ) : null}
    </Stack>
  );
}
