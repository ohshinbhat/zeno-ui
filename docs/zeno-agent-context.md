# Zeno Agent Context

This document is the operational context for Codex and other agents working on Zeno. It joins the cloud product loop with the package/runtime side so implementation stays aligned across `zeno-site`, `zeno-ui`, and Supabase.

## Product Shape

Zeno is an AI-powered component library and cloud theme system. It has three major parts:

- `zeno-site`: the web app and cloud control plane.
- `zeno-ui`: the component library and runtime package family.
- Supabase: auth, project ownership, drafts, published theme storage, and environment aliases.

The main product loop is:

1. A user signs in to Zeno Cloud.
2. The user generates, creates, or selects a theme in the playground.
3. The user publishes the theme to a project environment, usually `production`.
4. The publish creates an immutable token contract.
5. Consumer apps initialize with the Zeno UI provider.
6. The provider fetches the active token contract and applies colors, sizing, density, and motion.

The most important invariant is that consumer apps fetch deterministic theme JSON at runtime. They should not need authoring credentials or direct Supabase access.

## Product Promise

Generate or select a theme once, publish it to Zeno Cloud, and let every app using Zeno UI initialize from the active token contract.

Zeno should feel like AI-native design infrastructure, not just a theme picker.

Optimize for:

- Fast theme iteration.
- Deterministic published output.
- Stable component-library contracts.
- Runtime safety.
- Easy app initialization.
- Clear publish history.
- Minimal auth friction.

## Repository: `zeno-site`

`zeno-site` is the website, docs surface, authenticated playground, and backend API for cloud-hosted themes.

It provides:

- Public landing page.
- Public docs page.
- Email/password login and signup.
- Authenticated theme playground.
- Theme generation.
- Preset/theme selection.
- Draft saving.
- Project selection.
- Theme publishing.
- Publish history.
- Public runtime JSON/CSS endpoints.

### Route Map

Public routes:

```text
/                     Landing page
/docs                 Runtime/package docs
/login                Email/password auth
```

Authenticated routes:

```text
/app                  Theme playground and publish console
/app/details          Theme/token details
/app/publishes        Publish history
```

Authenticated API routes:

```http
POST /api/auth/login
POST /api/auth/signup
POST /api/auth/logout
GET  /api/auth/session

GET  /api/projects
POST /api/projects

POST /api/themes/generate
GET  /api/themes/drafts
POST /api/themes/drafts
POST /api/themes/publish
GET  /api/themes/history
POST /api/themes/validate
```

Public runtime API routes:

```http
GET /api/themes/:projectId/:environment.json
GET /api/themes/:projectId/:environment.css
GET /api/themes/:projectId/versions/:version.json
```

Runtime endpoints are intentionally public. Consumer apps should be able to fetch active themes without passing user auth into client runtime.

### Publish Behavior

Publishing must:

- Require an authenticated user.
- Validate the token config.
- Verify project membership.
- Allow only `owner` and `admin` roles to publish.
- Create a new immutable `theme_versions` row.
- Update `theme_aliases` for the selected environment.
- Return JSON, CSS, and version URLs.

Runtime responses should include:

- `Cache-Control`.
- `ETag`.
- `X-Zeno-Theme-Version`.
- Permissive CORS headers.

Do not reintroduce manual admin-token publishing. Publishing is session based and project-access based.

## Repository: `zeno-ui`

`zeno-ui` is the UI library and npm package family. It is consumed by external apps and also used by `zeno-site`.

The package family includes:

- React primitives.
- React Native primitives and NativeWind-compatible output.
- Token schema and validation.
- Theme generation.
- Tailwind/runtime CSS generation.
- Runtime theme provider.
- Token-driven animation helpers.

The library currently has a small React component set. It should grow around stable primitives that consume the same semantic token contract across React web and React Native.

## Package Responsibilities

Keep the `@zeno-ui/*` package names stable.

| Package | Responsibility | Runtime role |
| --- | --- | --- |
| `@zeno-ui/tokens` | Token schema, presets, validation, color utilities | Defines and validates the published JSON contract |
| `@zeno-ui/theme-engine` | Deterministic prompt-to-theme generation | Used by cloud generation and local tooling, not required in consumer runtime |
| `@zeno-ui/tailwind-preset` | Runtime CSS and Tailwind token output | Converts tokens to CSS variables and Tailwind-compatible theme output |
| `@zeno-ui/nativewind-preset` | React Native / NativeWind token output | Converts the same semantic tokens for NativeWind/Expo usage |
| `@zeno-ui/theme-runtime` | Provider, hosted-theme loader, cache, pre-hydration script | Fetches active themes and exposes runtime state to apps |
| `@zeno-ui/react` | React web primitives | Current web component package |
| `@zeno-ui/react-native` | React Native primitives and native provider | Consumes the same token config as concrete React Native styles |
| `@zeno-ui/animations` | Token-driven animation helpers | Generates animation CSS and reusable motion utilities |

