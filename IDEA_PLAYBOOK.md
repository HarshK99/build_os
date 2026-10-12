# Idea Playbook

How I get from "I don't know what to build" to one idea worth a product-sense pass.

**This builds on How I Work** (`HOW_I_WORK.md`). This playbook holds only what is particular to finding and choosing an idea. It ends where the product-sense pass in How I Work begins.

Status: draft 1, written 2026-10-12. Not yet used. An AI loads it through the `idea-playbook` skill. Built from two sources: the `customer-research` skill, and a cut-down version of my Build Week ideation notes. Section 8 says what was kept and dropped, section 9 what is still undecided.

## 1. How to use this

- Five steps, in order. One step per sitting is fine.
- The idea comes from what other people complain about in public, not from an interview about me.
- Each step leaves a short file behind. A new chat reads the files, not an old chat.
- It should not be tiring. If a step turns into a long form or a long interview, stop and cut it.

## 2. The steps

| | Step | Question it answers | Output | Gate |
|---|---|---|---|---|
| A | Pick a hunting ground | Whose problems am I going to look at? | First lines of `research.md` | One group and at least three public places named |
| B | Read the complaints | What do they complain about, in their own words? | `research.md` | Top themes ranked, each with real quotes and links |
| C | Shape three directions | What could I build for the top themes? | `directions.md` | Three directions that differ from each other |
| D | Challenge and pick | Which one survives? | `directions.md`, the pick at the top | One chosen, with what would kill it |
| E | Hand over | What is the product? | `product_sense.md` in the new project | The product-sense pass has started |

Files for one hunt live in `D:\FounderMode\planning\<short-name>\`.

## 3. Rules for every step

1. **No questions about me as a person.** Not my history, fears, habits or feelings. The only things an AI may ask about me are what I know and who I can reach, and only in step A.
2. **Evidence is someone's own words, with a link.** A summary without a quote is not evidence.
3. **An unknown stays a question.** Don't fill a gap with a guess about who has the problem or how many of them there are.
4. **Don't reward size.** Feature count and technical difficulty are not reasons to pick an idea.
5. **Prefer a finished result over advice.** An idea where the user does one thing and gets a completed outcome beats one that hands them analysis.

## 4. Step A: pick a hunting ground

A hunting ground is a group of people, or a field, whose problems I can read about in public.

Two questions at most:

1. Which group or field do I want to look at? If I don't know, suggest three from my existing work, such as the kinds of client I have built websites for, or the kinds of tool I have already made.
2. Where do these people talk in public? Suggest places; I confirm.

Write the group and the places at the top of `research.md`.

## 5. Step B: read the complaints

Use the `customer-research` skill, in the mode where it reads what people already say in public, unprompted: forums, Reddit, review sites, communities.

- Look in at least three places.
- Keep quotes exactly as written, each with its link.
- Rank the themes by how often they come up and how strongly people feel.
- For each theme, note what people do today instead, and what they have tried that failed.
- Stop when the top themes stop changing, or at about thirty quotes. More is not better.

If I already have material, such as interview notes, reviews or support messages, the same skill can digest that first.

Asking people directly, by interview or survey, is optional. It is never a gate in this playbook.

## 6. Step C: shape three directions

From the top themes, write three directions that differ in kind, not three versions of one. Five lines each:

1. **The person and the moment.** One kind of person, at the point the problem hits.
2. **The pain and today's workaround.** With a quote from `research.md`.
3. **The hard part.** What existing tools and a plain AI chat do not already solve.
4. **User does X, gets Y.** One action, one finished outcome.
5. **The riskiest guess, and a 30-minute test.** What has to be true, and the cheapest way to find out.

## 7. Step D: challenge and pick

Ask four questions of each direction, and put the answers in one table:

1. Could one ordinary AI chat prompt deliver the same result?
2. Who already sells or provides this?
3. Does it solve the hard part, or only the easy half?
4. Where are the first users, and can I reach them? The places the complaints came from count.

Then the AI recommends three things: the safest option, the one with the highest ceiling, and the first to drop. I choose.

For the chosen one, write one line on what would kill it.

Then step E: start a project for it and begin the product-sense pass in How I Work. The research file and the chosen direction are its starting material, so the pass should be quick.

## 8. Where this came from

| Part | Source | What happened to it |
|---|---|---|
| Step B | `customer-research` skill, from coreyhaines31/marketingskills | Used as it is, mostly its public-signal mode |
| Step A | Ideation notes, "Understand the builder" | Cut to two questions about access. The interview about me is gone |
| Step C | Ideation notes, "Generate directions" | Cut from fifteen things per direction to five |
| Step D | Ideation notes, "Challenge the directions" | Cut from ten tests to four |
| Step E | Ideation notes, "Refine the selected idea" | Replaced by the product-sense pass |
| Rules 4 and 5 | Ideation notes, working rules | Kept |

Dropped on purpose:

- Everything about Build Week: event facts, scoring tracks, Saturday targets, Tuesday channels.
- The builder interview and its long guardrail. Rule 1 replaces both.
- Three versions of the core idea, the twelve things to lock, and the "why did it fail" exercise.
- Interviews and surveys as a required step.
- Personas.

The original notes are untouched in `Buildweek\ideation-helper`.

## 9. Undecided

| Question | My default in this draft |
|---|---|
| Where do the files for a hunt live? | `D:\FounderMode\planning\<short-name>\`. Chosen because that folder exists; not agreed |
| Is thirty quotes the right stopping point? | A guess, to keep it from being tiring |
| Should the Opportunity Dashboard feed step A? | Not linked yet. It answers "what should I build this week" from contests and bounties |
| When is asking people worth it? | Left optional. Decide after one real hunt |
| Does `customer-research` work well without a product yet? | It expects a product to research for. Untested for finding one |
| Are four challenge questions enough? | Unknown until an idea picked this way is built |
