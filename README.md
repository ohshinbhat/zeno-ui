# Zeno UI

Zeno UI is an AI-powered component and design asset generator that helps developers and designers rapidly build consistent, themed, and accessible UI systems with minimal manual effort.

The project is web-first today and NativeWind-ready later. A concise promptable token model generates Tailwind theme output, scoped live preview CSS, NativeWind-compatible theme CSS, and animation recipes.

## What Is In V1

- Five Tamagui-inspired primitives: `Stack`, `Text`, `Button`, `Input`, and `Card`.
- A rule-based theme engine with research-informed presets like `rainy glassmorphism fintech dashboard`, `immersive webgl 3d portfolio dark energetic`, and `accessible government open design system high contrast clean`.
- A Tailwind v4 `@theme` exporter and live preview stylesheet generator.
- A NativeWind-ready exporter that keeps semantic names aligned for future RN components.
- A clean Next.js playground for generating, previewing, and exporting themes.
- Storybook stories for the primitive set.

## Workspace

- `apps/playground` - Next.js playground and Storybook host.
- `packages/react` - the five primitive components.
- `packages/tokens` - canonical token schema, presets, validation, color utilities.
- `packages/theme-engine` - prompt parser and deterministic theme generator.
- `packages/tailwind-preset` - Tailwind `@theme` and runtime CSS exporters.
- `packages/nativewind-preset` - NativeWind-compatible theme output.
- `packages/animations` - token-driven animation utilities.

## Commands

```bash
yarn install
yarn dev
yarn typecheck
yarn build:packages
yarn storybook
yarn build
yarn build:storybook
```

The repo uses Yarn Classic workspaces and does not require Corepack.

## Publish Readiness

- GitHub CI runs install, typecheck, package/app build, and Storybook build on every push and pull request.
- Generated folders such as `node_modules`, `.next`, package `dist`, Storybook output, logs, and TypeScript build info are ignored.
- Component source files use lowercase or kebab-case names where possible. Framework-required files such as `README.md`, `package.json`, `layout.tsx`, and `page.tsx` keep their conventional names.
- No test files are included in V1; Storybook is the interactive component review surface.

## Deploy The Playground

The playground is a standard Next.js app inside a Yarn workspace. For Vercel or similar platforms, use the repository root as the install/build context and these commands:

```bash
yarn install --frozen-lockfile
yarn build
```

The deployable app lives at `apps/playground`. Locally, `yarn dev` serves it through the root workspace script.
