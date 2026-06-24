import * as React from "react";
import { Stack } from "./stack.js";
import { Text } from "./text.js";

export type FieldTone = "default" | "danger" | "success";

export type FieldShellProps = {
  id: string;
  label?: string | undefined;
  hint?: string | undefined;
  tone?: FieldTone | undefined;
  children: React.ReactNode;
};

export function fieldBorderToneClass(tone: FieldTone): string | undefined {
  if (tone === "danger") {
    return "border-danger";
  }

  if (tone === "success") {
    return "border-success";
  }

  return undefined;
}

export function FieldShell({ id, label, hint, tone = "default", children }: FieldShellProps): React.ReactElement {
  return (
    <Stack gap="$2">
      {label ? (
        <Text as="label" htmlFor={id} size="label" tone="muted" weight="medium">
          {label}
        </Text>
      ) : null}
      {children}
      {hint ? (
        <Text size="label" tone={tone === "danger" ? "danger" : tone === "success" ? "success" : "muted"}>
          {hint}
        </Text>
      ) : null}
    </Stack>
  );
}
