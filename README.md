# Zeno UI

Zeno UI is the package/library repo for an AI-powered component and design asset system that helps developers build consistent, themed, and accessible UI with minimal manual effort.

The project now publishes only two packages: React for web and React Native for native apps. A concise promptable token model drives hosted theme config, scoped runtime CSS on web, and resolved native theme values.

## What Is In V1

- Starter React and React Native component kits with 10 shared primitives: `Stack`, `Text`, `Button`, `Input`, `Card`, `Badge`, `Textarea`, `Select`, `Checkbox`, and `Switch`.
- A `Separator` utility for web and native layouts where a token-driven divider is useful.
- Token config helpers, validation, default fallback tokens, and hosted theme runtime exported directly from the two public packages.
- A launch-time theme provider for hosted, customer-hosted, or local fallback token configs.

The website, console, playground, and Storybook host now live in the sibling project at `/Users/ohshinbhat/Desktop/zeno-site`.

## Workspace

- `packages/react` - public React package: components, token config helpers, hosted theme provider, and runtime CSS generation.
- `packages/react-native` - public React Native package: components, token config helpers, and native provider.
- Other legacy folders under `packages/` are not Yarn workspaces and are not published.
- `docs/architecture.md` - editable product architecture and repo plan for the website, package, and backend.
- `docs/publishing.md` - npm Trusted Publishing release process and fallback guidance.
- `docs/zeno-agent-context.md` - operational agent context for cloud runtime, package contracts, Supabase, and npm readiness.
- `docs/token-hosting.md` - hosted control plane setup, provider integration, Supabase schema, and fallback behavior.

## Commands

```bash
yarn install
yarn dev
yarn typecheck
yarn build:packages
yarn build
yarn release:check
yarn pack:packages
```

The repo uses Yarn Classic workspaces and does not require Corepack.

## Publishing To npm

The root package is private. Publish only the two public workspace packages:

- `@zeno-ui/react`
- `@zeno-ui/react-native`

The preferred release path is npm Trusted Publishing through GitHub Actions. This uses OIDC from the `publish.yml` workflow instead of a long-lived npm token or local OTP prompts, and npm automatically creates provenance attestations for public packages published this way.

Before releasing:

```bash
yarn install
yarn typecheck
yarn pack:packages
```

See `docs/publishing.md` for the full release process. Configure npm once for each public package:

- On npmjs.com, open the `@zeno-ui/react` and `@zeno-ui/react-native` package settings pages.
- Add a Trusted Publisher.
- Provider: GitHub Actions.
- Organization/user: `ohshinbhat`.
- Repository: `zeno-ui`.
- Workflow filename: `publish.yml`.
- Allowed action: `npm publish`.

Publish from GitHub:

```bash
git tag v0.1.0
git push origin v0.1.0
```

You can also run the `Publish Packages` workflow manually from GitHub Actions. The release script publishes only `@zeno-ui/react` and `@zeno-ui/react-native`, and skips package versions that are already on npm, so rerunning after a partial publish is safe.

Both public packages are scoped as `@zeno-ui/*` and have `publishConfig.access` set to `public`.

Local publishing is intentionally a fallback. If you publish locally, use an npm granular access token configured for package publish with the required 2FA policy, then run `yarn publish:packages:built`. Do not commit tokens or `.npmrc` auth lines.

## Component Packages

React web apps use `@zeno-ui/react`:

```tsx
import { Button, Card, Stack, Text, ZenoThemeProvider } from "@zeno-ui/react";
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

That project should consume `packages/react` and `packages/react-native` directly through local file dependencies when developing across repos.