Planned package direction:

- Prefer a universal Tamagui-backed UI layer for React web and React Native.
- Keep Zeno as the public API and product layer.
- Use Tamagui as a dependency/wrapper target, not copied source.
- Keep runtime theme freshness in Zeno token JSON and provider context; do not fetch or execute remote Tailwind config code.
- Add `@zeno-ui/tamagui-config` or equivalent when Tamagui integration starts.
- Consider `@zeno-ui/ui` as the future universal package name if `@zeno-ui/react` becomes too web-specific.

## Component Contract

Components should:

- Consume semantic tokens, not hardcoded brand styles.
- Read runtime state through `ZenoProvider` / `useZenoTheme`.
- Keep props stable across web and native where possible.
- Prefer app-agnostic primitives over product-specific UI.
- Avoid importing `zeno-site` or backend code.
- Support deterministic visual output from the published token contract.

Current shared component surface:

- Layout and text: `Stack`, `Text`.
- Actions and display: `Button`, `Badge`, `Card`.
- Forms: `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`.
- Utility: `Separator`.

React Native direction:

- Keep the public React Native surface aligned with the React web package.
- Map Zeno prop names like `tone`, `variant`, and `size` to concrete native styles internally.
- Use the same `ZenoTokenConfig` contract for colors, spacing, radius, size, typography, shadow, and motion.
- For native, pass concrete JS style values to RN props where CSS variables are unavailable.
- For web, keep runtime CSS variables available for Tailwind-style surfaces and pre-hydration theme application.

## Runtime Behavior

Consumer apps should wrap their app root in `ZenoProvider` or `ZenoThemeProvider`.

At initialization, the provider should:

1. Resolve a theme source.
2. Fetch the active published token JSON from Zeno Cloud.
3. Validate the token contract.
4. Apply the token contract to the component system.
5. Expose config, status, version, assets, and reload through context.
6. Fall back to cached/local tokens only according to the selected runtime policy.
7. Avoid visible theme/layout shift where possible.

The runtime source shape should support:

```ts
export const zenoThemeSource = {
  type: "zeno",
  projectId: "your-project-id",
  environment: "production",
  baseUrl: "https://your-zeno-site.vercel.app"
} as const;
```

For web apps, pre-hydration theme application matters. Use `createZenoThemeScript()` in the app shell when possible.

Next.js example:

```tsx
import { createZenoThemeScript, ZenoThemeProvider } from "@zeno-ui/theme-runtime";

const source = {
  type: "zeno",
  projectId: "your-project-id",
  environment: "production",
  baseUrl: "https://your-zeno-site.vercel.app"
} as const;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: createZenoThemeScript({ source })
          }}
        />
      </head>
      <body>
        <ZenoThemeProvider source={source}>
          {children}
        </ZenoThemeProvider>
      </body>
    </html>
  );
}
```

Runtime safety rules:

- The provider fetches JSON, not executable JavaScript.
- The endpoint returns a validated `ZenoTokenConfig`.
- Consumer apps do not require user auth.
- Consumer apps do not use Supabase credentials.
- The package runtime can call public runtime endpoints, but it should not import backend code.
- The website can use the package runtime for preview, but it should not own package implementation.

## Token Contract

The published token JSON is the source of truth for the component library.

Consumer apps should treat this JSON as read-only runtime configuration.

```ts
type ZenoTokenConfig = {
  schemaVersion: "1.0.0";
  metadata: {
    name: string;
    projectId?: string;
    environment?: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  tokens: {
    name: string;
    id: string;
    seed: string;
    knobs: {
      brand: string;
      accent: string;
      trend: string;
      weather: string;
      density: string;
      type: string;
      elevation: string;
      border: string;
      motion: string;
      texture: string;
      contrast: string;
      mode: string;
      mood: string;
    };
    color: Record<string, string>;
    radius: Record<string, string>;
    spacing: Record<string, string>;
    type: Record<string, string>;
    size: Record<string, string>;
    shadow: Record<string, string>;
    motion: Record<string, string>;
    blur: {
      glass: string;
    };
    opacity: {
      glass: string;
      disabled: string;
    };
  };
  assets: Record<string, {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    hash?: string;
  }>;
  modes: Record<string, Partial<ZenoTokenConfig["tokens"]>>;
  publishedVersion?: string;
  validation: {
    valid: boolean;
    issues: string[];
    score: {
      contrast: number;
      consistency: number;
      accessibility: number;
    };
  };
};
```

