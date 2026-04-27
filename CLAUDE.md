# Project Instructions

## Character Reference Disambiguation — CRITICAL

There are MULTIPLE characters whose names START with "Mia". NEVER confuse them.

| Name in story | EXACT reference path | Description |
|---|---|---|
| **Mia** (LA Friends stories) | `public/characters/forum/Mia.jpg` | White/light-skinned toddler, reddish-brown TWO pigtail buns (one each side), big blue-grey eyes, yellow t-shirt under ORANGE pinafore overalls, yellow sneakers |
| **Mia Alma** (Gan West) | `public/characters/Mia_Alma.jpg` | Same visual as LA Friends Mia (white, two pigtail buns, orange overalls dress) |
| **Mia Alexandra** (Gan West) | `public/characters/Mia_Alexandra.jpg` | LIGHT-MEDIUM skin tone (golden/tan — **NOT Black, NOT African-American**), PALE BLONDE tightly-curled hair in ONE bun on TOP of head, brown eyes, pinkish-purple long-sleeve ribbed top, black-and-white CHECKERED (gingham) pants, pink shoes |

**CRITICAL: Do NOT describe Mia Alexandra as "Black" or "African-American" in any prompt. She is NOT.** Always view `public/characters/Mia_Alexandra.jpg` before writing her into a prompt.

**Rules:**
- Stories with `la-friends` or `bluey` type → "Mia" = `public/characters/forum/Mia.jpg` ONLY. Never Mia_Alma, never Mia_Alexandra.
- Stories with `gan-west` type → use whichever Mia_* the user specified; never substitute.
- The GitHub Pages URL for LA Friends Mia is: `https://kidstory.online/characters/forum/Mia.jpg` (case sensitive!)
- **NEVER** use multiple "Mia" refs in the same scene unless the story explicitly has multiple Mia characters meeting.

## Pipeline Cancellation Rules

- **DO NOT DELETE AUDIO** when cancelling/restarting a pipeline. Audio narration text is rarely visual-character-specific and is usually reusable. Only delete audio when the story text itself has changed.
- When cancelling: only delete image files (scenes + choices), keep audio for reuse if user wants.
- When restarting: audio-lines.json is cheap to regenerate — but existing mp3s can often be reused if concept is same.
- **ElevenLabs history API returns 0 items** on this account (likely plan limitation) — so once a mp3 is deleted locally, it's gone. BE CAREFUL with `rm` commands.
- **ALWAYS preserve the audio-lines.json file** (copy it to `data/audio-lines-backup-{jobId}.json` on cancel) so narration text can be replayed cheaply.

## Bluey / Heeler Family Rules

- **NO CLOTHES.** The Heeler family characters in the source material wear their natural fur, not T-shirts/pants. When generating scenes OR character refs, prompt for their natural heeler fur colors ONLY — no added clothing. Exception: if a scene explicitly involves costumes (e.g. pajamas, swimsuits), mention that explicitly.
- Size rule: Bluey and Mia (LA Friends) must be the SAME height in any shared scene (both toddler scale). Bingo slightly shorter than Bluey. Adults (Bandit, Chilli, Stripe, Trixie, Bob, Nana) clearly much taller.
- Character reference images live in `public/characters/bluey/` — GitHub Pages URL: `https://kidstory.online/characters/bluey/<Name>.png` (case sensitive!)
- Trixie and Muffin are **WHITE/GREY with black spots** (NOT yellow). Check refs before prompting.
- Socks is a **tiny grey-blue BABY** — smallest of all kids, often on all fours.

## Image Generation — MANDATORY RULES

**Read `memory/image-generation.md` BEFORE generating ANY image. No exceptions.**

### Before generating:
1. **View every character reference image** (the actual JPG/PNG file) for characters in the scene. Do NOT rely on text descriptions from memory.
2. **Aspect ratio is ALWAYS 9:16 (portrait).** The only exceptions are pool and uganda stories which were mistakenly generated in 16:9. NEVER repeat this mistake.
3. **Use character ref images** as `image_input` array. Never generate without refs.
4. **Check catbox URLs are alive** (HTTP 200) before submitting. Re-upload if any return 404.

### Prompts must include:
- Exact character count ("exactly 3 toddlers and 1 adult")
- "ONLY the named characters appear — NO other people visible"
- Age descriptions (toddlers = "28-month-old, very small, chubby cheeks, big head")
- Activity-appropriate clothing (pool = swimsuits, sleep = pajamas)
- Each character's distinguishing features from their reference image

### After generating — VALIDATE EVERY IMAGE:
1. **View the generated image**
2. **View every character reference image** side by side
3. Run ALL 8 validation steps from `memory/image-generation.md`
4. Count characters, check likenesses, check for duplicates, check clothing, check extras
5. Regenerate any failures
6. **Do NOT tell Edoe images are done until every image has been viewed and validated**

### Common failures to catch:
- Random/extra children who aren't in the story
- Characters whose ethnicity changed from their reference
- Duplicate characters (two kids who look identical)
- Adults rendered too young (Morah Sara is 50, not 25)
- Kids rendered too old (they're 2, not 5-6)
- Wrong clothing for the activity (regular clothes in pool scene)
- Non-existent family members (e.g. giving Fred a son he doesn't have)

## Sub-Agent System — MANDATORY for image work

**Full docs: `memory/workflow-subagents.md`**

When generating or fixing stories, ALWAYS use these 7 agents:

| Agent | Role | When |
|-------|------|------|
| **GATEKEEPER** | Reviews work, PASS/FAIL. Nothing proceeds without PASS. | 3 gates: pre-gen, post-image-val, post-audio-val |
| **Project Manager** | Tracks all agents, status table to Edoe every ~1 min | Background, entire duration |
| **Script Builder** | Builds scenes.json + audio-lines.json | First working agent |
| **Image Generator** | Runs `scripts/generate-images.py` | After Gatekeeper G1 PASS |
| **Audio Generator** | Runs `scripts/generate-audio.py` | After Gatekeeper G1 PASS (parallel w/ images) |
| **Image Validator** | Views images + refs, 8 validation steps | After image generation (parallel batches) |
| **Audio Validator** | Checks files exist, correct size, no missing | After audio generation |

### Flow:
```
Script Builder → GATEKEEPER G1 → Image Generator (bg) ──→ Image Validators → GATEKEEPER G2
                 ↑ FAIL=fix      Audio Generator (bg) ──→ Audio Validator  → GATEKEEPER G3
```
PM runs in background, status table every ~1 min. Images + audio generate in parallel.

### Rules:
- **GATEKEEPER is the authority.** 3 gates, all must PASS. No shortcuts.
- G1 checks: prompts, refs, aspect ratio, clothing, hair, skin, sizes, audio text, file names
- G2 checks: image validation was thorough (files read, all 8 steps, reasonable decisions)
- G3 checks: audio files exist, correct sizes, no missing lines
- Max 3 retry rounds per type before escalating to Edoe
