# Website Playbook

How I take a client website from first conversation to handover.

**This builds on How I Work** (`HOW_I_WORK.md`), which holds the rules for every kind of work: how to talk to me, product sense first, one chat per phase, slow steps wait for me, and the working principles. This playbook holds only what is different or extra for a client website. Where the two differ, this playbook says so, and it wins for client websites.

Status: draft 1, written 2026-10-06. Not yet used on a client. An AI loads it through the `website-playbook` skill when the work is a client website. Compiled from aquai, kapip, aumplus, cisqo-white, lizen-website and web-studio. Section 13 lists where each part came from, and section 14 lists everything still pending.

## 1. How to use this

- Work through the seven stages in order. Each stage has one role, one output file and one gate.
- Do not start a stage until the gate before it has passed. Most rework on past sites came from building before something upstream was agreed.
- The output files are the memory. A new chat reads the files, not an old chat.
- When a rule here turns out wrong on a real project, change this doc in the same week.

## 2. The pipeline

| # | Stage | Role | Question that role answers | Output | Gate |
|---|---|---|---|---|---|
| 1 | Discover | Strategist | Who is this for and what should they do? | `docs/product_sense.md` | Client has confirmed audience, action and proof |
| 2 | Define | Product manager | What is in, what is out, what does done mean? | `docs/BRIEF.md` (light) or `docs/PRD.md` (full) | Sitemap and scope agreed in writing |
| 3 | Content | Copywriter | What do we actually say and show? | `data/*.ts`, `docs/IMAGE_PROMPTS.md` | Every page has content or a labelled placeholder |
| 4 | Design direction | Designer | What should it feel like, and how do we get there? | `docs/DESIGN.md` | Client or I have signed off one direction |
| 5 | Build | Developer | Does it work, cleanly, on a slow phone? | Code, `docs/STATUS.md` | Each phase: type-check and lint clean |
| 6 | QA and launch | QA lead | Would I be embarrassed by anything here? | Launch checklist ticked | Section 9 checklist fully passed |
| 7 | Handover and changes | Account owner | How does this stay good after launch? | `docs/CHANGES.md`, `learnings.md` | Client has what they need to run it |

## 3. Principles

These hold at every stage.

1. **One site, one job.** Every site has one main visitor and one main action. Everything else supports it or goes.
2. **An unknown stays a question.** If the client has not said it, it is not a fact. Never fill a gap with a guess about audience, service area, numbers or tone.
3. **Industry does not pick the style.** "Law firm" or "solar company" does not decide palette, type or motion. The answers from stage 1 do.
4. **Nothing invented ships as real.** Fake stats, testimonials, client logos and addresses are placeholders, marked as such, and block launch until replaced.
5. **Change what is wrong, add nothing unasked.** When reworking a spec or a page, fix the problem. Do not decorate to fill space.
6. **See it before judging it.** Layout, motion and "is it visible enough" cannot be judged from source code.
7. **Content, tokens and motion each live in one place.** Changing copy never needs a component edit.
8. **Small site, small machinery.** Extract on the second use. No filter engine for four items.
9. **Slow phone first.** Assume a mid-range Android on a weak connection.
10. **The spec stays current.** A change request updates the spec and gets a line in the change log. The spec is never a history of changes.

## 4. Stage 1: Discover

Role: strategist. Output: `docs/product_sense.md`.

### Six questions for the client

| Topic | Ask | What it decides |
|---|---|---|
| Audience | Who is this mainly for, and what are they trying to do? | Language, what needs explaining |
| Offer | What is the main thing the site should help them understand or choose? | Message and page priority |
| Action | What should that visitor do next? | Primary button, contact method |
| Proof | What evidence can we show, and do you have it now? | What to request, what claims are allowed |
| Impression | What should someone feel after seeing it? "Not sure yet" is fine. | Starting point for design |
| Boundaries | What exists already, what must stay, what are we free to change? | Fixed assets and constraints |

### Follow-ups by client type

