// Local viewer for the Build OS docs. Normally started by launch.ps1 (the "Build OS"
// Start Menu shortcut); can also be run by hand with: node serve.mjs
// It stops itself once no page has asked for anything for a few minutes.
import { createServer } from "node:http";
import { readFile, readdir } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT) || 4321;
const idleMs = Number(process.env.IDLE_MS) || 3 * 60 * 1000;
let lastSeen = Date.now();

const send = (res, status, type, body) => {
  res.writeHead(status, { "Content-Type": type, "Cache-Control": "no-store" });
  res.end(body);
};

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
      const docs = (await readdir(root)).filter((f) => f.toLowerCase().endsWith(".md")).sort();
      return send(res, 200, "application/json", JSON.stringify(docs));
    }
    // Only markdown files that sit directly in this folder are served.
    const name = basename(path);
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
