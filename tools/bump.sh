#!/bin/sh
# Uso: tools/bump.sh 45   -> aggiorna versione in index.html, sw.js, js/state.js, firebase-sync
set -e
cd "$(dirname "$0")/.."
N="$1"; [ -n "$N" ] || { echo "uso: tools/bump.sh <numero>"; exit 1; }
sed -i -E "s/\?v=[0-9]+/?v=$N/g" index.html
sed -i -E "s/mappa-maccagno-v[0-9]+/mappa-maccagno-v$N/" sw.js
sed -i -E "s/APPV=\"v[0-9]+\"/APPV=\"v$N\"/" js/state.js
echo "versione v$N"
