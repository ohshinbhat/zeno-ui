#!/usr/bin/env node

console.error(`
Use GitHub Actions trusted publishing for npm releases:

  1. Configure @zeno-ui/react and @zeno-ui/react-native on npmjs.com with a Trusted Publisher.
  2. Push a release tag such as v0.1.0, or run the "Publish Packages" workflow manually.

The low-level command "yarn publish:packages:built" is intended for CI/OIDC or an emergency
publish with an npm granular token that is allowed to publish under the package 2FA policy.
`);

process.exit(1);
