# Log

What actually happened when the playbooks were used. This is the evidence Build OS changes from: a rule changes when a run here shows it should, not before.

## Runs

One line each time a project goes through a playbook, or a stage of one. Add it when the stage ends.

The measure from `product_sense.md`: in the next three runs, did the AI ask before building, and did it pick the design skill the Design Playbook says? Target 3 out of 3.

| Date | Project | Playbook and stage | Asked before building? | Right skill? | What broke or didn't fit |
|---|---|---|---|---|---|
| | | | | | |

## Design results

One line per design task. Claude offers it when the task ends. After three or four, correct the skill table in the Design Playbook, and switch off a skill that keeps losing.

| Date | Project | Task | Skill | Good? | Why |
|---|---|---|---|---|---|
| | | | | | |

## Learnings about the build system

Learnings about one project stay in its `learnings.md`. Ones about a kind of work go into that playbook, and ones about every kind of work go into `HOW_I_WORK.md`, both after I approve them. Only learnings about Build OS itself go here.

| Date | Project | Learning |
|---|---|---|
| 2026-10-05 | build_os | A project-only skill is invisible elsewhere; check `SETUP.md` before assuming a skill is available |
| 2026-10-15 | build_os | Moving this folder broke a path in the `learn` skill, which lives outside it and so was missed. After a move, search `~/.agents/skills` and `~/.claude` for the old path too |
