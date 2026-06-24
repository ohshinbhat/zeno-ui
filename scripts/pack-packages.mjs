import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const artifactsDir = resolve(repoRoot, "artifacts");

const packages = [
  {
    dir: resolve(repoRoot, "packages/react"),
    file: resolve(artifactsDir, "zenoui-react.tgz")
  },
  {
    dir: resolve(repoRoot, "packages/react-native"),
    file: resolve(artifactsDir, "zenoui-react-native.tgz")
  }
];

await mkdir(artifactsDir, { recursive: true });

for (const entry of packages) {
  execFileSync("yarn", ["pack", "--filename", entry.file], {
    cwd: entry.dir,
    stdio: "inherit"
  });
}
