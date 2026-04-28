#!/usr/bin/env python3
"""
Reusable image generation + download script for Kie AI (Nano Banana 2).

Usage:
    python3 scripts/generate-images.py scenes.json

scenes.json format:
[
  {
    "name": "scene-name",
    "aspect": "9:16",
    "refs": ["https://url1.png", "https://url2.png"],
    "prompt": "Pixar-style 3D animated..."
  },
  ...
]

Output: Downloads PNGs to public/scenes/{name}.png, resized to 1200px max dimension.
"""

import json
import os
import subprocess
import sys
import time

API_KEY = "b9cbc91595f2c612b63bc5ab3c841461"
BASE_URL = "https://api.kie.ai"
# Reverted to nano-banana-2 — gpt-image-2 had transparency/checkerboard issues
# with multi-ref prompts that nano-banana doesn't have.
MODEL = "nano-banana-2"
SCENES_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "scenes")
CHOICES_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "choices")


def verify_urls(urls):
    """Check that all ref URLs return HTTP 200."""
    bad = []
    for url in urls:
        try:
            r = subprocess.run(
                ["curl", "-s", "-o", "/dev/null", "-w", "%{http_code}", url],
                capture_output=True, text=True, timeout=15,
            )
            if r.stdout.strip() != "200":
                bad.append((url, r.stdout.strip()))
        except Exception as e:
            bad.append((url, str(e)))
    return bad


def submit_task(scene):
    """Submit a single scene to Kie AI. Returns taskId or None.

    Uses nano-banana-2. Refs go in `image_input`. `output_format` controls jpg vs png.
    """
    payload = {
        "model": MODEL,
        "input": {
            "prompt": scene["prompt"],
            "aspect_ratio": scene.get("aspect", "9:16"),
            "output_format": scene.get("format", "png"),
            "image_input": scene.get("refs", []),
        },
    }
    for attempt in range(3):
        try:
            r = subprocess.run(
                ["curl", "-s", "-X", "POST", f"{BASE_URL}/api/v1/jobs/createTask",
                 "-H", f"Authorization: Bearer {API_KEY}",
                 "-H", "Content-Type: application/json",
                 "-d", json.dumps(payload)],
                capture_output=True, text=True, timeout=30,
            )
            data = json.loads(r.stdout)
            if data.get("code") == 200:
                return data["data"]["taskId"]
            print(f"  API error (attempt {attempt+1}): {data}")
            time.sleep((attempt + 1) * 10)
        except Exception as e:
            print(f"  Exception (attempt {attempt+1}): {e}")
            time.sleep(10)
    return None


def poll_tasks(tasks, timeout=600):
    """Poll all tasks until done. Returns dict of {name: result}."""
    pending = dict(tasks)
    results = {}
    start = time.time()

    while pending and time.time() - start < timeout:
        done = []
        for name, tid in pending.items():
            try:
                r = subprocess.run(
                    ["curl", "-s", f"{BASE_URL}/api/v1/jobs/recordInfo?taskId={tid}",
                     "-H", f"Authorization: Bearer {API_KEY}"],
                    capture_output=True, text=True, timeout=30,
                )
                rdata = json.loads(r.stdout).get("data", {})
                state = rdata.get("state", "")
                if state == "success":
                    urls = json.loads(rdata["resultJson"])["resultUrls"]
                    results[name] = {"status": "success", "urls": urls}
                    done.append(name)
                elif state in ("failed", "fail", "error"):
                    results[name] = {"status": "failed", "msg": rdata.get("failMsg", "?")}
                    done.append(name)
            except Exception:
                pass
        for n in done:
            del pending[n]
        if pending:
            elapsed = int(time.time() - start)
            print(f"  ... {len(pending)} pending ({elapsed}s)")
            time.sleep(15)

    for name in pending:
        results[name] = {"status": "timeout"}
    return results


