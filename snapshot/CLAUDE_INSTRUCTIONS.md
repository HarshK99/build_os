# How I work

Shared across every AI tool I use. The file below is the source; edit it there, not here.

@D:/FounderMode/build_os/HOW_I_WORK.md

**Check that it loaded.** If no line starting "Loaded marker:" is in your instructions,
begin your first reply with "Warning: your shared instructions file did not load", then
read `D:\FounderMode\build_os\HOW_I_WORK.md` yourself and follow it.

# Claude Code only

Rules that depend on how Claude Code itself works. Anything that would hold in another
AI tool belongs in the shared file above.

- **Pick a long command's execution mode before running it.** Run builds, installs,
  and test suites that may exceed the tool timeout with `run_in_background: true`
  from the start — a timeout-then-background handoff can orphan worker processes.

- **Stopping a dev server you started leaves Node behind on Windows.** Stopping the
  background `npm run dev` task does not end the Node process it spawned, so it keeps
  holding the port. Find the process ID on the port, check its command line is that
  project's Next.js server, stop it, then confirm the port is free.

- **Keep Codex's copy of the shared file current.** After changing
  `D:\FounderMode\build_os\HOW_I_WORK.md`, run
  `node D:\FounderMode\build_os\sync-codex.mjs`. It rewrites `~/.codex/AGENTS.md`.

- **Pick one design skill per task, as the Design Playbook's section 2 says, and say
  which.** Never run two design skills on one task. When the task is done, offer to add
  one line to the design results log in `D:\FounderMode\build_os\LOG.md`, under "Design results".

- **The Vercel plugin is off by default and switched on per project.** If a project
  deploys to Vercel, or uses Next.js with a server, and no `vercel:` skills are available,
  offer to turn the plugin on: add `"enabledPlugins": { "vercel@claude-plugins-official": true }`
  to the project's `.claude/settings.local.json`. It takes effect in the next chat.
  Don't offer it for a static site hosted elsewhere, such as a client site on Hostinger,
  or where that file already sets it to `false`: there it was switched off on purpose.