| Type | Ask |
|---|---|
| Services | Which service should lead? Why do people choose you over others, and what supports that? What happens after an enquiry? |
| Physical products | One product or a range? What must a visitor see before choosing? Do they buy, request a quote, or find a dealer? |
| Software | What can someone get done with it? What can we show? Do they try, buy, sign up or book a demo? |

### Also collect

- Two or three competitors or sites they like, and what exactly they like about each.
- Existing site URL, if any, and what is wrong with it in their words.
- Who approves, who supplies content, and by when.
- Domain, hosting and email: who holds the logins.

### What goes in product_sense.md

Goal, main visitor, the one action, where that visitor gets stuck today, which one or two of those problems this site fixes and why, what version one is, how we will know it worked, open questions.

### How this differs from the product-sense pass in How I Work

- **The answers come from the client, not from me.** I pass them on. Anything neither of us knows is an open question.
- **"The one decision the product serves" becomes "the one action the visitor takes".**
- **"Several solutions" and "prioritise" are not done here.** They happen at the start of stage 2, where two or three shapes for the site are compared before the sitemap is fixed.
- **Everything else is the same,** including asking one step at a time and never filling the file in alone.

### Gate

The client has confirmed audience, action and proof in a message I can point to. Open questions are listed, not assumed.

## 5. Stage 2: Define

Role: product manager. Output: `docs/BRIEF.md` or `docs/PRD.md`.

### Pick the tier

| | Light | Full |
|---|---|---|
| Fits | Brochure site, up to about six pages, no catalogue | Catalogue or many pages generated from data |
| Docs | `BRIEF.md` and a short `DESIGN.md` | `PRD.md` and `DESIGN.md` |
| Data | One `data/content.ts` | Typed data files with access helpers |
| Move up when | A page type starts repeating from data | |

### Before fixing the sitemap

Lay out two or three shapes the site could take, for example one long page, a few pages, or a catalogue generated from data. Say which one and why, in a few lines. This is where the "several solutions" and "prioritise" steps of the product-sense pass happen for a client site, and the choice goes at the top of the spec.

### The spec must contain

- **Sitemap** with the job of each page in one line.
- **Sections per page**, in order, each mapped to a component name.
- **Vocabulary.** The fixed word for each thing (service, series, profile). Code uses the same words as the client.
- **Data model** for anything repeated. The shape is the contract; real content pours into it later without restructuring.
- **Out of scope**, written down. Blog, CMS, login, payments, multi-language: each is in or out.
- **Constraints.** Hosting, no server, form handling, privacy.
- **Done-when list,** split as How I Work says. On a website the client's half is usually: form key, domain access, real photos, confirmed numbers.

### Stack decision

Default: Next.js static export on shared Hostinger. Section 8 has the standards.

| Client needs | Then |
|---|---|
| Brochure, catalogue, contact form | Default stack |
| Client edits content often | Stop and discuss a CMS before promising it |
| Login, payments, live data | Not a static site. Scope it as an app. |

### Gate

Client has agreed the sitemap and the out-of-scope list in writing. Client-side setup items are requested now, not at launch.

## 6. Stage 3: Content

Role: copywriter. Output: `data/*.ts` and `docs/IMAGE_PROMPTS.md`.

### Asset request to the client

Logo as SVG, brand colours if any, phone, WhatsApp number, email, every office address, hours, service or product list with descriptions, photos, certificates, real numbers, testimonials with permission to publish, the inbox that should receive form enquiries.

### Rules

- **Placeholder first.** The site is fully browsable before real content arrives. Real files replace placeholders at the same path, with no code change.
- **Mark every placeholder.** Dummy copy carries `DUMMY`. A claim the source does not support carries `// TODO: confirm`. Both are searched for before launch.
- **Verbatim facts stay verbatim.** Dimensions, prices, registration numbers, legal names: copy exactly, never round or tidy.
- **Private fields never reach the browser.** If the source data has dealer prices or internal codes, components only receive a public shape, and a known private value is searched for in the build.
- **Write in two registers where the audience is mixed:** a plain line a newcomer understands, then the precise detail an expert wants.
- **Numbers persuade, adjectives do not.** Prefer "7-year free maintenance" to "best-in-class service".
- **Copy pass:** draft with `/copywriting`, then run `/humanizer`.

