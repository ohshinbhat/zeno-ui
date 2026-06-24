import * as React from "react";
import { cn } from "../utils.js";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "surface" | "raised" | "glass";
  interactive?: boolean;
};

function CardRoot(
  { variant = "surface", interactive = false, className, ...props }: CardProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-card border border-border p-card transition-theme",
        variant === "surface" && "bg-surface",
        variant === "raised" && "bg-surface-raised shadow-elevated",
        variant === "glass" && "bg-surface-glass shadow-elevated backdrop-blur-glass",
        interactive && "hover:-translate-y-0.5 hover:shadow-floating",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return <div className={cn("mb-4 flex items-start justify-between gap-theme", className)} {...props} />;
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return <div className={cn("min-w-0", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return <div className={cn("mt-4 flex items-center justify-between gap-theme", className)} {...props} />;
}

export const Card = Object.assign(React.forwardRef(CardRoot), {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter
});
