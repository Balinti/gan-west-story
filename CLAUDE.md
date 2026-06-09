# Project Instructions

## File Structure — MANDATORY (post-2026-05-01 reorg)

Per-story isolation. Do NOT use the legacy flat folders (`public/scenes/`, `public/audio/`, `public/choices/`) — they no longer exist.

```
public/
├── templates/                              ← character refs grouped by family
│   ├── la-friends/   (Mia.jpg, Sophia.png, Givi.png, Alexander.png, Edoe.png, etc.)
│   ├── bluey/        (Bluey.png, Bingo.png, Bandit.png, Chilli.png, etc.)
│   ├── gan-west/     (Cru.jpg, Mason.jpg, Mia_Alma.jpg, Mia_Alexandra.jpg, Morah_Sarah.jpg, etc.)
│   └── turnip-tale/  (Grandpa.png, Grandma.png, Granddaughter.png, Dog.png, Cat.png, Mouse.png)
└── stories/                                 ← per-story folders
    └── <story-id>/                          ← e.g. palmsprings, garden-bugs, gan-west
        ├── scenes/   (16 scene PNGs, story-prefix kept in filenames)
        ├── images/   (4 choice JPGs + cover image references)
        └── audio/    (~65 narration MP3s)
```

**Rules:**
- Character ref URLs use `/templates/<family>/<name>` (e.g. `https://kidstory.online/templates/gan-west/Cru.jpg`)
- Scene URLs use `${base}stories/<story-id>/scenes/<filename>.png`
- Choice URLs use `stories/<story-id>/images/<filename>.jpg`
- Audio: hook resolves `${base}stories/<story-id>/audio/<filename>.mp3` automatically from story.id
- `generate-images.py` and `generate-audio.py` REQUIRE `--story <id>` flag (writes to correct subdir)

## Image Generation Model — MANDATORY

**Use `nano-banana-2` ONLY.** Do NOT switch to `gpt-image-2-image-to-image` — it produces persistent transparency-checkerboard artifacts in backgrounds when given multiple character refs (their grey/transparent backgrounds leak into the output as grid patterns). Nano-banana-2 handles multi-ref prompts cleanly.

The script `scripts/generate-images.py` is configured for nano-banana-2. Field name is `image_input` (an array). `output_format` is supported.

## Verify-Before-Claim Protocol — MANDATORY

Before describing ANY character in ANY context (chat, prompt, code, review):
1. **View** the actual ref image file (Read tool)
2. **Quote** MEMORY.md or this file for gender + ethnicity (text source-of-truth)
3. **Build** description from #1 visual + #2 textual
4. **Never** describe from "memory" / "pattern" / "looks like" — if file not open, do not claim

Before ANY image-gen API call:
- Present a verification table (Char | Gender | Skin tone | Outfit | Ref path) and require user sign-off ONCE
- After sign-off, do not re-ask — just run

Wrong claims are treated as a process failure (the protocol failed) not a one-off correction.

## Verified Turnip-Tale Character Descriptions (story: enormous-turnip)

Source-of-truth, generated nano-banana-2 + viewed. Use verbatim in any enormous-turnip prompt. Refs: `https://kidstory.online/templates/turnip-tale/<Name>.png`

| Char | Description (verified from ref) |
|------|--------------------------------|
| **Grandpa** | Kind elderly farmer, round chubby rosy face, short WHITE beard, bushy white brows, balding white-sided hair, BLUE denim overalls over red-and-white checked shirt, tan STRAW HAT, brown boots, little round belly |
| **Grandma** | Kind elderly woman, grey hair in a BUN, small round eyeglasses, rosy cheeks, long FOREST-GREEN dress with RED APRON, brown shoes |
| **Granddaughter** | ~4yr girl, round rosy face, light-brown hair in TWO PIGTAILS with RED ribbons, sunny YELLOW polka-dot dress with white collar, white socks, red shoes |
| **Dog** | Small cute farm dog, BROWN & WHITE fur, floppy ears, red collar with gold tag, tongue out, on all fours |
| **Cat** | Plump ORANGE TABBY, darker orange stripes, white belly & paws, big round GREEN eyes, sits upright |
| **Mouse** (the hero) | Tiny grey mouse, lighter cream belly, BIG round ears, big black eyes, pink nose, little pink hands/feet, thin curly tail, stands upright |

## Verified Gan West Character Descriptions

These are the source-of-truth descriptions, derived from viewing each ref file. Use these verbatim in any Gan West prompt.

| Char | Gender (MEMORY) | Description (verified from ref) |
|------|----------------|--------------------------------|
| **Cru** | BOY | light-skin, dark brown STRAIGHT medium-length hair, big BLUE eyes, light blue t-shirt, blue jeans, brown leather lace-up boots |
| **Mason** | BOY | light-skin, short CURLY brown hair, brown eyes, slight smile, light grey t-shirt, blue jeans, blue/grey sneakers |
| **Shai** | **BOY** (do NOT confuse with girls — visually androgynous) | light-skin, tousled CURLY brown hair, big open smile, white t-shirt, blue shorts, white sneakers |
| **Desi** | BOY | light-skin, messy BLONDE wavy hair, brown eyes, sage green t-shirt, sage pants with little vehicle/car prints, dark grey shoes |
| **Mia Alma** | GIRL | white-skin, REDDISH-BROWN hair in TWO pigtail buns (one each side), big blue-grey eyes, ORANGE pinafore overalls dress over yellow t-shirt, yellow shoes |
| **Aila** | GIRL | **LIGHT/WHITE-skin (NOT brown, NOT dark)**, brown wavy hair pulled into a small bun on TOP of head, brown eyes, big open smile, **periwinkle/light-blue KNIT top with embroidered colorful flowers** across the chest (NOT a flowy floral dress), cream leggings with small floral print, light blue shoes |
| **Chaya** | GIRL | light-skin, chin-length brown CURLY hair, ROUND eyeglasses, sweet small smile, ruffled pink-floral long-sleeve top, NAVY blue corduroy skirt with white lace trim, white socks, pink shoes |
| **Mia Alexandra** | GIRL | **LIGHT-MEDIUM golden-tan skin (NOT Black, NOT African-American)**, PALE BLONDE tightly-curled hair in ONE bun on TOP of head, brown eyes, pinkish-purple long-sleeve ribbed top, black-and-white CHECKERED (gingham) pants, pink shoes |

**Teachers (Gan West):**

| Char | Description |
|------|-------------|
| **Morah Sarah** | ~50yo light-skin woman, WAVY shoulder-length BLONDE hair, big tortoiseshell ROUND eyeglasses, modest NAVY long-sleeve floor-length dress, warm grandmotherly smile |
| **Teacher Elizabeth** | younger light-skin woman, LONG wavy DARK hair (no glasses), white t-shirt + dark blue jeans + white sneakers, warm friendly demeanor |
| **Teacher Virginia** | light-medium skin (Latina-coded), long wavy DARK hair, dark-frame eyeglasses, dark green long-sleeve top + jeans, sweet warm smile |
| **Teacher Jocelyn** | (view ref before describing — not yet audited in this session) |

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