### Images

- List every image slot from the data file, so the list cannot drift from the site.
- One prompt per slot in `docs/IMAGE_PROMPTS.md`, with size and where it sits.
- Imagery shows the client's real range. Do not let every slot reach for the same motif.

### Gate

Every page has real content or a marked placeholder. The client has the list of what is still owed.

## 7. Stage 4: Design direction

Role: designer. Output: `docs/DESIGN.md`.

One design skill leads, as my tool instructions say. For a client website that is `frontend-design`; `ui-ux-pro-max` is only for lookups such as a palette or a font pairing. Before any wireframe, agree the hero idea in one line. How I Work lists the hero patterns that are banned unless asked for.

### Which design skill, where

`frontend-design` designs. The other two check. A review is a separate task from the design, so this keeps to one design skill per task.

| Stage | Skill | Job |
|---|---|---|
| 4, Design direction | `frontend-design` | Leads. Sets the feeling, the type and the one signature element |
| 4, Design direction | `ui-ux-pro-max` | Looked up only: a palette or a font pairing to consider. It never picks the style, because it picks by type of business |
| 5, Build, once the home page exists | `impeccable critique` | A second opinion on what is built, before other pages copy its mistakes |
| 5, Build, polish phase | `ui-ux-pro-max` | Its usability rules as a checklist: contrast, tap sizes, forms |
| 5 and 6, polish and QA | `impeccable audit` and `polish` | Technical checks and a final pass |

Decided 2026-10-12 from reading the skills, not from comparing their results. `impeccable` is only installed in caman, so a client site can use it only once it is added to that project. It also keeps its own `PRODUCT.md` and `DESIGN.md`; how those sit beside this playbook's files is untested.

### Steps

1. Start from the Impression answer in stage 1. Write the feeling in three or four words.
2. Pick one or two lenses to explore: message, typography, colour, layout, composition, imagery, motion, navigation.
3. Browse references with a question, not an open gallery. Sources: Siteinspire, One Page Love, Lapa Ninja, HOVERSTAT.ES. For each one kept, note what exactly works and how it serves this brief. A good reference can come from another industry.
4. Write the direction into `DESIGN.md`.

### DESIGN.md must contain

- The feeling, and the clichés of this industry to avoid, named.
- Tokens: colour, type scale, spacing, radius. Each font has a named role and is used nowhere else.
- **One signature element.** One thing a visitor would remember. Not three.
- Motion rules: what moves, when, and the reduced-motion behaviour.
- A hero wireframe and one inner-page wireframe.
- A "never" list for this site.

### Guardrails

| Do not | Why |
|---|---|
| Add section numbers, ruled underlines, extra headings or labels nobody asked for | Reads as templated; each one is something the client has to notice and reject |
| Use gradient text, count-up stats, logo clouds, stock handshakes | Generic on sight |
| Put a heading directly under a banner that already titles the page | Redundant |
| Use a font outside its named role | A date in the label font got the whole font removed |
| Apply an inherited style rule without checking it against the wanted feeling | "Tracked headings" produced the weak look the client complained about |
| Start a looping animation with its interesting moment off screen | The visitor looks once and scrolls |

### Gate

One direction is signed off before any page is built. Any decorative element in the plan has been asked about on its own, not buried in a list.

## 8. Stage 5: Build

Role: developer. Output: code and `docs/STATUS.md`.

### Phases

Phases follow "One chat per phase" in How I Work. On a website, `start phase N` reads the project's `CLAUDE.md`, the spec, `DESIGN.md` and `STATUS.md`.

| Phase | Work |
|---|---|
| 0 Configure | Static export config, tokens, fonts, motion file, folders, placeholder script |
| 1 Shell | UI primitives, header, footer, mobile nav, contact affordances, stub routes |
| 2 Home | Home sections; signature element |
| 3 Core feature | The templated pages (services, catalogue), generated from data |
| 4 Content pages | About, contact and form, remaining pages |
| 5 Polish | Responsive, accessibility, motion, image weight, dead code |
| 6 Deploy prep | SEO files, leak check, deploy script, README |

