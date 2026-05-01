#!/usr/bin/env python3
"""
ATOMIC migration: reorganize public/ from flat folders into per-story folders.

OLD:                                              NEW:
  public/scenes/X.png                              public/stories/<story>/scenes/X.png
  public/choices/X.jpg                             public/stories/<story>/images/X.jpg
  public/audio/X.mp3                               public/stories/<story>/audio/X.mp3
  public/characters/{Cru,Mason,...}.jpg            public/templates/gan-west/Cru.jpg, ...
  public/characters/forum/*                        public/templates/la-friends/*
  public/characters/bluey/*                        public/templates/bluey/*

This script:
1. Parses each src/data/stories/*.ts to find which files belong to which story.
2. Uses `git mv` to move files (preserving history).
3. Updates the path references in the TS files.
4. Reports what was done.

Usage:
    python3 scripts/migrate-to-stories-folders.py [--dry-run]
"""
import os, re, sys, subprocess, shutil
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
PUBLIC = REPO / "public"
STORIES_TS_DIR = REPO / "src/data/stories"

DRY_RUN = "--dry-run" in sys.argv

# Map TS filename → story-id (folder name under public/stories/)
STORY_ID_MAP = {
    "ganWest.ts": "ganwest",
    "palmsprings.ts": "palmsprings",
    "garden-bugs.ts": "garden-bugs",
    "bluey-playground.ts": "bluey-playground",
    "zoo2.ts": "zoo2",
    "forum.ts": "forum",
    "pool.ts": "pool",
    "uganda.ts": "uganda",
    "zoo.ts": "zoo",
}

# Character folders (templates)
CHAR_GROUPS = {
    "la-friends": ["forum"],  # public/characters/forum/* → public/templates/la-friends/*
    "bluey": ["bluey"],
    "gan-west": ["__root__"],  # files directly under public/characters/*.jpg
}


def run(cmd, ok_to_fail=False):
    if DRY_RUN:
        print(f"  [DRY] {cmd}")
        return True
    try:
        subprocess.run(cmd, shell=True, check=True, capture_output=True)
        return True
    except subprocess.CalledProcessError as e:
        if ok_to_fail:
            return False
        print(f"  ERROR: {cmd}: {e.stderr.decode() if e.stderr else e}")
        return False


def parse_story_ts(ts_path: Path):
    """Return (scene_files, choice_files, audio_files) referenced by this TS."""
    src = ts_path.read_text()
    scenes = sorted(set(re.findall(r'\$\{base\}scenes/([^"`\']+\.png)', src)))
    choices = sorted(set(re.findall(r'choices/([^"`\']+\.jpg)', src)))
    audio = sorted(set(re.findall(r'file:\s*"([^"]+\.mp3)"', src)))
    return scenes, choices, audio


def update_ts_paths(ts_path: Path, story_id: str):
    """Update path references in TS file to point to new structure."""
    src = ts_path.read_text()
    # ${base}scenes/X.png → ${base}stories/<id>/scenes/X.png
    src = re.sub(
        r'\$\{base\}scenes/',
        f'${{base}}stories/{story_id}/scenes/',
        src
    )
    # choices/X.jpg → stories/<id>/images/X.jpg (note: removed 'choices/' prefix; will be served from stories/<id>/images/)
    src = re.sub(
        r'(?<!stories/)choices/',
        f'stories/{story_id}/images/',
        src
    )
    if not DRY_RUN:
        ts_path.write_text(src)
    return src


