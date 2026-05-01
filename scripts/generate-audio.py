#!/usr/bin/env python3
"""
Batch audio generation via ElevenLabs TTS.

Usage:
    python3 scripts/generate-audio.py audio-lines.json

audio-lines.json format:
[
  {
    "file": "pool-opening_01.mp3",
    "text": "It's a beautiful Saturday and the Bin family is getting ready!"
  },
  ...
]

Output: Downloads MP3s to public/audio/{file}
"""

import json
import os
import subprocess
import sys
import time
from pathlib import Path

# Auto-load .env from project root (one dir up from scripts/)
_env_path = Path(__file__).resolve().parent.parent / ".env"
if _env_path.exists():
    for _line in _env_path.read_text().splitlines():
        _line = _line.strip()
        if _line and not _line.startswith("#") and "=" in _line:
            _k, _v = _line.split("=", 1)
            os.environ.setdefault(_k.strip(), _v.strip().strip('"').strip("'"))

API_KEY = os.environ.get("ELEVENLABS_API_KEY", "")
if not API_KEY:
    print("ERROR: ELEVENLABS_API_KEY env var not set. Add it to .env or export it.", file=sys.stderr)
    sys.exit(1)
VOICE_ID = "cR39HTrtXbjvEP4CNYFx"  # Daphne
MODEL = "eleven_v3"
PUBLIC_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public")


def get_audio_dir(story_id):
    """Return audio dir for the given story id under public/stories/<id>/audio/."""
    d = os.path.join(PUBLIC_DIR, "stories", story_id, "audio")
    os.makedirs(d, exist_ok=True)
    return d


def generate_one(entry, audio_dir):
    """Generate a single MP3 via ElevenLabs. Returns (filename, success, error)."""
    filename = entry["file"]
    text = entry["text"]
    out_path = os.path.join(audio_dir, filename)

    payload = json.dumps({
        "text": text,
        "model_id": MODEL,
        "voice_settings": {
            "stability": 0.4,
            "similarity_boost": 0.8,
            "style": 0.7,
        },
    })

    for attempt in range(3):
        try:
            r = subprocess.run(
                ["curl", "-s", "-w", "\n%{http_code}",
                 "-X", "POST",
                 f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}",
                 "-H", f"xi-api-key: {API_KEY}",
                 "-H", "Content-Type: application/json",
                 "-d", payload,
                 "-o", out_path],
                capture_output=True, text=True, timeout=30,
            )
            status = r.stdout.strip().split("\n")[-1]
            if status == "200" and os.path.getsize(out_path) > 1000:
                sz = os.path.getsize(out_path) // 1024
                return filename, True, f"{sz} KB"
            else:
                # Check if response is an error JSON instead of audio
                if os.path.getsize(out_path) < 500:
                    with open(out_path, "r", errors="ignore") as f:
                        err = f.read(200)
                    os.remove(out_path)
                    if attempt < 2:
                        time.sleep((attempt + 1) * 5)
                        continue
                    return filename, False, f"HTTP {status}: {err}"
                return filename, False, f"HTTP {status}"
        except Exception as e:
            if attempt < 2:
                time.sleep(5)
                continue
            return filename, False, str(e)

    return filename, False, "Max retries exceeded"


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 scripts/generate-audio.py audio-lines.json --story <story-id>")
        sys.exit(1)

    # Parse --story arg
    story_id = None
    json_path = None
    args = sys.argv[1:]
    i = 0
    while i < len(args):
        if args[i] == "--story" and i + 1 < len(args):
            story_id = args[i + 1]
            i += 2
        else:
            json_path = args[i]
            i += 1
    if not json_path:
        print("ERROR: missing JSON file argument")
        sys.exit(1)
    if not story_id:
        print("ERROR: missing --story <story-id> argument")
        sys.exit(1)

    audio_dir = get_audio_dir(story_id)
    print(f"Output dir: {audio_dir}\n")

    with open(json_path) as f:
        lines = json.load(f)

    print(f"Generating {len(lines)} audio files...\n")

    succeeded = []
    failed = []

    for i, entry in enumerate(lines):
        filename, ok, detail = generate_one(entry, audio_dir)
        if ok:
            print(f"  [{i+1}/{len(lines)}] ✓ {filename} ({detail})")
            succeeded.append(filename)
        else:
            print(f"  [{i+1}/{len(lines)}] ✗ {filename} — {detail}")
            failed.append((filename, detail))

        # Rate limit: ElevenLabs allows ~10 req/s but be safe
        if i < len(lines) - 1:
            time.sleep(0.5)

    print(f"\n=== Results: {len(succeeded)} succeeded, {len(failed)} failed ===")
    if failed:
        print("Failed:")
        for name, err in failed:
            print(f"  - {name}: {err}")

    # Write results
    results_file = json_path.replace(".json", "-results.json")
    with open(results_file, "w") as f:
        json.dump({
            "succeeded": succeeded,
            "failed": [f[0] for f in failed],
        }, f, indent=2)
    print(f"\nResults written to {results_file}")


if __name__ == "__main__":
    main()
