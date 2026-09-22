import { readFile, readdir } from "node:fs/promises";
import { extname, join, normalize, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const defaultDist = fileURLToPath(new URL("../site/dist", import.meta.url));

async function collectHtml(path) {
  const entries = await readdir(path, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(path, entry.name);
    if (entry.isDirectory()) files.push(...(await collectHtml(fullPath)));
    else if (extname(entry.name) === ".html") files.push(fullPath);
  }
  return files;
}

async function collectFiles(path) {
  const entries = await readdir(path, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(path, entry.name);
    if (entry.isDirectory()) files.push(...(await collectFiles(fullPath)));
    else files.push(fullPath);
  }
  return files;
}

function targetFile(dist, pathname) {
  const clean = decodeURIComponent(pathname.split("?")[0]);
  const relativePath = clean.replace(/^\/+/, "");
  if (relativePath === "") return join(dist, "index.html");
  if (extname(relativePath)) return join(dist, relativePath);
  if (relativePath.endsWith(".html")) return join(dist, relativePath);
  if (relativePath.endsWith("/")) return join(dist, relativePath, "index.html");
  return join(dist, relativePath, "index.html");
}

function fragments(html) {
  return new Set([
    ...[...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => match[1]),
    ...[...html.matchAll(/\bname=["']([^"']+)["']/gi)].map((match) => match[1]),
  ]);
}

export async function checkLinks(dist = defaultDist) {
  const files = await collectHtml(dist);
  const known = new Set(
    (await collectFiles(dist)).map((file) => normalize(resolve(file))),
  );
  const failures = [];

  for (const file of files) {
    const html = await readFile(file, "utf8");
    for (const match of html.matchAll(/\bhref=["']([^"']+)["']/gi)) {
      const href = match[1];
      if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(href)) continue;
      const [rawTarget, fragment] = href.split("#", 2);
      const pathname = rawTarget || "/";
      const sourceRoute = `/${relative(dist, file).replaceAll("\\", "/")}`;
      const resolvedPath = pathname.startsWith("/")
        ? pathname
        : new URL(pathname, `https://internal.test${sourceRoute}`).pathname;
      const destination = targetFile(dist, resolvedPath);
      const normalized = normalize(destination);
      if (!known.has(normalized)) {
        failures.push(`${relative(dist, file)} -> ${href}: target does not exist`);
        continue;
      }
      if (fragment) {
        const targetHtml = await readFile(normalized, "utf8");
        if (!fragments(targetHtml).has(decodeURIComponent(fragment))) {
          failures.push(`${relative(dist, file)} -> ${href}: fragment does not exist`);
        }
      }
    }
  }
  return failures;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const failures = await checkLinks(process.argv[2] ? resolve(process.argv[2]) : defaultDist);
  if (failures.length) {
    console.error("Internal link checks failed:");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exitCode = 1;
  } else {
    console.log(`Internal link checks passed: ${await collectHtml(process.argv[2] ? resolve(process.argv[2]) : defaultDist).then((files) => files.length)} HTML files.`);
  }
}
