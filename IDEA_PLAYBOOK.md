# Idea Playbook

How I get from "I don't know what to build" to one idea that real people have confirmed, ready for a product-sense pass.

**This builds on How I Work** (`HOW_I_WORK.md`). This playbook holds only what is particular to finding and choosing an idea. It ends where the product-sense pass in How I Work begins.

Status: draft 3, written 2026-10-13. Draft 1 was used once, on the `artists` hunt, through step C. Draft 2 made talking to people a gate. Draft 3 adds a second route for finding the idea, and allows one landing page before step E. An AI loads this file through the `idea-playbook` skill. Section 8 says what is still undecided.

## 1. How to use this

- Six steps, in order. One step per sitting is fine.
- The idea comes from other people's problems, not from an interview about me. There are two routes for finding them, and a hunt uses one. They differ only in steps A and B.
- Nothing gets built, and no project is started, until three people have been talked to. That is step E, and it is the one hard part. Everything else is kept light so the effort goes there. The one exception is a single landing page, under the limits in step E.
- Each step leaves a short file behind. A new chat reads the files, not an old chat.
- If any other step turns into a long form or a long interview, stop and cut it.

## 2. The steps

| | Step | Question it answers | Output | Gate |
|---|---|---|---|---|
| A | Pick a hunting ground | Whose problems am I going to look at, and can I reach them? | First lines of `research.md` | One group, at least three public places, and the people I could reach, named |
| B | Read the complaints | What do they complain about, in their own words? | `research.md` | Top themes ranked, each with real quotes and links |
| C | Shape three directions | What could I build for the top themes? | `directions.md` | Three directions that differ from each other |
| D | Challenge and pick | Which one survives? | `directions.md`, the pick at the top | One chosen, with what would kill it |
| E | Talk to three people | Do real people have this problem, in their own words? | `research.md`, a section of conversations | Three conversations held and written down |
| F | Hand over | What is the product? | `product_sense.md` in the new project | The product-sense pass has started |

### Routes

A route is a way of finding the problem. Pick one at the start of step A and write it on the first line of `research.md`. This applies the same way whether I am starting fresh or changing direction on something I already built.

| | Route 1: complaints | Route 2: funded startups |
|---|---|---|
| Starts from | A group of people I can reach | An area I know, and the startups recently funded in it |
| Step A | Pick the group | Pick the area, list the startups, name their customers as the group |
| Step B | Read what the group complains about | Study each product's three key features, then read what its users complain about |
| Steps C to F | The same | The same |

A new route is one more column here, plus its own part in steps A and B. Steps C to F are written once and shared, so the gate at step E is the same on every route.

