// Local viewer for the Build OS docs. Normally started by launch.ps1 (the "Build OS"
// Start Menu shortcut); can also be run by hand with: node serve.mjs
// It stops itself once no page has asked for anything for a few minutes.
import { createServer } from "node:http";
import { readFile, readdir, stat } from "node:fs/promises";
import { basename, dirname, extname, join, resolve } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT) || 4321;
const idleMs = Number(process.env.IDLE_MS) || 3 * 60 * 1000;
// The folder whose sub-folders are listed on the Projects page: one level up from here.
const projectsRoot = process.env.PROJECTS_ROOT || resolve(root, "..");
// Files that live outside this folder but are shown as pages, read live so they never go stale.
// Delete an entry to remove its page.
const OUTSIDE_PAGES = {
  "CLAUDE_INSTRUCTIONS.md": join(homedir(), ".claude", "CLAUDE.md"),
  "FOUNDER_OS.md": resolve(root, "..", "founder_os", "FOUNDER_OS.md"),
  "HOW_I_DECIDE.md": resolve(root, "..", "founder_os", "HOW_I_DECIDE.md"),
  "RHYTHM.md": resolve(root, "..", "founder_os", "RHYTHM.md"),
  "IDEA_PLAYBOOK.md": resolve(root, "..", "founder_os", "IDEA_PLAYBOOK.md"),
  "USING_THE_IDEA_PLAYBOOK.md": resolve(root, "..", "founder_os", "USING_THE_IDEA_PLAYBOOK.md"),
};
let lastSeen = Date.now();

const send = (res, status, type, body) => {
  res.writeHead(status, { "Content-Type": type, "Cache-Control": "no-store" });
  res.end(body);
};

// ---- Projects page: read straight from disk, nothing is saved ----

// Folders that hold generated or downloaded files; they say nothing about when I last worked.
const SKIP = new Set([
  "node_modules", ".git", ".next", ".vercel", ".turbo", "dist", "build", "out", "coverage",
  ".venv", "venv", "__pycache__", ".dart_tool", ".idea", ".gradle", ".cache",
]);
const NODE_KINDS = [
  ["next", "Next.js"], ["expo", "Expo"], ["react-native", "React Native"], ["astro", "Astro"],
  ["electron", "Electron"], ["vite", "Vite"], ["react", "React"],
  ["express", "Node server"], ["fastify", "Node server"], ["hono", "Node server"],
];
const DOCUMENT_FILE = /\.(md|txt|pdf|docx?|html)$/i;

