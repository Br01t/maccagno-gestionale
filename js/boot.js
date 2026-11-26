/* boot.js — Avvio: carica i dati, disegna, registra il service worker. */
vivInit();
mgInit();
cfgLoad();
load();
panel();
fix();
fit();
fillKind();
tabs();
draw();
prodList();
initCloud();
if(nvFix()|seedAll()|seedSpesa())save();
setMode(mode,LASTP[mode]);
if("serviceWorker"in navigator&&/^https?:$/.test(location.protocol)){const had=!!navigator.serviceWorker.controller;navigator.serviceWorker.addEventListener("controllerchange",()=>{if(!had||$("upd"))return;const d=document.createElement("div");d.id="upd";d.setAttribute("role","status");d.innerHTML='<span>È disponibile una versione più recente dell’app.</span><button type="button">Aggiorna</button>';d.querySelector("button").onclick=()=>location.reload();document.body.appendChild(d)});navigator.serviceWorker.register("sw.js").then(r=>{document.addEventListener("visibilitychange",()=>{if(!document.hidden)r.update().catch(()=>{})})}).catch(()=>{})}
