# Teach mode

The user is using this skill for real and has found something to change: an output that missed, a step that wasted their time, a question that should be asked, a rule that turned out wrong. Teach mode turns that into a change so the next run is better.

## Steps

1. **Get the lesson.** Take what the user said. If this session already ran another mode, use that run as evidence: what the skill was told, what it produced, and what the user wanted instead. If you cannot tell what they want changed, ask one question.

2. **Decide where the lesson belongs.** Most lessons are not about the skill's instructions, and putting them in the wrong place makes the skill longer without making it better.

   | The lesson is about | It goes in |
   | --- | --- |
   | How the user talks or words things | the voice guide |
   | What works in reels for some audience | a swipe entry (run reel mode), or a note on an existing one |
   | One app: its ICP, pain, screens, call to action | that app's brief |
   | How the skill works: steps, questions, angles, formats, what agents are told, what gets stored | the skill's files |

   Tell the user where you are putting it. If it belongs in the library, make that change and stop here.

3. **Change the skill.** The skill's source is defined in `storage.md`. Find the instruction that produced the behaviour and change it there.
   - Rewrite the instruction in place. Do not add a growing list of rules at the end of a file; a rule far from the step it governs gets missed, and two instructions that disagree are worse than one.
   - Say why in the text, briefly, so a later session can apply it to cases the user did not mention.
   - Keep it general. A lesson learned on one app should be written so it holds for the next app. If it only holds for one app, it belongs in that app's brief.
   - If the change affects record shapes or paths, change `storage.md` and bring existing library records in line with it.
   - If a command was added, removed, or renamed, update the modes table in `SKILL.md` and the table in `CONTENT_PLAYBOOK.md` at the root of the build_os repository.

4. **Check the result.** Reread the file you changed from top to bottom and make sure nothing else in the skill now contradicts it.

5. **Save it.** Commit the change in the build_os repository (its path is in `storage.md`) and push. Put the reason in the commit message, since the git history is the record of what the skill learned and why. If other files there have uncommitted changes, such as new library records or work on another playbook, leave them out of this commit.

6. **Report.** Say what you changed, in which file, in a few lines. The change takes effect the next time the skill is invoked.