### Standards

| Area | Rule |
|---|---|
| Scaffold | Pin `create-next-app` to a chosen version and record it in the kit. This is the pin-versions rule in How I Work. |
| Vercel plugin | Stays off for these sites. Its advice assumes a server and Vercel hosting, which the Export rule below forbids. A new client site sets `"vercel@claude-plugins-official": false` in `.claude/settings.local.json`. |
| Export | `output: 'export'`, `images.unoptimized: true`, `trailingSlash: true`. No API routes, server actions, middleware or revalidate. If a feature needs a server, stop and flag it. |
| Tokens | Tailwind `@theme` block in `globals.css`. No hex codes or magic pixel values in components. |
| Content | Only from `data/`. Components never hardcode copy, contact details or links. |
| Motion | Variants only from `lib/motion.ts`. Sections animate through one `Reveal` component that owns reduced-motion and fire-once. |
| Pages | A page file reads like a table of contents: `<Hero/> <Services/> <CTA/>`. |
| Components | One per file, typed props, variants by prop. A second look is a new variant, not a new file. |
| Light or dark | Anything that sits on both takes `tone?: "light" \| "dark"`. |
| Client code | Server components by default. `"use client"` on the smallest leaf that needs state. |
| Images | Plain `<img>` through one `MediaFrame` component, always with width and height. A postbuild script compresses and converts images in `out/` only. Check weights in `out/`, not `public/`. |
| Forms | Web3Forms, key in `NEXT_PUBLIC_WEB3FORMS_KEY`. With no key, the form says so instead of failing silently. |
| Contact | WhatsApp, phone and email links come from data helpers. Offices are an array, never a single address. |
| Class merging | Use `clsx` unless a component accepts an outside `className`. `tailwind-merge` drops custom token classes it does not recognise. |

### Checks

Builds, tests and reviews follow "Slow or billed steps wait for me" in How I Work. Extra for websites:

| Check | When |
|---|---|
| Type-check and lint | Once at the end of a batch of edits, not after each one |
| Production build | Also before every deploy |
| Looking at pages | As "Looking at a page in a browser" in How I Work says, with the shared screenshot tool. My dev server is usually on `:3000`. |

### Working rules in the chat

What my words mean ("discuss", "proceed", a vague complaint, "it didn't work") is in How I Work, because it holds for every kind of work. Two more for design work:

- A "never" in the design doc is put back to me as a choice. It is neither silently obeyed nor silently broken.
- When an effect does nothing, check a parent is not overriding it before tuning values.

## 9. Stage 6: QA and launch

Role: QA lead. Nothing ships until every line is ticked or consciously waived.

### Content

- [ ] No `DUMMY`, `REPLACE_WITH` or `TODO: confirm` anywhere in `out/`
- [ ] Every number, certificate and testimonial confirmed by the client
- [ ] Leak check passes: no private field or canary value in `out/`
- [ ] Spelling of names, addresses and phone numbers checked against the source

### Function

- [ ] Build emits an `index.html` for every route
- [ ] Form submitted with the real key and received in the client's inbox
- [ ] WhatsApp, phone and email links tapped on a real phone
- [ ] Every nav and footer link resolves; 404 page exists
- [ ] Old URLs redirect, if this replaces an existing site

### Quality

- [ ] Checked at 360, 768 and 1280 wide; no sideways scroll; tap targets at least 44px
- [ ] Keyboard reaches everything; focus is visible; heading order is sane; images have alt text
- [ ] Reduced-motion setting leaves the site fully usable
- [ ] Every page visually checked, not only home
- [ ] Image weights checked in `out/`

### Search and sharing

- [ ] Each page has its own title and description, from data
- [ ] `sitemap.xml`, `robots.txt`, favicon and a share image are present
- [ ] One `h1` per page
- [ ] Business details added as structured data
- [ ] Analytics decision made with the client

### Deploy