Files for one hunt live in `D:\FounderMode\planning\<short-name>\`.

To read them as a page, open "Hunt Reader" from the Start Menu and choose the hunt's folder. It is one page for every hunt, `templates\hunt-reader.html` in this folder, and it reads the `.md` files live. A hunt needs no HTML file of its own.

## 3. Rules for every step

1. **No questions about me as a person.** Not my history, fears, habits or feelings. The only things an AI may ask about me are what I know and who I can reach.
2. **Evidence is someone's own words.** A public quote comes with its link. A conversation comes with its date and who the person is. A summary without their words is not evidence.
3. **An unknown stays a question.** Don't fill a gap with a guess about who has the problem or how many of them there are.
4. **Don't reward size.** Feature count and technical difficulty are not reasons to pick an idea.
5. **Prefer a finished result over advice.** An idea where the user does one thing and gets a completed outcome beats one that hands them analysis.
6. **Step E is never skipped, shrunk or replaced.** An AI does not offer a way around it: not more public research, not a survey, not a prototype, not "build a small version first". If I ask to skip it, the AI says no once, gives the reason, and offers to make the next conversation easier. A landing page is allowed under the limits in step E, and it does not replace a conversation.
7. **Funding is a pointer, not evidence.** A startup raising money means someone looked into the problem. It does not mean people have it or will pay. Rule 2 still decides what counts.

## 4. Step A: pick a hunting ground

A hunting ground is a group of people, or a field, whose problems I can read about in public and who I can get to talk to me.

Three questions at most:

1. Which group or field do I want to look at? If I don't know, suggest three from my existing work, such as the kinds of client I have built websites for, or the kinds of tool I have already made.
2. Where do these people talk in public? Suggest places; I confirm.
3. Who in or near this group could I talk to? People I know count first, then people one introduction away, then people near the buyer, such as their staff or suppliers.

If the answer to question 3 is "nobody", say so plainly before going on. A group I cannot reach will stop the hunt at step E, so weigh a group I can reach against it now.

Write the route, the group, the places and the reachable people at the top of `research.md`.

### Route 2: start from funded startups

The three questions change to these:

1. Which area do I know? Users I understand, markets I have worked in, or kinds of product I have already built. If I don't know, suggest three from my existing work.
2. Which startups built around AI have raised money in that area recently? List up to five, each with a link to where the funding was reported. Recent means about the last two years.
3. Who are their customers, and who among them could I talk to? This is the same question 3 as above, and "nobody" gets the same plain warning.

The hunting ground is those customers, not the startups. Add the list of startups to the top of `research.md`. The gate is the same, with the startups named.

## 5. Step B: read the complaints

Use the `customer-research` skill, in the mode where it reads what people already say in public, unprompted: forums, Reddit, review sites, communities.

- Look in at least three places.
- Keep quotes exactly as written, each with its link.
- Mark how close each quote's author is to the group: **near**, **mid** or **far**.
- Rank the themes by how often they come up and how strongly people feel.
- For each theme, note what people do today instead, and what they have tried that failed.
- Stop when the top themes stop changing, or at about thirty quotes. More is not better.
- Say which places gave nothing. A place that is blocked or silent is a finding, not a failure to hide.

If I already have material, such as interview notes, reviews or support messages, the same skill can digest that first.

### Route 2: study the products, then read the complaints

Before reading complaints, for each startup from step A write down:

- The problem it says it solves, in one line.
- The three features that carry the product. Not the full feature list.
- Who it is sold to, and its price if that is public.

Then read as above, with the products' own reviews and communities among the places: review sites, app stores, Reddit threads about the product, its public forum. Everything else in this step holds, including the three places and the links.

Look hardest for what users of these products still cannot get done. That gap is the starting point for step C, not the three features.

## 6. Step C: shape three directions

From the top themes, write three directions that differ in kind, not three versions of one. Five lines each:

1. **The person and the moment.** One kind of person, at the point the problem hits.
2. **The pain and today's workaround.** With a quote from `research.md`.
3. **The hard part.** What existing tools and a plain AI chat do not already solve.
4. **User does X, gets Y.** One action, one finished outcome.
5. **The riskiest guess, and the one question that tests it.** What has to be true, and a single question I can ask a real person to find out. This question is used in step E.

On route 2, a direction is not a copy of a funded product. Line 3 names what that product's users still cannot get done, and line 4 delivers that.

## 7. Steps D, E and F

### Step D: challenge and pick

Ask four questions of each direction, and put the answers in one table:

1. Could one ordinary AI chat prompt deliver the same result?
2. Who already sells or provides this? On route 2, also say which of their three key features this direction does differently, and why a funded team would not add it next month.
3. Does it solve the hard part, or only the easy half?
4. Which three people would I talk to first? Names or roles from step A. A direction with no one to talk to loses to one with three.

Then the AI recommends three things: the safest option, the one with the highest ceiling, and the first to drop. I choose.

For the chosen one, write one line on what would kill it.

### Step E: talk to three people

No project, no product-sense pass and no building before this gate is passed.

**Who.** Three people who have, or work right next to, the problem in the chosen direction. Easiest first: people I know, then an introduction, then people near the buyer, then the buyer cold.

**What to ask.** The one question from the direction's line 5, then two follow-ups: what did you do the last time this happened, and what did it cost you? It is a question, not a pitch. Don't describe the idea before they have answered.

**How.** The AI drafts each message, short enough to send as it is. I send it. A call, a voice note, a chat thread or a meeting all count. A form does not.

**A landing page, if I want one.** This is the only thing that may be made before the gate is passed. Its limits:

- One page, for the direction picked in step D. No app, no working flow, no second page.
- One sitting. If it runs past half a day, stop and go back to the conversations.
- It is shown only at the end of a conversation, after the person has answered the question and both follow-ups.
- Visits and sign-ups do not count as conversations, and do not change the table below.
- It follows the marketing-page rule in How I Work: agree the hero idea in one line first.

If it starts to take more time than the conversations, drop it.

**Writing it down.** After each conversation, add it to a "Conversations" section in `research.md`: the date, who they are by role, their own words for the problem, what they do today, and what it costs them.

**Reading the result.** After three:

| What I heard | What it means | Next |
|---|---|---|
| Two or more describe the problem in their own words and already spend time or money on it | The pain is real | Step F |
| Someone asks when they can have it, or offers to pay | The strongest signal there is | Step F, and that person is the first customer |
| They agree it "would be useful" but do nothing about it today | Not a pain | Back to step D, pick again |
| They describe a different problem | A new theme | Add it to `research.md`, then back to step C |
| I could not get three conversations in two weeks | I cannot reach this group | Back to step A |

"That would be useful" does not count as a yes. Neither does liking the idea.

### Step F: hand over

Start a project for the chosen direction and begin the product-sense pass in How I Work. The research file, the chosen direction and the three conversations are its starting material, so the pass should be quick.

## 8. Undecided

| Question | My default in this draft |
|---|---|
| Is three conversations the right number? | A guess: enough to hear a pattern, few enough to finish |
| Is two weeks the right limit for getting them? | A guess |
| Is thirty quotes the right stopping point for step B? | A guess. The first hunt stopped at about forty |
| Where do the files for a hunt live? | `D:\FounderMode\planning\<short-name>\`. Used once; not formally agreed |
| Should the Opportunity Dashboard feed step A? | Not linked yet. It answers "what should I build this week" from contests and bounties |
| Are four challenge questions enough? | Unknown until an idea picked this way is built |
| What if a group does not complain in public? | Seen on the first hunt: the quotes came from people further from the group, and step E carried the weight |
| Does route 2 work? | Unknown. Added from a tip on 2026-10-13 and not yet used on a hunt |
| Is two years the right meaning of "recently funded"? | A guess |
| Is half a day the right limit for the landing page? | A guess |
| Where does the landing page live? | One HTML file in the hunt's folder, since no project exists yet. Not tried |
| Should anything more than a landing page be allowed before step E? | No for now. A very short working flow was considered and left out |
