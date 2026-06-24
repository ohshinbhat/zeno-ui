import type { DesignTokens } from "./tokens.js";

function line(name: string, value: string): string {
  return `  ${name}: ${value};`;
}

export function generateThemeVariables(tokens: DesignTokens): string {
  return [
    line("--color-background", tokens.color.background),
    line("--color-surface", tokens.color.surface),
    line("--color-surface-raised", tokens.color.surfaceRaised),
    line("--color-surface-glass", tokens.color.surfaceGlass),
    line("--color-text", tokens.color.text),
    line("--color-text-muted", tokens.color.textMuted),
    line("--color-border", tokens.color.border),
    line("--color-brand", tokens.color.brand),
    line("--color-brand-contrast", tokens.color.brandContrast),
    line("--color-accent", tokens.color.accent),
    line("--color-accent-contrast", tokens.color.accentContrast),
    line("--color-success", tokens.color.success),
    line("--color-warning", tokens.color.warning),
    line("--color-danger", tokens.color.danger),
    line("--radius-control", tokens.radius.control),
    line("--radius-card", tokens.radius.card),
    line("--radius-pill", tokens.radius.pill),
    line("--spacing-card", tokens.spacing.card),
    line("--spacing-section", tokens.spacing.section),
    line("--spacing-gap-2", tokens.spacing.gap2),
    line("--spacing-gap-3", tokens.spacing.gap3),
    line("--spacing-gap-4", tokens.spacing.gap4),
    line("--spacing-gap-5", tokens.spacing.gap5),
    line("--size-control-2", tokens.size.control2),
    line("--size-control-3", tokens.size.control3),
    line("--size-control-4", tokens.size.control4),
    line("--size-control-5", tokens.size.control5),
    line("--size-icon-2", tokens.size.icon2),
    line("--size-icon-3", tokens.size.icon3),
    line("--size-icon-4", tokens.size.icon4),
    line("--size-icon-5", tokens.size.icon5),
    line("--spacing-control-x-2", tokens.size.paddingX2),
    line("--spacing-control-x-3", tokens.size.paddingX3),
    line("--spacing-control-x-4", tokens.size.paddingX4),
    line("--spacing-control-x-5", tokens.size.paddingX5),
    line("--spacing-control-y-2", tokens.size.paddingY2),
    line("--spacing-control-y-3", tokens.size.paddingY3),
    line("--spacing-control-y-4", tokens.size.paddingY4),
    line("--spacing-control-y-5", tokens.size.paddingY5),
    line("--font-sans", tokens.type.sans),
    line("--font-display", tokens.type.display),
    line("--font-mono", tokens.type.mono),
    line("--text-label", tokens.type.label),
    line("--text-body", tokens.type.body),
    line("--text-title", tokens.type.title),
    line("--text-display", tokens.type.displaySize),
    line("--leading-label", tokens.type.labelLine),
    line("--leading-body", tokens.type.bodyLine),
    line("--leading-title", tokens.type.titleLine),
    line("--leading-display", tokens.type.displayLine),
    line("--shadow-elevated", tokens.shadow.elevated),
    line("--shadow-floating", tokens.shadow.floating),
    line("--shadow-focus", tokens.shadow.focus),
    line("--shadow-glow", tokens.shadow.glow),
    line("--blur-glass", tokens.blur.glass),
    line("--opacity-glass", tokens.opacity.glass),
    line("--opacity-disabled", tokens.opacity.disabled),
    line("--duration-fast", tokens.motion.durationFast),
    line("--duration-normal", tokens.motion.durationNormal),
    line("--duration-slow", tokens.motion.durationSlow),
    line("--ease-standard", tokens.motion.easeStandard),
    line("--ease-enter", tokens.motion.easeEnter),
    line("--ease-exit", tokens.motion.easeExit),
    line("--scale-enter", tokens.motion.scaleEnter),
    line("--scale-press", tokens.motion.scalePress),
    line("--opacity-enter", tokens.motion.opacityEnter),
    line("--stagger", tokens.motion.stagger)
  ].join("\n");
}

