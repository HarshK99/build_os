# Storage

This file is the storage contract. Other files in this skill name records ("the brief", "a swipe entry") and never paths. If storage moves to the cloud later, this is the file that changes.

## Root

```
D:\FounderMode\Apps\build_os\library\showcase
```

## Skill source

```
D:\FounderMode\Apps\build_os\skills\showcase
```

The skill's own files. `D:\FounderMode\Apps\build_os` is a git repository holding both the skill and the library, alongside my other playbooks. Edit the skill here, not through the links in the personal skills folders.

## Layout

```
library/
  voice.md                              the voice guide (one file)
  swipe/<yyyy-mm-dd>-<slug>.md          one swipe entry per reel the user described
  apps/<app-slug>/
    brief.md                            ICP, pain, interview answers, screens, CTA, and the X section
    ideas/<yyyy-mm-dd>.md               one file per reel ideas run
    ideas/<yyyy-mm-dd>-x.md             one file per X ideas run
    drafts/<yyyy-mm-dd>-<idea-id>.md    full scripts and posts written by this skill on request
    scripts/<yyyy-mm-dd>-<slug>.md      scripts as shot and posts as published, with results
```

## Finding the app

The app is normally the project in the current working directory. If the working directory is the build_os folder itself, or the user names another project, use the path they give.

Match an existing app by the `project_path` in each brief's frontmatter first, then by slug. For a new app, take the slug from the project folder name (lowercase, hyphens) and tell the user which slug you used.

## Record shape

Every record starts with frontmatter. Keep the fields flat and simple so each record could become a database row later.

| Record | id format | Frontmatter fields |
| --- | --- | --- |
| brief | `<app-slug>` | `id`, `type: brief`, `created`, `updated`, `project_path`, `app_name`, `app_url`, `category` |
| ideas run | `<app-slug>/ideas/<yyyy-mm-dd>`, with `-x` on the end for an X run | `id`, `type: ideas`, `created`, `app`, `platform`, `audience` (`icp`, `builders`, or `mixed`) |
| draft | `<app-slug>/drafts/<yyyy-mm-dd>-<idea-id>` | `id`, `type: draft`, `created`, `app`, `platform`, `idea` |
| script | `<app-slug>/scripts/<yyyy-mm-dd>-<slug>` | `id`, `type: script`, `created`, `app`, `platform`, `idea`, `posted_url`, `posted_on` |
| swipe entry | `swipe/<yyyy-mm-dd>-<slug>` | `id`, `type: swipe`, `created`, `link`, `account`, `icp`, `category`, `format`, `length_seconds`, `views`, `views_seen_on` |

Rules:

- `platform` is `instagram` or `x`. It says which idea format, which full-script steps, and which results columns apply to a record. A post published on X is a `script` record with `platform: x`.
- An X ideas run is `audience: mixed`, because it holds ICP ideas and one build story; each idea in it names its own audience.
- Refer to other records by `id`, never by file path.
- Idea ids are `I1`, `I2`, … and keep counting across runs for the same app, on both platforms, so `I7` always means one idea. Refer to an idea from outside its app as `<app-slug>/I7`.
- Dates are `yyyy-mm-dd`. Use today's date from the session, not a guess.
- If two records would get the same file name on the same day, add `-2`, `-3`.
- Leave a field empty when it is unknown. Do not fill it with a guess.
