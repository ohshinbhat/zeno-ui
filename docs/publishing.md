# Publishing Zeno UI Packages

Zeno UI publishes multiple npm workspaces under the `@zeno-ui/*` scope.

## Recommended Path

Use npm Trusted Publishing from GitHub Actions. This is the preferred path because npm uses short-lived OIDC credentials from the workflow instead of a long-lived token or local OTP prompts. npm also generates provenance attestations automatically for public packages published with trusted publishing from a public repository.

## One-Time npm Setup

For each published package, configure a Trusted Publisher on npmjs.com:

- Package: each `@zeno-ui/*` package.
- Publisher: GitHub Actions.
- Organization/user: `ohshinbhat`.
- Repository: `zeno-ui`.
- Workflow filename: `publish.yml`.
- Allowed action: `npm publish`.

Current package list:

- `@zeno-ui/tokens`
- `@zeno-ui/animations`
- `@zeno-ui/theme-engine`
- `@zeno-ui/tailwind-preset`
- `@zeno-ui/nativewind-preset`
- `@zeno-ui/theme-runtime`
- `@zeno-ui/react`
- `@zeno-ui/react-native`

If npm does not allow Trusted Publisher setup before the first publish, do the first publish with a short-lived granular npm token that has publish access and satisfies the package 2FA policy. After the first publish succeeds, configure Trusted Publisher for every package and revoke the temporary token.

## Release From GitHub

Run the local release check first:

```bash
yarn release:check
```

Push a release tag:

```bash
git tag v0.1.0
git push origin v0.1.0
```

The `Publish Packages` workflow will:

1. Install dependencies.
2. Typecheck every package.
3. Build every package.
4. Run npm pack dry-run for every package.
5. Publish packages in dependency order.

You can also start the workflow manually in GitHub Actions and choose the npm dist-tag, usually `latest`.

## Reruns And Partial Publishes

The release script checks npm before publishing each package. If a package version is already published, it skips that package and continues. This makes reruns safe after a partial publish.

## Local Emergency Fallback

Local publishing is intentionally not the default. If you must publish locally:

1. Build and verify:

   ```bash
   yarn release:check
   ```

2. Authenticate with an npm granular token that is allowed to publish under the account/package 2FA policy.

3. Run the low-level publish command:

   ```bash
   yarn publish:packages:built
   ```

Do not commit npm auth tokens or `.npmrc` auth lines.
