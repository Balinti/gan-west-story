# Project Instructions

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
