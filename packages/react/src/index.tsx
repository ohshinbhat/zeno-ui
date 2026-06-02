import * as React from "react";
import { gapClasses, inputFrame, interactiveFrame, toneVariantClasses, type ZenoSize, type ZenoTone, type ZenoVariant } from "./recipes";
import { cn } from "./utils";

export type { ZenoSize, ZenoTone, ZenoVariant };
export { cn, gapClasses, inputFrame, interactiveFrame, toneVariantClasses };

type ElementTag = React.ElementType;

export type StackProps = React.HTMLAttributes<HTMLElement> & {
  as?: ElementTag;
  direction?: "row" | "column";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  gap?: ZenoSize | "none";
  wrap?: boolean;
};

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch"
};

const justifyClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between"
};

export const Stack = React.forwardRef<HTMLElement, StackProps>(function Stack(
  {
    as,
    direction = "column",
    align = "stretch",
    justify = "start",
    gap = "$3",
    wrap = false,
    className,
    ...props
  },
  ref
) {
  const Component = as ?? "div";

  return (
    <Component
      ref={ref}
      className={cn(
        "flex min-w-0",
        direction === "row" ? "flex-row" : "flex-col",
        alignClasses[align],
        justifyClasses[justify],
        gap !== "none" && gapClasses[gap],
        wrap && "flex-wrap",
        className
      )}
      {...props}
    />
  );
});

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

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ZenoSize;
  tone?: ZenoTone;
  variant?: ZenoVariant;
  circular?: boolean;
};

function ButtonRoot({ size = "$3", tone = "brand", variant = "solid", circular = false, className, ...props }: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) {
  return (
    <button
      ref={ref}
      className={interactiveFrame({
        size,
        tone,
        variant,
        className: cn(circular && "aspect-square px-0", className)
      })}
      {...props}
    />
  );
}

function ButtonText({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>): React.ReactElement {
  return <span className={cn("truncate", className)} {...props} />;
}

function ButtonIcon({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>): React.ReactElement {
  return <span aria-hidden="true" className={cn("inline-flex size-4 items-center justify-center", className)} {...props} />;
}

export const Button = Object.assign(React.forwardRef(ButtonRoot), {
  Text: ButtonText,
  Icon: ButtonIcon
});

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  tone?: "default" | "danger" | "success";
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, tone = "default", className, id, ...props },
  ref
) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <Stack gap="$2">
      {label ? (
        <Text as="label" htmlFor={inputId} size="label" tone="muted" weight="medium">
          {label}
        </Text>
      ) : null}
      <input
        id={inputId}
        ref={ref}
        className={inputFrame(cn(tone === "danger" && "border-danger", tone === "success" && "border-success", className))}
        {...props}
      />
      {hint ? (
        <Text size="label" tone={tone === "danger" ? "danger" : tone === "success" ? "success" : "muted"}>
          {hint}
        </Text>
      ) : null}
    </Stack>
  );
});

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "surface" | "raised" | "glass";
  interactive?: boolean;
};

function CardRoot({ variant = "surface", interactive = false, className, ...props }: CardProps, ref: React.ForwardedRef<HTMLDivElement>) {
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
