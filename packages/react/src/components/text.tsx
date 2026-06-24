import * as React from "react";
import { cn } from "../utils.js";

type ElementTag = React.ElementType;

export type TextProps = React.HTMLAttributes<HTMLElement> & {
  as?: ElementTag;
  htmlFor?: string;
  size?: "label" | "body" | "title" | "display";
  tone?: "default" | "muted" | "brand" | "danger" | "success";
  weight?: "regular" | "medium" | "semibold" | "bold";
};

const textSizeClasses = {
  label: "text-label",
  body: "text-body",
  title: "text-title",
  display: "text-display"
};

const textToneClasses = {
  default: "text-text",
  muted: "text-text-muted",
  brand: "text-brand",
  danger: "text-danger",
  success: "text-success"
};

const textWeightClasses = {
  regular: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold"
};

export const Text = React.forwardRef<HTMLElement, TextProps>(function Text(
  { as, size = "body", tone = "default", weight = "regular", className, ...props },
  ref
) {
  const Component = as ?? "p";

  return (
    <Component
      ref={ref}
      className={cn(
        "min-w-0",
        size === "title" || size === "display" ? "font-display" : undefined,
        textSizeClasses[size],
        textToneClasses[tone],
        textWeightClasses[weight],
        className
      )}
      {...props}
    />
  );
});
