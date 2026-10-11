import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import {
  collectSitemap,
  declaredCanonical,
  declaredRobots,
  declaresRedirect,
  gitCommitDate,
  isNoindex,
  pageIsNoindex,
  renderSitemap,
  summarize,
} from "./generate-sitemap.mjs";
import { projectRoot } from "./with-app-env.mjs";

const ORIGIN = "https://observatory.carltonresearch.com";

test("robots and canonical parsers match the route files", () => {
  assert.equal(isNoindex("noindex,nofollow"), true);
  assert.equal(isNoindex("index,follow"), false);
  assert.equal(pageIsNoindex("noindex", null), true);
  assert.equal(pageIsNoindex("noindex", "index,follow"), false);
  assert.equal(pageIsNoindex(null, null), false);

  const caseFit = declaredRobots(`{ name: "robots", content: "noindex,nofollow" }`);
  assert.equal(caseFit, "noindex,nofollow");
  assert.equal(
    declaredCanonical(`links: [{ rel: "canonical", href: "${ORIGIN}/trainer" }]`),
    `${ORIGIN}/trainer`,
  );
  assert.equal(declaresRedirect(`throw redirect({ to: "/observatory" });`), true);
  assert.equal(declaresRedirect(`const redirect = false;`), false);
});

test("git commit date falls back when git cannot answer", () => {
  const empty = mkdtempSync(join(tmpdir(), "sitemap-nogit-"));
  assert.equal(gitCommitDate(empty, "src/routes/index.tsx"), null);
  writeFileSync(join(empty, "note.txt"), "x");
  assert.equal(gitCommitDate(empty, "note.txt"), null);
});

test("sitemap lists only indexable pages and keeps canonical form", async () => {
  const root = projectRoot();
  const result = await collectSitemap({ root, buildDate: "2020-01-01" });
  const { total, counts } = summarize(result);
  const paths = new Set(result.entries.map((entry) => new URL(entry.loc).pathname));

  assert.equal(total, 150);
  assert.equal(counts.home, 1);
  assert.equal(counts.observatory, 1);
  assert.equal(counts["jurisdiction-us"], 51);
  assert.equal(counts["jurisdiction-international"], 10);
  assert.equal(counts.literature, 1);
  assert.equal(counts.codebook, 1);
  assert.equal(counts["codebook-category"], 16);
  assert.equal(counts["codebook-tactic"], 68);
  assert.equal(counts.trainer, 1);

  assert.equal(result.entries[0].loc, `${ORIGIN}/`);
  assert.ok(paths.has("/observatory"));
  assert.ok(paths.has("/observatory/us-ca"));
  assert.ok(paths.has("/observatory/us-dc"));
  assert.ok(paths.has("/observatory/ew"));
  assert.ok(paths.has("/observatory/nir"));
  assert.ok(paths.has("/literature"));
  assert.ok(paths.has("/codebook"));
  assert.ok(paths.has("/codebook/iso"));
  assert.ok(paths.has("/codebook/iso-1"));
  assert.ok(paths.has("/codebook/econ"));
  assert.ok(paths.has("/codebook/econ-1"));
  assert.ok(paths.has("/trainer"));

  assert.equal(paths.has("/case-fit"), false);
  assert.equal(paths.has("/statute-map"), false);
  assert.equal(paths.has("/codebook/eco"), false);
  assert.equal(paths.has("/codebook/eco-1"), false);
  assert.equal(paths.has("/codebook/coer"), false);
  assert.equal(paths.has("/codebook/coer-1"), false);
  assert.equal(paths.has("/appeals"), false);
  assert.equal(paths.has("/insights"), false);

  for (const entry of result.entries) {
    const url = new URL(entry.loc);
    assert.equal(url.origin, ORIGIN);
    assert.equal(url.search, "");
    assert.equal(url.hash, "");
    if (url.pathname !== "/") assert.equal(url.pathname.endsWith("/"), false);
    assert.match(entry.lastmod, /^\d{4}-\d{2}-\d{2}$/);
    assert.notEqual(entry.lastmod, "2020-01-01");
  }

  const home = result.entries.find((entry) => entry.group === "home");
  assert.equal(home.lastmod, gitCommitDate(root, "src/routes/index.tsx"));
  const dossier = result.entries.find((entry) => entry.path === "/observatory/us-ca");
  assert.equal(dossier.lastmod, gitCommitDate(root, "src/lib/data/jurisdictions.ts"));
  const tactic = result.entries.find((entry) => entry.path === "/codebook/iso-1");
  assert.equal(tactic.lastmod, gitCommitDate(root, "src/lib/data/codes.ts"));

  const why = (path) => result.excluded.find((item) => item.path === path)?.why ?? "";
  assert.match(why("/case-fit"), /noindex/);
  assert.match(why("/statute-map"), /redirect/);
  assert.match(why("/statute-map/$id"), /redirect/);
  assert.match(why("/codebook/eco"), /legacy slug alias/);
  assert.match(why("/codebook/eco-1"), /legacy slug alias/);
  assert.match(why("/codebook/coer-2"), /legacy slug alias/);
  assert.match(why("/appeals"), /not a route/);
  assert.match(why("/insights"), /not a route/);
  assert.match(why("/appeals"), /tracker\.carltonresearch\.com\/appeals/);
  assert.match(why("/insights"), /carltonresearch\.com\/insights/);

  const xml = renderSitemap(result.entries);
  assert.match(xml, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  assert.equal([...xml.matchAll(/<loc>/g)].length, total);
  assert.equal([...xml.matchAll(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g)].length, total);
});

test("missing git dates fall back to the build date", async () => {
  const result = await collectSitemap({
    root: projectRoot(),
    buildDate: "2020-01-01",
    gitDate: () => null,
  });
  assert.ok(result.entries.every((entry) => entry.lastmod === "2020-01-01"));
});