const list = async (dir) => {
  try {
    return await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
};
const changedAt = async (path) => {
  try {
    return (await stat(path)).mtimeMs;
  } catch {
    return 0;
  }
};
const isProjectDir = (entry) => entry.isDirectory() && !entry.name.startsWith(".") && !entry.name.startsWith("0.");

async function newestChange(dir, depth = 4) {
  let newest = 0;
  for (const entry of await list(dir)) {
    if (SKIP.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (depth > 1) newest = Math.max(newest, await newestChange(full, depth - 1));
    } else {
      newest = Math.max(newest, await changedAt(full));
    }
  }
  return newest;
}

async function kindOf(dir, names) {
  if (names.has("package.json")) {
    try {
      const pkg = JSON.parse(await readFile(join(dir, "package.json"), "utf8"));
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      for (const [dep, label] of NODE_KINDS) if (deps[dep]) return label;
    } catch {}
    return "Node";
  }
  if (names.has("pubspec.yaml")) return "Flutter";
  if (names.has("pyproject.toml") || names.has("requirements.txt")) return "Python";
  if (names.has("manifest.json")) {
    const manifest = await readFile(join(dir, "manifest.json"), "utf8").catch(() => "");
    if (manifest.includes("manifest_version")) return "Browser extension";
  }
  if (names.has("index.html")) return "Static page";
  return null;
}

async function repoUrlOf(dir) {
  const config = await readFile(join(dir, ".git", "config"), "utf8").catch(() => "");
  const url = config.match(/^\s*url\s*=\s*(.+)$/m)?.[1].trim();
  if (!url) return null;
  // git@github.com:User/repo.git -> https://github.com/User/repo
  return url.replace(/^git@([^:]+):/, "https://$1/").replace(/\.git$/, "");
}

// What can be told from a folder's own top level, without walking into it.
async function markers(dir) {
  const entries = await list(dir);
  const names = new Set(entries.map((entry) => entry.name));
  return {
    entries,
    kind: await kindOf(dir, names),
    hasGit: names.has(".git"),
    repoUrl: await repoUrlOf(dir),
    lastCommit: await changedAt(join(dir, ".git", "logs", "HEAD")),
  };
}

const gitLabel = ({ repoUrl, hasGit }) => {
  if (repoUrl) return repoUrl.includes("github.com") ? "On GitHub" : "Has a remote";
  return hasGit ? "Local only" : "No";
};

async function describeProject(dir, name, group) {
  const own = await markers(dir);
  const project = {
    name,
    group,
    kind: own.kind,
    parts: [],
    repoUrl: own.repoUrl,
    git: gitLabel(own),
    // An empty folder has no files to date, so fall back to the folder itself.
    changed: Math.max(await newestChange(dir), own.lastCommit) || (await changedAt(dir)),
  };
  if (project.kind) return project;

  // No project files and no repo at this level: it may be a folder that holds several projects.
  const children = own.hasGit ? [] : own.entries.filter(isProjectDir);
  const found = await Promise.all(children.map((child) => markers(join(dir, child.name))));
  const parts = found
    .map((part, i) => ({ ...part, name: children[i].name }))
    .filter((part) => part.kind || part.hasGit);

  if (parts.length) {
    project.parts = parts.map((part) => part.name);
    project.changed = Math.max(project.changed, ...parts.map((part) => part.lastCommit));
    if (parts.length === 1) {
      project.kind = parts[0].kind || "Other";
      project.repoUrl = parts[0].repoUrl;
      project.git = gitLabel(parts[0]);
    } else {
      project.kind = `${parts.length} parts`;
      project.git = `${parts.filter((part) => part.repoUrl).length} of ${parts.length} pushed`;
    }
    return project;
  }

  const files = own.entries.filter((entry) => !entry.isDirectory());
  if (!own.entries.length) project.kind = "Empty";
  else if (files.length && files.every((file) => DOCUMENT_FILE.test(file.name))) project.kind = "Documents";
  else project.kind = "Other";
  return project;
}

let projectsCache = { at: 0, body: "" };

async function scanProjects() {
  if (Date.now() - projectsCache.at < 60 * 1000) return projectsCache.body;

  const started = Date.now();
  const jobs = [];
  for (const group of (await list(projectsRoot)).filter(isProjectDir)) {
    const groupDir = join(projectsRoot, group.name);
    const entries = await list(groupDir);
    // A top-level folder with its own git, like this one, is one project: its sub-folders are not projects of their own.
    if (resolve(groupDir) === resolve(root) || entries.some((entry) => entry.name === ".git")) {
      jobs.push(describeProject(groupDir, group.name, basename(projectsRoot)));
      continue;
    }
    for (const child of entries.filter(isProjectDir)) {
      jobs.push(describeProject(join(groupDir, child.name), child.name, group.name));
    }
    // A top-level folder with loose files in it is itself a project.
    if (entries.some((entry) => !entry.isDirectory())) {
      jobs.push(describeProject(groupDir, group.name, basename(projectsRoot)));
    }
  }
  const projects = (await Promise.all(jobs)).sort((a, b) => b.changed - a.changed);

  projectsCache = {
    at: Date.now(),
    body: JSON.stringify({ root: projectsRoot, tookMs: Date.now() - started, projects }),
  };
  return projectsCache.body;
}

// ---- Templates and hunts: two more folders the viewer reads ----

// Pages meant to be copied into a project, such as the image-prompt page.
const templatesDir = join(root, "templates");
// Idea Playbook hunts, one folder each, read live like the pages in this folder.
const huntsRoot = process.env.HUNTS_ROOT || resolve(root, "..", "founder_os", "hunts");
// A hunt's files in the order the playbook's steps write them; anything else after, by name.
const HUNT_ORDER = ["research.md", "directions.md", "product_sense.md"];
const FILE_TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp",
};
// A plain file or folder name: no path separators, no "..", nothing hidden.
const plainName = (name) => name === basename(name) && !name.startsWith(".") && !/[\\/]/.test(name);

