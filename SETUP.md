# Setup

What is installed where, as it stands. Last full check 2026-10-12; my own skills and instruction files checked 2026-10-15. History is in git, not here.

## Two tools

They share nothing by themselves: instructions, skills and chats are separate.

| | Claude Code | Codex |
|---|---|---|
| Role | Main tool | Still used |
| Model | Opus | gpt-6-luna |
| Instructions | `~/.claude/CLAUDE.md`: pulls in `HOW_I_WORK.md` by an `@` line, then a few Claude-only rules | `~/.codex/AGENTS.md`: a copy of `HOW_I_WORK.md`, rewritten by `node sync-codex.mjs` |
| Skills folder | `~/.claude/skills` | `~/.agents/skills` |
| Chats | `~/.claude/projects/<project>/`, kept 365 days (`cleanupPeriodDays`) | `~/.codex/sessions`, never deleted |
| Lives at | `~/.claude` | `D:\Dev\Codex`, with `~/.codex` as a folder link to it |

**Load check.** `CLAUDE.md` tells Claude to warn me if the line starting "Loaded marker:" in `HOW_I_WORK.md` is missing. Keep that line. The default model catches a broken reference; the smallest one did not. A backstop, not a guarantee.

## Skills

**The rule: one real home, links elsewhere, never a copy.** Links are Windows folder links (junctions).

| Skill | Real home | Linked into |
|---|---|---|
| `build-os`, `product-sense-playbook`, `app-playbook`, `design-playbook`, `website-playbook`, `showcase` | `build_os\skills\` (mine, in git) | `~/.claude/skills` and `~/.agents/skills` |
| `idea-playbook` | `founder_os\skills\` | `D:\FounderMode\ideation\.claude\skills` and `.agents\skills` only, so it loads only in chats opened there |
| `copywriting`, `customer-research`, `frontend-design`, `interface-design`, `vercel-react-best-practices`, `writing-plans`, `learn`, `humanizer`, `frontend-slides` | `~/.agents/skills` | `~/.claude/skills` |
| `teach` 0.6.3 | Codex plugin, plus a copy in `~/.claude/skills/teach` | The one exception: a copy |
| 16 synced skills (pdf, docx, pptx, xlsx, deep-research and others) | `~/.claude/skills/synced`, managed by claude.ai | |

- Lock files: `~/skills-lock.json` (the first five installed) and `~/.agents/.skill-lock.json` (`customer-research`). `learn`, `humanizer` and `frontend-slides` are in neither.
- `learn` has two local edits: the `/learn` wording, and its last step, which sends learnings to the right place. Updating it from its source (udayangx/codex-plugins) would undo both. Codex's own `learn` plugin and its `prompts/learn.md` are older and differ.

### Plugins (Claude Code)

| Plugin | State |
|---|---|
| `ui-ux-pro-max` 2.13.0, 7 skills | On everywhere |
| `vercel` 0.50.0 | Off globally. On per project through `.claude/settings.local.json` in Next.js projects; set to off on purpose in client and static sites. My Claude rules say when to offer it |
| `frontend-design` 1.1.0 | Off; the skill copy is used instead |

### Codex only

Plugins `teach` 0.6.3, `learn` 1.0.0, `work-pets`, `plugin-management`; built-in skills `imagegen`, `openai-docs`, `plugin-creator`, `review-agent`, `skill-creator`, `skill-installer`; command rules in `default.rules`.

### In one project only

| Project | What |
|---|---|
| caman | `impeccable` 4.5.0 and its 4 agents. Its program is installed machine-wide in `~/.impeccable/bin` |
| listing-hunt | 9 Prisma skills |
| lizen-website | `lizen-energy-design`, `nextjs-coding-standards` |
| jobs-gmail-dashboard | `/phase` command |
| assignment | `pm-assignment-style` |
| `Buildweek\0.copy-this-skill-folder-content` | The only copy of `convex-auth` |

Claude Code does not read a project's `.agents/skills`; only Codex does. No local MCP servers are set up; only the claude.ai connectors and the Vercel plugin's.

## Browsers

- Screenshots use the Edge already on the laptop, through `build_os\tools\shot.mjs`.
- Anything that drives a browser from a script uses Playwright 1.62.x and one shared Chromium build, 1234, in `D:\Dev\Playwright`. A new project should pin the same version, or it downloads another build.

## Where things deploy

Client websites go to my own server or Hostinger through `Apps\packages_personal\deploy-package`. My own apps mostly go to Vercel.

## Shortcuts

**Terminal** (Windows PowerShell only; the profile is `Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1`, with no copy anywhere else):

| Command | Goes to |
|---|---|
| `apps [name]` | `D:\FounderMode\Apps`, or straight into that app |
| `web [name]` | `D:\FounderMode\Websites`, or straight into that site |
| `fm [folder] [sub]` | `D:\FounderMode`, one or two levels in. The way to `ideation` and `Buildweek` |
| `lt`, `lc` | The 10 most recently changed, or created, items here. `-n 20`, `-All`, or a folder |

Claude cannot use these; it does not load the profile.

**Start Menu** (also through mysearchbar, Alt + Space):

| Name | Opens |
|---|---|
| Build OS | This folder's viewer, through `launch.ps1` |
| Hunt Reader | One Idea Playbook hunt's files, in Edge, from `founder_os\templates\hunt-reader.html` |
| mysearchbar | `Apps\mysearchbar\dist\mysearchbar.exe`. Starts with Windows |
| Goal Widget | Built in `Apps\goal-widget`. Starts with Windows |
| Opportunity Dashboard | Not checked |

## Backups still on disk

Delete each once the change it protects has held up.

| Backup | Protects | Remove when |
|---|---|---|
| `~/.claude/backups/CLAUDE.md.2026-10-12-before-shared-move` | Moving rules into `HOW_I_WORK.md` | Now: the rules have moved twice since |
| `~/.claude/backups/skills-moved-2026-10-12` | Moving `learn`, `humanizer`, `frontend-slides` to the shared home | Each has been used once from there |
| `D:\FounderMode\.retired\showcase-2026-10-12` | Moving `showcase` into build_os. Its GitHub repo, `HarshK99/showcase`, is separate | `/showcase` has run once from here |
| `~/.codex/AGENTS.md.backup-2026-10-12` | Codex's own old rules | Codex is seen following the copy |
