import React from "react";
import { Text as NativeText, View, ViewProps } from "react-native";

import type { ComponentTone, ControlSize } from "./types";
import { cn, toneClasses, toneTextClass } from "./utils";

export type BadgeProps = Omit<ViewProps, "style"> & {
  tone?: ComponentTone;
  variant?: "soft" | "solid" | "outline";
  size?: ControlSize;
  textClassName?: string;
};

const sizeClasses = {
  sm: "min-h-6 px-[--zeno-spacing-sm]",
  md: "min-h-7 px-[--zeno-spacing-md]",
  lg: "min-h-[34px] px-[--zeno-spacing-md]"
} as const;

const textSizeClasses = {
  sm: "text-[--zeno-type-caption]",
  md: "text-[--zeno-type-label]",
  lg: "text-[--zeno-type-label]"
} as const;

export function Badge({
  children,
  tone = "brand",
  variant = "soft",
  size = "md",
  className,
  textClassName,
  ...props
}: BadgeProps) {
  return (
    <View
      {...props}
      className={cn(
        "items-center justify-center self-start rounded-[--zeno-radius-pill] border",
        toneClasses(tone, variant),
        sizeClasses[size],
        className
      )}
    >
      <NativeText
        className={cn(
          "font-bold leading-none",
          textSizeClasses[size],
          toneTextClass(tone, variant),
          textClassName
        )}
      >
        {children}
      </NativeText>
    </View>
  );
}
