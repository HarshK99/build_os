# Shot mode

The user has shot and posted a video, or published a post on X, and is giving you the final text. Two things happen: it is recorded, and the voice guide learns from it.

## Steps

1. Work out which app it belongs to, which platform it went out on, and which idea it came from, if any. Ask if it is not clear. A script or post with no idea behind it is fine.
2. Save it verbatim as a script record with its `platform`, and the post link and date if the user gave them. For a thread, keep the posts numbered as published. Set the idea's status to `shot`. If the idea used a swipe pattern, add this script's id under "Used in" on that swipe entry.
3. Update the voice guide. Evidence, strongest first:
   - where the final text differs from a draft, hook, or first line this skill wrote for the same idea: every change is the user correcting the skill toward how they talk or write
   - the text on its own: sentence length, how they open, words they repeat, how they ask for the click
   
   Add only what the text shows, each point with a quoted example, the script's id as its source, and a tag: `spoken` for a reel script, `written` for a post. People write differently from how they talk, and the tag stops one from being used to imitate the other. If a new observation contradicts an older one with the same tag, keep the newer and note the change. Add two or three characteristic lines to Samples, tagged the same way.
4. In the reply, list exactly what you added to or changed in the voice guide, so the user can tell you to drop anything that is wrong.

One script is thin evidence. Phrase observations as what this script did, and let them firm up as more scripts agree.

## Script template

```
---
id: <app-slug>/scripts/<yyyy-mm-dd>-<slug>
type: script
created: <yyyy-mm-dd>
app: <app-slug>
platform: <instagram | x>
idea: <idea id, or empty>
posted_url:
posted_on:
---

# <title>

## Script, as shot
<verbatim; for X, the post or thread as published>

## Results
<the table for this record's platform>
```

Results table for `instagram`:

```
| Date | Views | Likes | Comments | Shares | Saves | Follows | Clicks or signups | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
```

Results table for `x`:

```
| Date | Impressions | Likes | Replies | Reposts | Bookmarks | Follows | Link clicks | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
```