## Supabase

Supabase is the backend for auth and durable cloud theme storage.

It owns:

- User authentication.
- Projects.
- Project memberships.
- Theme drafts.
- Immutable published versions.
- Environment aliases pointing to active versions.

Do not expose Supabase service-role keys to the browser.

Consumer apps should not fetch directly from Supabase. They should fetch from Zeno runtime endpoints served by `zeno-site`.

Recommended tables:

- `projects`.
- `project_members`.
- `theme_drafts`.
- `theme_versions`.
- `theme_aliases`.

Roles:

- `owner`: full project access and publishing.
- `admin`: publishing access.
- `member`: read/draft access, no publishing.

Published version rules:

- `theme_versions` rows are immutable.
- `theme_aliases` points an environment to one active version.
- Only move aliases after publish succeeds.
- Runtime fetches by project/environment alias, not by authenticated user session.

## npm Package Readiness

The `zeno-ui` root package is private. Publish only workspace packages under `packages/*`.

Before publishing:

```bash
yarn install
yarn typecheck
yarn pack:packages
```

Publish in dependency order:

```bash
yarn publish:packages
```

Package invariants:

- Keep package names scoped as `@zeno-ui/*`.
- Keep `publishConfig.access` public for scoped packages.
- Keep `files` narrow: `dist`, `src`, package README, and package-specific runtime assets.
- Do not publish root workspace internals.
- Keep `dist` generated by `tsc` before packing/publishing.
- Prefer npm trusted publishing/provenance for official releases.
- Add a root MIT license before official public npm release if the project is intended to be open source.

Current local verification commands:

```bash
yarn typecheck
yarn build:packages
yarn pack:packages
```

Future test fixtures should include:

- A React/Vite fixture that installs packed `@zeno-ui/react` or the future universal UI package.
- An Expo/Tamagui fixture that validates React Native component usage.
- A runtime fixture that mocks public `.json` and `.css` theme endpoints.
- A packed-tarball install test so package exports are validated outside workspace symlinks.

## Deployment Notes

`zeno-site` must be deployable from its own repository. It should not depend on a sibling `../zeno-ui` checkout in Vercel.

The site may vendor or workspace-link the Zeno packages inside the repo for deployment, but the external package names should remain `@zeno-ui/*`.

Required environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Optional Zeno-specific aliases:

```bash
ZENO_SUPABASE_URL=
ZENO_SUPABASE_ANON_KEY=
ZENO_SUPABASE_SERVICE_ROLE_KEY=
```

Never commit `.env.local`.

## Implementation Rules For Agents

When working on `zeno-site`:

- Keep `/` public.
- Keep `/docs` public.
- Keep `/app`, `/app/details`, and `/app/publishes` protected.
- Keep runtime JSON/CSS endpoints public.
- Do not require user auth in consumer apps.
- Do not expose service-role keys.
- Do not reintroduce manual admin-token publishing.
- Production storage should use Supabase as the durable source.
- In-memory storage is local fallback only.
- Preserve the `@zeno-ui/*` package contract.

When working on `zeno-ui`:

- Keep token output deterministic.
- Keep component primitives app-agnostic.
- Components should read from provider/theme context.
- Provider should fetch cloud theme on initialization.
- Provider should support cached/local fallback according to explicit runtime policy.
- Web should support pre-hydration CSS to avoid visible theme shift.
- React and React Native outputs should consume the same semantic token contract.
- Do not fetch or execute raw remote Tailwind config in consumer runtime.
- Prefer Tamagui wrapping/configuration over copying Tamagui source.
- Keep package exports stable and verify with packed package checks.

When working on Supabase:

- Use RLS for user-owned project data.
- Public runtime endpoints should be served by `zeno-site`, not direct anonymous Supabase table reads.
- Keep service-role access server-side only.
- Keep published versions immutable.
- Only move aliases after publish succeeds.
- Enforce membership checks before draft writes and publishes.
