# Build OS

The one place that records how I build, which tool to use when, where everything is installed, and what should change.

Last inventory: 2026-10-12 (first one: 2026-10-05). This doc is for reading. Nothing here is loaded into Claude sessions, so it costs no tokens.

To read it in the browser, open the Start Menu, type "Build OS" and press Enter. The viewer starts hidden, opens http://localhost:4321, and stops itself a few minutes after the page is closed.

The same viewer has a Projects page in the sidebar: every project folder under `D:\FounderMode`, read live from disk, most recently changed first.

Other pages in the sidebar: Website Playbook (how I take a client website from first conversation to handover), Content Playbook (how I turn an app into reels and X posts), How I Work (my standing instructions for any AI tool), and Claude Instructions (a live view of `~/.claude/CLAUDE.md`).

## The big picture

Two AI coding tools are set up on this machine. They do not share anything: instructions, skills and chats are separate for each. Claude Code is the main one, and Codex is still in use.

| | Claude Code | Codex |
|---|---|---|
| Role | Main tool | Still used; newest chat is from 2026-10-12 |
| Default model | Opus | gpt-6-luna |
| My standing instructions | The shared `HOW_I_WORK.md`, pulled in by reference from `~/.claude/CLAUDE.md`, which also holds a few Claude-only rules | `~/.codex/AGENTS.md`: a copy of the shared `HOW_I_WORK.md` |
| Global skills | 9 of my own, plus 16 synced from claude.ai | 6 built in |
| Plugins | 3 installed: `ui-ux-pro-max` on everywhere, `vercel` on per project, `frontend-design` off | 4: `teach`, `learn`, `work-pets`, `plugin-management` |
| Saved chats | 65, about 275 MB, across 25 projects | 108, about 646 MB, across 26 projects |
| Chat retention | Kept for 365 days since 2026-10-12; it was 30, see section 7 | Kept; oldest is from 2026-06-25 |
| Other saved material | 14 plan files, 23 memory notes (index files not counted) | 1 memory note |
| Projects with their own skills | caman, listing-hunt, lizen-website, assignment | None since 2026-10-12; the Buildweek copies were deleted |

Three things stand out:

1. **The way I like to work now has one shared home.** Plain words, one question at a time, and one chat per phase with a status file are in `HOW_I_WORK.md` in this folder. Claude Code reads it by reference, and Codex reads a copy, both since 2026-10-12.
2. **The same skills exist in several places:** global, plugin, per-project copies, and Codex. Sections 3 and 4 list them.
3. **Chats are the least organised part.** About 173 chats and 920 MB across both tools, with nothing marking which ones matter. Claude Code has already deleted its oldest week.

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

### The three layers

| Layer | What | When an AI reads it |
|---|---|---|
| Base | `HOW_I_WORK.md`: the rules for every piece of work | Every chat |
| Playbooks | One per kind of work. Today: the Website Playbook, for client websites, and the Content Playbook, for reels and X posts about an app | Only when doing that kind of work. Each playbook has a small skill that tells the AI to read the playbook file; the skill does not copy it |
| Project files | `product_sense.md`, `STATUS.md` and the like: this project's facts | In that project |

