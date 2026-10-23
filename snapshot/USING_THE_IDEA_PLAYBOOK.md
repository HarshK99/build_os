# Using the Idea Playbook

How to start and run a hunt in practice. The rules themselves are in `IDEA_PLAYBOOK.md`; this is the how-to.

## Starting a chat

1. Open a terminal in this folder: `fm founder_os`.
2. Start Claude Code there, or Codex. Both pick up the skill from this folder.
3. Type `/idea-playbook`, or say it in plain words: "I don't know what to build, let's start a hunt".

The skill only loads in chats opened in `founder_os`. In any other folder, `/idea-playbook` isn't there.

## What happens in the chat

The AI reads the playbook, the Now, Priorities and Lessons sections of `FOUNDER_OS.md`, and `HOW_I_DECIDE.md`. Then it says in one line which step and route the hunt is on. Each chat does one step and stops at that step's gate.

| Step | I type | What I do | What it writes |
|---|---|---|---|
| A. Pick a group | "Start a new hunt" | Answer at most three questions: which group, where they talk online, who I can reach. Say whether the hunt is for income or discovery | A new folder `hunts\<name>\`, with the top of `research.md` |
| B. Read complaints | "Continue the `<name>` hunt" | Nothing; the AI reads forums and reviews | Ranked complaints with real quotes and links, in `research.md` |
| C. Three directions | Same | Read them | `directions.md` |
| D. Pick one | Same | Choose from the AI's three recommendations | The pick, at the top of `directions.md` |
| E. Talk to three people | Same | The AI drafts short messages. I send them, have the conversations, and tell the AI what each person said | A "Conversations" section in `research.md` |
| F. Hand over | Same | Income hunt: send a paid offer. Discovery hunt: start a project | The offer and the answers, or a new project |

To continue a hunt in a new chat, say "continue the `<name>` hunt". The AI works out where it stands from the files, so no memory of the old chat is needed.

## The two routes

Chosen at step A:

- **Route 1, complaints:** start from a group of people and read what they complain about.
- **Route 2, funded startups:** start from an area I know, look at AI startups recently funded there, and read what their users still can't get done. Not tried yet.

## Rules the AI holds me to

- **No one reachable, no hunt.** The hunt stops at step A until at least one person I can reach is named.
- **Step E is never skipped.** No building, no project and no offer before three real conversations. The only thing allowed earlier is one landing page.
- **No questions about me as a person,** only what I know and who I can reach.

## Reading the results

Open the "Hunt Reader" shortcut from the Start Menu. It opens the Build OS viewer at its Hunts page, which shows every hunt and its files.

## Where to start now

The service track's next step in `FOUNDER_OS.md` is to list the groups I can already reach. That is step A's third question, so a good first chat is:

> `/idea-playbook` start a new hunt for the income track — help me list groups I can already reach

Known weak spot: on the artists hunt, step B found no complaints from people in India. It's an open question in the playbook's section 8, so expect the AI to struggle there until the playbook is refined.
