#!/usr/bin/env node
/**
 * Build-time sitemap for indexable public pages.
 *
 * Writes public/sitemap.xml. Static pages use the canonical href their route
 * declares. Data-driven pages use the same trailing-slash style as that
 * section's index canonical, and only ids the route would render (not
 * notFound, not a redirect, not noindex, not a legacy slug alias).
 *
 * lastmod is the git commit date of the route file (static pages) or the data
 * file that defines the item (dynamic pages). If git is missing, the file was
 * never committed, or the date cannot be read, lastmod is the build date
 * (UTC, YYYY-MM-DD).
 *
 *   node scripts/generate-sitemap.mjs
 *
 * Also runs from the Vite `buildStart` plugin (scripts/sitemap-plugin.mjs) and
 * from the `build` / `build:dev` npm scripts.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";
import { isMainModule, projectRoot } from "./with-app-env.mjs";

const ROUTES_DIR = "src/routes";
const SITEMAP_REL = "public/sitemap.xml";

const GROUP_ORDER = [
  "home",
  "observatory",
  "jurisdiction",
  "literature",
  "codebook",
  "codebook-category",
  "codebook-tactic",
  "trainer",
  "static",
];

const DYNAMIC_HANDLERS = new Set([
  "src/routes/observatory/$id.tsx",
  "src/routes/codebook/$code.tsx",
  "src/routes/statute-map/$id.tsx",
]);

const DATA_FILES = {
  jurisdiction: "src/lib/data/jurisdictions.ts",
  code: "src/lib/data/codes.ts",
};

const ID_RE = /^[a-z0-9-]+$/;

export function utcDate(now = new Date()) {
  return now.toISOString().slice(0, 10);
}

export function isNoindex(robots) {
  if (robots == null || robots === "") return false;
  return String(robots)
    .split(/[\s,]+/)
    .some((token) => token.toLowerCase() === "noindex");
}

/**
 * Robots meta declared in a route source, or null when the file does not set
 * one. The last `name: "robots"` object wins, matching a single head() return.
 */
export function declaredRobots(source) {
  let found = null;
  for (const obj of source.matchAll(/\{[^{}]*\}/g)) {
    const body = obj[0];
    const name = body.match(/\bname:\s*["']([^"']+)["']/);
    if (!name || name[1] !== "robots") continue;
    const content = body.match(/\bcontent:\s*["']([^"']+)["']/);
    if (content) found = content[1];
  }
  return found;
}

