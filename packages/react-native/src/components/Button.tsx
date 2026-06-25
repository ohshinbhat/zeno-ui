import React from "react";
import { Pressable, PressableProps, Text as NativeText } from "react-native";

import { cn, controlHeightClass } from "./utils";

export type ButtonProps = Omit<PressableProps, "style"> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
  textClassName?: string;
};

const variantClasses = {
  primary:
    "border-[--zeno-color-brand-primary] bg-[--zeno-color-brand-primary]",
  secondary:
    "border-[--zeno-color-border-default] bg-[--zeno-color-brand-secondary]",
  ghost: "border-transparent bg-transparent active:bg-[--zeno-color-bg-subtle]"
} as const;

const textVariantClasses = {
  primary: "text-[--zeno-color-text-inverse]",
  secondary: "text-[--zeno-color-text-primary]",
  ghost: "text-[--zeno-color-text-primary]"
} as const;

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  textClassName,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      {...props}
      disabled={disabled}
      className={cn(
        "items-center justify-center rounded-[--zeno-radius-pill] border px-[--zeno-spacing-lg] py-[--zeno-spacing-sm] active:opacity-90",
        fullWidth ? "self-stretch" : "self-start",
        disabled && "opacity-[--zeno-opacity-disabled]",
        controlHeightClass(size),
        variantClasses[variant],
        className
      )}
    >
      <NativeText
        className={cn(
          "text-[--zeno-type-label] font-semibold",
          textVariantClasses[variant],
          textClassName
        )}
      >
        {children}
      </NativeText>
    </Pressable>
  );
}
