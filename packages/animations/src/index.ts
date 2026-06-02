import type { DesignTokens } from "@zeno-ui/tokens";

export const animationClasses = [
  "animate-enter",
  "animate-exit",
  "animate-pop",
  "animate-press",
  "animate-toast",
  "animate-dialog",
  "animate-drawer",
  "animate-skeleton",
  "animate-tab-indicator"
] as const;

export type AnimationClass = (typeof animationClasses)[number];

export function generateAnimationCss(tokens: DesignTokens, scope = ":root"): string {
  const reduceMotion = tokens.knobs.motion === "none";

  return `
${scope} {
  --animate-enter: aicl-enter var(--duration-normal) var(--ease-enter) both;
  --animate-exit: aicl-exit var(--duration-fast) var(--ease-exit) both;
  --animate-pop: aicl-pop var(--duration-normal) var(--ease-enter) both;
  --animate-press: aicl-press var(--duration-fast) var(--ease-standard) both;
  --animate-toast: aicl-toast var(--duration-normal) var(--ease-enter) both;
  --animate-dialog: aicl-dialog var(--duration-normal) var(--ease-enter) both;
  --animate-drawer: aicl-drawer var(--duration-slow) var(--ease-enter) both;
  --animate-skeleton: aicl-skeleton 1.4s var(--ease-standard) infinite;
  --animate-tab-indicator: aicl-tab var(--duration-normal) var(--ease-standard) both;
}
${scope} .animate-enter { animation: var(--animate-enter); }
${scope} .animate-exit { animation: var(--animate-exit); }
${scope} .animate-pop { animation: var(--animate-pop); }
${scope} .animate-press:active { animation: var(--animate-press); }
${scope} .animate-toast { animation: var(--animate-toast); }
${scope} .animate-dialog { animation: var(--animate-dialog); }
${scope} .animate-drawer { animation: var(--animate-drawer); }
${scope} .animate-skeleton { animation: var(--animate-skeleton); }
${scope} .animate-tab-indicator { animation: var(--animate-tab-indicator); }
@keyframes aicl-enter { from { opacity: var(--opacity-enter); transform: translateY(6px) scale(var(--scale-enter)); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes aicl-exit { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(.98); } }
@keyframes aicl-pop { 0% { transform: scale(var(--scale-enter)); } 100% { transform: scale(1); } }
@keyframes aicl-press { 50% { transform: scale(var(--scale-press)); } }
@keyframes aicl-toast { from { opacity: var(--opacity-enter); transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes aicl-dialog { from { opacity: var(--opacity-enter); transform: translateY(12px) scale(var(--scale-enter)); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes aicl-drawer { from { opacity: var(--opacity-enter); transform: translateX(22px); } to { opacity: 1; transform: translateX(0); } }
@keyframes aicl-skeleton { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
@keyframes aicl-tab { from { transform: scaleX(.86); opacity: .65; } to { transform: scaleX(1); opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  ${scope} *, ${scope} *::before, ${scope} *::after {
    animation-duration: 1ms !important;
    transition-duration: 1ms !important;
    scroll-behavior: auto !important;
  }
}
${reduceMotion ? `${scope} *, ${scope} *::before, ${scope} *::after { animation: none !important; transition-duration: 1ms !important; }` : ""}
`.trim();
}