/** Canonical href declared in a route source, or null. */
export function declaredCanonical(source) {
  let found = null;
  for (const obj of source.matchAll(/\{[^{}]*\}/g)) {
    const body = obj[0];
    if (!/\brel:\s*["']canonical["']/.test(body)) continue;
    const href = body.match(/\bhref:\s*["']([^"']+)["']/);
    if (href) found = href[1];
  }
  return found;
}

export function declaresRedirect(source) {
  return /\bthrow\s+redirect\s*\(/.test(source);
}

export function declaresNotFound(source) {
  return /\bnotFound\s*\(/.test(source);
}

/** Page robots: the route's own meta wins; otherwise the root route's meta. */
export function pageIsNoindex(rootRobots, pageRobots) {
  if (pageRobots != null) return isNoindex(pageRobots);
  return isNoindex(rootRobots);
}

export function gitCommitDate(cwd, relPath) {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", relPath], {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch {
    return null;
  }
}

export function xmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderSitemap(entries) {
  const body = entries
    .map(
      (entry) =>
        `  <url>\n    <loc>${xmlEscape(entry.loc)}</loc>\n    <lastmod>${xmlEscape(entry.lastmod)}</lastmod>\n  </url>`,
    )
    .join("\n");
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${body}\n` +
    `</urlset>\n`
  );
}

function walkFiles(dir, acc = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(path, acc);
    else acc.push(path);
  }
  return acc;
}

function readText(root, relPath) {
  return readFileSync(join(root, relPath), "utf8");
}

/**
 * HTTP X-Robots-Tag noindex would hide a URL even when the route head does
 * not. Scan the places this app sets response headers. A hit fails the
 * generator: a sitemap that cannot tell which paths the header covers must
 * not guess.
 */
export function findXRobotsTagFiles(root) {
  const hits = [];
  for (const dir of ["server", "public"]) {
    for (const file of walkFiles(join(root, dir))) {
      let text;
      try {
        text = readFileSync(file, "utf8");
      } catch {
        continue;
      }
      if (/x-robots-tag/i.test(text)) hits.push(relative(root, file));
    }
  }
  return hits;
}

function routeRel(root, file) {
  return relative(root, file).split("\\").join("/");
}

function routePathFromRel(rel) {
  let path = rel.replace(/^src\/routes\//, "").replace(/\.tsx$/, "");
  if (path === "index") return "/";
  if (path.endsWith("/index")) path = path.slice(0, -"/index".length);
  return `/${path}`;
}

function isLayoutFile(rel, routeRels) {
  if (rel.endsWith("/index.tsx") || rel.endsWith("/$id.tsx") || rel.endsWith("/$code.tsx")) {
    return false;
  }
  if (rel === "src/routes/index.tsx" || rel === "src/routes/__root.tsx") return false;
  const base = rel.replace(/\.tsx$/, "");
  return routeRels.some((other) => other.startsWith(`${base}/`));
}

function groupForStatic(path) {
  if (path === "/") return "home";
  if (path === "/observatory") return "observatory";
  if (path === "/literature") return "literature";
  if (path === "/codebook") return "codebook";
  if (path === "/trainer") return "trainer";
  return "static";
}

function originOf(href, label) {
  let url;
  try {
    url = new URL(href);
  } catch {
    throw new Error(`${label} canonical is not an absolute URL: ${href}`);
  }
  if (url.protocol !== "https:" || url.search || url.hash) {
    throw new Error(`${label} canonical must be an https URL without a query or hash: ${href}`);
  }
  return url.origin;
}

function locForDeclared(href, origin, label) {
  const url = new URL(href);
  if (url.origin !== origin) {
    throw new Error(`${label} canonical origin ${url.origin} does not match ${origin}`);
  }
  if (url.search || url.hash) {
    throw new Error(`${label} canonical must not include a query or hash: ${href}`);
  }
  return href;
}

/**
 * Dynamic URLs follow the index route's canonical pathname: a trailing slash
 * on that index means the child keeps one, and the absence of one means the
 * child does not. The origin root (`/`) is not a trailing-slash signal.
 */
function dynamicPath(indexCanonical, id) {
  const indexPath = new URL(indexCanonical).pathname;
  const trailing = indexPath.length > 1 && indexPath.endsWith("/");
  const base = indexPath.replace(/\/$/, "");
  const path = `${base}/${id}`;
  return trailing ? `${path}/` : path;
}

async function importTranspiled(absPath) {
  const source = readFileSync(absPath, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
      verbatimModuleSyntax: true,
    },
    fileName: absPath,
  });
  if (/\bfrom\s+["']/.test(outputText)) {
    throw new Error(
      `${absPath} still has a runtime import after type stripping; the sitemap loader cannot resolve it`,
    );
  }
  const dir = mkdtempSync(join(tmpdir(), "sitemap-data-"));
  const file = join(dir, "mod.mjs");
  writeFileSync(file, outputText);
  try {
    return await import(pathToFileURL(file).href);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function parseSlugAliases(source) {
  const block = source.match(/const SLUG_ALIASES[^=]*=\s*\{([^}]*)\}/);
  if (!block) {
    throw new Error(
      "src/lib/data/codes.ts no longer declares SLUG_ALIASES; update the sitemap generator",
    );
  }
  const aliases = {};
  for (const pair of block[1].matchAll(/([A-Za-z0-9_]+)\s*:\s*["']([^"']+)["']/g)) {
    aliases[pair[1]] = pair[2];
  }
  return aliases;
}

function resolveCode(slug, api) {
  const key = String(slug).toLowerCase();
  const subcode = api.getSubcode(key);
  if (subcode) return { kind: "subcode", slug: subcode.slug };
  const category = api.getCategory(key);
  if (category) return { kind: "category", slug: category.slug };
  return null;
}

function requireId(id, label) {
  if (!ID_RE.test(id)) {
    throw new Error(`${label} id ${JSON.stringify(id)} is not a lowercase sitemap slug`);
  }
}

function pushEntry(entries, entry) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.lastmod)) {
    throw new Error(`bad lastmod for ${entry.loc}: ${entry.lastmod}`);
  }
  entries.push(entry);
}

function sortEntries(entries) {
  const rank = new Map(GROUP_ORDER.map((group, index) => [group, index]));
  return entries.sort((a, b) => {
    const byGroup = (rank.get(a.group) ?? 99) - (rank.get(b.group) ?? 99);
    if (byGroup !== 0) return byGroup;
    if (a.group === "jurisdiction") {
      const rank = (kind) => (kind === "international" ? 1 : 0);
      const byKind = rank(a.kind) - rank(b.kind);
      if (byKind !== 0) return byKind;
    }
    return (a.sortKey ?? a.loc).localeCompare(b.sortKey ?? b.loc);
  });
}

function absentRoutes(root, routeRels) {
  const blobs = [
    "src/routes/index.tsx",
    "src/components/site-header.tsx",
    "src/components/site-footer.tsx",
  ]
    .map((rel) => {
      try {
        return readText(root, rel);
      } catch {
        return "";
      }
    })
    .join("\n");
  const notes = [];
  for (const name of ["appeals", "insights"]) {
    const hasRoute = routeRels.some(
      (rel) => rel.includes(`/${name}.`) || rel.includes(`/${name}/`),
    );
    if (hasRoute) continue;
    const hrefs = [
      ...blobs.matchAll(new RegExp(`https?:\\/\\/[^\\s"'\\\`]*\\/${name}\\/?[^\\s"'\\\`]*`, "g")),
    ].map((match) => match[0]);
    const unique = [...new Set(hrefs)];
    notes.push({
      path: `/${name}`,
      why: unique.length
        ? `not a route in src/routes; the app links out to ${unique.join(", ")}`
        : "not a route in src/routes (mentioned as a product surface, not implemented here)",
    });
  }
  notes.push({
    path: "/auth/popup",
    why: "dev-only OAuth popup served by the Vite authPopupPlugin, not a src/routes document",
  });
  notes.push({
    path: "/api/auth/*",
    why: "Better Auth HTTP API, not an indexable document",
  });
  return notes;
}

/**
 * @param {{ root?: string, buildDate?: string, gitDate?: (relPath: string) => string | null }} [options]
 */
export async function collectSitemap(options = {}) {
  const root = options.root ?? projectRoot();
  const buildDate = options.buildDate ?? utcDate();
  const gitDate = options.gitDate ?? ((relPath) => gitCommitDate(root, relPath));
  const lastmodFor = (relPath) => gitDate(relPath) ?? buildDate;

  const headerHits = findXRobotsTagFiles(root);
  if (headerHits.length > 0) {
    throw new Error(
      `X-Robots-Tag is set in ${headerHits.join(", ")}; refusing to emit a sitemap that might list a noindex URL`,
    );
  }

  const routeFiles = walkFiles(join(root, ROUTES_DIR)).filter((file) => file.endsWith(".tsx"));
  const routeRels = routeFiles.map((file) => routeRel(root, file)).sort();
  if (!routeRels.includes("src/routes/__root.tsx")) {
    throw new Error("missing src/routes/__root.tsx");
  }
  if (!routeRels.includes("src/routes/index.tsx")) {
    throw new Error("missing src/routes/index.tsx");
  }

  const rootSource = readText(root, "src/routes/__root.tsx");
  const rootRobots = declaredRobots(rootSource);
  const homeSource = readText(root, "src/routes/index.tsx");
  const homeCanonical = declaredCanonical(homeSource);
  if (!homeCanonical) {
    throw new Error("src/routes/index.tsx does not declare a canonical URL");
  }
  const origin = originOf(homeCanonical, "home");

  const entries = [];
  const excluded = [];

  const jurisdictionsMod = await importTranspiled(join(root, DATA_FILES.jurisdiction));
  const codesMod = await importTranspiled(join(root, DATA_FILES.code));
  const { jurisdictions, getJurisdiction } = jurisdictionsMod;
  const { categories, allSubcodes, getCategory, getSubcode } = codesMod;
  if (!Array.isArray(jurisdictions) || typeof getJurisdiction !== "function") {
    throw new Error("jurisdictions module did not export jurisdictions and getJurisdiction");
  }
  if (!Array.isArray(categories) || !Array.isArray(allSubcodes)) {
    throw new Error("codes module did not export categories and allSubcodes");
  }
  const codeApi = { getCategory, getSubcode };
  const aliases = parseSlugAliases(readText(root, DATA_FILES.code));

  const jurisdictionIds = new Set();
  for (const jurisdiction of jurisdictions) {
    if (jurisdictionIds.has(jurisdiction.id)) {
      throw new Error(`duplicate jurisdiction id ${jurisdiction.id}`);
    }
    jurisdictionIds.add(jurisdiction.id);
  }

  for (const rel of routeRels) {
    if (rel === "src/routes/__root.tsx") continue;
    const source = readText(root, rel);
    const path = routePathFromRel(rel);

    if (isLayoutFile(rel, routeRels)) {
      excluded.push({
        path: rel,
        why: "layout shell paired with a child route directory; not its own document",
      });
      continue;
    }

    if (rel.includes("/$")) {
      if (!DYNAMIC_HANDLERS.has(rel)) {
        throw new Error(
          `No sitemap enumeration for dynamic route ${rel}. Teach scripts/generate-sitemap.mjs which ids resolve.`,
        );
      }
      if (pageIsNoindex(rootRobots, declaredRobots(source))) {
        excluded.push({
          path,
          why: `noindex (${declaredRobots(source) ?? declaredRobots(rootSource) ?? "robots"})`,
        });
        continue;
      }
      if (rel === "src/routes/observatory/$id.tsx") {
        addJurisdictions({
          source,
          rel,
          entries,
          excluded,
          jurisdictions,
          getJurisdiction,
          origin,
          root,
          gitDate: lastmodFor,
        });
        continue;
      }
      if (rel === "src/routes/codebook/$code.tsx") {
        addCodes({
          source,
          entries,
          excluded,
          categories,
          allSubcodes,
          codeApi,
          aliases,
          origin,
          root,
          gitDate: lastmodFor,
        });
        continue;
      }
      if (rel === "src/routes/statute-map/$id.tsx") {
        addStatuteRedirects({ source, excluded, jurisdictions });
        continue;
      }
    }

    if (declaresRedirect(source)) {
      excluded.push({
        path,
        why: `redirect (${rel})`,
      });
      continue;
    }

    const ownRobots = declaredRobots(source);
    if (pageIsNoindex(rootRobots, ownRobots)) {
      excluded.push({
        path,
        why: `noindex (${ownRobots ?? declaredRobots(rootSource) ?? "inherited robots"}) in ${rel}`,
      });
      continue;
    }

    const canonical = declaredCanonical(source);
    if (!canonical) {
      throw new Error(`${rel} is an indexable static page but does not declare a canonical URL`);
    }
    const loc = locForDeclared(canonical, origin, rel);
    pushEntry(entries, {
      loc,
      lastmod: lastmodFor(rel),
      group: groupForStatic(path),
      path,
      source: rel,
    });
  }

  const notes = absentRoutes(root, routeRels);
  for (const note of notes) excluded.push(note);

  const locs = new Set();
  for (const entry of entries) {
    if (locs.has(entry.loc)) throw new Error(`duplicate sitemap URL ${entry.loc}`);
    locs.add(entry.loc);
    const url = new URL(entry.loc);
    if (url.origin !== origin) throw new Error(`off-origin sitemap URL ${entry.loc}`);
  }

  return {
    origin,
    entries: sortEntries(entries),
    excluded,
    buildDate,
  };
}

function indexCanonical(root, rel) {
  const href = declaredCanonical(readText(root, rel));
  if (!href) throw new Error(`${rel} does not declare a canonical URL`);
  return href;
}

function addJurisdictions({
  source,
  rel,
  entries,
  excluded,
  jurisdictions,
  getJurisdiction,
  origin,
  root,
  gitDate,
}) {
  if (!declaresNotFound(source)) {
    throw new Error(`${rel} no longer calls notFound(); the sitemap cannot tell which ids 404`);
  }
  const canonical = indexCanonical(root, "src/routes/observatory/index.tsx");
  const lastmod = gitDate(DATA_FILES.jurisdiction);
  for (const jurisdiction of jurisdictions) {
    requireId(jurisdiction.id, "jurisdiction");
    const resolved = getJurisdiction(jurisdiction.id);
    const path = dynamicPath(canonical, jurisdiction.id);
    if (!resolved || resolved.id !== jurisdiction.id) {
      excluded.push({
        path,
        why: "observatory/$id loader throws notFound() (getJurisdiction miss)",
      });
      continue;
    }
    pushEntry(entries, {
      loc: origin + path,
      lastmod,
      group: "jurisdiction",
      kind: jurisdiction.kind,
      path,
      source: DATA_FILES.jurisdiction,
    });
  }
}

function addCodes({
  source,
  entries,
  excluded,
  categories,
  allSubcodes,
  codeApi,
  aliases,
  origin,
  root,
  gitDate,
}) {
  if (!declaresNotFound(source)) {
    throw new Error(
      "codebook/$code no longer calls notFound(); the sitemap cannot tell which codes 404",
    );
  }
  const canonical = indexCanonical(root, "src/routes/codebook/index.tsx");
  const lastmod = gitDate(DATA_FILES.code);
  const seen = new Set();

  for (const subcode of allSubcodes) {
    requireId(subcode.slug, "subcode");
    const resolved = resolveCode(subcode.slug, codeApi);
    const path = dynamicPath(canonical, subcode.slug);
    if (!resolved || resolved.kind !== "subcode" || resolved.slug !== subcode.slug) {
      excluded.push({
        path,
        why: resolved
          ? `codebook/$code resolves ${subcode.slug} as /codebook/${resolved.slug} (${resolved.kind}), not a distinct tactic page`
          : "codebook/$code loader throws notFound()",
      });
      continue;
    }
    seen.add(subcode.slug);
    pushEntry(entries, {
      loc: origin + path,
      lastmod,
      group: "codebook-tactic",
      path,
      sortKey: subcode.slug,
      source: DATA_FILES.code,
    });
  }

  for (const category of categories) {
    requireId(category.slug, "category");
    const resolved = resolveCode(category.slug, codeApi);
    const path = dynamicPath(canonical, category.slug);
    if (!resolved || resolved.slug !== category.slug || resolved.kind !== "category") {
      excluded.push({
        path,
        why: resolved
          ? `codebook/$code resolves ${category.slug} as /codebook/${resolved.slug} (${resolved.kind}); the subcode wins when both match`
          : "codebook/$code loader throws notFound()",
      });
      continue;
    }
    if (seen.has(category.slug)) {
      excluded.push({ path, why: "same URL already indexed as a tactic page" });
      continue;
    }
    seen.add(category.slug);
    pushEntry(entries, {
      loc: origin + path,
      lastmod,
      group: "codebook-category",
      path,
      sortKey: `${String(category.number).padStart(3, "0")}-${category.slug}`,
      source: DATA_FILES.code,
    });
  }

  for (const [from, to] of Object.entries(aliases)) {
    const candidates = new Set([from]);
    for (const subcode of allSubcodes) {
      if (subcode.slug === to || subcode.slug.startsWith(`${to}-`)) {
        candidates.add(from + subcode.slug.slice(to.length));
      }
    }
    for (const slug of candidates) {
      const resolved = resolveCode(slug, codeApi);
      const path = `/codebook/${slug}`;
      if (!resolved) {
        excluded.push({ path, why: `legacy alias of ${to} but the route throws notFound()` });
        continue;
      }
      if (resolved.slug === slug) continue;
      excluded.push({
        path,
        why: `legacy slug alias; codebook/$code resolves it to /codebook/${resolved.slug}, which is the indexed URL`,
      });
    }
  }
}

function addStatuteRedirects({ source, excluded, jurisdictions }) {
  if (!declaresRedirect(source)) {
    throw new Error(
      "statute-map/$id no longer redirects. Update the sitemap generator before including or dropping those URLs.",
    );
  }
  excluded.push({
    path: "/statute-map/$id",
    why: `redirects to /observatory/$id for every id (${jurisdictions.length} jurisdiction ids such as /statute-map/${jurisdictions[0]?.id ?? "us-ca"}); not a distinct page`,
  });
}

export function summarize(result) {
  const counts = {};
  for (const entry of result.entries) {
    if (entry.group === "jurisdiction") {
      const key = entry.kind === "international" ? "jurisdiction-international" : "jurisdiction-us";
      counts[key] = (counts[key] ?? 0) + 1;
    } else {
      counts[entry.group] = (counts[entry.group] ?? 0) + 1;
    }
  }
  return { total: result.entries.length, counts };
}

function printSummary(result) {
  const { total, counts } = summarize(result);
  console.log(`[sitemap] ${total} URLs -> ${join(result.dest ?? SITEMAP_REL)}`);
  for (const [key, count] of Object.entries(counts)) {
    console.log(`[sitemap] ${key}: ${count}`);
  }
  console.log(`[sitemap] excluded ${result.excluded.length}`);
  for (const item of result.excluded) {
    console.log(`[sitemap] exclude ${item.path} — ${item.why}`);
  }
}

export async function writeSitemap(options = {}) {
  const root = options.root ?? projectRoot();
  const result = await collectSitemap(options);
  const xml = renderSitemap(result.entries);
  const dest = join(root, SITEMAP_REL);
  writeFileSync(dest, xml);
  return { ...result, dest, xml };
}

if (isMainModule(import.meta.url)) {
  writeSitemap()
    .then((result) => {
      printSummary(result);
    })
    .catch((err) => {
      console.error("[sitemap]", err instanceof Error ? err.message : err);
      process.exit(1);
    });
}
