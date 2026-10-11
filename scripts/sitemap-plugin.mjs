/**
 * Write public/sitemap.xml before Vite copies public/ into the build output.
 * `apply: "build"` so `vite dev` does not rewrite the committed file on boot.
 */
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

export function sitemapPlugin() {
  // Vite calls buildStart once per environment (client, SSR, nitro). The file
  // only needs to exist before public/ is copied, so generate it a single time.
  let generated = false;
  return {
    name: "app-builder:sitemap",
    apply: "build",
    buildStart() {
      if (generated) return;
      generated = true;
      const result = spawnSync(process.execPath, [join(root, "scripts/generate-sitemap.mjs")], {
        cwd: root,
        stdio: "inherit",
      });
      if (result.status !== 0) {
        const detail = result.status == null ? result.signal : `exit ${result.status}`;
        throw new Error(`[sitemap] generate-sitemap.mjs failed (${detail})`);
      }
    },
  };
}
