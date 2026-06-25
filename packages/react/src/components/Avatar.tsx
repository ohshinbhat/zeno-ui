import React, { HTMLAttributes, ImgHTMLAttributes, useState } from "react";

import type { ControlSize } from "./types";
import { cn, getInitials } from "./utils";

export type AvatarProps = Omit<HTMLAttributes<HTMLDivElement>, "style"> & {
  alt?: string;
  fallback?: React.ReactNode;
  name?: string;
  size?: ControlSize;
  src?: string;
  imageClassName?: string;
  imageProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, "alt" | "className" | "src" | "style">;
  fallbackClassName?: string;
};

const sizeClasses = {
  sm: "size-8 text-[length:var(--zeno-type-caption)]",
  md: "size-10 text-[length:var(--zeno-type-label)]",
  lg: "size-14 text-[length:var(--zeno-type-body)]"
} as const;

export function Avatar({
  alt,
  fallback,
  imageClassName,
  imageProps,
  fallbackClassName,
  name,
  size = "md",
  src,
  className,
  ...props
}: AvatarProps) {
  const [imageStatus, setImageStatus] = useState<"idle" | "loaded" | "error">("idle");
  const shouldShowImage = src && imageStatus !== "error";

  return (
    <div
      {...props}
      aria-label={alt ?? name}
      role={alt || name ? "img" : undefined}
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--zeno-radius-pill)] border border-[var(--zeno-color-border-default)] bg-[var(--zeno-color-brand-secondary)] font-bold leading-none text-[var(--zeno-color-brand-strong)]",
        sizeClasses[size],
        className
      )}
    >
      {shouldShowImage ? (
        <img
          {...imageProps}
          alt={alt ?? name ?? ""}
          src={src}
          onError={(event) => {
            setImageStatus("error");
            imageProps?.onError?.(event);
          }}
          onLoad={(event) => {
            setImageStatus("loaded");
            imageProps?.onLoad?.(event);
          }}
          className={cn(
            "h-full w-full object-cover",
            imageStatus === "loaded" ? "block" : "hidden",
            imageClassName
          )}
        />
      ) : null}
      {!shouldShowImage || imageStatus !== "loaded" ? (
        <span aria-hidden={Boolean(alt || name)} className={fallbackClassName}>
          {fallback ?? getInitials(name ?? alt)}
        </span>
      ) : null}
    </div>
  );
}