export function generateRuntimeThemeCss(tokens: DesignTokens, scope = ".zeno-theme"): string {
  return `
${scope} {
${generateThemeVariables(tokens)}
  color: var(--color-text);
  background: var(--color-background);
  font-family: var(--font-sans);
  font-size: var(--text-body);
}
${scope} .bg-background { background-color: var(--color-background); }
${scope} .bg-transparent { background-color: transparent; }
${scope} .bg-surface { background-color: var(--color-surface); }
${scope} .bg-surface-raised { background-color: var(--color-surface-raised); }
${scope} .bg-surface-glass { background-color: var(--color-surface-glass); }
${scope} .bg-text { background-color: var(--color-text); }
${scope} .bg-border { background-color: var(--color-border); }
${scope} .bg-brand { background-color: var(--color-brand); }
${scope} .bg-accent { background-color: var(--color-accent); }
${scope} .bg-success { background-color: var(--color-success); }
${scope} .bg-warning { background-color: var(--color-warning); }
${scope} .bg-danger { background-color: var(--color-danger); }
${scope} .text-text { color: var(--color-text); }
${scope} .text-text-muted { color: var(--color-text-muted); }
${scope} .text-background { color: var(--color-background); }
${scope} .text-brand { color: var(--color-brand); }
${scope} .text-brand-contrast { color: var(--color-brand-contrast); }
${scope} .text-accent { color: var(--color-accent); }
${scope} .text-accent-contrast { color: var(--color-accent-contrast); }
${scope} .text-success { color: var(--color-success); }
${scope} .text-warning { color: var(--color-warning); }
${scope} .text-danger { color: var(--color-danger); }
${scope} .border-transparent { border-color: transparent; }
${scope} .border-border { border-color: var(--color-border); }
${scope} .border-text { border-color: var(--color-text); }
${scope} .border-brand { border-color: var(--color-brand); }
${scope} .border-accent { border-color: var(--color-accent); }
${scope} .border-success { border-color: var(--color-success); }
${scope} .border-warning { border-color: var(--color-warning); }
${scope} .border-danger { border-color: var(--color-danger); }
${scope} .rounded-control { border-radius: var(--radius-control); }
${scope} .rounded-card { border-radius: var(--radius-card); }
${scope} .rounded-pill { border-radius: var(--radius-pill); }
${scope} .p-card { padding: var(--spacing-card); }
${scope} .h-control-2 { min-height: var(--size-control-2); }
${scope} .h-control-3 { min-height: var(--size-control-3); }
${scope} .h-control-4 { min-height: var(--size-control-4); }
${scope} .h-control-5 { min-height: var(--size-control-5); }
${scope} .size-4 { width: 1rem; height: 1rem; }
${scope} .size-icon-2 { width: var(--size-icon-2); height: var(--size-icon-2); }
${scope} .size-icon-3 { width: var(--size-icon-3); height: var(--size-icon-3); }
${scope} .size-icon-4 { width: var(--size-icon-4); height: var(--size-icon-4); }
${scope} .size-icon-5 { width: var(--size-icon-5); height: var(--size-icon-5); }
${scope} .px-control-2 { padding-left: var(--spacing-control-x-2); padding-right: var(--spacing-control-x-2); }
${scope} .px-control-3 { padding-left: var(--spacing-control-x-3); padding-right: var(--spacing-control-x-3); }
${scope} .px-control-4 { padding-left: var(--spacing-control-x-4); padding-right: var(--spacing-control-x-4); }
${scope} .px-control-5 { padding-left: var(--spacing-control-x-5); padding-right: var(--spacing-control-x-5); }
${scope} .py-control-2 { padding-top: var(--spacing-control-y-2); padding-bottom: var(--spacing-control-y-2); }
${scope} .py-control-3 { padding-top: var(--spacing-control-y-3); padding-bottom: var(--spacing-control-y-3); }
${scope} .py-control-4 { padding-top: var(--spacing-control-y-4); padding-bottom: var(--spacing-control-y-4); }
${scope} .py-control-5 { padding-top: var(--spacing-control-y-5); padding-bottom: var(--spacing-control-y-5); }
${scope} .gap-theme-2 { gap: var(--spacing-gap-2); }
${scope} .gap-theme-3 { gap: var(--spacing-gap-3); }
${scope} .gap-theme-4 { gap: var(--spacing-gap-4); }
${scope} .gap-theme-5 { gap: var(--spacing-gap-5); }
${scope} .gap-theme { gap: var(--spacing-gap-4); }
${scope} .shadow-elevated { box-shadow: var(--shadow-elevated); }
${scope} .shadow-floating { box-shadow: var(--shadow-floating); }
${scope} .shadow-focus { box-shadow: var(--shadow-focus); }
${scope} .shadow-glow { box-shadow: var(--shadow-glow); }
${scope} .backdrop-blur-glass { backdrop-filter: blur(var(--blur-glass)); }
${scope} .font-display { font-family: var(--font-display); }
${scope} .font-mono { font-family: var(--font-mono); }
${scope} .text-label { font-size: var(--text-label); line-height: var(--leading-label); }
${scope} .text-body { font-size: var(--text-body); line-height: var(--leading-body); }
${scope} .text-title { font-size: var(--text-title); line-height: var(--leading-title); }
${scope} .text-display { font-size: var(--text-display); line-height: var(--leading-display); }
${scope} .leading-body { line-height: var(--leading-body); }
${scope} .opacity-disabled { opacity: var(--opacity-disabled); }
${scope} .transition-theme { transition-property: color, background-color, border-color, box-shadow, opacity, transform; transition-duration: var(--duration-normal); transition-timing-function: var(--ease-standard); }
`.trim();
}
