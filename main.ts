// Office joke entry: writes a single one-line joke about office life to
// $MAKEFUN_OUTPUT_DIR/entry.txt. Fully deterministic: one fixed string,
// no randomness, no time, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I put 'per my last email' in my out-of-office reply, so now even my vacation is passive-aggressive.";

// Gate: the entry must be 1-199 characters, a single line, not only whitespace.
// No trailing newline is written, so the file's character count is exactly the
// joke's length and the gate sees one clean line.
const chars = [...JOKE].length;
if (chars < 1 || chars > 199 || JOKE.trim().length === 0) {
  console.error(`entry must be 1-199 characters, got ${chars}`);
  process.exit(1);
}
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  console.error("entry must be a single line");
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
