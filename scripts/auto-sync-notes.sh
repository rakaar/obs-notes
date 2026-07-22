#!/usr/bin/env bash
set -euo pipefail

repo="/home/rka/Documents/obs-notes"
cd "$repo"

# Prevent overlapping runs if a previous push is still in progress.
exec 9>"$repo/.git/auto-sync.lock"
flock -n 9 || exit 0

# Only publish notes, note media, and the tracked Obsidian configuration.
git add -A -- content .obsidian/app.json

if ! git diff --cached --quiet -- content .obsidian/app.json; then
  git commit -m "Auto-sync notes: $(date '+%Y-%m-%d %H:%M %Z')"
fi

# Push even when there is no new commit, so a previous network failure retries.
branch="$(git branch --show-current)"
if [[ -z "$branch" ]]; then
  printf 'Auto-sync aborted: repository is in detached HEAD state.\n' >&2
  exit 1
fi

git push origin "$branch"
