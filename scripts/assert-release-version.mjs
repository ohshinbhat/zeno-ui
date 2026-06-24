import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const expectedVersion = process.argv[2] ?? process.env.RELEASE_VERSION;

if (!expectedVersion) {
  console.error("Expected version is required.");
  process.exit(1);
}

const files = [
  resolve(repoRoot, "package.json"),
  resolve(repoRoot, "packages/react/package.json"),
  resolve(repoRoot, "packages/react-native/package.json")
];

const mismatches = [];

for (const file of files) {
  const source = await readFile(file, "utf8");
  const manifest = JSON.parse(source);
  if (manifest.version !== expectedVersion) {
    mismatches.push(`${file}: expected ${expectedVersion}, found ${manifest.version}`);
  }
}

if (mismatches.length > 0) {
  console.error(mismatches.join("\n"));
  process.exit(1);
}

console.log(`Release version ${expectedVersion} matches all manifests.`);

