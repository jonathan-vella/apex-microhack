import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { checkLinks } from "../scripts/check-internal-links.mjs";

test("built root links and fragments resolve", async () => {
  const dist = await mkdtemp(join(tmpdir(), "apex-microhack-links-"));
  try {
    await mkdir(join(dist, "getting-started"), { recursive: true });
    await writeFile(
      join(dist, "index.html"),
      '<a href="/getting-started/">Start</a><a href="/getting-started/#setup">Setup</a>',
    );
    await writeFile(join(dist, "getting-started", "index.html"), '<h1 id="setup">Setup</h1>');
    assert.deepEqual(await checkLinks(dist), []);
  } finally {
    await rm(dist, { recursive: true, force: true });
  }
});
