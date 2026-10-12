# X mode

Goal: hand the user one repeatable weekly series and three or four one-off posts for X, each with its first line.

A reel advertises the app. A post on X has to be worth reading for someone who never clicks: it gives away something the app produced, or something the user learned by using or building it. So this mode starts from the app's by-product and not from its screens. The app is where the post points for more.

## 1. Find the app and its brief

Follow "Finding the app" in `storage.md`.

- **No brief yet:** build one by step 2a of `ideas.md`, and ask its four interview questions and the three in step 2 below in the same message.
- **A brief with no X section:** give the ICP in one line, ask whether it still looks right, and go to step 2.
- **A brief with an X section:** go to step 3.

## 2. First X run for this app: find the by-product

**Read the app's output, lightly.** Ideas mode reads only what a visitor would learn. This mode also reads what the app has produced, because the posts quote it: data files, logs of past runs, exports, whatever the README or spec names as the place results are kept. Read enough to pull real facts and stop. Still do not read implementation code.

Some apps keep nothing (a tool that never writes its results to disk). Then the by-product is what the user noticed while using it, and it comes from the interview alone. Say so, and expect fewer findings ideas.

Write down each fact you may use with the file it came from. A post that quotes a number is checked by strangers, so a fact with no source does not go in an idea.

**Interview.** Ask these three questions once per app. Rough dictated answers are what you want. If the user says "skip", carry on and say the ideas will be weaker for it.

1. What do you do with the app every week?
2. What has it shown you that surprised you?
3. Is there anything in it you would not want public?

The first answer is where a series comes from: whatever the user already repeats can become a post that repeats. The third matters because the app's data is often personal (income goals, clients, their own picks in a contest they are entering), and a post is public the moment it goes out.

**Save the X section** of the brief using the template at the bottom of this file, with the answers verbatim.

## 3. Later X run for this app: refresh

Read the brief, every earlier X ideas run, and every X post with its results. Read the app's output again, since it has changed.

- **If a series is running** (a series idea with status `shot`), lead with the next instalment: the first line and this week's facts, each with its source. This is the main reason to run the mode again.
- Give a short recap: which ideas were posted and how they did, which are unused.
- Ask only what has changed, and whether anything new should stay private.

If earlier results exist, say what they suggest for this round, and be modest about it: one post is one data point.

## 4. Load the library

- The voice guide. Points and samples tagged `written` count for more here than those tagged `spoken`.
- Swipe entries. They describe reels, so give them to the writers only as hook templates that may carry over to a first line. If none fits, use none.

## 5. Write ideas in parallel

Spawn three writers as subagents, in parallel, one per angle.

| Angle | Audience | What it is | Ask for |
| --- | --- | --- | --- |
| Findings | ICP | A one-off post built on something the app's output shows | three ideas |
| Series | ICP | A format that can run every week on fresh output, with this week's instalment as the example | two formats |
| Build story | other builders | How or why the app was built, or what building it taught the user | two ideas |

The build story is in every run, not a bonus as it is for reels. On X a large share of the people who will see the user are builders, so one post for them belongs in the set.

Give every writer the same material, in full, since they start with no context:

- the whole brief, including the X section and the verbatim interview answers
- the facts you collected, each with its source
- what the user wants kept private
- the voice guide
- any swipe entries that fit
- their one angle, and the instruction to stay in it
- the idea format below
- these constraints: the reader has never heard of the app; the post is useful without clicking anything; a single post fits in 280 characters and a thread is three to eight posts; only facts from the list, no invented numbers, customers, or features; nothing the user marked private; a screenshot may only show a screen listed in the brief; if the app has a live URL the call to action is that URL, and if it has none the post stands without one

## 6. Critique cold

Spawn one critic subagent. Give it only:

- a description of the ICP as a person, and one line describing a builder scrolling X
- the first lines, numbered, each marked with which of the two readers it is for, and whether a screenshot is attached

Do not give it the app description, the rest of each idea, or which writer wrote what. Ask, for each first line: would you stop and read on, what do you think the post is about, and what is confusing. Then ask for a ranking.

## 7. Direct

This is your job as the main session.

- drop duplicates and merge near-duplicates
- check every fact against its source, and every idea against what the user wants private
- rework wording toward the voice guide; where the guide is thin, keep the wording plain and do not invent a persona
- choose one series format and three or four one-offs, exactly one of them a build story
- put the series first and say in a line why this format can be repeated

Treat the critic's ranking as evidence, not as the decision. If you overrule it, say so in the idea's critic note.

## 8. Save and present

Save the ideas run with `platform: x`, then show the ideas in the reply. Stop there. In one line, mention that `/showcase full <idea id>` writes any of them out in full.

## Idea format

```
### I<n>: <short title>
- Angle: <findings | series | build story>
- Audience: <icp | builders>
- Form: <single post | thread of n>
- First line:
- Facts to include: <each fact, with its source>
- Attach: <a screen from the brief, or nothing>
- Call to action:
- Repeats: <series only: what changes each week, and where the fresh facts come from>
- Critic note:
- Status: unused
```

Status is `unused`, `chosen`, or `shot`; for a post, `shot` means posted. A series idea stays `shot` once its first instalment is out, and every instalment is logged against the same idea id. Idea numbering continues from the app's earlier runs, reels included.

## Brief section

Add this to the brief, above "Changes".

```
## X
Answers are verbatim.

1. What do you do with the app every week?
2. What has it shown you that surprised you?
3. Anything you would not want public?

### Where the output lives
<file or place: what it holds>

### Keep private
<what must not appear in a post or a screenshot>
```

## Writing a post in full

`/showcase full <idea id>` comes here when the idea is from an X run. The user normally writes the post themself, so run this only when they ask.

1. Read the brief, the idea, and the voice guide. Read each source the idea cites again, so the facts are current.
2. Write the post. The first line is the idea's first line, unchanged unless the user asked for a change. For a thread, number the posts and keep each within 280 characters. Say which post carries the screenshot.
3. Write it the way the voice guide says the user writes. Where the guide is thin, write plainly and short. If a `humanizer` skill is available, run the text through it.
4. Check it: every fact matches its source, nothing private is in it, and it is useful to someone who never clicks.
5. Save it as a draft with `platform: x` and set the idea's status to `chosen`. Show the post in the reply.

The draft is a starting point for the user to rewrite. When it is posted, `/showcase shot` records the final text.
