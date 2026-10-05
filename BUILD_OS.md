# Build OS

The one place that records how I build, which tool to use when, where everything is installed, and what should change.

Last inventory: 2026-10-05. This doc is for reading. Nothing here is loaded into Claude sessions, so it costs no tokens.

To read it in the browser, open the Start Menu, type "Build OS" and press Enter. The viewer starts hidden, opens http://localhost:4321, and stops itself a few minutes after the page is closed.

The same viewer has a Projects page in the sidebar: every project folder under `D:\FounderMode`, read live from disk, most recently changed first.

## The big picture

Two AI coding tools are set up on this machine. They do not share anything: instructions, skills and chats are separate for each. Claude Code is the main one going forward.

| | Claude Code | Codex |
|---|---|---|
| Role | Main tool from now on | Used June to September 2026 |
| Default model | Opus | gpt-6-astra, medium reasoning |
| My standing instructions | `~/.claude/CLAUDE.md`: 11 working principles | `~/.codex/AGENTS.md`: how to talk to me, phases across chats, no builds or tests unless asked |
| Global skills | 8 of my own, plus 16 synced from claude.ai | 6 built in |
| Plugins | 3: `vercel`, `ui-ux-pro-max`, `frontend-design` | 4: `teach`, `learn`, `work-pets`, `plugin-management` |
| Saved chats | 89, about 205 MB, across 19 projects | 106, about 645 MB, across 24 projects |
| Chat retention | Deleted after about 30 days | Kept; oldest is from 2026-06-25 |
| Other saved material | 14 plan files, 33 memory notes | 1 memory note |
| Projects with their own skills | caman, listing-hunt, lizen-website, assignment | 4 Buildweek projects (copied skill folder) |

Three things stand out:

1. **The way I like to work is written down for Codex only.** Plain words, one question at a time, and one chat per phase with a handoff document all live in `~/.codex/AGENTS.md`. Claude Code has never seen them.
2. **The same skills exist in several places:** global, plugin, per-project copies, and Codex. Sections 3 and 4 list them.
3. **Chats are the least organised part.** About 195 chats and 850 MB across both tools, with nothing marking which ones matter.

## 1. How I build

Status: proposed, not yet tested on a real project in Claude Code.

This matches how I already work in Codex: one new chat per phase, started with `start phase N`, with a shared status and handoff document so a new chat does not need the old one. The jobs-gmail-dashboard project has a `/phase` command built for it. The table below adds the choice of model to that habit.

| Stage | Model | Output | Notes |
|---|---|---|---|
| Spec and architecture | Opus | Short spec file | Decide stack, data model, scope |
| Phased plan | Opus | Plan file | Per phase: files, interfaces, "done when" checks |
| Implement one phase | Sonnet | Code, type-check and lint passing | Fresh session per phase, reading the plan file |
| Stuck | Opus | Diagnosis | Escalate after two failed attempts, then go back to Sonnet |
| Review | Opus | Fix list | At milestones, on the diff only |

- `/model opusplan` does the Opus-plans, Sonnet-implements switch automatically. The global setting is currently `"model": "opus"`, so everything runs on Opus today.
- The plan file is the handoff. Sonnet does well when the plan has already made the decisions.
- Short sessions are cheaper than long ones, because every turn re-reads the whole history.

## 2. Which tool when

### Design

One design skill leads per task. Stacking two gives conflicting direction and doubles the tokens.

| Task | Use | Why |
|---|---|---|
| App UI: dashboard, admin, settings, tool | `interface-design` | Scoped to exactly this; says it is not for marketing pages |
| Landing or marketing page, new look | `frontend-design` | Smallest skill, focused on a distinctive visual direction |
| Critique, audit or polish of existing UI | `impeccable` (`critique`, `audit`, `polish`) | The only one with dedicated review commands |
| Looking something up: palette, font pairing, chart type, UX rule | `ui-ux-pro-max`, targeted `--domain` query | It is a searchable database, best used as a reference |
| shadcn components and theming | `vercel:shadcn` | Component mechanics, not visual direction |

How sure this is: the split comes from reading each skill's own instructions, not from comparing their output side by side. The only real evidence so far is from caman, where an `/impeccable critique` pass produced a useful top finding and an `/impeccable` full redesign was rejected outright. That is one data point; record more in section 5 as they come.

### Everything else

