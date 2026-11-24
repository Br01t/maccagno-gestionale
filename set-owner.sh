#!/usr/bin/env bash
# Limita il database al TUO account Google. Uso: ./set-owner.sh tua@gmail.com [id-progetto]
set -euo pipefail
MAIL="${1:?Indica la tua email Google}"; PROJ="${2:-$(node -e 'const s=require("fs").readFileSync("firebase-config.js","utf8");console.log(/projectId:\s*"([^"]+)"/.exec(s)[1])')}"
sed -i.bak "s/request.auth.token.email == \"[^\"]*\"/request.auth.token.email == \"$MAIL\"/" firestore.rules && rm -f firestore.rules.bak
sed -i.bak '/ownerEmail/d' firebase-config.js && rm -f firebase-config.js.bak
echo "window.FIREBASE_CONFIG.ownerEmail = \"$MAIL\";" >> firebase-config.js
npx --yes firebase-tools deploy --only firestore:rules --project "$PROJ"
echo "Fatto: solo $MAIL può accedere. Ora: git add -A && git commit -m 'Solo il mio account' && git push"
