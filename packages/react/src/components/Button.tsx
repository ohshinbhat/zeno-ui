import React, { ButtonHTMLAttributes } from "react";

import { useZenoTheme } from "../provider";

import { resolveScaleValue } from "./utils";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  style,
  disabled,
  ...props
}: ButtonProps) {
  const { config } = useZenoTheme();
  const sizeKey =
    size === "sm"
      ? "controlSm"
      : size === "lg"
        ? "controlLg"
        : "controlMd";

  const backgroundColor =
    variant === "primary"
      ? config.tokens.color["brand.primary"]
      : variant === "secondary"
        ? config.tokens.color["brand.secondary"]
        : "transparent";

  const textColor =
    variant === "primary"
      ? config.tokens.color["text.inverse"]
      : config.tokens.color["text.primary"];

  const borderColor =
    variant === "ghost"
      ? "transparent"
      : variant === "secondary"
        ? config.tokens.color["border.default"]
        : config.tokens.color["brand.primary"];

  return (
    <button
      {...props}
      disabled={disabled}
      style={{
        width: fullWidth ? "100%" : "fit-content",
        minHeight: config.tokens.size[sizeKey],
        paddingInline: resolveScaleValue(config.tokens.spacing, "lg", "lg"),
        paddingBlock: resolveScaleValue(config.tokens.spacing, "sm", "sm"),
        borderRadius: config.tokens.radius.pill,
        border: `1px solid ${borderColor}`,
        backgroundColor,
        color: textColor,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? Number(config.tokens.opacity.disabled) : 1,
        fontSize: config.tokens.type.label,
        fontWeight: 600,
        transition: `transform ${config.tokens.motion.fast}, box-shadow ${config.tokens.motion.normal}, opacity ${config.tokens.motion.fast}`,
        boxShadow: variant === "primary" ? config.tokens.shadow.card : "none",
        ...style
      }}
    />
  );
}

