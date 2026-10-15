# Design Playbook

How I set the look of an app or a website before any screen or page is built.

**This builds on How I Work** (`HOW_I_WORK.md`), which says when design starts. This playbook says how. App projects use it directly; the Website Playbook uses it at stage 4 and adds only what is specific to a client.

Status: draft. The app steps were run once, on SleepX; the website steps and the playbook as a whole have not been. Section 7 lists what is open.

## 1. When

| Situation | What to do |
|---|---|
| New app | After the feature table, before any screen is built: all of section 3 |
| Existing app whose look was never decided | Once, all of section 3. This is where old layouts get redesigned rather than just recoloured |
| New feature on an app with a direction | Steps 5 and 6 only |
| Client website | Stage 4 of the Website Playbook: all of section 3, website column |
| Marketing page of my own | All of section 3, website column, at the size of one page |

Output: `docs/design.md`, and for an app the mock-ups in `docs/design/mockups/`.

## 2. Which design skill

One design skill leads per task. Stacking two gives conflicting direction and doubles the tokens.

| Work | Skill | Note |
|---|---|---|
| App screens: dashboard, settings, tool | `interface-design` | Scoped to exactly this; says it is not for marketing pages |
| Website or marketing page | `frontend-design` | Focused on a distinctive visual direction |
| Palette, font pairing, chart type, UX rule | `ui-ux-pro-max`, targeted query only | A searchable database. It never picks the style, because it picks by type of business. In a website's polish phase, its usability rules are a checklist: contrast, tap sizes, forms |
| Critique of what is built | The review in the skill that leads | Keeps to one design skill per task |

This split comes from reading each skill's instructions, not from comparing their output. Record what each one actually produced under "Design results" in `LOG.md`.

## 3. Steps

Ask one step at a time with options, like the product-sense pass.

| # | Step | App | Website |
|---|---|---|---|
| 1 | Context of use | From `product_sense.md`: where, when and in what state the user reaches for the product | From stage 1: the visitor, and the Impression answer |
| 2 | Feel | One line, agreed before anything is drawn | Three or four words, plus this industry's clichés to avoid, named |
| 3 | Directions | Two or three distinct directions (below) | Pick one or two lenses: message, typography, colour, layout, composition, imagery, motion, navigation. Browse references with a question (below). Agree the hero idea in one line (section 5), then a hero wireframe and one inner-page wireframe |
| 4 | Tokens | Colour, type scale, spacing, radius, motion, kept in one place in the code | The same. Each font has a named role and is used nowhere else |
| 5 | Screens or pages | One row per screen from the feature table: its job, its primary action and every state (empty, loading, error, success) | Each page's composition: its sections in order, with component names, covering everything stage 2 said the page must contain |
| 6 | Check | Phone-width screenshots, then a critique of every screen (below) | The same, on the built pages |

**Directions (app).** Two or three different ideas, not one palette in variations. Each is a self-contained interactive HTML mock-up of the main screen in `docs/design/mockups/`, so I judge real pixels and motion, not descriptions. I open them in the browser's device mode at phone width and pick one. The chosen file stays; the others are deleted and described in a line each in `design.md`. Then mock every other screen in the feature table once, in the chosen direction, before any of it goes into the app.

**References (website).** Sources: Siteinspire, One Page Love, Lapa Ninja, HOVERSTAT.ES. For each one kept, note what exactly works and how it serves this brief. A good reference can come from another industry.

**Critique.** Use the review in the skill that leads: one focal point per screen, how much text competes for attention, and the squint test. "It renders" is not the check.

After step 6 the direction is fixed. I still refine screens piece by piece, but inside the direction and its tokens. A change that breaks the direction means revisiting `design.md` on purpose.

## 4. What `design.md` holds

- Context of use and the feel.
- The chosen direction, and a line for each one rejected.
- Tokens, or where they live in the code.
- The screen table (app) or each page's composition (website).
- Motion rules: what moves, when, and the reduced-motion behaviour.
- On a website, also: **one signature element**, one thing a visitor would remember, not three; the hero and inner-page wireframes; and a "never" list for this site.

## 5. Rules for every screen

- **Touch targets.** The tap area must be at least 44px; what the control looks like can be much smaller. Don't make every button look 44px tall.
- **Agree the hero concept before building a marketing page, and never default to the split hero.** State the hero idea in one line first. Banned unless asked for: two-column split hero, eyebrow/kicker line above the headline, dual CTA, trust row or badge chips under the buttons, subhead over 20 words, generic image in the right column. A design skill's output is tokens and rules, not composition; it will not stop the template. With no real photos, go type-led.

## 6. Guardrails for websites and marketing pages

| Do not | Why |
|---|---|
| Add section numbers, ruled underlines, extra headings or labels nobody asked for | Reads as templated; each one is something the client has to notice and reject |
| Use gradient text, count-up stats, logo clouds, stock handshakes | Generic on sight |
| Put a heading directly under a banner that already titles the page | Redundant |
| Use a font outside its named role | A date in the label font got the whole font removed |
| Apply an inherited style rule without checking it against the wanted feeling | "Tracked headings" produced the weak look the client complained about |
| Start a looping animation with its interesting moment off screen | The visitor looks once and scrolls |


## 7. Open

| # | Question | Note |
|---|---|---|
| 1 | Does a new feature with a new screen get a mock-up first? | Today section 1 says steps 5 and 6 only, so a new screen goes into the app without one |
| 2 | Should websites mock directions as apps do, instead of wireframes? | It would also answer the Website Playbook's open question 4: what the client is shown to sign off |
| 3 | Is the review inside `interface-design` and `frontend-design` enough as a critique? | Untested. The skill that had dedicated review commands, `impeccable`, is no longer used |
| 4 | Does one playbook fit both apps and websites, or do the columns drift apart? | Check after one run of each |
