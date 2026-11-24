#!/usr/bin/env bash
# Crea il repo GitHub, fa il push e attiva GitHub Pages. Richiede: git e GitHub CLI (https://cli.github.com).
set -euo pipefail
REPO="${1:-maccagno-gestionale}"
gh auth status >/dev/null 2>&1 || gh auth login
[ -d .git ] || git init -b main
git add -A; git commit -m "Gestionale terreni di Maccagno" || true
gh repo create "$REPO" --public --source=. --remote=origin --push
OWNER=$(gh api user -q .login)
gh api -X POST "repos/$OWNER/$REPO/pages" -f "source[branch]=main" -f "source[path]=/" >/dev/null || true
echo "Fatto. Tra circa un minuto: https://$OWNER.github.io/$REPO/"