- [ ] Existing site backed up before the first sync
- [ ] `protectedItems` lists everything on the server the sync must not delete
- [ ] FTP credentials in `.env`, never committed
- [ ] `npm run deploy` (build, then sync of `out/` via `deploy-package`)
- [ ] Live site opened on a phone on mobile data; SSL padlock present

## 10. Stage 7: Handover and changes

Role: account owner.

### Handover

- README: how to swap content, add an image, build and deploy.
- A short note to the client: what is live, what is still placeholder, what they owe.
- Logins and where they are kept.

### Change requests

- Each request gets one line in `docs/CHANGES.md`: date, who asked, what, why.
- Then the spec is edited to describe the site as it now is. No "moved per client request" history inside the spec.
- A request that needs a server or breaks the one-job principle is raised as a decision, with the cost, before any work.

### Learnings

- Run `/learn` before the project goes quiet.
- A learning that holds on a second site moves into this playbook.

## 11. Starter kit (to build)

The playbook is meant to be fill-in, not rewrite. None of this exists as one kit yet.

| Item | Replaces |
|---|---|
| Template `CLAUDE.md` with the section 8 standards | Four hand-written versions that disagree |
| Templates for `product_sense.md`, `BRIEF.md`, `PRD.md`, `DESIGN.md`, `STATUS.md`, `CHANGES.md` | Starting from the last project's files |
| Template `KICKOFF-PROMPT.md`, phases 0 to 6, pinned scaffold | Three versions using `@latest` |
| Scripts: placeholders, postbuild image optimise, leak check, deploy | A different copy in each project. The screenshot script is already shared, in `build_os\tools`. |
| Client intake and asset-request sheet | web-studio pages plus memory |
| Launch checklist as a file per project | Nothing |

The `0.copy-this-skill-folder-content` folders were emptied on 2026-10-12; one still keeps `convex-auth`. Retire once the kit exists: the two lizen skills as general standards.

## 12. Undecided

| Question | My default in this draft |
|---|---|
| Where do kit files get generated today? | Unknown. Assumed a claude.ai chat. |
| Is the Hostinger static stack fixed for all clients? | Treated as the default, with an exit in stage 2 |
| Screenshots by Claude: allowed for visual work? | Yes, against my running server; How I Work now says so for all work. aumplus and cisqo currently say no. |
| Image optimisation: one scheme? | Postbuild on `out/`. kapip uses a prebuild in-place scheme instead. |
| Form handler | Web3Forms. aquai uses a PHP mailer. |
| Analytics tool | None chosen |
| Performance budget numbers | None set. Needs real measurements from a live site first. |
| web-studio: keep the app, or fold its content in here? | Content folded in; app left alone |
| Should the stages become separate commands? | Not yet. Since 2026-10-12 the whole playbook loads through one skill, `website-playbook`, which reads this file. Decide about per-stage commands after one real project. |

## 13. Where each part came from

| Part | Source |
|---|---|
| Six client questions, follow-ups, lenses, reference sources | `Apps\web-studio\docs\brief-and-hero-framework.md` |
| Light and full tiers, phases 0 to 6 | kapip, aumplus and aquai kickoff prompts and briefs |
| Build standards | `CLAUDE.md` in cisqo-white (newest), aumplus, kapip, aquai |
| Design guardrails and chat working rules | `Websites\kapip_website\learnings.md` |
| Privacy and leak check | aquai `CLAUDE.md` |
| Content honesty markers | cisqo-white `CLAUDE.md` |
| Deploy | `Apps\packages_personal\deploy-package`, kapip `COMMANDS.md` |
| Product-sense file, check rules | `HOW_I_WORK.md` |
| Search, sharing and launch checklist | New in this draft; not taken from a past project |

## 14. Pending

Everything still open in this playbook, in one place. Read through on 2026-10-12. Sections 11 and 12 hold the detail for two of the groups; this section adds what a full read turned up and puts it all in order.

### A. Prove it on a real site