To add a playbook: write `NAME_PLAYBOOK.md` in this folder, add a folder under `skills\` with a short `SKILL.md` that points at it, and link that folder into `~/.agents/skills` and `~/.claude/skills`. `skills\website-playbook` is the example to copy.

The Content Playbook is built the other way round, because it began as a working skill: its rules are in `skills\showcase\`, what it remembers is in `library\showcase\`, and `CONTENT_PLAYBOOK.md` is the map for me.

A playbook never repeats the base. It opens by saying it builds on How I Work, and holds only what is different or extra for that kind of work, including any change to the product-sense steps.

### Starting a new project

1. Do the product-sense pass first and save it as `docs/product_sense.md`. `HOW_I_WORK.md` has the steps.
2. If the project is Next.js or will go live on Vercel, turn on the Vercel plugin for it. Claude should offer; if it does not, say "turn on Vercel here". It is one small settings file in the project, and it takes effect in the next chat. Nothing is downloaded or copied.
3. For a client website, follow the Website Playbook page.

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

Two rules now sit on top of this table. For a marketing page, `HOW_I_WORK.md` says to agree the hero idea in one line before building and never default to the split hero. For a client website, the Website Playbook page sets the full order of work.

### Everything else

| Task | Use |
|---|---|
| Multi-step feature, before coding | `writing-plans` |
| End-of-session process learnings | `learn` (writes the project's `learnings.md`) |
| Marketing copy | `copywriting` |
| Removing AI tone from prose | `humanizer` |
| Reel ideas or X posts for a finished app | `showcase` |
| A presentation or slide deck as a web page | `frontend-slides` |
| React and Next.js performance | `vercel-react-best-practices` |
| Looking at a page, or taking a screenshot | The shared tool: `node D:\FounderMode\Apps\build_os\tools\shot.mjs [route]`, run from the project's folder. Edge by default, `--chromium` when I say so. `HOW_I_WORK.md` has the rules |
| Starting a project, or adding a feature | No skill. `HOW_I_WORK.md` requires a `product_sense.md` first, and the pain written down before any new feature |

### Commands I can type

Type these in Claude Code. Each one runs the skill of the same name.

| Command | What it does | Available |
|---|---|---|
| `/learn` | Drafts process learnings from the session for the project's `learnings.md`; shows them for approval before saving | Everywhere. Also in Codex as `$learn` |
| `/writing-plans` | Turns a spec into a step-by-step plan before coding | Everywhere |
| `/humanizer` | Rewrites AI-sounding text | Everywhere |
| `/copywriting` | Writes or improves marketing copy | Everywhere |
| `/showcase` | Reel ideas and hooks, or X posts, for a finished app | Everywhere |
| `/frontend-slides` | Builds an animated HTML presentation, or converts a PowerPoint file | Everywhere |
| `/website-playbook` | Loads the Website Playbook, works out which stage the project is in, and checks the gate before it. It also loads by itself when the work is a client website | Everywhere, and in Codex |
| `/interface-design`, `/frontend-design` | Design skills, see the Design table above | Everywhere |
| `/impeccable` | Design critique, audit, polish and more | caman only |
| `/vercel:deploy`, `/vercel:env`, `/vercel:status`, `/vercel:bootstrap` | Vercel project actions | Everywhere, via the Vercel plugin |
| `teach` | Turns what was just built in the chat into a short local lesson: one real example, a diagram, one recall question. Saves to `~/teach-lessons/`. Needs Python 3.9 or newer | Codex, and Claude Code since 2026-10-12. Type `teach` after building something |
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
| `showcase` | skill | `Apps\build_os\skills\showcase`, linked into both tools. Moved here on 2026-10-12 from its own project | own |
| `learn` | skill | `~/.agents/skills`, linked, since 2026-10-12 | own |
| `humanizer` | skill | same, since 2026-10-12 | not in the lock file |
| `frontend-slides` | skill | same, since 2026-10-12; added 2026-10-09 | not in the lock file |
| `teach` 0.6.3 | skill | `~/.claude/skills/teach`, copied from the Codex install on 2026-10-12 | udayanwalvekar/teach |
| `website-playbook` | skill | `Apps\build_os\skills\website-playbook`, linked into both tools, since 2026-10-12 | own |
| `frontend-design` 1.1.0 | plugin, switched off on 2026-10-12 | `~/.claude/plugins` | anthropics/claude-code |
| `ui-ux-pro-max` 2.13.0 | plugin, 7 skills | `~/.claude/plugins` | nextlevelbuilder/ui-ux-pro-max-skill |
| `vercel` 0.50.0 | plugin, 40 skills, 3 agents, session hooks. Off globally since 2026-10-12; on in the 48 Next.js projects | `~/.claude/plugins` | claude-plugins-official |
| 16 synced skills (pdf, docx, pptx, xlsx, deep-research and others) | skills | `~/.claude/skills/synced` | claude.ai account |
| How I Work | shared instructions for any AI tool | `Apps\build_os\HOW_I_WORK.md`, pulled into `CLAUDE.md` by an `@` reference line | own |
| Claude-only rules, 4 items | instructions | `~/.claude/CLAUDE.md`, last changed 2026-10-12 | own |

The first five linked skills are tracked in `~/skills-lock.json`.

**The rule for skills: one real home, links elsewhere, never a copy.** The home is `~/.agents/skills`. Codex reads that folder directly, and Claude Code gets a link (a Windows folder link, so there is no second copy). Eight skills follow this. Two skills I wrote myself, `showcase` and `website-playbook`, have their real home in `Apps\build_os\skills` so they are kept in git, and both tools link to that. The exceptions are installs a tool manages for itself: plugins, the 16 synced skills, and `teach`, which Codex installed and Claude has a copy of. Those update through their own installer, not by hand.

On 2026-10-12 the 13 rules in `CLAUDE.md` that would hold in any AI tool were moved into `HOW_I_WORK.md`, word for word. That includes the three added since the first inventory: the product-sense pass, stating the pain before a new feature, and agreeing the hero concept. One rule stayed behind because it names a Claude Code setting (running long commands in the background). The old file is saved at `~/.claude/backups/CLAUDE.md.2026-10-12-before-shared-move`.

`CLAUDE.md` also tells Claude to warn me at the start of a chat if the shared file did not load, and to try reading it directly. It checks for one fixed line near the top of `HOW_I_WORK.md` that starts "Loaded marker:", so the rest of that file can change freely; that line must stay. Tested by breaking the reference on purpose: the default model flagged the problem, the smallest model did not. Treat it as a backstop, not a guarantee.

### Project-only

| Project | What |
|---|---|
| caman | skill `impeccable` 4.5.0, plus 4 agents: `impeccable-asset-producer`, `-documenter`, `-finish-reviewer`, `-manual-edit-applier` |
| listing-hunt | 9 Prisma skills, in both `.claude/skills` and `.agents/skills` |
| lizen-website | skills `lizen-energy-design`, `nextjs-coding-standards` |
| jobs-gmail-dashboard | command `phase` |
| assignment | skill `pm-assignment-style` |
| Buildweek: `0.copy-this-skill-folder-content` | the one remaining copy of `convex-auth`, kept because it exists nowhere else |

Until 2026-10-12, four Buildweek projects and two `0.copy-this-skill-folder-content` template folders each held copies of six skills. Thirty-five of those copies matched their originals file for file and were deleted. Each of the six places still has a `skills-lock.json`, which records where the skills came from.

### Browsers for automated use

Playwright is the tool that drives a browser from a script. Each version of it downloads its own matching Chromium into `D:\Dev\Playwright`.

One Chromium build is kept, number 1234, about 0.7 GB. Everything that drives a browser uses it:

| Uses it | Playwright version |
|---|---|
| clicky-scrapper | 1.62.1 |
| durgsta | 1.62.1, updated from 1.57.0 on 2026-10-12 |
| pg-essays-pdf | 1.62.0, in its own Python environment |
| website-content-scrapper | 1.62.0, through the Python 3.11 install, updated from 1.61.0 on 2026-10-12 |
| The shared screenshot tool, when asked for Chromium | 1.62.1 |

durgsta and website-content-scrapper were updated to match but not run afterwards; I am not using them now and will fix anything deeper when I next do. A new project that needs Playwright should pin the same version, or it will download another build.

On 2026-10-12 four older Chromium builds and an old Puppeteer browser were deleted, about 3.6 GB in all. assam-floods-map still has a leftover Playwright in its `node_modules` that expects a deleted build; nothing in that project uses it. kapip's own screenshot script and its Playwright install were removed, and a leftover check script in assam-floods-map. Screenshots now go through one tool in `build_os\tools`, which uses the Edge already on the laptop. Before that, no instruction file mentioned how to look at a page; it was said in each chat.

### Product-sense files

`HOW_I_WORK.md` asks for a `product_sense.md` at the start of every project. On 2026-10-12 three projects have one, all under `docs/`: hackathons, whimfree and ne_synth. build_os does not.

### Codex

Codex is a separate tool with its own setup under `~/.codex`. Nothing here is visible to Claude Code.

| Item | Type | Source |
|---|---|---|
| `teach` 0.6.3 | plugin | udayanwalvekar/teach |
| `learn` 1.0.0 | plugin | udayangx/codex-plugins |
| `learn` | prompt, `~/.codex/prompts/learn.md` | own |
| `work-pets` 0.1.6, `plugin-management` 0.1.0 | plugins | OpenAI curated |
| `imagegen`, `openai-docs`, `plugin-creator`, `review-agent`, `skill-creator`, `skill-installer` | built-in skills | Codex |
| `AGENTS.md` | instructions. Since 2026-10-12 a copy of `HOW_I_WORK.md`, rewritten by `node sync-codex.mjs` in this folder. The older hand-written file is saved next to it as `AGENTS.md.backup-2026-10-12` | own |
| `default.rules` | command permission rules | Codex |

What the older `~/.codex/AGENTS.md` told Codex, before it became a copy of the shared file:

- **How to talk to me:** plain words, one question at a time with concrete choices, say what it is about to do, explain its tools the first time, no false confidence, match my energy, push back when I am wrong.
- **Phases across chats:** one new chat per phase; each phase has its own instructions, inputs, deliverables and stopping point; `start phase N` is enough to begin.
- **No builds, tests or code review** unless I ask for them in that phase.
- **Short handoffs,** written once, inside the phase commit.
- **Agree the app's job first,** before turning a source document into features.

All five are covered by the shared `HOW_I_WORK.md`, the fifth through its product-sense rules. Claude Code reads that file by reference, and Codex reads a copy. Two details from the older Codex file are not in the shared one: recording my go-ahead for builds and tests in the handoff, and treating a manual browser walkthrough as separate from a test run.

Scanned on 2026-10-05 and again on 2026-10-12: `~/.claude`, `~/.agents`, `~/.codex`, and every folder two levels deep under `D:\FounderMode` (Apps, Websites, Buildweek, assignment, planning, Tools, Founder OS).

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

### What changed by 2026-10-12

All fifteen findings above still hold. New since then:

1. **Claude Code did delete old chats.** 89 chats became 65. Every chat for kapip-website (17), bandwidth (12) and jobs-gmail-dashboard (7) is gone, along with 7 of caman's 20.
2. **Codex is still in use.** Two new chats, the newest from 2026-10-12, and its model changed from gpt-6-astra to gpt-6-luna.
3. **`~/.claude/CLAUDE.md` grew from 11 to 14 principles.** The communication rules and phase workflow from Codex were not among them; item 8 below fixes that.
4. **One new global skill, `frontend-slides`.** Like `learn`, `humanizer` and `showcase`, it is not in the lock file, so four of the nine are now untracked.
5. **A `.trash` folder appeared in `~/.claude/skills`** on 2026-10-12, holding four items. Not checked what they are.
6. **Nothing from section 8 has been done,** apart from putting this folder under git.
7. **A new Start Menu entry, "Opportunity Dashboard",** was added. Not checked what it opens.
8. **Corrections to earlier findings.** Codex reads `~/.agents/skills` as its own skills folder, so the `ui-ux-pro-max` and `learn` folders there were never unused; they are what Codex uses (finding 3 was wrong about that). The `.trash` folder in Claude's skills folder holds older versions of four synced skills, put there by Claude's own syncing. And Claude Code does not read a project's `.agents/skills`, so the Buildweek project copies only ever affected Codex.
9. **Skills now have one home.** On 2026-10-12 `learn`, `humanizer` and `frontend-slides` were moved to `~/.agents/skills` with links for Claude, joining the five already set up that way. Codex now sees `humanizer` and `frontend-slides` too. The folders as they were are saved in `~/.claude/backups/skills-moved-2026-10-12`.
10. **Also done on 2026-10-12:** chat retention raised to 365 days; the shared `HOW_I_WORK.md` created and wired into `~/.claude/CLAUDE.md`; and the 13 universal rules moved into it. A fresh test chat answered questions from the shared file, so the reference loads. Also that day: the duplicate `frontend-design` plugin was switched off, and the Vercel plugin was moved from global to per project.

### Where projects are deployed

Checked on 2026-10-12 across 80 project folders (parts of multi-part folders counted separately). These are signs, not proof: Vercel files in the folder, GitHub's record of who deployed the repo, and deploy scripts that mention Hostinger, `deploy-package` or a server.

| Where | Projects | Examples |
|---|---|---|
| Vercel | 22 | caman, whimfree, bandwidth, prompt-speak, sleepx_web, namma |
| Own server or Hostinger | 18 | kapip, aquai, aumplus, cisqo-white, lizen-website, the wavelink parts, sevenseas |
| Web project, no sign of any host | 24 | b3_website, jbe_website, ylitix, prit_art, ne_synth |
| Not a web project | 17 | mysearchbar, typeforme, goal-widget, the Flutter apps |

- One project, accountx-master, shows both and is counted in both rows.
- Client websites mostly go to my own server through `deploy-package`. Vercel is used mostly for my own apps.
- A project with no GitHub repo and no Vercel link cannot be told apart from one that was never deployed.

## 5. Learnings

Things observed about the build system itself. Add the date and the project. Promote an entry to `HOW_I_WORK.md` once it holds across projects.

| Date | Project | Learning |
|---|---|---|
| before 2026-10 | caman | `/impeccable critique` gave a useful top finding; a full `/impeccable` redesign was rejected outright |
| 2026-10-05 | build_os | A project-only skill is invisible elsewhere; check this inventory before assuming a skill is available |

### Design results log

One line per design task. Claude is told to offer this line when a design task ends. After three or four entries, correct the Design table in section 2, and switch off any skill that keeps losing.

| Date | Project | Task | Skill used | Good? | Why |
|---|---|---|---|---|---|
| before 2026-10 | caman | Critique of existing screens | `impeccable` (critique) | Yes | Its top finding was useful |
| before 2026-10 | caman | Full redesign | `impeccable` (new work) | No | Rejected outright |

## 6. Open decisions

| Decision | Recommendation |
|---|---|
| Make `impeccable` global, or keep it per project? | Keep it per project. Its trigger covers all UI work, so globally it would compete with the other three on every design task. |
| Which `frontend-design` copy to keep? | Decided 2026-10-12: the skill copy. The plugin is switched off in `settings.json`, not uninstalled, so it can be turned back on. |
| Remove the unused `ui-ux-pro-max` copy in `~/.agents/skills`? | No. It is not unused: Codex reads that folder, so this is Codex's copy. |
| Vercel plugin: global, or enabled only in Vercel projects? | Decided 2026-10-12: off globally, on in every Next.js project through `.claude/settings.local.json`. 48 projects have the switch. Four of them (caman, claude-skills, lizen-website, wavelink_profile) keep that file in git, so it shows there as a changed file. |
| Default model: stay on `opus` or switch to `opusplan`? | Try `opusplan` on the next project and record the result in section 5. |
| One install method for all skills? | Decided 2026-10-12: one real home in `~/.agents/skills`, links elsewhere, never a copy. See section 3. |
| What to do with the copy-this-skill-folder templates and the Buildweek project copies? | Done on 2026-10-12: the copies were deleted. One copy of `convex-auth` is kept in the Buildweek template folder. Still open: where `convex-auth` should live, and whether to delete the leftover `skills-lock.json` files. |
| How long to keep chats? | Raised from 30 to 365 days on 2026-10-12, as a holding step. Still to decide: delete a project's chats once its documentation is done, or keep everything. See section 7. |
| Should build_os have a `product_sense.md`? | Done on 2026-10-12. See the Product Sense page. Main goal: a repeatable way of building that any AI follows. Picked pains: the AI builds before the thinking is agreed, and not knowing which skill to use. |

## 7. Chats

Claude Code saves every chat as a transcript file under `~/.claude/projects/<project>/`.

Snapshot on 2026-10-12: 65 chats across 25 projects, about 275 MB in total. A week earlier it was 89 chats across 19 projects.

| Project | Chats | MB | Oldest | Newest |
|---|---|---|---|---|
| caman | 13 | 40.5 | 2026-10-01 | 2026-10-03 |
| assignment-afb | 6 | 56.8 | 2026-10-09 | 2026-10-09 |
| cisqo-white | 6 | 76.4 | 2026-09-14 | 2026-10-06 |
| typeforme | 4 | 2.8 | 2026-10-04 | 2026-10-10 |
| aumplus-website | 4 | 8.8 | 2026-09-21 | 2026-09-21 |
| assignment | 3 | 2.9 | 2026-09-23 | 2026-09-24 |
| mysearchbar | 3 | 1.5 | 2026-10-05 | 2026-10-10 |
| hackathons | 3 | 10.1 | 2026-10-05 | 2026-10-12 |
| 17 other projects | 23 | 62.1 | | |

- **Old chats delete themselves after 30 days.** On 2026-10-05 the oldest chat was from 2026-09-06; on 2026-10-12 the oldest is from 2026-09-13. Nothing in `settings.json` overrides the default. The chats for kapip-website, bandwidth and jobs-gmail-dashboard are all gone.
- **How the deletion works:** each time Claude Code starts, it removes chats that have had no activity for longer than the `cleanupPeriodDays` setting in `~/.claude/settings.json`. With no setting, that is 30 days. It goes by age only; it does not know whether a project's documentation is done.
- **Retention is now 365 days.** Set on 2026-10-12. Nothing more will be deleted until a chat is a year old. The chats already deleted cannot be recovered.
- **Disk space is not a problem.** 275 MB is small. The value of a cleanup is being able to find the chats that matter.
- **A chat is a poor long-term record.** What is worth keeping from a chat is usually a decision, a plan or a learning. Those belong in the project's plan file, its `learnings.md`, or this doc.

### Codex chats

Codex saves its chats under `~/.codex/sessions` and does not delete them. Snapshot on 2026-10-12: 108 chats, about 646 MB, from 2026-06-25 to 2026-10-12, across 26 projects. These are the only chats left from before mid-September; any Claude Code chats that old have expired.

### What to do with them

Proposed rule, not yet agreed: before a project goes quiet, run `learn` and save any plan worth keeping into the project, then let the chats expire. For the few chats worth keeping whole, copy the transcript into the project or raise the retention period.


## 8. What to do next

The Product Sense page now sets the priority. Its first version was made on 2026-10-12: tighter product-sense wording, skill-picking rules for Claude, and a design results log. What matters next is the measure: over my next three projects or features, did the AI ask before building, and did it pick the design skill the rules say?

The list below is everything else, in the order I would do it. Most of it serves the side goal and is parked until then.

1. **Decide the chat rule.** Retention was raised to 365 days on 2026-10-12, so nothing is being lost while this is open. The idea to settle: once a project's documentation is done (`product_sense.md`, plans, `learnings.md`), its chats can go; until then they stay.
2. **Finish the shared instructions.** `HOW_I_WORK.md` exists and Claude Code points at it. The universal rules have been moved in, it loads in a fresh Claude chat, and Codex has a copy. Still to do: polish the wording with use, and check in Codex that it follows the copy.
3. **Finish the skill tidy-up.** Done on 2026-10-12: the `frontend-design` plugin is off, so that skill shows once, and the `learn` skill now says `/learn` instead of `$learn`. Also done that day: `learn`, `humanizer` and `frontend-slides` moved to the one shared home with links. The Buildweek and template copies were deleted too. Still to do: decide where `convex-auth` lives.
4. **Check the Vercel change in real use.** Done on 2026-10-12: the plugin is off globally and on in the 48 Next.js projects. Still to do: open a chat in a Next.js project and confirm the `vercel:` skills are there, and type `/context` in a non-web project to see what was saved.
5. **Run the next project on `/model opusplan`** with a plan file and a fresh session per phase. Record in section 5 whether quality held and whether usage dropped.
6. **Test the design split on the next UI task.** Name the skill explicitly, then record the result in section 5. After three or four entries the table in section 2 will rest on evidence.
7. **Try `teach` in Claude Code.** Installed on 2026-10-12 by copying the skill folder. A fresh chat lists it, but it has not been run there yet. After building something, type `teach`.
8. **Remove the backups in section 10** once the changes they protect have held up in real use.
9. **Decide what to do with the Codex chats.** They are the only record of work before September. Keep them, or pull out what matters and then clear them.
10. **Finish the inventory:** per-project `CLAUDE.md`, `AGENTS.md` and `learnings.md` files, the `.trash` folder in the skills folder, and what "Opportunity Dashboard" opens.
11. **Keep a copy of the PowerShell profile in this repo,** so the terminal commands in section 9 survive a reset.
12. **Only after the above,** decide whether anything else here should become a skill or a `CLAUDE.md` line.

## 9. Shortcuts on this machine

Things I set up so I can get somewhere fast. Snapshot on 2026-10-12.

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
| Opportunity Dashboard | Not checked | Added between 2026-10-05 and 2026-10-12 |

### Starts with Windows

| Name | Added |
|---|---|
| mysearchbar | 2026-10-05 |
| Goal Widget | 2026-10-05 |

### Not set up

- No shortcut command for the `Buildweek` folder.
- No custom keyboard shortcuts inside Claude Code.
- No git short commands.

## 10. Backups to remove later

Made on 2026-10-12 while changing the setup. Each one is the old version of something, kept in case the change needs undoing. Delete a row's backup once its change has held up in real use.

| Backup | Where | What it protects | Safe to remove when |
|---|---|---|---|
| Old `CLAUDE.md`, with all 14 rules in it | `~/.claude/backups/CLAUDE.md.2026-10-12-before-shared-move` | Moving the rules into `HOW_I_WORK.md` | A few real chats have followed the shared file |
| Old `learn`, `humanizer` and `frontend-slides` folders | `~/.claude/backups/skills-moved-2026-10-12` | Moving those skills to the one shared home | Each of the three has been used once from its new place |
| The old showcase project, with its git history and about ten changes that were never committed there | `D:\FounderMode\.retired\showcase-2026-10-12` | Moving the showcase skill and library into build_os | `/showcase` has been run once from its new home on a real app. Its GitHub repo, `HarshK99/showcase`, is older than this folder; archive or delete that separately |
| Old Codex instruction file | `~/.codex/AGENTS.md.backup-2026-10-12` | Replacing Codex's own rules with a copy of the shared file | Codex has been seen following the copy, and its two missing details are either added to the shared file or dropped |

Not backed up, because nothing was lost:

- The 35 deleted skill copies. Each matched its original file for file, and heyclicky's are also in its git history.
- The `frontend-design` plugin and the Vercel plugin. Both were switched off, not uninstalled; one setting turns each back on.