def main():
    print(f"=== Migration {'(DRY RUN)' if DRY_RUN else ''} ===\n")

    # Phase 1: Process each story
    plan = {}  # story_id → {scenes: [], choices: [], audio: []}
    for ts_name, story_id in STORY_ID_MAP.items():
        ts_path = STORIES_TS_DIR / ts_name
        if not ts_path.exists():
            print(f"WARN: {ts_name} not found, skipping")
            continue
        scenes, choices, audio = parse_story_ts(ts_path)
        plan[story_id] = {
            "ts": ts_path,
            "scenes": scenes,
            "choices": choices,
            "audio": audio,
        }
        print(f"[{story_id}] scenes={len(scenes)}  choices={len(choices)}  audio={len(audio)}")

    print()

    # Phase 2: Move files (Stories)
    print("=== Moving story files ===")
    moved = {"scenes": 0, "choices": 0, "audio": 0}
    skipped = []
    for story_id, info in plan.items():
        # Create dest dirs
        for kind in ["scenes", "images", "audio"]:
            dest = PUBLIC / "stories" / story_id / kind
            if not DRY_RUN:
                dest.mkdir(parents=True, exist_ok=True)

        for fn in info["scenes"]:
            src = PUBLIC / "scenes" / fn
            dest = PUBLIC / "stories" / story_id / "scenes" / fn
            if src.exists():
                if run(f'git mv "{src}" "{dest}"', ok_to_fail=True):
                    moved["scenes"] += 1
                elif not DRY_RUN:
                    # Fallback: not tracked → just mv
                    shutil.move(str(src), str(dest))
                    moved["scenes"] += 1
            else:
                skipped.append(f"  scene MISSING: {src}")

        for fn in info["choices"]:
            src = PUBLIC / "choices" / fn
            dest = PUBLIC / "stories" / story_id / "images" / fn
            if src.exists():
                if run(f'git mv "{src}" "{dest}"', ok_to_fail=True):
                    moved["choices"] += 1
                elif not DRY_RUN:
                    shutil.move(str(src), str(dest))
                    moved["choices"] += 1
            else:
                skipped.append(f"  choice MISSING: {src}")

        for fn in info["audio"]:
            src = PUBLIC / "audio" / fn
            dest = PUBLIC / "stories" / story_id / "audio" / fn
            if src.exists():
                if run(f'git mv "{src}" "{dest}"', ok_to_fail=True):
                    moved["audio"] += 1
                elif not DRY_RUN:
                    shutil.move(str(src), str(dest))
                    moved["audio"] += 1
            else:
                skipped.append(f"  audio MISSING: {src}")

        # Update TS path refs
        update_ts_paths(info["ts"], story_id)

    print(f"  moved: {moved}\n")
    if skipped:
        print(f"  {len(skipped)} files were referenced in TS but not found on disk (likely already moved or stale refs)")

    # Phase 3: Move characters → templates
    print("=== Moving characters → templates ===")
    char_moved = 0

    # la-friends: public/characters/forum/* → public/templates/la-friends/*
    forum_dir = PUBLIC / "characters" / "forum"
    if forum_dir.exists():
        dest_dir = PUBLIC / "templates" / "la-friends"
        if not DRY_RUN:
            dest_dir.mkdir(parents=True, exist_ok=True)
        for f in forum_dir.iterdir():
            dest = dest_dir / f.name
            if run(f'git mv "{f}" "{dest}"', ok_to_fail=True):
                char_moved += 1
            elif not DRY_RUN:
                shutil.move(str(f), str(dest))
                char_moved += 1
        if not DRY_RUN and forum_dir.exists() and not any(forum_dir.iterdir()):
            forum_dir.rmdir()

    # bluey: public/characters/bluey/* → public/templates/bluey/*
    bluey_dir = PUBLIC / "characters" / "bluey"
    if bluey_dir.exists():
        dest_dir = PUBLIC / "templates" / "bluey"
        if not DRY_RUN:
            dest_dir.mkdir(parents=True, exist_ok=True)
        for f in bluey_dir.iterdir():
            dest = dest_dir / f.name
            if run(f'git mv "{f}" "{dest}"', ok_to_fail=True):
                char_moved += 1
            elif not DRY_RUN:
                shutil.move(str(f), str(dest))
                char_moved += 1
        if not DRY_RUN and bluey_dir.exists() and not any(bluey_dir.iterdir()):
            bluey_dir.rmdir()

    # gan-west: files directly under public/characters/ (Cru.jpg, Mia_Alma.jpg, etc.)
    chars_dir = PUBLIC / "characters"
    if chars_dir.exists():
        dest_dir = PUBLIC / "templates" / "gan-west"
        if not DRY_RUN:
            dest_dir.mkdir(parents=True, exist_ok=True)
        for f in chars_dir.iterdir():
            if f.is_file():
                dest = dest_dir / f.name
                if run(f'git mv "{f}" "{dest}"', ok_to_fail=True):
                    char_moved += 1
                elif not DRY_RUN:
                    shutil.move(str(f), str(dest))
                    char_moved += 1
        if not DRY_RUN and chars_dir.exists() and not any(chars_dir.iterdir()):
            chars_dir.rmdir()

    print(f"  characters moved: {char_moved}\n")

    # Phase 4: Cleanup empty parent dirs
    print("=== Cleanup ===")
    for sub in ("scenes", "audio", "choices"):
        d = PUBLIC / sub
        if d.exists() and not DRY_RUN:
            try:
                if not any(d.iterdir()):
                    d.rmdir()
                    print(f"  removed empty {d}")
                else:
                    leftover = list(d.iterdir())
                    print(f"  {d} still has {len(leftover)} unreferenced files (leaving in place)")
            except Exception as e:
                print(f"  could not remove {d}: {e}")

    print(f"\n=== Migration {'(DRY RUN)' if DRY_RUN else 'complete'} ===")
    print(f"  Stories migrated: {len(plan)}")
    print(f"  Files moved: {sum(moved.values())} story files + {char_moved} character files")


if __name__ == "__main__":
    main()
