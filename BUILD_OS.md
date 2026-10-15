# Build OS

How I build with AI tools: which playbook to follow, which tool to use, and what to fix next. What is installed where is in `SETUP.md`.

To read it in the browser, open the Start Menu, type "Build OS" and press Enter. The sidebar also lists every playbook, How I Work, my Claude rules, and a Projects page of every folder under `D:\FounderMode`.

## The pipeline

What to spend time on, and what to build, is decided before this folder: in Founder OS, `D:\FounderMode\founder_os`, which holds my strategy, the Idea Playbook and its hunts. Build OS starts once an idea is picked.

| Step | Playbook | When | Command |
|---|---|---|---|
| 1. Find what to build | Idea Playbook, in Founder OS | I don't know what to build next | `/idea-playbook`, only in `D:\FounderMode\founder_os` |
| 2. Decide what it is for | Product Sense Playbook | Every project starts here, and every new feature on a built one | `/product-sense-playbook` |
| 3. Build it | App Playbook for my own apps, Website Playbook for a client site | After product sense | `/app-playbook`, `/website-playbook` |
| 3a. Set its look | Design Playbook, used inside step 3 | Before any screen or page is built | `/design-playbook` |
| 4. Show it | Content Playbook | After an app is finished | `/showcase` |

A project started before this pipeline gets `/build-os` first: it reports the gaps, where the build really is and where the docs disagree, then starts step 2. It changes no code.

## The layers

| Layer | What | When an AI reads it |
|---|---|---|
| Base | `HOW_I_WORK.md`: how to talk to me, one chat per phase, which steps wait for me | Every chat, in both tools |
| Playbooks | One per kind of work, each a `*_PLAYBOOK.md` in this folder | Only for that work. Each has a small skill that says "read this file"; the skill never copies it |
| Project files | `product_sense.md`, `STATUS.md` and the like | In that project |

A playbook never repeats the base. It opens by saying what it builds on, and holds only what is different or extra.

To add a playbook: write `NAME_PLAYBOOK.md` here, add `skills\name-playbook\SKILL.md` that points at it (copy `skills\website-playbook`), and link that folder into `~/.agents/skills` and `~/.claude/skills`.

The Content Playbook is the exception: its rules live in the `showcase` skill, what it remembers in `library\showcase\`, and `CONTENT_PLAYBOOK.md` is only the map.

## Which tool when

Design skills are chosen by the Design Playbook. For everything else:

| Task | Use |
|---|---|
| Looking at a page, or a screenshot | `node D:\FounderMode\build_os\tools\shot.mjs [route]` from the project folder. Edge by default; opens local `.html` mock-ups; `--mobile`, `--click`, `--scroll-in`. Options are at the top of the file. How I Work has the rules |
| Starting a page from a template, such as image prompts | The Templates page in this viewer. It lists `build_os\templates`; copy one into the project's `docs` |
| Reading an Idea Playbook hunt | The Hunts page in this viewer, or "Hunt Reader" from the Start Menu |
| End-of-session learnings | `/learn`, which writes the project's `learnings.md` |
| Marketing copy | `/copywriting` |
| Removing AI tone from anything published | `/humanizer`. Not for docs, skills or instructions |
| Reading public complaints, or digesting interviews | `/customer-research`. Step B of the Idea Playbook |
| A slide deck as a web page | `/frontend-slides` |
| React and Next.js performance | `vercel-react-best-practices` |
| A short lesson on what was just built | `teach` |
| A very detailed test-first plan, only when I ask | `/writing-plans`. Not part of any playbook: it saves to `docs/superpowers/plans/` and plans in small steps, neither of which matches my phase rules |
| Vercel actions | `/vercel:deploy`, `/vercel:env`, `/vercel:status`, only in projects where the plugin is on |

## Models

Proposed, not yet tested.

| Stage | Model |
|---|---|
| Spec, architecture and phase plan | Opus |
| One phase of building | Sonnet, in a fresh chat reading the plan |
| Stuck after two tries | Opus for the diagnosis, then back to Sonnet |
| Review at a milestone | Opus, on the diff only |

`/model opusplan` does the Opus-plans, Sonnet-builds switch by itself. Today everything runs on Opus.

## Learnings and results

`LOG.md` holds what happened when the playbooks were used: one line per run, per design task, and per learning about Build OS itself. Learnings about one project go in its `learnings.md` via `/learn`; about one kind of work, into that playbook; about every kind of work, into `HOW_I_WORK.md`, then `node sync-codex.mjs`.

## Backlog

**Frozen since 2026-10-15:** no new playbook or rule until a real run is logged in `LOG.md`. Fixes to things that are wrong are fine.

In order. Each playbook keeps its own open questions at its end.

1. **Run a real project through the pipeline** and log it in `LOG.md`: did the AI ask before building, and pick the right skill?
2. **Try `opusplan`** on that project, and log whether quality held.
3. **Decide the chat rule:** once a project's docs are done, its chats can go, or keep everything. Retention is 365 days meanwhile.
4. **Decide the Codex chats:** the only record of work before September. Keep, or pull out what matters.
5. **Check the Vercel switch:** open a Next.js project and confirm the `vercel:` skills load.
6. **Try `teach` and `/showcase` once each** in Claude Code, then remove the backups listed in `SETUP.md`.
7. **Review the seven project `learnings.md` files** (66 principles) for anything worth promoting.
8. **Decide where `convex-auth` lives.**
9. **Check Codex follows How I Work,** and decide the two details its old file had: recording my go-ahead for builds in the handoff, and a manual browser walkthrough not counting as a test.
10. **Save a copy of the PowerShell profile** in this folder.
11. **Finish the inventory:** per-project instruction files, and what "Opportunity Dashboard" opens.