async function listTemplates() {
  const files = (await list(templatesDir)).filter((e) => !e.isDirectory() && e.name.endsWith(".html"));
  return Promise.all(files.map(async ({ name }) => {
    const html = await readFile(join(templatesDir, name), "utf8").catch(() => "");
    const meta = (key) => html.match(new RegExp(`<meta name="${key}" content="([^"]*)"`))?.[1] || "";
    return { file: name, title: html.match(/<title>([^<]*)<\/title>/)?.[1] || name, about: meta("description") };
  }));
}

async function listHunts() {
  const hunts = [];
  for (const dir of (await list(huntsRoot)).filter(isProjectDir)) {
    const full = join(huntsRoot, dir.name);
    const names = (await list(full)).filter((e) => !e.isDirectory() && e.name.toLowerCase().endsWith(".md")).map((e) => e.name);
    const rank = (n) => (HUNT_ORDER.indexOf(n) + 1) || HUNT_ORDER.length + 1;
    names.sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
    hunts.push({ name: dir.name, files: names, changed: await newestChange(full, 1) || (await changedAt(full)) });
  }
  return hunts.sort((a, b) => b.changed - a.changed);
}

// ---- Server ----

const server = createServer(async (req, res) => {
  lastSeen = Date.now();
  try {
    const path = decodeURIComponent(new URL(req.url, "http://localhost").pathname);

    if (path === "/") {
      return send(res, 200, "text/html; charset=utf-8", await readFile(join(root, "index.html")));
    }
    // The open page calls this on a timer so the viewer knows someone is still reading.
    if (path === "/_ping") {
      return send(res, 204, "text/plain", "");
    }
    if (path === "/_docs") {
      // README.md describes this repo; it is not one of the pages to read.
      const docs = (await readdir(root))
        .filter((f) => f.toLowerCase().endsWith(".md") && f.toLowerCase() !== "readme.md")
        .sort();
      return send(res, 200, "application/json", JSON.stringify([...docs, ...Object.keys(OUTSIDE_PAGES)]));
    }
    if (path === "/_projects") {
      return send(res, 200, "application/json", await scanProjects());
    }
    if (path === "/_templates") {
      return send(res, 200, "application/json", JSON.stringify(await listTemplates()));
    }
    if (path === "/_hunts") {
      return send(res, 200, "application/json", JSON.stringify({ root: huntsRoot, hunts: await listHunts() }));
    }
    // /templates/<file>: one file straight inside the templates folder.
    if (path.startsWith("/templates/")) {
      const file = path.slice("/templates/".length);
      const type = FILE_TYPES[extname(file).toLowerCase()];
      if (!plainName(file) || !type) return send(res, 404, "text/plain", "Not found");
      return send(res, 200, type, await readFile(join(templatesDir, file)));
    }
    // /_hunt/<hunt>/<file>.md: one markdown file straight inside one hunt's folder.
    if (path.startsWith("/_hunt/")) {
      const [hunt, file, ...rest] = path.slice("/_hunt/".length).split("/");
      if (rest.length || !plainName(hunt || "") || !plainName(file || "") || !file.toLowerCase().endsWith(".md")) {
        return send(res, 404, "text/plain", "Not found");
      }
      return send(res, 200, "text/markdown; charset=utf-8", await readFile(join(huntsRoot, hunt, file)));
    }
    // Only markdown files that sit directly in this folder are served.
    const name = basename(path);
    if (path === `/${name}` && OUTSIDE_PAGES[name]) {
      return send(res, 200, "text/markdown; charset=utf-8", await readFile(OUTSIDE_PAGES[name]));
    }
    if (path === `/${name}` && name.toLowerCase().endsWith(".md")) {
      return send(res, 200, "text/markdown; charset=utf-8", await readFile(join(root, name)));
    }
    send(res, 404, "text/plain", "Not found");
  } catch {
    send(res, 404, "text/plain", "Not found");
  }
});

// Another copy is already serving this port, so there is nothing to do.
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") process.exit(0);
  throw error;
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Build OS docs: http://localhost:${port}`);
});

setInterval(() => {
  if (Date.now() - lastSeen > idleMs) process.exit(0);
}, Math.min(idleMs, 15000));
