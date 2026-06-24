import * as React from "react";
import { interactiveFrame, type ZenoSize, type ZenoTone, type ZenoVariant } from "../recipes.js";
import { cn } from "../utils.js";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ZenoSize;
  tone?: ZenoTone;
  variant?: ZenoVariant;
  circular?: boolean;
};

function ButtonRoot(
  { size = "$3", tone = "brand", variant = "solid", circular = false, className, ...props }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
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
