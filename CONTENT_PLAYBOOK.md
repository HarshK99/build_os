# Content Playbook

How I turn something I built into posts: Instagram reels and X posts for each app.

**This builds on How I Work** (`HOW_I_WORK.md`). This page only describes what is particular to content. The working rules live in the `showcase` skill, which an AI loads when I ask for reel ideas, hooks, a script or X posts; this page is the map for me.

Status: the skill has been used on one app, typeforme. Moved into build_os on 2026-10-12 from its own project, `Apps\showcase`.

## 1. What it is for

I build apps and use two channels to get each one in front of people.

| Channel | What goes out | Who it is for |
|---|---|---|
| Instagram | One reel per app. I am on camera, mixed with screen recordings | That app's ideal customer, not other builders |
| X | Posts built on what the app produced or what I learned from it, worth reading without a click | Mostly the ideal customer; one in each set is for other builders |

I write my own scripts and posts. By default the skill stops at ideas with their hooks or first lines. It writes a full script or post only when I ask.

## 2. The steps for one app

| # | Step | Command | What I get |
|---|---|---|---|
| 1 | Ideas for a reel | `/showcase` | It reads the project, confirms who the customer is, asks four questions, and gives about five ideas with hooks |
| 2 | Ideas for X | `/showcase x` | It reads what the app produced, asks three questions, and gives one weekly series and three or four one-off posts |
| 3 | A full draft, if I want one | `/showcase full I3` | The full script for idea I3, or the full post or thread if I3 is an X idea |
| 4 | I shoot or post it | Mine to do | |
| 5 | Record what I actually used | `/showcase shot` | The script as shot or the post as published is saved, and the voice guide learns from it |
| 6 | Record how it did | `/showcase results` | Views and other numbers are saved against that script or post |

Run these inside the project I just finished.

## 3. Other commands

| Command | What it does |
|---|---|
| `/showcase builder` | Step 1, plus bonus ideas for other builders |
| `/showcase reel` | Files a reel I watched and described. Works from any folder |
| `/showcase teach <lesson>` | Changes the skill or its library from something I learned using it, then commits and pushes this repository |

## 4. Rules that always hold

- It never opens or analyses a reel or post from a link. Watching and reading are my job; I describe what I saw.
- It never invents facts about an app: no made-up numbers, customers, features or screens.
- My own words are kept exactly as I said them. They are the raw material for hooks and for the voice guide.

## 5. Where things live

| What | Where |
|---|---|
| The skill's instructions | `skills\showcase\` in this folder. Linked into `~/.claude/skills` and `~/.agents/skills` |
| The library: what the skill remembers | `library\showcase\` in this folder |
| The voice guide | `library\showcase\voice.md` |
| Reels I have filed | `library\showcase\swipe\` |
| One folder per app: brief, ideas, drafts, scripts with results | `library\showcase\apps\` |

`skills\showcase\references\storage.md` is the one file that says where the library is and how its records are shaped. If the library moves, change it there.

## 6. Not covered

- Posts that are not about one app, such as a post about closing a direction or starting over. An earlier idea for this, a journal of my building journey turned into X posts, was planned in `Buildweek\content_agent` and tried once by hand on 2026-09-18. My note from that trial: the first draft felt partly like generic AI writing. It is not built, and nothing from it was moved here.
- Other channels, such as LinkedIn or YouTube.

## 7. Undecided

| Question | Where it stands |
|---|---|
| Is one reel per app the right amount? | Unknown until a few have results recorded |
| Should journey posts get their own mode? | Only if I keep wanting to write them |
| Does the skill work in Codex? | Linked there since 2026-10-12, not tried |
