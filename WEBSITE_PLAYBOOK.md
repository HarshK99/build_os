# Website Playbook

How I take a client website from first conversation to handover.

**This builds on How I Work** (`HOW_I_WORK.md`), on the Product Sense Playbook (`PRODUCT_SENSE_PLAYBOOK.md`) for stage 1, and on the Design Playbook (`DESIGN_PLAYBOOK.md`) for stage 4. How I Work holds the rules for every kind of work: how to talk to me, one chat per phase, slow steps wait for me, and the working principles. This playbook holds only what is different or extra for a client website. Where the two differ, this playbook says so, and it wins for client websites.

Status: draft, built from past sites; not yet run on a client from start to finish. An AI loads it through the `website-playbook` skill. Section 12 lists what is open.

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
| 3 | Content | Copywriter | What do we actually say and show? | `data/*.ts` | Every page has content or a labelled placeholder |
| 4 | Design direction | Designer | What should it feel like, and how do we get there? | `docs/design.md`, `docs/image-prompts.html` | Client or I have signed off one direction |
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

### The product-sense pass

The answers above feed the pass in the Product Sense Playbook, the same pass every product gets. The client answers; I pass the answers on. The one action the visitor takes is the product's "decision or action", and its solutions are the shapes the site could take.

### Gate

The client has confirmed audience, action and proof in a message I can point to. Open questions are listed, not assumed.

## 5. Stage 2: Define

Role: product manager. Output: `docs/BRIEF.md` or `docs/PRD.md`.

### Pick the tier

| | Light | Full |
|---|---|---|
| Fits | Brochure site, up to about six pages, no catalogue | Catalogue or many pages generated from data |
| Docs | `BRIEF.md` and a short `design.md` | `PRD.md` and `design.md` |
| Data | One `data/content.ts` | Typed data files with access helpers |
| Move up when | A page type starts repeating from data | |

### Before fixing the sitemap

Start from the shape of the site picked in the product-sense pass (one long page, a few pages, or a catalogue generated from data). It goes at the top of the spec, with why, in a few lines.

### The spec must contain

- **Sitemap** with the job of each page in one line.
- **What each page must contain**, as a list of content, not an order of sections. Stage 4 sets the sections, their order and component names; fixing them here locks in a template before design can break it.
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

Role: copywriter. Output: `data/*.ts`. Image prompts wait for stage 4, because they depend on the page's composition.

### Asset request to the client

Logo as SVG, brand colours if any, phone, WhatsApp number, email, every office address, hours, service or product list with descriptions, photos, certificates, real numbers, testimonials with permission to publish, the inbox that should receive form enquiries.

### Rules

- **Placeholder first.** The site is fully browsable before real content arrives. Real files replace placeholders at the same path, with no code change.
- **Mark every placeholder.** Dummy copy carries `DUMMY`. A claim the source does not support carries `// TODO: confirm`. Both are searched for before launch.
- **A dummy that looks real stays hidden.** Registration numbers, addresses and source citations sit in the data file behind a `show` switch, off the page until the real value arrives.
- **Client material written for someone else is sorted, not poured in.** A pitch deck speaks to investors, not to the site's visitor. Each fact is used, left out, or listed as a conflict for the client to confirm. The source file goes in `docs/assets/`, never `public/`.
- **Verbatim facts stay verbatim.** Dimensions, prices, registration numbers, legal names: copy exactly, never round or tidy.
- **Private fields never reach the browser.** Dealer prices, internal codes and hidden dummies: components receive only a public shape, and a known private value is searched for in the build. Whatever a component that runs in the browser (`"use client"`) imports is sent to the visitor, so a hidden field is left empty there, not filled with a dummy.
- **Write in two registers where the audience is mixed:** a plain line a newcomer understands, then the precise detail an expert wants.
- **Numbers persuade, adjectives do not.** Prefer "7-year free maintenance" to "best-in-class service".
- **Copy pass:** draft with `/copywriting`, then run `/humanizer`.

### Gate

Every page has real content or a marked placeholder. The client has the list of what is still owed.

## 7. Stage 4: Design direction

Role: designer. Output: `docs/design.md` and `docs/image-prompts.html`.

Follow the Design Playbook (`DESIGN_PLAYBOOK.md`), website column. It holds the steps, the skill that leads (`frontend-design`), what `design.md` must contain, the hero rule and the guardrails. This stage adds only the image prompts and the client's sign-off.

