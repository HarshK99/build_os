---
name: build-os
description: Check a project against my Build OS and get it ready for phase-by-phase work. Use when I type /build-os, or say "run Build OS on this project", "check this against Build OS", or ask where a project stands against my way of building. Mostly for projects started before Build OS existed. Reports gaps, where the build really is, and contradictions between docs and code, then starts the product-sense pass. Changes no code.
---

# Build OS check

Bring one project in line with how I build, without touching its code. It builds on How I Work, which you already have; follow it throughout (plain words, one question at a time with options, no false confidence).

## Read first

Read these before saying anything. If one can't be read, say which and carry on with the rest.

1. `D:\FounderMode\build_os\BUILD_OS.md`, sections 1 and 2.
2. The project's own instruction files: `CLAUDE.md`, `AGENTS.md`, and any `.claude/settings*.json`.
3. Its docs: everything in `docs/` (PRD, architecture, plan, status, product sense, design, learnings) and the README.
4. The recent git log, with file stats, and the code itself: enough to know what is really built, not just what the docs claim.

Don't run the build, tests or a code review. Type-check and lint are fine if they help.

## Then report, in this order

1. **Gap table.** Three columns: what Build OS asks for · what this project has · the gap. Cover at least: `docs/product_sense.md`, `docs/STATUS.md`, `learnings.md`, a spec (PRD), a phase plan in the How I Work format (inputs, deliverables, "done when" split into what you can check and what I check, stopping point), a feature table traced to product sense, `docs/design.md`, and the Vercel plugin where the project deploys to Vercel. Keep it short.
2. **Where the build really is.** Phase by phase against the plan: done, partly done, or not started, each with its evidence (files, commits). Say plainly what can't be told from the repo, such as whether it is deployed.
3. **Contradictions.** Anything in the code that disagrees with the PRD or architecture doc, and any doc that disagrees with another. Flag likely bugs as likely, untested.

## Then start the product-sense pass

If `docs/product_sense.md` doesn't exist, run the product-sense pass from How I Work, one step at a time, each as a pick-from-options question. Suggest answers from the PRD and the code. Write the file only after I've answered every step.

If it already exists, skip the pass. Instead, check the feature table against it: does each feature trace to the goal, the decision or a pain, and does anything built serve nothing?

## Stop

After the report and the product-sense pass (or the feature check), stop and offer the next steps that follow, usually: write STATUS.md, bring the plan into phase format, fix the doc contradictions. Do each only when I say so. Never change code as part of this check.
