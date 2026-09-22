import { access, readFile, readdir } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const defaultRoot = fileURLToPath(new URL("..", import.meta.url));
const textExtensions = new Set([".astro", ".md", ".mdx", ".yml", ".yaml"]);
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

async function collectFiles(path) {
  let entries;
  try {
    entries = await readdir(path, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
  const files = [];

  for (const entry of entries) {
    if (entry.name === "tmp") continue;
    const fullPath = join(path, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath)));
    } else if (textExtensions.has(extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

export async function runChecks(root = defaultRoot) {
  const includedRoots = [
    ".github/ISSUE_TEMPLATE",
    "facilitator",
    "site/src/content/docs",
    "site/src/components",
  ];
  const includedFiles = ["README.md", "CONTRIBUTING.md", "AGENTS.md"];
  const files = [
    ...(await Promise.all(
      includedRoots.map((path) => collectFiles(join(root, path))),
    )).flat(),
    ...(await Promise.all(
      includedFiles.map(async (path) => {
        const fullPath = join(root, path);
        try {
          await access(fullPath);
          return fullPath;
        } catch (error) {
          if (error.code === "ENOENT") return null;
          throw error;
        }
      }),
    )).filter(Boolean),
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
    {
      pattern: /Node\.js?\s*\+?\s*npm\s*[|:]?\s*22\.x|Node\s+22\.x/gi,
      message: "retired Node 22 environment claim",
    },
    {
      pattern: /parallel execution|autonomous pipeline/gi,
      message: "misleading autonomous or parallel workflow language",
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

  let totalMinutes = 0;
  let totalPoints = 0;
  for (const [index, [fileName, minutes, points]] of challengeContract.entries()) {
    const path = join(root, "site/src/content/docs/challenges", fileName);
    let text;
    try {
      text = await readFile(path, "utf8");
    } catch {
      failures.push(
        `site/src/content/docs/challenges/${fileName}: required challenge file is missing`,
      );
      continue;
    }

    const infoPattern = new RegExp(
      `\\*\\*${minutes}\\s+min\\*\\*[\\s\\S]*?\\*\\*${points}\\s+pts\\*\\*`,
    );
    if (!infoPattern.test(text)) {
      failures.push(
        `site/src/content/docs/challenges/${fileName}: expected ${minutes} min and ${points} pts`,
      );
    }

    totalMinutes += minutes;
    totalPoints += points;
  }

  if (challengeContract.length !== 8) {
    failures.push(`challenge contract: expected 8 challenges, found ${challengeContract.length}`);
  }
  if (totalMinutes !== 260) {
    failures.push(`challenge contract: expected 260 total minutes, found ${totalMinutes}`);
  }
  if (totalPoints !== 105) {
    failures.push(`challenge contract: expected 105 base points, found ${totalPoints}`);
  }

  return { failures, totalMinutes, totalPoints };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { failures, totalMinutes, totalPoints } = await runChecks();
  if (failures.length > 0) {
    console.error("Content invariant checks failed:");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exitCode = 1;
  } else {
    console.log(
      `Content invariants passed: 8 challenges, ${totalMinutes} minutes, ${totalPoints} base points.`,
    );
  }
}
