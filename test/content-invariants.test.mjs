import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
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

test("obsolete manual-only workflow claims are blocked but valid delegation is allowed", async () => {
  const root = await mkdtemp(join(tmpdir(), "apex-microhack-invariants-"));
  const path = join(root, "site/src/content/docs/workflow.md");
  try {
    await mkdir(join(root, "site/src/content/docs"), { recursive: true });
    await writeFile(
      path,
      "Orchestrator does not autonomously execute the main-agent sequence.\n" +
        "You must manually select `10-Challenger` for each review.\n" +
        "It is a human-selected main reviewer, not an automatic helper.\n",
    );
    const obsolete = await runChecks(root);
    assert.match(obsolete.failures.join("\n"), /obsolete Orchestrator execution claim/);
    assert.match(obsolete.failures.join("\n"), /mandatory manual Challenger selection/);
    assert.match(obsolete.failures.join("\n"), /obsolete independent-review claim/);

    await writeFile(
      path,
      "Independent tasks can use parallel execution with disjoint writes.\n" +
        "The Accelerator may configure chat.customAgentInSubagent.enabled.\n" +
        "Keep 00-handoff.md for recovery and 05-iac-handoff.json for deployment.\n" +
        "The docs repository uses .vscode/mcp.json for Astro Docs.\n" +
        "10-Challenger is optional; deployment requires separate human approval.\n",
    );
    const current = await runChecks(root);
    assert.deepEqual(
      current.failures.filter((failure) => failure.includes("workflow.md")),
      [],
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("architecture guidance accepts the registered versioned pricing result", async () => {
  const text = await readFile(
    new URL("../site/src/content/docs/challenges/challenge-2-architecture.md", import.meta.url),
    "utf8",
  );
  assert.match(text, /02-cost-estimate\.json/);
  assert.match(text, /03-des-cost-estimate\.md/);
  assert.match(text, /\bCOMPLETE\b/);
  assert.match(text, /versioned result does not need a second alias/i);
});

test("diagnostics guidance keeps the card required and the native report optional", async () => {
  const text = await readFile(
    new URL("../site/src/content/docs/challenges/challenge-7-diagnostics.md", import.meta.url),
    "utf8",
  );
  assert.match(text, /07-diagnostics-quick-card\.md/);
  assert.match(text, /optional[^.]{0,200}08-resource-health-report\.md/i);
  assert.match(text, /does not replace the card/i);
});

test("challenge chain uses the current DR ADR and does not require an optional design output", async () => {
  const text = await readFile(
    new URL("../site/src/components/ChallengeChainTable.astro", import.meta.url),
    "utf8",
  );
  assert.match(text, /03-des-adr-NNNN-ha-dr-strategy\.md/);
  assert.doesNotMatch(text, /04-adr-ha-dr-strategy\.md/);
  assert.doesNotMatch(text, /03-des-architecture-diagram\.md/);
});

test("the quick reference keeps the rubric's deployed multi-region bonus", async () => {
  const [reference, rubric] = await Promise.all([
    readFile(
      new URL("../site/src/content/docs/guides/quick-reference-card.md", import.meta.url),
      "utf8",
    ),
    readFile(new URL("../facilitator/scoring-rubric.md", import.meta.url), "utf8"),
  ]);
  assert.match(reference, /\| Multi-Region DR \| \+10 \| Resources deployed in 2\+ regions \|/);
  assert.match(rubric, /\| Multi-Region DR\s+\| \+10\s+\| Resources in 2\+ regions\s+\|/);
});
