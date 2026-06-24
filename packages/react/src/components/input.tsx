import * as React from "react";
import { inputFrame } from "../recipes.js";
import { cn } from "../utils.js";
import { FieldShell, fieldBorderToneClass, type FieldTone } from "./field.js";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  tone?: FieldTone;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, tone = "default", className, id, ...props },
  ref
) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <FieldShell id={inputId} label={label} hint={hint} tone={tone}>
      <input
        id={inputId}
        ref={ref}
        className={inputFrame(cn(fieldBorderToneClass(tone), className))}
        {...props}
      />
    </FieldShell>
  );
});
