---
id: typeforme
type: brief
created: 2026-10-04
updated: 2026-10-04
project_path: D:\FounderMode\Apps\typeforme
app_name: typeforme
app_url:
category: dictation
---

# typeforme

## What it does
Hold Right Ctrl, speak, release, and your words are typed wherever the cursor is, about a second later. A free, Windows-only dictation tool that uses Groq's hosted Whisper, so there is no model to download and it needs internet.

## ICP
Not confirmed by the user (they skipped the review on 2026-10-04). Draft from the repo: someone on Windows who types long prompts into Claude Code or another AI tool all day. They have seen Wispr Flow and either don't want to pay for it or want something simpler.

## Pain
Not confirmed by the user. Draft from the repo: typing a detailed prompt is slow, so they write short, lazy ones and get worse results. Speaking is faster, but the good dictation tools cost a monthly fee.

## Interview
Answers are verbatim.

1. Who did you picture? skip
2. What do they say out loud? skip
3. The "oh" moment: skip
4. Anything surprising: skip

## Screens and flows
- The pill: a dark pill at the bottom centre of the screen. Bars move with your voice while recording; pulsing dots while transcribing. It never takes focus.
- Text landing at the cursor: hold Right Ctrl, start beep, speak, release, stop beep, text is pasted into whatever window had focus (a terminal, or any app).
- Tray menu: top line shows today's usage against Groq's free daily limit; Copy last dictation, Start with Windows, Open config, Open log, Restart, Quit.
- Paste last dictation: Ctrl+Alt+V pastes the most recent dictation again at the cursor.
- config.toml: the vocabulary list and the replacements table ("cloud code" = "Claude Code", "clawed code", "claud code", "clod code"); filler words (um, uh, erm, hmm) are stripped.
- Error pill: red pill with a short reason (no mic, no speech, no internet, bad key, rate limit).

## Facts that are safe to say
- Free to run. Groq's free tier: 20 requests a minute, 2,000 a day, 8 hours of audio a day.
- Windows only. English only. Needs internet. The audio is sent to Groq.
- Cleanup is rule-based, no AI rewriting. Transcripts are never written to disk.
- One clip can run up to 5 minutes.
- Setup today: a free Groq API key, `uv sync`, `start.bat`. No installer.

## Call to action
Not decided. The repo has no live URL or installer; the user has not said where a reel should send people.

## Changes