| Task | Use |
|---|---|
| Multi-step feature, before coding | `writing-plans` |
| End-of-session process learnings | `learn` (writes the project's `learnings.md`) |
| Marketing copy | `copywriting` |
| Removing AI tone from prose | `humanizer` |
| Reel ideas for a finished app | `showcase` |
| React and Next.js performance | `vercel-react-best-practices` |

### Commands I can type

Type these in Claude Code. Each one runs the skill of the same name.

| Command | What it does | Available |
|---|---|---|
| `/learn` | Drafts process learnings from the session for the project's `learnings.md`; shows them for approval before saving | Everywhere. Also in Codex as `$learn` |
| `/writing-plans` | Turns a spec into a step-by-step plan before coding | Everywhere |
| `/humanizer` | Rewrites AI-sounding text | Everywhere |
| `/copywriting` | Writes or improves marketing copy | Everywhere |
| `/showcase` | Reel ideas and hooks for a finished app | Everywhere |
| `/interface-design`, `/frontend-design` | Design skills, see the Design table above | Everywhere |
| `/impeccable` | Design critique, audit, polish and more | caman only |
| `/vercel:deploy`, `/vercel:env`, `/vercel:status`, `/vercel:bootstrap` | Vercel project actions | Everywhere, via the Vercel plugin |
| `teach` | Turns what was just built in the chat into a short local lesson: one real example, a diagram, one recall question. Saves to `~/teach-lessons/`. Needs Python 3.9 or newer | Codex only. Not in Claude Code, see finding 9 |
| `/phase` | Project command | jobs-gmail-dashboard only |

## 3. Inventory: what is installed where

### Global, loaded in every session

| Item | Type | Real location | Source |
|---|---|---|---|
| `copywriting` | skill | `~/.agents/skills`, linked into `~/.claude/skills` | coreyhaines31/marketingskills |
| `frontend-design` | skill | same | anthropics/skills |
| `interface-design` | skill | same | dammyjay93/interface-design |
| `vercel-react-best-practices` | skill | same | vercel-labs/agent-skills |
| `writing-plans` | skill | same | obra/superpowers |
| `showcase` | skill | `D:\FounderMode\Apps\showcase\skill`, linked | own |
| `learn` | skill | `~/.claude/skills/learn` | own |
| `humanizer` | skill | `~/.claude/skills/humanizer` | not tracked |
| `frontend-design` 1.1.0 | plugin | `~/.claude/plugins` | anthropics/claude-code |
| `ui-ux-pro-max` 2.13.0 | plugin, 7 skills | `~/.claude/plugins` | nextlevelbuilder/ui-ux-pro-max-skill |
| `vercel` 0.50.0 | plugin, about 35 skills, 3 agents, session hooks | `~/.claude/plugins` | claude-plugins-official |
| 16 synced skills (pdf, docx, pptx, xlsx, deep-research and others) | skills | `~/.claude/skills/synced` | claude.ai account |
| Working principles, 11 items | instructions | `~/.claude/CLAUDE.md` | own |

The five linked skills are tracked in `~/skills-lock.json`.

### Project-only

| Project | What |
|---|---|
| caman | skill `impeccable` 4.5.0, plus 4 agents: `impeccable-asset-producer`, `-documenter`, `-finish-reviewer`, `-manual-edit-applier` |
| listing-hunt | 9 Prisma skills, in both `.claude/skills` and `.agents/skills` |
| lizen-website | skills `lizen-energy-design`, `nextjs-coding-standards` |
| jobs-gmail-dashboard | command `phase` |
| assignment | skill `pm-assignment-style` |
| Buildweek: clicky-scrapper, heyclicky, nudge_landing, what-is-water | copies of `convex-auth`, `copywriting`, `frontend-design`, `interface-design`, `vercel-react-best-practices`, `writing-plans` |
| Buildweek and Websites: `0.copy-this-skill-folder-content` | the template those copies come from |

### Codex

Codex is a separate tool with its own setup under `~/.codex`. Nothing here is visible to Claude Code.

| Item | Type | Source |
|---|---|---|
| `teach` 0.6.3 | plugin | udayanwalvekar/teach |
| `learn` 1.0.0 | plugin | udayangx/codex-plugins |
| `learn` | prompt, `~/.codex/prompts/learn.md` | own |
| `work-pets` 0.1.6, `plugin-management` 0.1.0 | plugins | OpenAI curated |
| `imagegen`, `openai-docs`, `plugin-creator`, `review-agent`, `skill-creator`, `skill-installer` | built-in skills | Codex |
| `AGENTS.md` | instructions | own |
| `default.rules` | command permission rules | Codex |

What `~/.codex/AGENTS.md` tells Codex:

- **How to talk to me:** plain words, one question at a time with concrete choices, say what it is about to do, explain its tools the first time, no false confidence, match my energy, push back when I am wrong.
- **Phases across chats:** one new chat per phase; each phase has its own instructions, inputs, deliverables and stopping point; `start phase N` is enough to begin.
- **No builds, tests or code review** unless I ask for them in that phase.
- **Short handoffs,** written once, inside the phase commit.
- **Agree the app's job first,** before turning a source document into features.

Only the third of these has an equivalent in `~/.claude/CLAUDE.md`.

Scanned on 2026-10-05: `~/.claude`, `~/.agents`, `~/.codex`, and every folder two levels deep under `D:\FounderMode` (Apps, Websites, Buildweek, assignment, planning, Tools, Founder OS).

Not checked: per-project `CLAUDE.md`, `AGENTS.md` and `learnings.md` files, and the `claude-skills` project folder.

## 4. Findings from the first inventory

1. **`impeccable` is only in caman.** That is why it could not be found from here. It is not available in any other project.
2. **`frontend-design` loads twice,** once as a skill and once as a plugin, with slightly different text.
3. **A second `ui-ux-pro-max` copy sits unused** in `~/.agents/skills`. Only the plugin version loads.
4. **The Vercel plugin loads in every project,** including ones that have nothing to do with Vercel. It adds a session-start block and about 35 skill descriptions each time, and its hook told this session to start building straight away in an empty folder.
5. **Four design skills have overlapping triggers,** so which one fires is partly luck unless you name it.
6. **No global agents or commands exist.** `~/.claude/agents` and `~/.claude/commands` are absent.
7. **Skills are installed three different ways** (linked from `~/.agents`, plugins, plain folders), and `learn`, `humanizer` and `showcase` are not in the lock file.
8. **`learn` exists in four places:** `~/.claude/skills/learn` (the one Claude Code uses), `~/.agents/skills/learn` (identical today), and in Codex as both `~/.codex/prompts/learn.md` and the plugin `learn@udayan`. They can drift apart.
9. **`teach` is installed in Codex only.** This is the command remembered as "explain". It lives at `~/.codex/plugins/cache/teach`, version 0.6.3, from udayanwalvekar/teach. Its README says the same skill works in Claude Code, but it was never installed there, so typing `teach` in Claude Code does nothing special.
10. **A skill set is copied by hand into projects.** `Buildweek\0.copy-this-skill-folder-content` and `Websites\0.copy-this-skill-folder-content` hold six skills that get copied into each new project. Four Buildweek projects carry their own copy, and those copies will go stale. Five of the six are already installed globally; `convex-auth` exists only in these copies.
11. **Impeccable's program is installed for the whole machine** (`~/.impeccable/bin`), even though the skill that uses it is only in caman.
12. **No local MCP servers are configured** in Claude Code. The only ones are the claude.ai connectors (Canva, Claude Docs, Google Drive) and the one that comes with the Vercel plugin.
13. **My working preferences are in Codex only.** The communication rules and the phase-per-chat workflow in `~/.codex/AGENTS.md` are not in `~/.claude/CLAUDE.md`, so Claude Code does not follow them.
14. **Codex never deletes chats.** 106 sessions and about 645 MB have built up since June; the whole `~/.codex` folder is about 1.4 GB.
15. **The Codex `learn` prompt differs from the Claude `learn` skill.** The Codex `learn` plugin matches the Claude skill exactly; the older prompt file does not.

## 5. Learnings

Things observed about the build system itself. Add the date and the project. Promote an entry to `~/.claude/CLAUDE.md` once it holds across projects.

| Date | Project | Learning |
|---|---|---|
| before 2026-10 | caman | `/impeccable critique` gave a useful top finding; a full `/impeccable` redesign was rejected outright |
| 2026-10-05 | build_os | A project-only skill is invisible elsewhere; check this inventory before assuming a skill is available |

## 6. Open decisions

| Decision | Recommendation |
|---|---|
| Make `impeccable` global, or keep it per project? | Keep it per project. Its trigger covers all UI work, so globally it would compete with the other three on every design task. |
| Which `frontend-design` copy to keep? | Keep one, either one. |
| Remove the unused `ui-ux-pro-max` copy in `~/.agents/skills`? | Yes. |
| Vercel plugin: global, or enabled only in Vercel projects? | Per project. |
| Default model: stay on `opus` or switch to `opusplan`? | Try `opusplan` on the next project and record the result in section 5. |
| One install method for all skills? | Decide after the cleanup above. |
| How to keep important chats past 30 days? | Decide before 2026-10-06, when the oldest chats start to age out. See section 7. |

## 7. Chats

Claude Code saves every chat as a transcript file under `~/.claude/projects/<project>/`.

Snapshot on 2026-10-05: 89 chats across 19 projects, about 205 MB in total.

| Project | Chats | MB | Oldest | Newest |
|---|---|---|---|---|
| caman | 20 | 46.2 | 2026-09-08 | 2026-10-03 |
| kapip-website | 17 | 35.3 | 2026-09-06 | 2026-09-13 |
| bandwidth | 12 | 6.7 | 2026-09-08 | 2026-09-18 |
| jobs-gmail-dashboard | 7 | 15.9 | 2026-09-09 | 2026-09-10 |
| aumplus-website | 7 | 9.3 | 2026-09-07 | 2026-09-21 |
| cisqo-white | 6 | 55.4 | 2026-09-14 | 2026-09-14 |
| 13 other projects | 20 | 21.0 | | |

- **Old chats are probably deleting themselves.** The oldest chat anywhere is 30 days old, which matches Claude Code's default of removing transcripts after 30 days. Nothing in `settings.json` overrides it. So the real job is saving the important ones, not deleting the rest.
- **Disk space is not a problem.** 205 MB is small. The value of a cleanup is being able to find the chats that matter.
- **A chat is a poor long-term record.** What is worth keeping from a chat is usually a decision, a plan or a learning. Those belong in the project's plan file, its `learnings.md`, or this doc.

### Codex chats

Codex saves its chats under `~/.codex/sessions` and does not delete them. Snapshot on 2026-10-05: 106 chats, about 645 MB, from 2026-06-25 to 2026-09-24, across 24 projects. These are the only chats left from before September; any Claude Code chats that old have already expired.

### What to do with them

Proposed rule, not yet agreed: before a project goes quiet, run `learn` and save any plan worth keeping into the project, then let the chats expire. For the few chats worth keeping whole, copy the transcript into the project or raise the retention period.


## 8. What to do next

Suggestions in the order I would do them. Nothing here has been done yet.

1. **Decide which chats to keep, today.** The oldest ones reach 30 days on 2026-10-06. Either raise the retention period or run `/learn` in the projects that matter first.
2. **Copy my working preferences from Codex into `~/.claude/CLAUDE.md`.** How to talk to me, and the phase-per-chat workflow. This is the change that will be felt most, since Claude Code is now the main tool.
3. **Remove the duplicates.** Keep one `frontend-design`, delete the unused `ui-ux-pro-max` copy, and pick one home for `learn`. Low risk, and it makes skill selection predictable.
4. **Turn the Vercel plugin on per project** instead of globally. This is the biggest saving in tokens per session.
5. **Run the next project on `/model opusplan`** with a plan file and a fresh session per phase. Record in section 5 whether quality held and whether usage dropped.
6. **Test the design split on the next UI task.** Name the skill explicitly, then record the result in section 5. After three or four entries the table in section 2 will rest on evidence.
7. **Install `teach` into Claude Code.** It is in Codex only today. Copying the skill folder into `~/.claude/skills/teach` should be enough; it needs Python, which is installed.
8. **Replace the copy-this-skill-folder habit.** Anything in that template that should be in every project belongs in the global install; decide where `convex-auth` goes.
9. **Decide what to do with the Codex chats.** They are the only record of work before September. Keep them, or pull out what matters and then clear them.
10. **Finish the inventory:** per-project `CLAUDE.md`, `AGENTS.md` and `learnings.md` files.
11. **Put this folder under git,** so changes to the doc have a history.
12. **Keep a copy of the PowerShell profile in this repo,** so the terminal commands in section 9 survive a reset.
13. **Only after the above,** decide whether anything else here should become a skill or a `CLAUDE.md` line.

## 9. Shortcuts on this machine

Things I set up so I can get somewhere fast. Snapshot on 2026-10-05.

### Terminal commands

Typed in the Windows PowerShell terminal. They live in my PowerShell profile, `Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1`, which was last changed on 2026-10-05 (`web` added).

| Command | What it does | Options |
|---|---|---|
| `apps` | Goes to `D:\FounderMode\Apps` | `apps typeforme` goes straight into that app; Tab completes the name |
| `web` | Goes to `D:\FounderMode\Websites` | `web kapip_website` goes straight into that site; Tab completes the name |
| `lt` | Lists the 10 most recently changed items in the current folder | `lt -n 20` for more, `lt -All` for everything, `lt some\folder` for another folder |
| `lc` | The same, ordered by when each item was created | Same options as `lt` |

- They work in Windows PowerShell only. They are not available in Git Bash or the old Command Prompt.
- Claude Code does not load them when it runs commands, so Claude cannot use `apps` itself.
- The profile file is not saved anywhere else. If the laptop is reset, these are gone.

### Opened by name

Type the name in the Start Menu, or in mysearchbar (Alt + Space).

| Name | What opens | Where it comes from |
|---|---|---|
| Build OS | This doc and the Projects page | `Apps\build_os\launch.ps1` |
| mysearchbar | The search bar itself | `Apps\mysearchbar\dist\mysearchbar.exe` |
| Goal Widget | The goal widget | Installed app, built in `Apps\goal-widget` |

### Starts with Windows

| Name | Added |
|---|---|
| mysearchbar | 2026-10-05 |
| Goal Widget | 2026-10-05 |

### Not set up

- No shortcut command for the `Buildweek` folder.
- No custom keyboard shortcuts inside Claude Code.
- No git short commands.
