# Build OS

A single document that records how I build software with AI coding tools, plus a small local page for reading it.

The document covers which tool and skill to use when, what is installed where (Claude Code and Codex), what was found during the inventory, learnings, open decisions, saved chats, and what to do next.

## Files

| File | What it is |
|---|---|
| `BUILD_OS.md` | The document itself. Edit this. |
| `WEBSITE_PLAYBOOK.md` | The client-website playbook: seven stages from first conversation to handover. Shows as its own page in the sidebar. |
| `HOW_I_WORK.md` | My standing instructions for any AI tool: how to talk to me, one chat per phase, and which steps wait for me. `~/.claude/CLAUDE.md` pulls this file in by reference, so this folder must not be moved without updating that line. |
| `product_sense.md` | Why this project exists: goal, user, the decision it serves, the pains picked, the first version and how success is measured. |
| `sync-codex.mjs` | Rewrites Codex's instruction file (`~/.codex/AGENTS.md`) as a copy of `HOW_I_WORK.md`. Run it after changing that file: `node sync-codex.mjs`. |
| `CONTENT_PLAYBOOK.md` | The content playbook: how an app becomes reels and X posts. A map of the `showcase` skill. |
| `skills/showcase/` | The showcase skill: its instructions, one file per mode. Linked into `~/.agents/skills` and `~/.claude/skills`. |
| `library/showcase/` | What the showcase skill remembers: the voice guide, filed reels, and one folder per app. The skill writes here. |
| `skills/website-playbook/` | A small skill that tells an AI to read `WEBSITE_PLAYBOOK.md` when the work is a client website. Linked into `~/.agents/skills` and `~/.claude/skills`; it points at the playbook and does not copy it. |
| `tools/shot.mjs` | The shared screenshot tool every project calls, so none installs its own. Needs `npm install` once inside `tools/`. Its options are in the comments at the top of the file. |
| `index.html` | The reading page: sidebar of sections, keyword search, light and dark mode. |
| `serve.mjs` | A small local server that gives the page the markdown and scans the project folders. No dependencies. |
| `launch.ps1` | Starts the server hidden if it is not running, then opens the page. |

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

The sidebar has a second page, Projects. It lists every project folder under the folder two levels above this one (here, `D:\FounderMode`), most recently changed first.

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

## Keeping the document current

`BUILD_OS.md` is a snapshot taken on the date at the top of the file. Re-run the inventory when skills, plugins or tools change, and add to the Learnings section as projects finish.
