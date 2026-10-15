# App Playbook

How I take one of my own apps from an idea to a working first version, one phase at a time.

**This builds on How I Work** (`HOW_I_WORK.md`), which holds how to talk to me, one chat per phase, and which steps wait for me. The Product Sense Playbook and the Design Playbook hold their own stages; this playbook says the order, and what is extra for an app. Client websites follow the Website Playbook instead.

Status: draft. SleepX was brought in line with it; no app has gone through it from the start. Section 4 lists what is open.

## 1. The pipeline

Do not start a stage until the gate before it has passed.

| # | Stage | Output | Gate |
|---|---|---|---|
| 1 | Product sense | `docs/product_sense.md`, by the Product Sense Playbook | The picked pains are agreed |
| 2 | Spec | `docs/PRD.md`, with the feature table in its scope section | Every feature traces to product sense, and what is out of scope is written down |
| 3 | Design direction | `docs/design.md` and `docs/design/mockups/`, by the Design Playbook | One direction picked, and every screen in the feature table mocked in it |
| 4 | Architecture and plan | Stack and data model in `docs/ARCHITECTURE.md`; the phase plan in `docs/PLAN.md`, unless the project already uses other names | Every phase has the parts in section 2 |
| 5 | Build | Code, `docs/STATUS.md` | Each phase meets its own "done when" |
| 6 | Learn | `learnings.md`, via `/learn` | Run before the project goes quiet |

An app that already exists but was built before this playbook: run `/build-os` first. It reports the gaps and where the build really is, then starts at stage 1.

## 2. The phase plan

Each phase has:

- **Goal,** in one line. Work that doesn't serve it is noted for later, not added.
- **Inputs:** the files the phase must read, so a new chat can start from them.
- **Deliverables:** what exists when it is done.
- **Done when,** split in two: what the AI can check itself, and what needs me or something outside (logins, a deploy, a third-party setup). My part goes first where it can.
- **Stopping point:** where the chat stops, even if the next phase looks easy.

Phases then run as "One chat per phase" in How I Work says: `start phase N`, one phase per chat, the status file updated in the same commit.

## 3. Extra for apps

- **A new feature on a built app** goes back to the Product Sense Playbook's section 3 (state the pain) and then to its row in the feature table, before it gets a phase.
- **Which model per stage** is under "Models" in Build OS. It is proposed, not yet tested.
- **Deploy:** if the app goes live on Vercel, or is Next.js with a server, the Vercel plugin is turned on for it. My Claude rules say how.

### While building

- **Work out a setting from another instead of asking for both.** When two settings are tied by a fixed rule, such as a database's pooled and direct addresses that differ by one part, derive one from the other in code rather than failing and asking me for both.
- **Check every secret at start-up, and name each one missing.** The app stops at start with a list of every missing setting. It is the only way to debug secrets you are not allowed to read: that list, plus the number of settings the loader reports, says exactly what is absent.
- **Two views of the same data share one helper and one component, said up front.** A per-day and a per-week view of the same numbers are one feature twice. Build one calculation and one display component for both, and say so in the plan before writing either.

## 4. Open

| # | Question | Note |
|---|---|---|
| 1 | Is `docs/PLAN.md` the right name for the plan? | Projects so far use different names. Fixed here as the default, not yet used |
| 2 | Does every app need an architecture doc, or only those with a server or a database? | Unknown until a small app goes through |
| 3 | Run the playbook on one new app, start to finish | None has yet |
