import * as React from "react";
import { type ZenoTone } from "../recipes.js";
import { cn } from "../utils.js";

export type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  tone?: ZenoTone;
};

const checkboxAccentStyles: Record<ZenoTone, React.CSSProperties> = {
  neutral: { accentColor: "var(--color-text)" },
  brand: { accentColor: "var(--color-brand)" },
  success: { accentColor: "var(--color-success)" },
  warning: { accentColor: "var(--color-warning)" },
  danger: { accentColor: "var(--color-danger)" }
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    label,
    hint,
    tone = "brand",
    className,
    id,
    style,
    disabled,
    "aria-describedby": ariaDescribedBy,
    ...props
  },
  ref
) {
  const generatedId = React.useId();
  const checkboxId = id ?? generatedId;
  const hasHint = hint !== undefined && hint !== null;
  const hintId = hasHint ? `${checkboxId}-hint` : undefined;
  const describedBy = [ariaDescribedBy, hintId].filter(Boolean).join(" ") || undefined;
  const hasLabel = label !== undefined && label !== null;

  return (
    <label className={cn("flex min-w-0 items-start gap-theme-2 text-body text-text", disabled && "opacity-disabled")}>
      <input
        id={checkboxId}
        ref={ref}
        type="checkbox"
        disabled={disabled}
        aria-describedby={describedBy}
        className={cn(
          "mt-0.5 size-4 shrink-0 rounded-control border border-border bg-surface transition-theme",
          "focus-visible:outline-none focus-visible:shadow-focus disabled:opacity-disabled",
          className
        )}
        style={{ ...checkboxAccentStyles[tone], ...style }}
        {...props}
      />
      {hasLabel || hasHint ? (
        <span className="flex min-w-0 flex-col gap-1">
          {hasLabel ? <span className="font-medium text-text">{label}</span> : null}
          {hasHint ? (
            <span id={hintId} className="text-label text-text-muted">
              {hint}
            </span>
          ) : null}
        </span>
      ) : null}
    </label>
  );
});
