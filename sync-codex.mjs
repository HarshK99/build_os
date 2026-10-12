// Gives Codex a copy of the shared instructions. Codex cannot pull in another file by
// reference the way Claude Code can, so its instruction file is rewritten from the source.
// Run after changing HOW_I_WORK.md: node sync-codex.mjs
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const source = join(root, "HOW_I_WORK.md");
const target = join(homedir(), ".codex", "AGENTS.md");
const COPY_NOTE = "This file is a copy.";
const today = new Date().toISOString().slice(0, 10);

if (!existsSync(dirname(target))) {
  console.log("Codex is not set up on this machine (no ~/.codex folder). Nothing to do.");
  process.exit(0);
}

// A hand-written file is saved before the first overwrite.
if (existsSync(target) && !readFileSync(target, "utf8").startsWith(COPY_NOTE)) {
  const backup = `${target}.backup-${today}`;
  copyFileSync(target, backup);
  console.log(`Saved the existing file as ${backup}`);
}

const header =
  `${COPY_NOTE} Source: ${source}, copied ${today}. ` +
  "Edit the source, then run `node sync-codex.mjs` in its folder. Changes made here are overwritten.\n\n";

writeFileSync(target, header + readFileSync(source, "utf8"));
console.log(`Wrote ${target} from ${source}`);