def _resize(src, out, max_dim, as_jpeg=False):
    """Resize image using sips (macOS) or ImageMagick convert (Linux)."""
    import platform
    if platform.system() == "Darwin":
        if as_jpeg:
            subprocess.run(
                ["sips", "-Z", str(max_dim), "-s", "format", "jpeg", "-s", "formatOptions", "80", "--out", out, src],
                capture_output=True,
            )
        else:
            subprocess.run(["sips", "-Z", str(max_dim), src], capture_output=True)
    else:
        # Linux: use ImageMagick
        if as_jpeg:
            subprocess.run(
                ["convert", src, "-resize", f"{max_dim}x{max_dim}>", "-quality", "80", out],
                capture_output=True,
            )
        else:
            subprocess.run(
                ["convert", src, "-resize", f"{max_dim}x{max_dim}>", out],
                capture_output=True,
            )


def download_and_resize(name, url, is_choice=False):
    """Download image and resize with sips (macOS) or ImageMagick (Linux)."""
    if is_choice:
        tmp = os.path.join(CHOICES_DIR, f"{name}.tmp.png")
        out = os.path.join(CHOICES_DIR, f"{name}.jpg")
        subprocess.run(["curl", "-s", "-o", tmp, url], timeout=60)
        _resize(tmp, out, 400, as_jpeg=True)
        if os.path.exists(tmp):
            os.remove(tmp)
    else:
        out = os.path.join(SCENES_DIR, f"{name}.png")
        subprocess.run(["curl", "-s", "-o", out, url], timeout=60)
        _resize(out, out, 1200, as_jpeg=False)
    sz = os.path.getsize(out) // 1024
    print(f"  DONE: {name} ({sz} KB)")
    return out


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 scripts/generate-images.py scenes.json")
        sys.exit(1)

    with open(sys.argv[1]) as f:
        scenes = json.load(f)

    print(f"Loaded {len(scenes)} scenes.\n")

    # Phase 0: Verify all ref URLs
    all_refs = set()
    for s in scenes:
        all_refs.update(s.get("refs", []))
    if all_refs:
        print(f"Verifying {len(all_refs)} reference URLs...")
        bad = verify_urls(all_refs)
        if bad:
            print("BROKEN URLs:")
            for url, code in bad:
                print(f"  {code}: {url}")
            print("\nFix broken URLs before proceeding.")
            sys.exit(1)
        print("All ref URLs OK.\n")

    # Phase 1: Submit all
    tasks = {}
    for i, scene in enumerate(scenes):
        name = scene["name"]
        tid = submit_task(scene)
        if tid:
            tasks[name] = tid
            print(f"[{i+1}/{len(scenes)}] Submitted {name} -> {tid}")
        else:
            print(f"[{i+1}/{len(scenes)}] FAILED to submit {name}")
        time.sleep(3)

    print(f"\n=== Submitted {len(tasks)}/{len(scenes)}. Polling... ===\n")

    # Phase 2: Poll
    results = poll_tasks(tasks)

    # Phase 3: Download
    succeeded = []
    failed = []
    for name, res in results.items():
        if res["status"] == "success":
            is_choice = any(s.get("is_choice") for s in scenes if s["name"] == name)
            download_and_resize(name, res["urls"][0], is_choice=is_choice)
            succeeded.append(name)
        else:
            failed.append((name, res.get("msg", res["status"])))
            print(f"  FAILED: {name}: {res.get('msg', res['status'])}")

    print(f"\n=== Results: {len(succeeded)} succeeded, {len(failed)} failed ===")
    if failed:
        print("Failed scenes:")
        for name, msg in failed:
            print(f"  - {name}: {msg}")

    # Write results for the validation agent to pick up
    results_file = sys.argv[1].replace(".json", "-results.json")
    with open(results_file, "w") as f:
        json.dump({"succeeded": succeeded, "failed": [f[0] for f in failed]}, f, indent=2)
    print(f"\nResults written to {results_file}")


if __name__ == "__main__":
    main()
