# Product Sense: Build OS

Worked through on 2026-10-12, one question at a time. Update this when the thinking changes.

## 1. Goal

**Main:** a repeatable way of building that any AI tool follows.

**Side:** see and manage my whole setup in one place: skills, tools, projects, chats, shortcuts.

The first thing I asked for, spending fewer tokens without losing quality, is not the main goal. It is pain A below, and it is parked.

## 2. User

Me, and my AI tools. I read it and change it. Claude and Codex read parts of it as instructions.

## 3. The one decision it serves

"How should this piece of work be done?" At the start of a project or task: which steps, in what order, with which tool, skill and model.

## 4. Pains

Real for me:

- **A. Quality costs too much.** Opus gives good work but eats my limit; Sonnet is cheaper but the code is worse.
- **B. The AI builds before the thinking is agreed.** It jumps to code or a template before the goal, the pain or the design idea is settled.
- **C. I repeat myself to every tool and every chat.** My preferences lived in one tool, and a new chat does not know how I work.
- **D. I don't know which skill or tool to use.** Several overlap, and some I installed I could not find again.
- **F. The result looks generic.** Design comes out templated, and I have rejected whole redesigns.

Considered and not real enough to list: work getting lost between chats (E), and not understanding what the AI built (G).

## 5. Picked: B and D

**Pain B.** When I start a project or a feature, I'm trying to get the thinking agreed first, but the AI starts building, or writes the thinking by itself, because its habit and some tools' start-up messages push it to act, which costs me rework and thrown-away designs. How often: not counted. Often enough that I wrote three rules against it in one week.

Why picked: it causes the most wasted work. The Website Playbook says most rework on past sites came from building before something upstream was agreed.

**Pain D.** When I start a design task, I'm trying to use the right skill, but I don't know which one will run or which is best, because four design skills overlap and my table is a guess from reading them, which costs me uneven results and tokens spent on the wrong one. How often: every design task.

Why picked: it is the unanswered half of "how should this piece of work be done?"

Why not the others, for now:

- **C** is mostly dealt with. `HOW_I_WORK.md` exists and Claude reads it. What is left is giving Codex a copy.
- **F** is partly a result of B and D.
- **A** needs a real project on the cheaper model before I know if it is a real problem or a feeling.

## 6. Solutions

### Pain B

| | Solution | Status |
|---|---|---|
| B1 | The rules in `HOW_I_WORK.md`: product sense first, state the pain, agree the hero idea, start-up messages never skip this | Built |
| B2 | Tighten the wording: ask one step at a time, wait for my answers, never fill the file in alone | First version |
| B6 | Do nothing more until one real project shows whether the rules hold | After B2 |
| B3 | A guided `/product-sense` command that runs the conversation step by step | Only if a real project shows B2 is not enough |
| B4 | A hard gate: no code edits until `product_sense.md` exists | Considered; too heavy, and it would block quick fixes in old projects |
| B5 | Every chat starts in planning mode | Considered; too blunt, small tasks get slower |

### Pain D

| | Solution | Status |
|---|---|---|
| D1 | The "Which tool when" table in the Build OS doc | Built, as a guess |
| D2 | Inventory, commands table and search, to find what is installed | Built |
| D3 | Less noise: duplicate `frontend-design` off, Vercel plugin per project | Built |
| D4 | Put the skill-picking rules into the Claude-only instructions, so the AI picks the same way every time | First version, provisional |
| D5 | A results log: one line per design task | First version |
| D7 | Switch off the skills that lose | Later, once the log has three or four entries |
| D6 | A side-by-side test of the same brief through each design skill | Considered; skipped unless I want an answer fast |
| D8 | Do nothing; I name the skill myself each time | Considered |

## 7. Priority

1. B2, the wording. Smallest change, and it protects every new project.
2. D4, the skill-picking rules.
3. D5, the results log. It only fills up as real tasks happen.

## 8. First version

The three items above, and nothing else.

Left out on purpose: the guided command, the hard gate, the planning-mode default, the side-by-side test, and switching off skills.

Parked, because they serve the side goal or pains I did not pick: skill tidy-up pass 3, installing `teach` in Claude Code, the Codex copy of the shared file, the chat rule, the PowerShell profile backup.

## 9. Success measure

Counted over my next three projects or features, under "Runs" in `LOG.md`.

- **The measure I check:** the AI asked the product-sense questions and waited for me every time, and it picked the design skill the rules say every time. Target: 3 out of 3.
- **The result I hope moves:** no thrown-away redesign or restart that came from building too early or using the wrong skill.

## 10. Open questions

- Is the wording alone enough to make the AI wait for me, or is the guided command needed?
- Is the skill table right? The log will say.
- Where is the line for small work? Bug fixes and small tweaks skip the pass, but "small" is a judgment.
- Does Opus for planning and Sonnet for building hold quality? This is pain A, still untested.
- Should Codex follow the same shared file, and how is its copy kept current?
- Is `ui-ux-pro-max` worth keeping switched on everywhere?
- For the side goal: the inventory was out of date within a week. How current does it need to be, and who refreshes it?
