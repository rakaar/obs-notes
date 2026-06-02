#!/usr/bin/env python3
"""Pick the next unread paper, create a daily note, and use opencode to summarize it."""

import json
import subprocess
import sys
from datetime import date
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parent
PAPERS_FILE = REPO_ROOT / "interp - papers to read.md"
TRACKING_FILE = SCRIPT_DIR / ".paper-queue.json"
CONTENT_DIR = REPO_ROOT / "content"
OPENCODE_BIN = "/home/rka/.opencode/bin/opencode"
OPENCODE_MODEL = "opencode-go/deepseek-v4-pro"
OPENCODE_TIMEOUT = 300  # 5 min timeout for summarization


def parse_papers():
    papers = []
    with open(PAPERS_FILE) as f:
        for line in f:
            stripped = line.strip()
            if not stripped:
                continue
            if stripped.startswith("#"):
                continue
            if stripped == "## practical review":
                break

            title = stripped.lstrip("- ").strip("**").strip()
            if title and title not in papers:
                papers.append(title)
    return papers


def load_tracking():
    TRACKING_FILE.parent.mkdir(parents=True, exist_ok=True)
    if TRACKING_FILE.exists():
        with open(TRACKING_FILE) as f:
            return json.load(f)
    return {"assigned": {}, "papers": []}


def save_tracking(tracking):
    with open(TRACKING_FILE, "w") as f:
        json.dump(tracking, f, indent=2)


def summarize_with_opencode(note_path, paper_title):
    prompt = (
        f'The paper for today is: "{paper_title}". '
        f"Search the web for this paper — find and read its abstract, related blog posts, "
        f"or arxiv page. Then update the file at {note_path} by replacing the "
        f'"..." placeholders under ## Summary and ## Key Insights with your findings. '
        f"Keep the ## Summary concise (2-3 paragraphs). "
        f"For ## Key Insights, list 3-5 bullet points of the main contributions, methods, or findings. "
        f"Do NOT modify any other sections or the frontmatter. "
        f"Do NOT add comments to the file."
    )

    cmd = [
        OPENCODE_BIN,
        "run",
        "--model", OPENCODE_MODEL,
        "--dangerously-skip-permissions",
        "--dir", str(REPO_ROOT),
        prompt,
    ]

    env = {**__import__("os").environ, "HOME": str(Path.home())}

    try:
        result = subprocess.run(
            cmd,
            cwd=REPO_ROOT,
            env=env,
            capture_output=True,
            text=True,
            timeout=OPENCODE_TIMEOUT,
        )
        if result.returncode != 0:
            print(f"opencode failed (exit {result.returncode}):", file=sys.stderr)
            if result.stderr:
                print(result.stderr[:500], file=sys.stderr)
            return False
        print(f"opencode summary completed for: {paper_title}")
        return True
    except subprocess.TimeoutExpired:
        print(f"opencode timed out after {OPENCODE_TIMEOUT}s", file=sys.stderr)
        return False
    except FileNotFoundError:
        print(f"opencode binary not found at {OPENCODE_BIN}", file=sys.stderr)
        return False


def main():
    today = date.today().isoformat()
    tracking = load_tracking()

    papers = parse_papers()
    if not papers:
        print("No papers found. Exiting.", file=sys.stderr)
        sys.exit(1)

    if tracking.get("papers") != papers:
        tracking["papers"] = papers

    if today in tracking.get("assigned", {}):
        existing = tracking["assigned"][today]
        note_path = CONTENT_DIR / existing["note"]

        if existing.get("summarized"):
            print(f"Already summarized: {existing['paper']}")
            return

        if note_path.exists():
            print(f"Note exists but not summarized, retrying: {existing['paper']}")
            success = summarize_with_opencode(note_path, existing["paper"])
            if success:
                tracking["assigned"][today]["summarized"] = True
                save_tracking(tracking)
            return

        print(f"Note missing for today, re-creating: {existing['paper']}")

    assigned_indices = {
        info["index"]
        for info in tracking.get("assigned", {}).values()
        if "index" in info
    }

    next_index = None
    for i in range(len(papers)):
        if i not in assigned_indices:
            next_index = i
            break

    if next_index is None:
        next_index = 0
        tracking["assigned"] = {}

    paper = papers[next_index]
    note_filename = f"Daily Paper {today}.md"
    note_path = CONTENT_DIR / note_filename

    note_content = f"""---
title: "Daily Paper - {today}"
date: {today}
tags:
  - daily-paper
  - interp
---

# Paper of the Day: {paper}

## Summary

...

## Key Insights

...

## Questions / Thoughts

...

## Related

- [[interp - papers to read]]
"""

    note_path.write_text(note_content)
    print(f"Created: {note_filename}")

    tracking["assigned"][today] = {
        "index": next_index,
        "paper": paper,
        "note": note_filename,
    }
    save_tracking(tracking)

    success = summarize_with_opencode(note_path, paper)
    if success:
        tracking["assigned"][today]["summarized"] = True
        save_tracking(tracking)


if __name__ == "__main__":
    main()
