# Build OS

A single document that records how I build software with AI coding tools, plus a small local page for reading it.

The document covers which tool and skill to use when, what is installed where (Claude Code and Codex), what was found during the inventory, learnings, open decisions, saved chats, and what to do next.

## Files

| File | What it is |
|---|---|
| `BUILD_OS.md` | The document itself. Edit this. |
| `index.html` | The reading page: sidebar of sections, keyword search, light and dark mode. |
| `serve.mjs` | A small local server that gives the page access to the markdown. No dependencies. |
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

## How the page works

- Any `.md` file placed in this folder appears in the sidebar as another document.
- The server only serves `index.html` and markdown files from this folder, and only to this machine.
- Search is a plain keyword match over paragraphs, list items and table rows.
- The open page pings the server every 20 seconds. When the pings stop, the server exits.

## Keeping the document current

`BUILD_OS.md` is a snapshot taken on the date at the top of the file. Re-run the inventory when skills, plugins or tools change, and add to the Learnings section as projects finish.
