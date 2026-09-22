import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { runChecks } from "../scripts/check-content-invariants.mjs";

test("retired artifact in an Astro component is blocked", async () => {
  const root = await mkdtemp(join(tmpdir(), "apex-microhack-invariants-"));
  try {
    await mkdir(join(root, "site/src/components"), { recursive: true });
    await writeFile(
      join(root, "site/src/components/retired.astro"),
      "07-ab-operations-guide.md",
    );
    const result = await runChecks(root);
    assert.match(result.failures.join("\n"), /retired operations artifact name/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
