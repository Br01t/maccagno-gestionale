#!/usr/bin/env bash
# Crea il tuo progetto Firebase, il database Firestore, pubblica le regole di sicurezza
# e scrive firebase-config.js. Richiede Node.js. Uso: ./setup-firebase.sh [id-progetto]
set -euo pipefail
ID="${1:-maccagno-$RANDOM}"           # l'ID deve essere unico a livello globale
FB="npx --yes firebase-tools"
$FB login
$FB projects:create "$ID" --display-name "Mappa Maccagno"
$FB apps:create web "Mappa Maccagno" --project "$ID"
APP=$($FB apps:list WEB --project "$ID" --json | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>console.log(JSON.parse(s).result[0].appId))')
$FB apps:sdkconfig WEB "$APP" --project "$ID" --json | node -e '
let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const c=JSON.parse(s).result.sdkConfig;
const k=({apiKey:c.apiKey,authDomain:c.authDomain,projectId:c.projectId,appId:c.appId});
require("fs").writeFileSync("firebase-config.js","// Generato da setup-firebase.sh (valori non segreti)\nwindow.FIREBASE_CONFIG = "+JSON.stringify(k,null,2)+";\n")})'
$FB firestore:databases:create "(default)" --location eur3 --project "$ID"
$FB deploy --only firestore:rules --project "$ID"
cat <<EOT

Fatto: progetto "$ID", Firestore e regole pronti, firebase-config.js scritto.
Restano 2 passaggi manuali (solo da browser):
 1) https://console.firebase.google.com/project/$ID/authentication → Inizia → Google → Abilita → Salva
 2) Authentication → Impostazioni → Domini autorizzati → aggiungi TUO-UTENTE.github.io
Poi: git add -A && git commit -m "Config Firebase" && git push
EOT
