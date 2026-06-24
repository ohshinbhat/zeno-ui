import * as React from "react";
import { cn } from "../utils.js";

export type SeparatorProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
};

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  { orientation = "horizontal", decorative = true, className, role, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      role={decorative ? undefined : role ?? "separator"}
      aria-orientation={decorative ? undefined : orientation}
      aria-hidden={decorative ? true : undefined}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full min-h-control-3 w-px",
        className
      )}
      {...props}
    />
  );
});