### Image prompts

Written once the composition is set, because each prompt depends on where its image sits.

- `docs/image-prompts.html` is the only list: one card per image slot, with copy buttons and tick-boxes, checked against the data file's image paths. `docs/IMAGE_PROMPTS.md` keeps only the reasons behind the look. Until the kit has the page (section 11), copy `Websites\ne_synth\docs\image-prompts.html` and replace the block at the top of its script.
- Every prompt opens with one shared "look" paragraph, written from the hero image, so the set reads as one shoot.
- Every prompt says where the subject goes, how much empty space surrounds it, and which part must stay calm for text. Left alone, a generator fills the frame, and the subject loses its edges or ends up under the text.
- No text, lettering or logos in an image. Generators garble them.
- Before any prompt with people, ask whether generated people may appear and whether a slot shows the client's own team. Where visitors are checking the business is real, suggest no faces and a real team photo.
- Show the client's real range, not one motif in every slot.

### Gate

One direction is signed off before any page is built. Any decorative element in the plan has been asked about on its own, not buried in a list. Every image slot has a prompt.

## 8. Stage 5: Build

Role: developer. Output: code and `docs/STATUS.md`.

### Phases

Phases follow "One chat per phase" in How I Work. On a website, `start phase N` reads the project's `CLAUDE.md`, the spec, `design.md` and `STATUS.md`.

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
| Looking at pages | As "Looking at a page in a browser" in How I Work says. My dev server is usually on `:3000`; check that port is this project's before trusting a shot. A second dev server takes `:3001`, and then the tool needs `BASE_URL`. |

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

Build it from the files of the first site that goes through the playbook, not in the abstract. It lives in `build_os`, beside `tools\` and `skills\`.

| Item | Start from |
|---|---|
| Template `CLAUDE.md` with the section 8 standards | Four hand-written versions that disagree |
| Templates for `product_sense.md`, `BRIEF.md`, `PRD.md`, `design.md`, `STATUS.md`, `CHANGES.md` | The last project's files |
| Template `KICKOFF-PROMPT.md`, phases 0 to 6, with a pinned scaffold version | Three versions, all using `@latest` |
| Scripts: placeholders, image optimising, leak check, deploy | A different copy in each project |
| Client intake and asset-request sheet | The web-studio pages |
| Launch checklist as a file per project | `Websites\ne_synth\docs\LAUNCH.md` |
| Image-prompt page and PNG-to-JPG script | ne_synth's `docs\image-prompts.html` (its project-specific block is at the top of its script) and `scripts\fit-images.mjs`. Keep the page's "Copy file name" button, because generators name downloads themselves. The script turns a generator's ~2.5 MB PNG into a JPG when it is added; originals stay out of git |

Once the kit exists, the two lizen skills stop being used as general standards.

## 12. Open

First, run the playbook on the next client site from stage 1, with the gates in order. That run also tests the launch checklist and the `website-playbook` skill, which has only been tried on stage 1. Answer the rows below as that site forces them.

| # | Question | What it blocks |
|---|---|---|
| 1 | One image-optimising scheme: postbuild on `out/` (the standard here), kapip's prebuild, or ne_synth's one-off conversion when an image is added | The kit's image script |
| 2 | Form handler: Web3Forms, or a PHP mailer as on aquai and ne_synth, whose Hostinger plans run PHP | The Forms standard |
| 3 | Which analytics tool | A launch checklist line |
| 4 | What the client is shown to sign off at stage 4: a written direction, a wireframe, or a built hero | The stage 4 gate. Also open in the Design Playbook |
| 5 | The commercial side: proposal, price, timeline, payment, and what happens when the client is late with content | Starting a paid site |
| 6 | After handover: where logins are kept, renewals, backups, checking the live site still works | Stage 7 |
| 7 | How to do redirects from old URLs, a 404 page and structured business details on a static Hostinger site | Three launch checklist lines |
| 8 | A path for a client who edits content often, when a CMS is needed | Stage 2's stack table |
| 9 | Bring the older sites (kapip, aquai, aumplus, cisqo-white, lizen) in line, or leave them | Work on those sites |
| 10 | aumplus and cisqo forbid screenshots in their instruction files: change them, or keep them as exceptions | Visual checks on those two |
