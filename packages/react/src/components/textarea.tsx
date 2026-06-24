import * as React from "react";
import { inputFrame } from "../recipes.js";
import { cn } from "../utils.js";
import { FieldShell, fieldBorderToneClass, type FieldTone } from "./field.js";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
  tone?: FieldTone;
  resize?: "none" | "vertical" | "both";
};

const textareaResizeClasses = {
  none: "resize-none",
  vertical: "resize-y",
  both: "resize"
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, tone = "default", resize = "vertical", className, id, ...props },
  ref
) {
  const generatedId = React.useId();
  const textareaId = id ?? generatedId;

  return (
    <FieldShell id={textareaId} label={label} hint={hint} tone={tone}>
      <textarea
        id={textareaId}
        ref={ref}
        className={inputFrame(cn("min-h-24 leading-body", textareaResizeClasses[resize], fieldBorderToneClass(tone), className))}
        {...props}
      />
    </FieldShell>
  );
});
