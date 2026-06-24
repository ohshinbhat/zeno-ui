import * as React from "react";
import { inputFrame } from "../recipes.js";
import { cn } from "../utils.js";
import { FieldShell, fieldBorderToneClass, type FieldTone } from "./field.js";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  hint?: string;
  tone?: FieldTone;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, tone = "default", className, id, ...props },
  ref
) {
  const generatedId = React.useId();
  const selectId = id ?? generatedId;

  return (
    <FieldShell id={selectId} label={label} hint={hint} tone={tone}>
      <select
        id={selectId}
        ref={ref}
        className={inputFrame(cn("cursor-pointer", fieldBorderToneClass(tone), className))}
        {...props}
      />
    </FieldShell>
  );
});
