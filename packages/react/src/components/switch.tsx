import * as React from "react";
import { type ZenoTone } from "../recipes.js";
import { cn } from "../utils.js";

export type SwitchProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "aria-checked" | "onChange" | "role"> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  hint?: React.ReactNode;
  tone?: ZenoTone;
};

const switchToneClasses: Record<ZenoTone, string> = {
  neutral: "bg-text border-text",
  brand: "bg-brand border-brand",
  success: "bg-success border-success",
  warning: "bg-warning border-warning",
  danger: "bg-danger border-danger"
};

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  {
    checked,
    defaultChecked,
    onCheckedChange,
    label,
    hint,
    tone = "brand",
    className,
    id,
    type = "button",
    disabled,
    onClick,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    ...props
  },
  ref
) {
  const generatedId = React.useId();
  const switchId = id ?? generatedId;
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
  const resolvedChecked = isControlled ? checked : internalChecked;
  const hasLabel = label !== undefined && label !== null;
  const hasHint = hint !== undefined && hint !== null;
  const labelId = hasLabel ? `${switchId}-label` : undefined;
  const hintId = hasHint ? `${switchId}-hint` : undefined;
  const describedBy = [ariaDescribedBy, hintId].filter(Boolean).join(" ") || undefined;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    const nextChecked = !resolvedChecked;

    if (!isControlled) {
      setInternalChecked(nextChecked);
    }

    onCheckedChange?.(nextChecked);
  }

  return (
    <div className={cn("flex min-w-0 items-start gap-theme-2 text-body text-text", disabled && "opacity-disabled")}>
      <button
        id={switchId}
        ref={ref}
        type={type}
        role="switch"
        aria-checked={resolvedChecked}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy ?? labelId}
        aria-describedby={describedBy}
        data-state={resolvedChecked ? "checked" : "unchecked"}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "relative inline-flex h-control-3 w-11 shrink-0 items-center rounded-pill border transition-theme",
          "focus-visible:outline-none focus-visible:shadow-focus disabled:pointer-events-none disabled:opacity-disabled",
          resolvedChecked ? switchToneClasses[tone] : "border-border bg-surface-raised",
          className
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none size-4 rounded-pill bg-background shadow-elevated transition-theme",
            resolvedChecked ? "translate-x-5" : "translate-x-1"
          )}
        />
      </button>
      {hasLabel || hasHint ? (
        <span className="flex min-w-0 flex-col gap-1">
          {hasLabel ? (
            <span id={labelId} className="font-medium text-text">
              {label}
            </span>
          ) : null}
          {hasHint ? (
            <span id={hintId} className="text-label text-text-muted">
              {hint}
            </span>
          ) : null}
        </span>
      ) : null}
    </div>
  );
});
