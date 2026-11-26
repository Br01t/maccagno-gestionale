# Architettura del codice

App statica (HTML + CSS + JavaScript senza build): si apre direttamente e si pubblica su GitHub Pages.
Gli script sono "classici" (non moduli) e condividono lo stesso ambito globale; l'ordine di caricamento è in `index.html`.
Solo `firebase-sync.js` è un modulo ES (usa Firebase da CDN).

## Cartelle

| Cartella | Contenuto |
|---|---|
| `css/` | Fogli di stile, numerati nell'ordine di caricamento (la cascata dipende dall'ordine). |
| `js/lib/` | Librerie di terze parti (generatore QR). |
| `js/core/` | Base dell'app: DOM, utilità, modello dati, salvataggio, punti di ripristino, sincronizzazione, PWA. |
| `js/ui/` | Componenti riutilizzabili e navigazione: dialoghi, KPI, sezioni comprimibili, schede, tema. |
| `js/map/` | Mappa: geometria, vista (zoom/rotazione), disegno SVG, strumenti. |
| `js/features/` | Una funzionalità per file: Oggi, Aree, Agenda, Diario, Vivaio, Produzione, Magazzino, Ricette, Etichette, Riepilogo, Ricerca, Azioni rapide… |
| `js/data/` | Cataloghi statici: particelle, specie, guide, icone, calendario, consociazioni, macro gruppi. |
| `js/state.js` | Variabili di stato condivise e valori iniziali. |
| `js/wire/` | Collegamento degli eventi agli elementi della pagina, un file per funzionalità. |
| `js/boot.js` | Avvio dell'app. |
| `tools/` | `bump.sh` (cambia versione ovunque), `check.sh` (controlla sintassi e file mancanti). |

## Ordine di caricamento (e perché)

1. `core/dom.js` — definisce `$` e riferimenti base.
2. Funzioni (`core/`, `ui/`, `map/`, `features/`): solo definizioni, nessuna esecuzione.
3. `data/` — cataloghi.
4. `state.js` — stato condiviso.
5. `wire/` — collegamento degli eventi.
6. `boot.js` — carica i dati e disegna.

Regola: **le funzioni vanno nelle cartelle `core/ui/map/features`; i dati in `data/`; le variabili in `state.js`; i collegamenti agli eventi in `wire/`**. Così nessun file esegue codice che dipende da file caricati dopo.

## Aggiungere una funzionalità

1. Funzioni in `js/features/nome.js`.
2. Eventuali dati statici in `js/data/nome.js`, stato in `js/state.js`, eventi in `js/wire/nome.js`.
3. Aggiungi i file in `index.html` (nell'ordine giusto) e in `FILES` di `sw.js`.
4. `tools/check.sh` per verificare; `tools/bump.sh N` per cambiare versione.

## Pubblicare

```
tools/bump.sh 46
tools/check.sh
git add -A && git commit -m "v46" && git push
```

## Dati

Tutto resta nel browser (`localStorage`) e, se attivato, nel tuo Firebase (Firestore, solo il proprietario). Nessun altro servizio.
