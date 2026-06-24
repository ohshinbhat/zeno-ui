import { access } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { constants } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const artifactsDir = resolve(repoRoot, "artifacts");
const npmCacheDir = resolve(repoRoot, ".npm-cache");
const npmRegistryUrl = "https://registry.npmjs.org/";
const npmTag = process.env.NPM_TAG ?? "latest";
const dryRun = process.argv.includes("--dry-run") || process.env.DRY_RUN === "1";
const useProvenance = process.env.GITHUB_ACTIONS === "true";

const tarballs = [
  resolve(artifactsDir, "zenoui-react.tgz"),
  resolve(artifactsDir, "zenoui-react-native.tgz")
];

for (const tarball of tarballs) {
  await access(tarball, constants.R_OK);

  const args = [
    "publish",
    tarball,
    "--access",
    "public",
    "--tag",
    npmTag,
    "--registry",
    npmRegistryUrl
  ];

  if (dryRun) {
    args.push("--dry-run");
  }

  if (useProvenance) {
    args.push("--provenance");
  }

  execFileSync("npm", args, {
    cwd: repoRoot,
    stdio: "inherit",
    env: {
      ...process.env,
      npm_config_cache: npmCacheDir,
      NPM_CONFIG_CACHE: npmCacheDir,
      npm_config_registry: npmRegistryUrl,
      NPM_CONFIG_REGISTRY: npmRegistryUrl
    }
  });
}
