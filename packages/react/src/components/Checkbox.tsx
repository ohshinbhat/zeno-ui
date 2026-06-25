import React, { InputHTMLAttributes, useEffect, useId, useRef, useState } from "react";

import { Stack } from "./Stack";
import { Text } from "./Text";
import type { ZenoCheckedState } from "./types";
import { cn } from "./utils";

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "checked" | "defaultChecked" | "onChange" | "style" | "type"
> & {
  checked?: ZenoCheckedState;
  defaultChecked?: ZenoCheckedState;
  label?: string;
  description?: string;
  error?: string;
  onCheckedChange?: (checked: ZenoCheckedState) => void;
  containerClassName?: string;
  helperClassName?: string;
  labelClassName?: string;
};

const getBooleanChecked = (value: ZenoCheckedState | undefined) =>
  value === true || value === "indeterminate";

export function Checkbox({
  checked,
  defaultChecked = false,
  label,
  description,
  error,
  disabled,
  id,
  onCheckedChange,
  className,
  containerClassName,
  helperClassName,
  labelClassName,
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState<ZenoCheckedState>(defaultChecked);
  const resolvedChecked = isControlled ? checked : internalChecked;
  const inputId = id ?? generatedId;
  const helperId = description || error ? `${inputId}-helper` : undefined;
  const isChecked = getBooleanChecked(resolvedChecked);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = resolvedChecked === "indeterminate";
    }
  }, [resolvedChecked]);

  const updateChecked = (nextChecked: boolean) => {
    if (!isControlled) {
      setInternalChecked(nextChecked);
    }

    onCheckedChange?.(nextChecked);
  };

  return (
    <Stack direction="row" gap="sm" align="flex-start" className={containerClassName}>
      <input
        {...props}
        ref={inputRef}
        id={inputId}
        type="checkbox"
        disabled={disabled}
        checked={isChecked}
        aria-describedby={helperId}
        aria-invalid={Boolean(error) || undefined}
        data-state={resolvedChecked === "indeterminate" ? "indeterminate" : isChecked ? "checked" : "unchecked"}
        onChange={(event) => updateChecked(event.currentTarget.checked)}
        className={cn(
          "mt-0.5 size-[18px] shrink-0 cursor-pointer accent-[var(--zeno-color-brand-primary)] disabled:cursor-not-allowed disabled:opacity-[var(--zeno-opacity-disabled)]",
          error && "outline outline-1 outline-[var(--zeno-color-status-danger)]",
          className
        )}
      />
      {label || description || error ? (
        <Stack gap="xs" className="min-w-0">
          {label ? (
            <Text as="label" htmlFor={inputId} variant="label" weight={600} className={labelClassName}>
              {label}
            </Text>
          ) : null}
          {description || error ? (
            <Text
              id={helperId}
              variant="caption"
              tone={error ? "danger" : "muted"}
              className={cn("mt-[var(--zeno-spacing-xs)]", helperClassName)}
            >
              {error ?? description}
            </Text>
          ) : null}
        </Stack>
      ) : null}
    </Stack>
  );
}
