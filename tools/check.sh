#!/bin/sh
# Controlla la sintassi di tutti i file JS e che ogni file in index.html esista
cd "$(dirname "$0")/.."
ok=0
for f in $(find js -name '*.js') sw.js firebase-sync.js; do node --check "$f" || ok=1; done
for f in $(grep -o 'src="[^"?]*' index.html | sed 's/src="//'); do [ -f "$f" ] || { echo "manca $f"; ok=1; }; done
[ $ok = 0 ] && echo "OK"
exit $ok