| # | Pending | Note |
|---|---|---|
| A1 | Run the playbook on one client site, start to finish | It is draft 1 and has never been used. Every stage and gate is untested. |
| A2 | Check the stage 6 launch checklist against a real launch | Its search, sharing and launch lines are new in this draft, not taken from a past project. |
| A3 | Try the `website-playbook` skill past stage 1, and in Codex | Tested once, in Claude, on a made-up stage 1 case. |

### B. Build

Section 11 lists the starter kit. None of the six items exists yet.

| # | Pending | Note |
|---|---|---|
| B1 | Template `CLAUDE.md` for a client site | Four hand-written versions disagree today. |
| B2 | Templates for `product_sense.md`, `BRIEF.md`, `PRD.md`, `DESIGN.md`, `STATUS.md`, `CHANGES.md` | |
| B3 | Template `KICKOFF-PROMPT.md`, phases 0 to 6, with a pinned scaffold version | Three versions exist, all using `@latest`. |
| B4 | Shared scripts: placeholders, postbuild image optimise, leak check, deploy | The screenshot script is done and shared. |
| B5 | Client intake and asset-request sheet | |
| B6 | Launch checklist as a file per project | |
| B7 | Decide where the kit lives | Not stated anywhere. `build_os` is the likely home, beside `tools\` and `skills\`. |
| B8 | Retire the two lizen skills as general standards | Only once the kit exists. |

Build these from the files of the first site that goes through the playbook, not in the abstract.

### C. Decide

Section 12 has nine open questions. Their state today:

| # | Question | State |
|---|---|---|
| C1 | Where do kit files get generated? | Open. Tied to B7. |
| C2 | Is the Hostinger static stack fixed for all clients? | Open. Default with an exit in stage 2. |
| C3 | Screenshots by Claude | Mostly settled: How I Work now allows them for visual work unless a project says no. Still to do: the instruction files in aumplus and cisqo say no; change them or leave them as exceptions. |
| C4 | One image optimisation scheme | Open. Postbuild here; kapip uses prebuild. |
| C5 | Form handler | Open. Web3Forms here; aquai uses a PHP mailer. |
| C6 | Analytics tool | Open. None chosen, yet the launch checklist asks for the decision. |
| C7 | Performance budget numbers | Open. Needs measurements from a live site. |
| C8 | web-studio: keep the app? | Open. Its content is folded in here; the app is left alone. |
| C9 | Stages as separate commands | Wait for one real project. |

### D. Gaps found on the read-through

Things the playbook leans on but does not say, or says two ways.

| # | Gap | Where |
|---|---|---|
| D1 | Settled 2026-10-12: every site has a separate `DESIGN.md`, short on a light site. The tier table in section 5 now says so. | Sections 5 and 7 |
| D2 | Settled 2026-10-12: they happen at the start of stage 2. Section 5 now has a step for comparing two or three shapes before the sitemap is fixed. | Sections 4 and 5 |
| D3 | Stage 4's gate says the client or I sign off one direction, but not what the client is shown to sign off: a written direction, a wireframe, or a built hero. | Section 7 |
| D4 | Nothing on the commercial side: proposal, price, timeline, payment, and what happens when the client is late with content. | Missing |
| D5 | "Logins and where they are kept" names no place. | Section 10 |
| D6 | Nothing after handover except change requests: hosting and domain renewals, backups, checking the live site still works. | Section 10 |
| D7 | The launch checklist asks for redirects from old URLs, a 404 page and business details as structured data, but section 8 has no standard for any of the three on a static Hostinger site. | Sections 8 and 9 |
| D8 | "Client edits content often" stops at "discuss a CMS". There is no path for a site that does need one. | Section 5 |
| D9 | Settled 2026-10-12: the Vercel plugin is off for client and static sites. Switched off in nine existing ones, and section 8 has the rule for new ones. | Section 8 |
| D10 | The existing sites (kapip, aquai, aumplus, cisqo-white, lizen) each follow their own older rules. Nothing says whether to bring them in line or leave them. | Whole playbook |

### Order

1. A1, on the next client site. Answer C and D items as that site forces them.
2. D1, D2 and D9 were settled on 2026-10-12, before that site starts.
3. B, from that site's files.
4. The rest of C and D as they come up.
