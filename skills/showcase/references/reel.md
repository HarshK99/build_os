# Reel mode

The user watched a reel that did well for an audience they care about and wants its pattern kept. They describe it; you never open the link.

## Steps

1. Take whatever the user said and fit it to the framework below. They will often dictate it in one go and out of order.
2. If fields that matter are missing, ask for them once, in a single message. The ones that matter most are the three hook fields and "what kept you watching". Leave anything else empty if they do not know.
3. Add the pattern section yourself. This is the part writers reuse, so make it concrete:
   - **Pattern name:** a short handle, such as "wrong belief, then proof on screen".
   - **Hook template:** the hook with the specifics replaced by slots, such as "You're still [doing the slow thing] in [year]?".
   - **Beats:** the structure of the reel in three to five steps, as far as the user's description supports it.
   - **Use it when:** the kind of app or pain this fits.
4. Save the swipe entry and show the pattern section in the reply so the user can correct it.

Keep the user's description verbatim in the entry. The pattern is your reading of it and may be wrong; the description is the source.

## Framework

```
---
id: swipe/<yyyy-mm-dd>-<slug>
type: swipe
created: <yyyy-mm-dd>
link:
account:
icp:
category:
format: <on camera | screen recording | mix | other>
length_seconds:
views:
views_seen_on: <yyyy-mm-dd>
---

# <short name for the reel>

## What the user saw
- Who it is for:
- First words spoken:
- First on-screen text:
- First visual:
- What kept me watching:
- Call to action:
- Why I think it worked:

## Description, verbatim
<what the user said, unedited>

## Pattern
- Pattern name:
- Hook template:
- Beats:
- Use it when:

## Used in
<script ids that used this pattern, with a one-line result>
```
