#!/bin/sh
# Esegue gli scenari end-to-end (serve: npm i playwright). Ogni riga PASS/FAIL; "errs []" = nessun errore JS.
cd "$(dirname "$0")"
for f in crea-registrazioni-da-produzione ciclo-completo rinomine-ed-eliminazioni disegno-e-mappa; do echo "== $f"; node $f.js 2>&1 | grep -E "PASS|FAIL|errs|Error"; done
