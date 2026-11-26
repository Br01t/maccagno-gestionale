/* wire/snapshots.js — Collegamenti: punti di ripristino. */
$("snb").onclick=snOpen;
$("sn-x").onclick=snClose;
$("snm").onclick=e=>{if(e.target===$("snm"))snClose()};
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("snm").hidden&&$("dlg").hidden)snClose()});
$("sn-n").onclick=()=>{snap("Manuale",1);snList();sy("Punto di ripristino creato","ok")};
$("snl").onclick=e=>{const r=e.target.closest("[data-r]"),x=e.target.closest("[data-x]");if(r){const i=+r.dataset.r,q=snaps()[i];if(!q)return;askConfirm("Ripristinare questa copia?","Dati del "+fdt(q.ts)+" ("+q.c+" colture). I dati attuali vengono salvati prima in un nuovo punto di ripristino.",{ok:"Ripristina",danger:1}).then(y=>{if(y){restoreSnap(i);snList();snClose()}})}else if(x){const a=snaps();a.splice(+x.dataset.x,1);snapPut(a);snList()}};
