# Product Sense Playbook

How I decide what a product is for before anything is designed or built. One pass for every product: my own apps, client websites, and an idea that has just passed the Idea Playbook.

**This builds on How I Work** (`HOW_I_WORK.md`), which says the pass comes first. This playbook says how. The App Playbook and the Website Playbook both start here, and the Idea Playbook (`D:\FounderMode\founder_os\IDEA_PLAYBOOK.md`) ends here.

Status: run once on an app, SleepX; not yet on a client website. Section 5 lists what is open.
## 1. The pass

Recorded in `docs/product_sense.md` (or the project root if there is no `docs/`). Work through these in order: goal; user; the one decision or action the product serves; pain points along the journey; pick one or two and say why; ideate solutions per picked pain (built vs considered); prioritise; define the first version; set a success measure; list open questions.

- **Goal:** "Help [user] [outcome], so that [broader impact]." The outcome is what the user wants, stated without any feature or method in it; if the sentence names a screen, a speed or a feature, that part is a solution and belongs in the ideate step. The broader impact may be "not known yet", said plainly. Then one line on what success looks like for the user, in terms you could see happen ("knows in five seconds whether they slept enough", not "sleeps better").
- **User:** a specific person in a specific situation, even when it is me: what they want, what they won't put up with, and the moment they reach for the product. No pain points in it; those come next.
- **Decision or action:** an app serves one decision its user makes; a website serves one action its visitor takes, such as calling, enquiring or buying.
- **Pain points:** first name 4–6 stages of the user's journey, then list the friction at each stage. A pain is friction in the user's life, never a missing feature; it passes the test in section 3 (still true after the feature ships = solution in disguise). Pick the one or two to work on by how often they happen × how bad they are, and say both. If no pain is big enough to build for, say so plainly: "build nothing new" is a valid result, and the first version may just be finishing what exists, or removing what serves nothing.
- **Solutions:** 2–5 per picked pain that work in genuinely different ways: they differ in how they work, not in how they look. A reminder, an email and a widget are one idea ("tell the user"); changing a default, or removing the step, would be different ones. On a website these are the shapes the site could take, such as one long page, a few pages, or a catalogue generated from data. Prioritise them on impact against effort. The first version names one or two things it deliberately leaves out, and its top risks, each with one line on how to reduce it.

## 2. How to ask

Ask one step at a time and wait for the answer before the next. Ask each step as a pick-from-options question: three or four concrete answers drawn from what you know about the project, your recommended one first and marked, plus a free-text "other". Where the step wants a list (pain points, solutions, what goes in the first version), allow several picks. If the tool has no option picker, number the options so I can reply with a number. Never fill the file in by yourself, and don't write it until every step is answered. Update it when the thinking changes. Don't build an interface until the picked pains are agreed.

**Who answers.** On my own products, I do. On a client website, the client does, through the six questions in the Website Playbook's stage 1, and I pass the answers on. Anything neither of us knows is an open question, not a guess.

## 3. Before any new feature: state the pain

When a feature idea comes up on an existing product, write the pain first and append it to `product_sense.md`, in this form: "When I [situation], I'm trying to [job], but [what happens instead], because [observed cause], which costs me [consequence]. This happens [how often]." Test it: if the sentence would still be true after the feature shipped, it is a pain; if not, it is a solution in disguise. Check the pain against the product's stated goal and user; one that falls outside them means question the feature, or change the goal on purpose. List two or three solutions, including "do nothing" and "change a default", before picking. A pain that has not cost anything yet is logged with a trigger for revisiting, not built. Bug fixes and small tweaks skip this; it applies to anything that adds a new concept to the product.

On a client website this is the change request, and the Website Playbook's stage 7 handles it.

## 4. The feature table

Every product keeps one table of its features in its spec (the PRD's scope section; in `product_sense.md` if there is no spec): feature · what it lets the user do · what it serves (the goal, the decision or action, or a named pain) · status (built, planned, considered, removed). A feature is something the user can do or see and would notice if it vanished; infrastructure and code structure are not features. A row that serves nothing is a candidate to remove, or a sign the product sense is missing something; say which, and recommend. Check the table after every product-sense pass, whenever a feature is added, and once on any product that was built before its product sense. Removed rows stay, marked with the date and the reason.

On a client website, the sitemap and each page's required content play this part.

## 5. Open

| # | Question | Note |
|---|---|---|
| 1 | Does one pass fit a client website without its own rules? | Untested. Check on the next client site |
| 2 | Does stage 7's change request do the job of "state the pain"? | Assumed, not checked |