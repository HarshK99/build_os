// Shared screenshot helper for eyeballing UI changes against a dev server that is
// already running. One copy for every project; run it from the project's folder.
//
//   node D:\FounderMode\Apps\build_os\tools\shot.mjs [route or URL] [--w 1280] [--h 900]
//        [--full] [--sel "<css>"] [--name foo] [--motion] [--scroll <px>] [--delay <ms>]
//        [--chromium]
//
// `route` is a path WITHOUT a leading slash (Git Bash mangles a bare "/").
// Omit it for the home page. A full http(s) URL is also accepted.
//
// Examples:
//   node ...\shot.mjs                         → .shots/home-1280.png
//   node ...\shot.mjs about --full            → full-page /about
//   node ...\shot.mjs services/patents        → /services/patents
//   node ...\shot.mjs "" --sel "section:nth-of-type(4)"
//   node ...\shot.mjs "" --w 390 --name home-mobile
//   node ...\shot.mjs http://localhost:4321   → any address
//
// Screenshots land in .shots/ inside the folder you run it from, and that folder
// ignores itself in git. Assumes the dev server is on http://localhost:3000
// (BASE_URL env overrides). This never starts a server.
//
// Browser: the Edge already installed on this machine, so nothing is downloaded.
// Pass --chromium to use Playwright's own Chromium instead.

import { chromium } from "playwright-core";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const first = args[0] && !args[0].startsWith("--") ? args[0] : "";
const flag = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? def : args[i + 1];
};
const has = (name) => args.includes(`--${name}`);

const base = process.env.BASE_URL ?? "http://localhost:3000";
const isUrl = /^https?:\/\//i.test(first);
const path = "/" + first.replace(/^\/+/, "");
const url = isUrl ? first : base + path;
const width = Number(flag("w", 1280));
const height = Number(flag("h", 900));
const full = has("full");
const sel = flag("sel", null);
const slug = (isUrl ? first.replace(/^https?:\/\//i, "") : path).replace(/\W+/g, "-").replace(/^-|-$/g, "");
const name = flag("name", null) ?? `${(isUrl ? slug : slug || "home")}-${width}`;

const outDir = resolve(process.cwd(), ".shots");
mkdirSync(outDir, { recursive: true });
if (!existsSync(resolve(outDir, ".gitignore"))) writeFileSync(resolve(outDir, ".gitignore"), "*\n");
const out = resolve(outDir, `${name}.png`);

const browser = await chromium.launch(has("chromium") ? {} : { channel: "msedge" });
try {
  // `reducedMotion: reduce` makes every shot deterministic — intro animations are
  // skipped and scroll-reveals render at their final state, no timing races.
  // Pass --motion to see the real animated state instead.
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
    reducedMotion: has("motion") ? "no-preference" : "reduce",
  });
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
  } catch (error) {
    console.error(`Could not open ${url}. Is the dev server running? This tool does not start one.\n${error.message.split("\n")[0]}`);
    process.exitCode = 1;
  }

  if (!process.exitCode) {
    await page.evaluate(() => document.fonts?.ready);
    await page.waitForTimeout(has("motion") ? 1800 : 1200); // settle (dev hydration is slow)

    // --scroll <px> [--delay <ms>] — jump the window and shoot after `delay`
    // (default 150ms). Use with --motion to catch scroll-reveals mid-animation.
    const scrollY = flag("scroll", null);
    if (scrollY != null) {
      await page.evaluate((y) => window.scrollTo(0, Number(y)), scrollY);
      await page.waitForTimeout(Number(flag("delay", 150)));
    }

    if (sel) {
      const el = page.locator(sel).first();
      if (scrollY == null) await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(scrollY == null ? 300 : 0);
      await el.screenshot({ path: out });
    } else if (full) {
      // Scroll-reveals that fire once need the page walked (one scrollTo per step
      // so observer callbacks flush between them) before capturing, otherwise
      // unrevealed sections shoot blank.
      const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y <= pageHeight; y += 400) {
        await page.evaluate((yy) => window.scrollTo(0, yy), y);
        await page.waitForTimeout(140);
      }
      await page.waitForTimeout(600);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(200);
      await page.screenshot({ path: out, fullPage: true });
    } else {
      await page.screenshot({ path: out });
    }
    console.log(`${out}  (${has("chromium") ? "Chromium" : "Edge"}, motion ${has("motion") ? "on" : "off"})`);
  }
} finally {
  await browser.close();
}
