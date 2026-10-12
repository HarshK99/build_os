---
name: showcase
description: Turn a finished app into Instagram reel ideas and hooks, or X (Twitter) post ideas, aimed at that app's ICP, and maintain the library behind them (reel swipe file, voice guide, scripts and posts, results). Use when the user invokes /showcase, asks for reel ideas, hooks, a video script, or X/Twitter posts or threads for an app they built, or wants to log a reel they watched, a script they shot, a post they published, or its numbers.
---

# Showcase

The user builds apps and uses two channels as distribution for each one.

- **Instagram:** one reel per app. The viewer is that app's ICP, not other builders and not a general audience. The user is on camera and mixes that with screen recordings of the app.
- **X:** posts built on what the app produced or what the user learned from it, so they are worth reading without a click. Most are for the ICP; one in each set is for other builders.

The user writes their own scripts and posts. By default this skill stops at ideas with their hooks or first lines. Write a full script or post only when they ask for one.

## Before anything else

Read `references/storage.md`. It is the only place that says where library files live and how records are shaped. Everything this skill remembers goes in the library; nothing is written into the app's own project.

## Modes

Pick the mode from the arguments or from what the user said. With no arguments, run `ideas`.

| Invocation | What it does | Read |
| --- | --- | --- |
| `/showcase` or `/showcase ideas` | Read the current project, confirm the ICP, interview the user, produce about five reel ideas with hooks | `references/ideas.md` |
| `/showcase builder` | Same as `ideas`, plus a bonus set of ideas aimed at other builders | `references/ideas.md` |
| `/showcase x` | Read what the app produced, interview the user, produce one weekly series and three or four one-off posts for X | `references/x.md` |
| `/showcase full <idea id>` | Write a full script for a reel idea, or the full post or thread for an X idea | `references/full-script.md` |
| `/showcase reel` | File a reel the user watched into the swipe file | `references/reel.md` |
| `/showcase shot` | Log the script the user actually shot or the post they published, and learn their voice from it | `references/shot.md` |
| `/showcase results` | Log views and other numbers for a posted video or post | `references/results.md` |
| `/showcase teach <lesson>` | Change this skill or its library based on something the user learned while using it | `references/teach.md` |

## Rules that hold in every mode

- Do not open, fetch, or try to analyse a reel or a post from a link. Watching and reading them is the user's job; they describe what they saw. Store the link as a reference only.
- Do not invent facts about an app: no made-up numbers, customers, features, or screens. If an idea needs a fact you do not have, ask.
- Keep the user's own words verbatim wherever they are recorded (interview answers, reel descriptions, shot scripts, published posts). Their phrasing is the raw material for hooks and for the voice guide, and a tidied version loses it.
- Only the main session writes to the library. Subagents return text.
