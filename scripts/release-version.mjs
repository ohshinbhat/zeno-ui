import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const nextVersion = process.argv[2];

if (!nextVersion) {
  console.error("Usage: yarn release:version <version>");
  process.exit(1);
}

if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(nextVersion)) {
  console.error(`Invalid version: ${nextVersion}`);
  process.exit(1);
}

const files = [
  resolve(repoRoot, "package.json"),
  resolve(repoRoot, "packages/react/package.json"),
  resolve(repoRoot, "packages/react-native/package.json")
];

for (const file of files) {
  const source = await readFile(file, "utf8");
  const manifest = JSON.parse(source);
  manifest.version = nextVersion;
  await writeFile(file, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Updated ${file} -> ${nextVersion}`);
}

