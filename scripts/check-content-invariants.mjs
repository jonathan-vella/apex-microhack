import { readFile, readdir } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const includedRoots = [".github/ISSUE_TEMPLATE", "facilitator", "site/src/content/docs"];
const includedFiles = ["README.md", "CONTRIBUTING.md", "AGENTS.md"];
const textExtensions = new Set([".md", ".mdx", ".yml", ".yaml"]);

async function collectFiles(path) {
  const entries = await readdir(path, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(path, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath)));
    } else if (textExtensions.has(extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

const files = [
  ...(await Promise.all(includedRoots.map((path) => collectFiles(join(root, path))))).flat(),
  ...includedFiles.map((path) => join(root, path)),
];

const retiredPatterns = [
  {
    pattern: /azure-agentic-infraops-accelerator/gi,
    message: "retired Accelerator repository name",
  },
  {
    pattern: /jonathan-vella\.github\.io\/azure-agentic-infraops/gi,
    message: "retired documentation URL",
  },
  {
    pattern: /07-ab-operations-guide\.md/gi,
    message: "retired operations artifact name",
  },
  {
    pattern: /customAgentInSubagent\.enabled/gi,
    message: "retired custom-agent setting",
  },
  {
    pattern: /other SKUs do not include the required functionality/gi,
    message: "unsupported Copilot entitlement claim",
  },
];

const failures = [];

for (const file of files) {
  const text = await readFile(file, "utf8");
  const displayPath = relative(root, file);

  for (const { pattern, message } of retiredPatterns) {
    for (const match of text.matchAll(pattern)) {
      const line = text.slice(0, match.index).split(/\r?\n/).length;
      failures.push(`${displayPath}:${line}: ${message}`);
    }
  }
}

const challengeContract = [
  ["challenge-1-requirements.md", 30, 20],
  ["challenge-2-architecture.md", 30, 25],
  ["challenge-3-implementation.mdx", 45, 25],
  ["challenge-4-dr-curveball.md", 45, 10],
  ["challenge-5-load-testing.md", 30, 5],
  ["challenge-6-documentation.md", 15, 5],
  ["challenge-7-diagnostics.md", 5, 5],
  ["challenge-8-partner-showcase.md", 60, 10],
];

let totalMinutes = 0;
let totalPoints = 0;

for (const [fileName, minutes, points] of challengeContract) {
  const path = join(root, "site/src/content/docs/challenges", fileName);
  const text = await readFile(path, "utf8");
  const infoPattern = new RegExp(`\\*\\*${minutes} min\\*\\*[\\s\\S]*?\\*\\*${points} pts\\*\\*`);

  if (!infoPattern.test(text)) {
    failures.push(
      `site/src/content/docs/challenges/${fileName}: expected ${minutes} min and ${points} pts`,
    );
  }

  totalMinutes += minutes;
  totalPoints += points;
}

if (totalMinutes !== 260) {
  failures.push(`challenge contract: expected 260 total minutes, found ${totalMinutes}`);
}

if (totalPoints !== 105) {
  failures.push(`challenge contract: expected 105 base points, found ${totalPoints}`);
}

if (failures.length > 0) {
  console.error("Content invariant checks failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log(
    `Content invariants passed: ${challengeContract.length} challenges, ${totalMinutes} minutes, ${totalPoints} base points.`,
  );
}
