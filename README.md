# Build OS

How I build with AI tools, as a set of Markdown files, plus a small local page for reading them. Start at `BUILD_OS.md`; what is installed where is in `SETUP.md`.

## What is in this folder

| Path | What it is |
|---|---|
| `*.md` | The documents: `BUILD_OS.md`, `SETUP.md`, `HOW_I_WORK.md`, the playbooks, and this project's `product_sense.md`. Each shows as a page in the viewer |
| `skills/` | My own skills, linked into both tools. `SETUP.md` lists them |
| `library/showcase/` | What the `showcase` skill remembers. The skill writes here |
| `tools/shot.mjs` | The shared screenshot tool. Needs `npm install` once inside `tools/` |
| `sync-codex.mjs` | Rewrites `~/.codex/AGENTS.md` as a copy of `HOW_I_WORK.md`. Run after changing that file |
| `index.html`, `serve.mjs`, `launch.ps1` | The viewer: the page, a small local server with no dependencies, and the script the Start Menu shortcut runs |

`~/.claude/CLAUDE.md` pulls in `HOW_I_WORK.md` by its full path, so this folder must not move without updating that line.

## Reading it

Open the Start Menu, type "Build OS" and press Enter.

The viewer starts with no window, opens http://localhost:4321, and stops itself about three minutes after the page is closed. Edits to `BUILD_OS.md` show up when you switch back to the tab.

To run it by hand instead:

```
node serve.mjs
```

## Setting up on a new machine

Needs Node.js and an internet connection (the markdown renderer loads from a CDN; offline, the page shows the raw text).

The Start Menu shortcut is not part of this repo. Create it once from PowerShell, run inside this folder:

```powershell
$lnk = Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs\Build OS.lnk"
$s = (New-Object -ComObject WScript.Shell).CreateShortcut($lnk)
$s.TargetPath = "$env:SystemRoot\System32\WindowsPowerShell\v1.0\powershell.exe"
$s.Arguments = "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$PWD\launch.ps1`""
$s.WorkingDirectory = "$PWD"
$s.WindowStyle = 7
$s.Save()
```

To remove it, delete `Build OS.lnk` from that folder.

## The Projects page

The sidebar has a second page, Projects. It lists every project folder under the folder above this one (here, `D:\FounderMode`), most recently changed first.

- It is read from disk each time the page opens. Nothing is saved, so the list never appears in this repo.
- Each row shows the name, the folder it sits in, a guess at the kind of project from its files, whether it is on GitHub, and when it last changed.
- A folder that only holds other projects is shown as one row with its parts listed.
- Folders whose names start with `.` or `0.` are left out.
- Set the `PROJECTS_ROOT` environment variable to list a different folder.

How the scan works: it uses only Node's built-in file tools, and it only reads.

| Column | How it is worked out |
|---|---|
| Kind | From `package.json` dependencies (Next.js, Vite, Expo and so on), or marker files such as `pubspec.yaml` for Flutter and `requirements.txt` for Python |
| Git | From the `url` line in the project's `.git/config`. Git itself is not run. |
| Last changed | The newest file date up to four folders deep, skipping generated folders like `node_modules`, or the last commit if that is newer |

The result is reused for one minute, so a brand-new folder can take up to a minute to appear.

## How the page works

- Any `.md` file placed in this folder appears in the sidebar as another page, except this README.
- The server only serves `index.html` and markdown files from this folder, and only to this machine.
- Search is a plain keyword match over paragraphs, list items and table rows.
- The open page pings the server every 20 seconds. When the pings stop, the server exits.
