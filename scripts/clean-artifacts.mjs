import { rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const artifactsDir = resolve(repoRoot, "artifacts");

await rm(artifactsDir, { recursive: true, force: true });

