/* data/spesa.js — Categorie della lista della spesa e lista di partenza «Test in spazi ridotti».
   Quantità ricavate dalle schede tecniche dell'app; i prezzi sono stime medie da verificare (modificabili). */
const SPCATS=["Semi e bulbi","Piante","Funghi","Materiali","Lavorazione e conservazione","Protezione","Attrezzi","Altro"];
const SPUNITS=["pz","kg","g","m","m²","L","confezioni","sacchi"];
/* [categoria, nome, quantità, unità, prezzo unitario stimato €, nota, tipo di coltura] */
const SPSEED={id:"seed-sl-test",n:"Test in spazi ridotti",note:"Bancale zafferano 10 m², aiuola di erbe 6 m², 6 tronchi di funghi, 12 peperoncini. Quantità dalle schede tecniche; prezzi stimati, da verificare.",items:[
["Semi e bulbi","Bulbi di zafferano, calibro 10+",500,"pz",.35,"Bancale da 10 m²: 10 cm sulla fila × 20 cm tra le file = 50 bulbi/m². Impianto fine luglio–agosto, 10–15 cm di profondità.","Zafferano"],
["Semi e bulbi","Semi di peperoncino (2 varietà)",2,"confezioni",3,"Circa 20 semi a bustina: ne servono 20 per ottenere 12 piante. Semina fine gennaio–febbraio a 26–28 °C.","Peperoncini"],
["Piante","Timo in vaso",8,"pz",2.8,"A 25 cm sulla fila. Trapianto aprile–maggio.","Erbe aromatiche"],
["Piante","Origano in vaso",4,"pz",2.8,"A 30 cm.","Erbe aromatiche"],
["Piante","Santoreggia in vaso",4,"pz",2.8,"A 25 cm.","Erbe aromatiche"],
["Piante","Salvia in vaso",2,"pz",3.2,"A 50–60 cm: meglio piantine che semi.","Erbe aromatiche"],
["Piante","Elicriso in vaso",2,"pz",3.5,"A 50 cm. Nei primi inverni copri con tessuto non tessuto.","Erbe aromatiche"],
["Funghi","Tronchi di castagno o quercia per shiitake (Ø 10–20 cm, 1 m)",3,"pz",0,"Taglio dicembre–febbraio con il via libera della Comunità Montana; se li compri, aggiorna il prezzo. Mai robinia o resinose.","Funghi"],
["Funghi","Tronchi di pioppo o salice per pioppino (Ø 10–20 cm, 1 m)",3,"pz",0,"Una specie per tronco. Riposo di 3 settimane dopo il taglio.","Funghi"],
["Funghi","Tasselli di micelio di shiitake (sacchetto da 100)",1,"confezioni",18,"Un tassello ogni 10–15 cm: circa 30 fori per tronco, 90 per 3 tronchi.","Funghi"],
["Funghi","Tasselli di micelio di pioppino (sacchetto da 100)",1,"confezioni",18,"Come sopra, 90 fori per 3 tronchi.","Funghi"],
["Funghi","Cera d'api o cera per innesti",.5,"kg",14,"Per sigillare ogni foro.","Funghi"],
["Funghi","Punta da trapano 12 mm con battuta di profondità",1,"pz",9,"Fori da 9–12 mm × 3–4 cm.","Funghi"],
["Materiali","Sabbia drenante per il bancale dello zafferano",6,"sacchi",4,"Terreno sabbioso e drenante, pH 6–7. Bancale rialzato.","Zafferano"],
["Materiali","Terriccio per semina (20 L)",1,"sacchi",6,"Per i peperoncini.","Peperoncini"],
["Materiali","Vasetti da 7 cm (confezione da 50)",1,"confezioni",8,"Rinvaso a 2 vere foglie.","Peperoncini"],
["Materiali","Tappetino riscaldante per semina",1,"pz",25,"26–28 °C.","Peperoncini"],
["Materiali","Tutori in bambù da 90 cm (confezione)",1,"confezioni",7,"12 piante a 50 cm sulla fila.","Peperoncini"],
["Materiali","Telo pacciamante biodegradabile 1,2 × 10 m",1,"pz",12,"Pacciamatura dei peperoncini.","Peperoncini"],
["Materiali","Picchetti ed etichette per le piante (30)",1,"confezioni",8,"",""],
["Lavorazione e conservazione","Essiccatore a ripiani con termostato 35–70 °C",1,"pz",120,"Erbe 35–40 °C, funghi 35–55 °C, peperoncini 55–60 °C, stimmi 50–60 °C.",""],
["Lavorazione e conservazione","Bilancia di precisione 0,01 g",1,"pz",15,"Per pesare gli stimmi di zafferano.","Zafferano"],
["Lavorazione e conservazione","Barattoli di vetro scuro da 100 ml",20,"pz",.9,"Conservazione al buio.",""],
["Lavorazione e conservazione","Etichette adesive per barattoli",1,"confezioni",8,"Con codice lotto.",""],
["Protezione","Rete metallica antitopo e cinghiale, h 1 m (maglia 13 mm)",15,"m",2,"Perimetro del bancale di zafferano. Tronchi dentro la recinzione.","Zafferano"],
["Protezione","Guanti in nitrile (100)",1,"confezioni",9,"Peperoncini e pepe: guanti, occhiali e mascherina.",""],
["Protezione","Mascherine FFP2 (5)",1,"confezioni",6,"Per macinare i peperoncini.",""],
["Protezione","Occhiali protettivi",1,"pz",6,"",""],
["Attrezzi","Cesoie da potatura",1,"pz",15,"Se non le hai già.",""],
["Attrezzi","Rastrello",1,"pz",12,"Se non lo hai già.",""],
["Attrezzi","Annaffiatoio da 10 L",1,"pz",9,"Acqua solo per l'attecchimento.",""]]};
