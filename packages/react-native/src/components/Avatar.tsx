import React, { useState } from "react";
import {
  Image,
  ImageProps,
  Text as NativeText,
  View,
  ViewProps
} from "react-native";

import type { ControlSize } from "./types";
import { cn, getInitials } from "./utils";

export type AvatarProps = Omit<ViewProps, "style"> & {
  fallback?: React.ReactNode;
  imageClassName?: string;
  imageProps?: Omit<ImageProps, "className" | "source" | "style">;
  name?: string;
  size?: ControlSize;
  src?: string;
  textClassName?: string;
};

const sizeClasses = {
  sm: "size-8",
  md: "size-10",
  lg: "size-14"
} as const;

const textSizeClasses = {
  sm: "text-[--zeno-type-caption]",
  md: "text-[--zeno-type-label]",
  lg: "text-[--zeno-type-body]"
} as const;

export function Avatar({
  accessibilityLabel,
  className,
  fallback,
  imageClassName,
  imageProps,
  name,
  size = "md",
  src,
  textClassName,
  ...props
}: AvatarProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const shouldShowImage = Boolean(src && !hasImageError);

  return (
    <View
      {...props}
      accessibilityLabel={accessibilityLabel ?? name}
      accessibilityRole={accessibilityLabel || name ? "image" : undefined}
      className={cn(
        "items-center justify-center overflow-hidden rounded-[--zeno-radius-pill] border border-[--zeno-color-border-default] bg-[--zeno-color-brand-secondary]",
        sizeClasses[size],
        className
      )}
    >
      {shouldShowImage && src ? (
        <Image
          {...imageProps}
          source={{ uri: src }}
          accessibilityLabel={accessibilityLabel ?? name}
          onError={() => {
            setHasImageError(true);
            imageProps?.onError?.();
          }}
          onLoad={() => {
            imageProps?.onLoad?.();
          }}
          className={cn("h-full w-full", imageClassName)}
        />
      ) : (
        <NativeText
          className={cn(
            "font-bold leading-none text-[--zeno-color-brand-strong]",
            textSizeClasses[size],
            textClassName
          )}
        >
          {fallback ?? getInitials(name ?? accessibilityLabel)}
        </NativeText>
      )}
    </View>
  );
}
