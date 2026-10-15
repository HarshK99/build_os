// Shared screenshot helper for eyeballing UI changes against a dev server that is
// already running, or a local HTML file (e.g. a design mock-up). One copy for every
// project; run it from the project's folder.
//
//   node D:\FounderMode\Apps\build_os\tools\shot.mjs [route, URL or .html file] [--w 1280] [--h 900]
//        [--mobile] [--full] [--sel "<css>"] [--name foo] [--motion] [--scroll <px>] [--delay <ms>]
//        [--click "<target>"]... [--scroll-in "<target>" <px>]... [--chromium]
//
// `route` is a path WITHOUT a leading slash (Git Bash mangles a bare "/").
// Omit it for the home page. A full http(s) or file:// URL is also accepted, and so
// is a path to a local .html file (opened directly; no server needed).
//
// --mobile          phone emulation: touch, 2x pixels, and 390×844 unless --w/--h say otherwise.
// --click <target>  click something before the shot. Repeat it to click several things, in order.
// --scroll-in <target> <px>
//                   scroll INSIDE an element (a list, a wheel picker) by px; negative scrolls up.
//                   Also repeatable, and runs in order with the clicks.
// --delay <ms>      wait after --scroll and after each action (default 150 / 400).
//
// A <target> is a Playwright selector: CSS ("#save", ".sheet button"), text ("text=Save"),
// or role ('role=button[name="Close"]'). If it matches several, the first is used.
// Careful on a real app: clicking a Save or Delete button writes to the real database.
//
// Examples:
//   node ...\shot.mjs                         → .shots/home-1280.png
//   node ...\shot.mjs about --full            → full-page /about
//   node ...\shot.mjs services/patents        → /services/patents
//   node ...\shot.mjs "" --sel "section:nth-of-type(4)"
//   node ...\shot.mjs "" --w 390 --name home-mobile
//   node ...\shot.mjs http://localhost:4321   → any address
//   node ...\shot.mjs docs/design/mockups/dawn-sky.html --mobile --click "text=Save"
//   node ...\shot.mjs "" --mobile --click 'role=button[name="Close"]' --name sheet-closed
//   node ...\shot.mjs history --mobile --click "text=Edit" --scroll-in ".no-scrollbar >> nth=2" 88
//
// Screenshots land in .shots/ inside the folder you run it from, and that folder
// ignores itself in git. Assumes the dev server is on http://localhost:3000
// (BASE_URL env overrides). This never starts a server. Page errors seen while
// loading and acting are printed after the shot.
//
// Browser: the Edge already installed on this machine, so nothing is downloaded.
// Pass --chromium to use Playwright's own Chromium instead.

import { chromium } from "playwright-core";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { basename, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const first = args[0] && !args[0].startsWith("--") ? args[0] : "";
const flag = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? def : args[i + 1];
};
const has = (name) => args.includes(`--${name}`);

// Clicks and in-element scrolls, in the order they were given.
const actions = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--click") actions.push({ kind: "click", target: args[i + 1] });
  if (args[i] === "--scroll-in") actions.push({ kind: "scroll-in", target: args[i + 1], by: Number(args[i + 2]) });
}

const base = process.env.BASE_URL ?? "http://localhost:3000";
const isUrl = /^(https?|file):\/\//i.test(first);
const isFile = !isUrl && /\.html?$/i.test(first);
const path = "/" + first.replace(/^\/+/, "");
const url = isUrl ? first : isFile ? pathToFileURL(resolve(first)).href : base + path;
const mobile = has("mobile");
const width = Number(flag("w", mobile ? 390 : 1280));
const height = Number(flag("h", mobile ? 844 : 900));
const full = has("full");
const sel = flag("sel", null);
const slug = isFile
  ? basename(first).replace(/\.html?$/i, "")
  : (isUrl ? first.replace(/^(https?|file):\/\//i, "") : path).replace(/\W+/g, "-").replace(/^-|-$/g, "");
const name = flag("name", null) ?? `${(isUrl || isFile ? slug : slug || "home")}-${width}`;

if (isFile && !existsSync(resolve(first))) {
  console.error(`No such file: ${resolve(first)}`);
  process.exit(1);
}

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
    deviceScaleFactor: mobile ? 2 : 1,
    isMobile: mobile,
    hasTouch: mobile,
    reducedMotion: has("motion") ? "no-preference" : "reduce",
  });
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => message.type() === "error" && pageErrors.push(message.text()));

  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
  } catch (error) {
    const hint = isFile ? "" : " Is the dev server running? This tool does not start one.";
    console.error(`Could not open ${url}.${hint}\n${error.message.split("\n")[0]}`);
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

    for (const action of actions) {
      const target = page.locator(action.target).first();
      try {
        if (action.kind === "click") await target.click({ timeout: 10_000 });
        else await target.evaluate((el, by) => { el.scrollTop += by; }, action.by);
      } catch (error) {
        console.error(`--${action.kind} "${action.target}" failed: ${error.message.split("\n")[0]}`);
        process.exitCode = 1;
        break;
      }
      await page.waitForTimeout(Number(flag("delay", 400)));
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
    const details = [has("chromium") ? "Chromium" : "Edge", `motion ${has("motion") ? "on" : "off"}`, mobile ? "mobile" : null].filter(Boolean).join(", ");
    console.log(`${out}  (${details})`);
    console.log(`page errors: ${pageErrors.length ? "\n  " + pageErrors.join("\n  ") : "none"}`);
  }
} finally {
  await browser.close();
}
