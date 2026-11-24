# Gestionale terreni di Maccagno

Mappa interattiva + gestione di colture, lavori, agenda, magazzino e vendite per le particelle 1245, 1246 e 1241 (foglio 9, Maccagno con Pino e Veddasca).
App statica (HTML/JS, nessun server), installabile come PWA, dati **nel tuo browser** con sincronizzazione opzionale.

## Misure reali
Le tre particelle sono ridimensionate in modo che l'area sia esattamente quella catastale (820, 260, 650 m²). I confini restano il tracciato della mappa catastale 1:2000: la forma è indicativa, l'area è esatta. Per i confini veri serve un rilievo (GPS/geometra).
Strumento **Rettangolo**: scrivi `4x3` (o `4x3@30` per ruotare di 30°, `4x3 Peperoncini` per dare un nome) e clicca dove vuoi l'angolo in basso a sinistra. Le quote dei lati si vedono in mappa (opzione "Quote lati").

## Pubblicare su GitHub Pages
Scorciatoia: `./publish-github.sh` (con GitHub CLI installato: crea il repo, fa il push e attiva Pages). Oppure a mano:
1. Su github.com: **New repository**, nome `maccagno-gestionale`, Public (Pages gratuito richiede repo pubblico, salvo piano a pagamento). Se vuoi che i dati non siano pubblici non preoccuparti: nel repo ci sono solo il codice e le particelle, i tuoi dati restano nel browser/Firebase.
2. Da questa cartella:
   ```
   git init -b main
   git add .
   git commit -m "Primo commit"
   git remote add origin https://github.com/TUO-UTENTE/maccagno-gestionale.git
   git push -u origin main
   ```
3. Nel repo: **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**.
4. Dopo circa un minuto: `https://TUO-UTENTE.github.io/maccagno-gestionale/`. Aprilo da telefono e usa "Installa app" / "Aggiungi a Home".

## Database Firebase (facoltativo, gratuito)
Scorciatoia: `./setup-firebase.sh` crea progetto, database, regole e `firebase-config.js`; restano solo l'abilitazione del login Google e il dominio autorizzato (li stampa a fine script). Oppure a mano:
Senza Firebase i dati stanno solo nel dispositivo (più file di sincronizzazione su Chrome/Edge desktop, oppure JSON esporta/importa). Firebase aggiunge la sincronizzazione automatica tra telefono e computer, con funzionamento offline.
Piano Spark: gratis senza scadenza (1 GiB, ~50.000 letture e 20.000 scritture al giorno, molto più di quanto serve qui, nessuna carta di credito).
1. https://console.firebase.google.com → **Aggiungi progetto** (disattiva Analytics).
2. **Build → Authentication → Inizia → Google → Abilita**.
3. **Build → Firestore Database → Crea database** (modalità produzione, regione `eur3` o `europe-west`).
4. Scheda **Regole**: incolla il contenuto di `firestore.rules` → Pubblica.
5. **Impostazioni progetto → Le tue app → Web (`</>`)**: registra l'app e copia l'oggetto `firebaseConfig` in `firebase-config.js`.
6. **Authentication → Impostazioni → Domini autorizzati**: aggiungi `TUO-UTENTE.github.io`.
7. Commit e push. Nell'app, sezione "File e stampa": **☁️ Sincronizza con Firebase** e accedi con Google.
Le chiavi nella config non sono segreti; la protezione è data dalle regole (ognuno vede solo `users/<proprio uid>`). I dati sono nel tuo progetto Firebase, non in altri servizi.
Limite: tutta la mappa è un unico documento (max 1 MiB, centinaia di elementi). Se ci arrivi, esporta un backup e dividi per anno.

## Backup
"Scarica JSON" esporta tutto. Fallo ogni tanto.
