# Zeno UI

Zeno UI is the package/library repo for an AI-powered component and design asset system that helps developers build consistent, themed, and accessible UI with minimal manual effort.

The project is web-first today and NativeWind-ready later. A concise promptable token model generates Tailwind theme output, scoped live preview CSS, NativeWind-compatible theme CSS, and animation recipes.

## What Is In V1

- Five Tamagui-inspired primitives: `Stack`, `Text`, `Button`, `Input`, and `Card`.
- A rule-based theme engine with research-informed presets like `rainy glassmorphism fintech dashboard`, `immersive webgl 3d portfolio dark energetic`, and `accessible government open design system high contrast clean`.
- A Tailwind v4 `@theme` exporter and live preview stylesheet generator.
- A launch-time theme runtime for hosted, customer-hosted, or local fallback token configs.
- A NativeWind-ready exporter that keeps semantic names aligned for future RN components.

The website, console, playground, and Storybook host now live in the sibling project at `/Users/ohshinbhat/Desktop/zeno-site`.

## Workspace

- `packages/react` - the five primitive components.
- `packages/tokens` - canonical token schema, presets, validation, color utilities.
- `packages/theme-engine` - prompt parser and deterministic theme generator.
- `packages/tailwind-preset` - Tailwind `@theme` and runtime CSS exporters.
- `packages/theme-runtime` - React provider, hosted config loader, cache fallback, and launch script helpers.
- `packages/nativewind-preset` - NativeWind-compatible theme output.
- `packages/animations` - token-driven animation utilities.
- `docs/architecture.md` - editable product architecture and repo plan for the website, package, and backend.
- `docs/token-hosting.md` - hosted control plane setup, provider integration, Supabase schema, and fallback behavior.

## Commands

```bash
yarn install
yarn dev
yarn typecheck
yarn build:packages
yarn build
```

The repo uses Yarn Classic workspaces and does not require Corepack.

## Publish Readiness

- GitHub CI should run install, typecheck, and package builds on every push and pull request.
- Generated folders such as `node_modules`, `.next`, package `dist`, Storybook output, logs, and TypeScript build info are ignored.
- Component source files use lowercase or kebab-case names where possible. Framework-required files such as `README.md`, `package.json`, `layout.tsx`, and `page.tsx` keep their conventional names.
- No test files are included in V1.

## Website Project

The website/console project has been split into a sibling folder:

```bash
cd /Users/ohshinbhat/Desktop/zeno-site
yarn install
yarn dev
```

That project consumes these packages through local `file:../zeno-ui/packages/*` dependencies.
