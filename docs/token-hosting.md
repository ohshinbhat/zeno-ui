# Zeno Hosted Token Configs

Zeno can run as a hosted theme control plane: the website console generates and previews a token config, publishes an immutable version, and customer apps fetch the active environment config at launch.

## Architecture

- `@zeno-ui/tokens` owns the versioned `ZenoTokenConfig` contract.
- `@zeno-ui/theme-runtime` owns launch-time loading, fallback tokens, caching, and CSS application.
- `/Users/ohshinbhat/Desktop/zeno-site/app/api/themes/*` currently exposes generation, validation, publish, active JSON/CSS, and immutable version endpoints.
- Supabase is the recommended v1 persistence layer. Local development falls back to an in-memory store when Supabase env vars are not set.

## Supabase Setup

Set these env vars on the deployed website/console:

```bash
ZENO_SUPABASE_URL=https://your-project.supabase.co
ZENO_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ZENO_ADMIN_TOKEN=temporary-publish-secret
```

Create the v1 tables:

```sql
create table if not exists projects (
  id text primary key,
  slug text unique not null,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists theme_versions (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  version text not null,
  hash text not null,
  config_json jsonb not null,
  css text not null,
  status text not null default 'published',
  created_at timestamptz not null default now(),
  unique(project_id, version)
);

create table if not exists theme_aliases (
  project_id text not null references projects(id) on delete cascade,
  environment text not null,
  active_version_id text not null references theme_versions(id),
  updated_at timestamptz not null default now(),
  primary key(project_id, environment)
);

create table if not exists assets (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  key text not null,
  url text not null,
  hash text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
```

## Publish Flow

1. Open the website console.
2. Generate a theme from prompt, knobs, colors, and assets.
3. Preview the exact config through `ZenoThemeProvider`.
4. Enter `Project ID`, `Environment`, and the admin token.
5. Click `Publish theme`.
6. Use the returned JSON/CSS/version URLs in the customer app or docs.

Publish endpoint:

```http
POST /api/themes/publish
x-zeno-admin-token: $ZENO_ADMIN_TOKEN
content-type: application/json
```

```json
{
  "projectId": "acme",
  "environment": "production",
  "config": {
    "schemaVersion": "1.0.0",
    "metadata": { "name": "Acme Theme" },
    "tokens": {}
  }
}
```

## Public Read Endpoints

These are intentionally public so customer apps can fetch themes on launch:

```http
GET /api/themes/acme/production.json
GET /api/themes/acme/production.css
GET /api/themes/acme/versions/acme-production-20260603123000-a1b2c3d4.json
GET /api/themes/acme/versions/acme-production-20260603123000-a1b2c3d4.css
```

The JSON endpoint returns a validated `ZenoTokenConfig`. The CSS endpoint returns runtime CSS for direct stylesheet linking or inspection.

## Customer App Quickstart

Wrap the app once:

```tsx
import { ZenoThemeProvider, defaultZenoThemeConfig } from "@zeno-ui/theme-runtime";
import "@zeno-ui/theme-runtime/styles.css";

export function App() {
  return (
    <ZenoThemeProvider
      source={{
        type: "zeno",
        projectId: "acme",
        environment: "production",
        baseUrl: "https://zeno-ui.example.com"
      }}
      fallbackConfig={defaultZenoThemeConfig}
    >
      <YourApp />
    </ZenoThemeProvider>
  );
}
```

The provider renders fallback tokens immediately, fetches hosted tokens after mount, validates before applying, stores the last valid config in `localStorage`, and falls back to cache or defaults if the network fails.

## Editable Fallback Config

Customers can keep an editable fallback in their repo:

```ts
// zeno-theme.config.ts
import { defaultZenoThemeConfig } from "@zeno-ui/theme-runtime";

export default {
  ...defaultZenoThemeConfig,
  tokens: {
    ...defaultZenoThemeConfig.tokens,
    color: {
      ...defaultZenoThemeConfig.tokens.color,
      brand: "#2563eb",
      accent: "#14b8a6"
    }
  }
};
```

Then pass that config as `fallbackConfig`.

## Customer-Hosted Endpoint

Customers who do not want Zeno-hosted reads can serve their own JSON:

```tsx
<ZenoThemeProvider
  source={{ type: "url", url: "https://app.example.com/zeno/theme.json" }}
  fallbackConfig={localFallbackConfig}
>
  <YourApp />
</ZenoThemeProvider>
```

The endpoint must return a `ZenoTokenConfig` with `schemaVersion: "1.0.0"`.

## Asset Tokens

The v1 asset whitelist is:

- `logo`
- `logoDark`
- `favicon`
- `appIcon`
- `emptyState`
- `heroImage`

Each asset accepts:

```ts
{
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  hash?: string;
}
```

URLs must be `https://`, `http://`, or root-relative (`/assets/logo.svg`). Runtime never executes token-provided code.

## Rollback

Every publish creates an immutable version. Rollback is an alias update: set `theme_aliases.active_version_id` back to an earlier `theme_versions.id`. The customer app keeps fetching the same environment URL.

## Auth Later

V1 has public read endpoints and a guarded publish endpoint. Later auth can add Supabase Auth, org/project roles, audit logs, and publish approvals without changing the provider API.
