# Zeno UI

Lean, publishable Zeno UI packages for React web and React Native.

GitHub: [ohshinbhat/zeno-ui](https://github.com/ohshinbhat/zeno-ui)
Releases: [github.com/ohshinbhat/zeno-ui/releases](https://github.com/ohshinbhat/zeno-ui/releases)
Actions: [github.com/ohshinbhat/zeno-ui/actions](https://github.com/ohshinbhat/zeno-ui/actions)

## Packages

- [`@zenoui/react`](https://www.npmjs.com/package/@zenoui/react): web primitives, hosted theme provider, and pre-hydration theme script support.
- [`@zenoui/react-native`](https://www.npmjs.com/package/@zenoui/react-native): native primitives and hosted theme provider for React Native apps.

## Install

```bash
npm install @zenoui/react
```

```bash
npm install @zenoui/react-native
```

## Component Surface

Both packages expose the same five high-leverage primitives:

- `Stack`
- `Text`
- `Button`
- `Input`
- `Card`

## Verification

```bash
yarn install
yarn typecheck
yarn build:packages
yarn pack:packages
```

## Release Flow

1. Bump both publishable packages to one shared version:

```bash
yarn release:version 0.1.1
```

2. Verify the release artifacts locally:

```bash
yarn release:check
```

3. Commit the version bump and create a Git tag:

```bash
git add .
git commit -m "Release v0.1.1"
git tag v0.1.1
git push origin main --tags
```

4. GitHub Actions publishes both packages from the `v*` tag through the publish workflow in `.github/workflows/publish.yml`.

If you prefer a manual GitHub publish, run the `Publish Packages` workflow from the Actions tab and pass the exact version. The workflow now applies that version inside CI before it builds and publishes.

For tag-based releases, commit and push the version bump first so the tag points at manifests with the same version:

```bash
yarn release:version 1.0.0
git add .
git commit -m "Release v1.0.0"
git tag v1.0.0
git push origin main --tags
```

## Trusted Publishing

The publish workflow is set up for npm trusted publishing with GitHub Actions OIDC. In npm, connect this repository to each package:

- `@zenoui/react`
- `@zenoui/react-native`

After that, CI can publish without storing an npm token in GitHub secrets.
