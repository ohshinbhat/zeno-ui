import React from "react";
import { Text as NativeText, TextProps as NativeTextProps } from "react-native";

import type { TextTone } from "./types";
import { cn, textToneClass } from "./utils";

export type TextProps = Omit<NativeTextProps, "style"> & {
  variant?: "title" | "body" | "label" | "caption";
  tone?: TextTone;
  weight?: 400 | 500 | 600 | 700;
};

const variantClasses = {
  title: "text-[--zeno-type-title] leading-tight",
  body: "text-[--zeno-type-body] leading-normal",
  label: "text-[--zeno-type-label] leading-normal",
  caption: "text-[--zeno-type-caption] leading-normal tracking-wide"
} as const;

const weightClasses = {
  400: "font-normal",
  500: "font-medium",
  600: "font-semibold",
  700: "font-bold"
} as const;

export function Text({
  variant = "body",
  tone = "default",
  weight = 500,
  className,
  ...props
}: TextProps) {
  return (
    <NativeText
      {...props}
      className={cn(variantClasses[variant], textToneClass(tone), weightClasses[weight], className)}
    />
  );
}
