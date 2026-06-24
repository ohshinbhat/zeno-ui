#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const registry = "https://registry.npmjs.org/";
const npm = ["npm", "--cache", ".npm-cache"];
const packages = [
  "./packages/react",
  "./packages/react-native"
];

const args = new Set(process.argv.slice(2));
const mode = args.has("--publish") ? "publish" : args.has("--pack") ? "pack" : "";
const tag = process.env.NPM_TAG || "latest";

if (!mode) {
  console.error("Usage: node scripts/release-packages.mjs --pack|--publish");
  process.exit(1);
}

function run(command, commandArgs, options = {}) {
  const result = spawnSync(command, commandArgs, {
    cwd: process.cwd(),
    env: process.env,
    encoding: "utf8",
    stdio: options.capture ? "pipe" : "inherit"
  });

  if (options.capture) return result;

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  return result;
}

function readPackage(packageDir) {
  return JSON.parse(readFileSync(join(packageDir, "package.json"), "utf8"));
}

function isNotFound(result) {
  const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
  return result.status !== 0 && (output.includes("E404") || output.includes("404 Not Found"));
}

function packageVersionExists(packageJson) {
  const result = run(
    npm[0],
    [...npm.slice(1), "view", `${packageJson.name}@${packageJson.version}`, "version", "--registry", registry],
    { capture: true }
  );

  if (result.status === 0) return true;
  if (isNotFound(result)) return false;

  process.stdout.write(result.stdout ?? "");
  process.stderr.write(result.stderr ?? "");
  process.exit(result.status ?? 1);
}

for (const packageDir of packages) {
  const packageJson = readPackage(packageDir);

  if (mode === "pack") {
    run(npm[0], [...npm.slice(1), "pack", "--dry-run", packageDir, "--registry", registry]);
    continue;
  }

  if (packageVersionExists(packageJson)) {
    console.log(`Skipping ${packageJson.name}@${packageJson.version}; it is already published.`);
    continue;
  }

  run(npm[0], [
    ...npm.slice(1),
    "publish",
    packageDir,
    "--access",
    "public",
    "--tag",
    tag,
    "--registry",
    registry
  ]);
}
