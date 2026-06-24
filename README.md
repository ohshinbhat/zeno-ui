# Zeno UI

Zeno UI is the package/library repo for an AI-powered component and design asset system that helps developers build consistent, themed, and accessible UI with minimal manual effort.

The project is web-first today and NativeWind-ready later. A concise promptable token model generates Tailwind theme output, scoped live preview CSS, NativeWind-compatible theme CSS, and animation recipes.

## What Is In V1

- Starter React and React Native component kits with 10 shared primitives: `Stack`, `Text`, `Button`, `Input`, `Card`, `Badge`, `Textarea`, `Select`, `Checkbox`, and `Switch`.
- A `Separator` utility for web and native layouts where a token-driven divider is useful.
- A rule-based theme engine with research-informed presets like `rainy glassmorphism fintech dashboard`, `immersive webgl 3d portfolio dark energetic`, and `accessible government open design system high contrast clean`.
- A Tailwind v4 `@theme` exporter and live preview stylesheet generator.
- A launch-time theme runtime for hosted, customer-hosted, or local fallback token configs.
- A NativeWind-ready exporter that keeps semantic names aligned for future RN components.

The website, console, playground, and Storybook host now live in the sibling project at `/Users/ohshinbhat/Desktop/zeno-site`.

## Workspace

- `packages/react` - theme-aware React primitives and starter form/display components.
- `packages/react-native` - React Native primitives powered by the same token config contract.
- `packages/tokens` - canonical token schema, presets, validation, color utilities.
- `packages/theme-engine` - prompt parser and deterministic theme generator.
- `packages/tailwind-preset` - Tailwind `@theme` and runtime CSS exporters.
- `packages/theme-runtime` - React provider, hosted config loader, cache fallback, and launch script helpers.
- `packages/nativewind-preset` - NativeWind-compatible theme output.
- `packages/animations` - token-driven animation utilities.
- `docs/architecture.md` - editable product architecture and repo plan for the website, package, and backend.
- `docs/zeno-agent-context.md` - operational agent context for cloud runtime, package contracts, Supabase, and npm readiness.
- `docs/token-hosting.md` - hosted control plane setup, provider integration, Supabase schema, and fallback behavior.

## Commands

```bash
yarn install
yarn dev
yarn typecheck
yarn build:packages
yarn build
yarn pack:packages
```

The repo uses Yarn Classic workspaces and does not require Corepack.

## Publishing To npm

The root package is private. Publish only the workspace packages under `packages/*`.

Before publishing:

```bash
yarn install
yarn typecheck
yarn pack:packages
```

Publish all packages in dependency order:

```bash
yarn publish:packages
```

Each package is scoped as `@zeno-ui/*` and has `publishConfig.access` set to `public`.

## Component Packages

React web apps use `@zeno-ui/theme-runtime` plus `@zeno-ui/react`:

```tsx
import { ZenoThemeProvider } from "@zeno-ui/theme-runtime";
import { Button, Card, Stack, Text } from "@zeno-ui/react";
```

React Native apps use the native provider and components from `@zeno-ui/react-native`:

```tsx
import { ZenoNativeProvider, Button, Card, Stack, Text } from "@zeno-ui/react-native";
```

Both surfaces consume the same published `ZenoTokenConfig`; web applies runtime CSS variables, while native maps tokens to concrete JS style values.

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
