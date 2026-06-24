import * as React from "react";
import { gapClasses, toneVariantClasses, type ZenoSize, type ZenoTone, type ZenoVariant } from "../recipes.js";
import { cn } from "../utils.js";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  size?: ZenoSize;
  tone?: ZenoTone;
  variant?: ZenoVariant;
};

const badgeSizeClasses: Record<ZenoSize, string> = {
  $2: "h-control-2 px-control-2 text-label",
  $3: "h-control-3 px-control-3 text-label",
  $4: "h-control-4 px-control-4 text-body",
  $5: "h-control-5 px-control-5 text-body"
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { size = "$2", tone = "neutral", variant = "soft", className, ...props },
  ref
) {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex max-w-full shrink-0 items-center justify-center rounded-pill border font-medium transition-theme",
        badgeSizeClasses[size],
        gapClasses[size],
        toneVariantClasses[tone][variant],
        className
      )}
      {...props}
    />
  );
});
