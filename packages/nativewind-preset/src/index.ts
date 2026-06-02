import { generateTailwindThemeCss } from "@zeno-ui/tailwind-preset";
import type { DesignTokens } from "@zeno-ui/tokens";

export function generateNativeWindThemeCss(tokens: DesignTokens): string {
  return `/* NativeWind-ready theme.
   Keep semantic names aligned with web tokens so RN components can reuse class recipes later. */
${generateTailwindThemeCss(tokens)}`;
}

export function generateNativeWindNotes(tokens: DesignTokens): string {
  return [
    `Theme: ${tokens.name}`,
    "Use these semantic classes in future NativeWind components:",
    "bg-background bg-surface bg-brand text-text text-text-muted text-brand-contrast",
    "rounded-control rounded-card p-card h-control-3 px-control-3 py-control-3 text-body shadow-elevated"
  ].join("\n");
}
