# Ideas mode

Goal: hand the user about five reel ideas, each with a hook, aimed at the app's ICP. The reel exists to get that person to try the app, so every idea starts from the viewer's problem and not from how the app was built.

## 1. Find the app and its brief

Follow "Finding the app" in `storage.md`. Then take one of the two paths below.

## 2a. First run for this app: build the brief

**Read the project, lightly.** You need what a visitor to the app would learn, not how it is built, so this step should cost a handful of file reads whatever the size of the repo. If this session already built or worked on the app, use what is in the conversation and read nothing more than you need.

Otherwise go in this order and stop as soon as you can draft the four items below:

1. The README and the package metadata.
2. The landing page or home page copy.
3. A spec or product doc, if one sits at the top level or in a docs folder. Read one, not all.
4. The list of routes or pages, from file names only (a glob, not a read). Open a page file only when its name does not tell you what the screen is.
5. The last twenty or so commit subjects.

Do not read implementation code (components, API handlers, database, tests, config), and do not hand the repo to a subagent to sweep. Anything still unclear after this list is quicker and more reliable to ask the user, who is about to correct your draft anyway.

You are collecting:

- what the app does, in one or two plain sentences
- who it is for and what problem it removes
- the screens and flows that exist, by name, so ideas only point at things that can be recorded
- the live URL, for the call to action

**Show the user your draft** of the ICP and the pain, briefly, and ask them to correct it. The repo often describes features and says little about the customer, so expect corrections and treat the user's version as the truth.

**Interview.** In the same message, ask these four questions. The user may dictate rough answers; that is what you want. If they say "skip", carry on without answers and say that the ideas will be weaker for it.

1. Who did you picture while building this? A real person if possible, and what were they doing before the app existed?
2. What does that person say out loud when the problem hits? Their words, not yours.
3. What is the "oh" moment in the app, the one thing you would show first?
4. Is there anything surprising: a number, something you learned, or something this person believes that is wrong?

The reason for the interview: the code says what the app does, and hooks come from how the viewer talks about their problem. That lives in the user's head.

**Save the brief** using the template at the bottom of this file. Record the interview answers verbatim. Then copy two or three of the user's most characteristic sentences into the Samples section of the voice guide, each with its source id.

## 2b. Later run for this app: refresh

Read the brief, every earlier ideas run, and every script with its results. Give the user a short recap: the ICP in one line, which ideas were shot and how they did, which ideas are still unused. Ask only what has changed since last time and whether the ICP still looks right. Update the brief if anything changed.

If earlier results exist, say what they suggest for this round, and be modest about it: one video is one data point.

## 3. Load the library

- The voice guide.
- Swipe entries. Prefer entries whose `icp` or `category` matches this app. If few match, use the rest as well. If the swipe file is empty, carry on and tell the user it is empty, since that is the main thing that will improve the ideas over time.

## 4. Write ideas in parallel

The user asked for this skill to work as a creative director with several writers, so spawn the writers as subagents, in parallel, one per angle. Separate writers are worth it here because each one commits to its angle instead of drifting to the same average idea.

Angles:

| Angle | Opens on |
| --- | --- |
| Pain-first | The moment the problem hits, in the ICP's own words (interview question 2) |
| Demo-first | The "oh" moment on screen (interview question 3) |
| Belief flip | Something the ICP believes that is wrong, or a surprising true number (interview question 4) |

Three writers, one per interview answer, is the starting point: each has its own raw material, so their ideas differ. Swipe patterns are not a separate writer. Every writer gets the swipe entries and should build an idea on a pattern where one fits its angle, citing the entry.

Give every writer the same material, in full, since they start with no context:

- the whole brief, including the verbatim interview answers
- the voice guide
- the relevant swipe entries
- their one angle, and the instruction to stay in it
- the idea format below
- these constraints: a 30 to 60 second Instagram reel; the user is on camera, mixed with screen recordings of the app; the viewer is the ICP and has never heard of the app; only screens listed in the brief may be shown; no invented numbers, customers, or features; the call to action sends people to the live app

Ask each writer for three ideas and nothing else.

**Builder bonus.** Only when the user asked for it (`/showcase builder` or in words), spawn one more writer whose audience is other builders and whose angle is the build story. Save its ideas in a separate ideas run with `audience: builders`.

## 5. Critique cold

Spawn one critic subagent. Give it only:

- a description of the ICP as a person: who they are, what their day is like, what the problem costs them
- the hooks, numbered, each as spoken line, on-screen text, and first visual

Do not give it the app description, the rest of each idea, or which writer wrote what. A person scrolling has none of that, and the critic is standing in for that person. Ask it, for each hook: would you stop, what do you think this video is about, and what is confusing. Then ask for a ranking.

## 6. Direct

This is your job as the main session. From the writers' ideas:

- drop duplicates and merge near-duplicates
- check every idea against the brief: the screens exist, the facts are true
- rework wording toward the voice guide; where the guide is thin, keep the wording plain and do not invent a persona
- choose about five, spread across angles
- mark the top two and say why in a line each

Treat the critic's ranking as evidence, not as the decision. If you overrule it, say so in the idea's critic note.

## 7. Save and present

Save the ideas run with `platform: instagram`, then show the ideas in the reply. Stop there. In one line, mention that `/showcase full <idea id>` writes a full script for any of them.

## Idea format

```
### I<n>: <short title>
- Angle:
- Pain it targets:
- Hook, spoken:
- Hook, on-screen text:
- Hook, first visual: <on camera, or which screen>
- Then show: <screens or flows from the brief, in order>
- Call to action:
- Swipe pattern: <swipe entry id, or none>
- Critic note:
- Status: unused
```

Status is `unused`, `chosen`, or `shot`. Continue the idea numbering from the app's earlier runs, X runs included.

## Brief template

```
---
id: <app-slug>
type: brief
created: <yyyy-mm-dd>
updated: <yyyy-mm-dd>
project_path: <absolute path>
app_name:
app_url:
category:
---

# <App name>

## What it does
<one or two plain sentences>

## ICP
<who they are, what their day is like, as confirmed by the user>

## Pain
<the problem and what it costs them>

## Interview
Answers are verbatim.

1. Who did you picture?
2. What do they say out loud?
3. The "oh" moment
4. Anything surprising

## Screens and flows
<name: what it shows>

## Call to action
<where the reel sends people>

## Changes
<dated notes from later runs>
```
