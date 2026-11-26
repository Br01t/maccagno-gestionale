/* core/util.js — Utilità pure: escape HTML, id, date, numeri, formati, CSV, download. */
const E=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function msg(){const t=$("tool").value,L=$("lab");$("hint").textContent={info:"Tocca una coltura, una zona o un punto per vederne i dettagli. Trascina per spostare la mappa.",crop:"1 · Scegli il tipo di coltura. 2 · Clicca sulla mappa i vertici dell’area. 3 · Premi “Fine disegno” (o doppio clic): poi torni alla selezione.",zone:"1 · Scegli il tipo di zona. 2 · Clicca i vertici dell’area. 3 · Premi “Fine disegno”.",line:"1 · Scegli il tipo di linea. 2 · Clicca i punti del percorso. 3 · Premi “Fine disegno”. La lunghezza compare in mappa.",pt:"Scegli il tipo e clicca sulla mappa dove metterlo.",slope:"Scrivi sotto la pendenza (15%) o il dislivello (3 m), poi clicca il punto alto e quello basso.",note:"Scrivi il testo sotto e clicca sulla mappa dove metterlo.",meas:"Clicca più punti: vedi lunghezza e area. Non viene salvato nulla.",edit:"Scrivi la nuova etichetta e clicca l’elemento.",del:"Clicca un elemento per cancellarlo."}[t]||"";L.placeholder=t==="slope"?"Pendenza (es. 15%) o dislivello (es. 3 m)":t==="note"?"Testo della nota":"Etichetta (facoltativa)";L.style.display=["info","meas","del","pan"].includes(t)?"none":""}
function raw(e){const q=scr(e),w=ipv(q[0],q[1]);return[w[0],-w[1]]}
const kg=(v,u)=>(+v||0)*(u==="g"?.001:1),nf=(x,d=1)=>x.toLocaleString("it-IT",{maximumFractionDigits:d}),fmtkg=x=>x>=1?nf(x,2)+" kg":nf(x*1000,0)+" g";
const uid=()=>Math.random().toString(36).slice(2,9),today=()=>new Date().toISOString().slice(0,10),eur=x=>x.toLocaleString("it-IT",{style:"currency",currency:"EUR",maximumFractionDigits:0});
const addD=(d,n)=>{const t=new Date(d+"T00:00:00Z");t.setUTCDate(t.getUTCDate()+n);return t.toISOString().slice(0,10)};
const fdt=ts=>new Date(ts).toLocaleString("it-IT",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});
const csv=(n,R)=>dl(n,"\ufeff"+R.map(r=>r.map(v=>'"'+String(v==null?"":v).replace(/"/g,'""')+'"').join(";")).join("\n"),"text/csv");
const fd=d=>d?new Date(d+"T00:00").toLocaleDateString("it-IT",{day:"numeric",month:"short"}):"";
function dl(n,t,m){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([t],{type:m}));a.download=n;a.click()}
const mparse=t=>{if(!t)return null;const ms=[...String(t).toLowerCase().matchAll(/gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre/g)].map(x=>MN.indexOf(x[0])+1);return ms.length?[ms[0],ms.length>1?ms[1]:ms[0]]:null};
const fixR=r=>r?(r.length===1?[r[0],r[0]]:r):r,inM=(r,m)=>r&&(r[0]<=r[1]?m>=r[0]&&m<=r[1]:m>=r[0]||m<=r[1]),rng=r=>r[0]===r[1]?MS[r[0]-1]:MS[r[0]-1]+"–"+MS[r[1]-1];
const nrm=s=>String(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").trim(),stem=s=>nrm(s).replace(/[aeiou]$/,"");
const fl=d=>d?d.split("-").reverse().join("/"):"",sid=o=>String((o&&o.id)||"").slice(-5).toUpperCase()||"00000";
const yr=d=>(d||"").slice(0,4),smK=(L,k)=>L.reduce((s,x)=>s+(+x[k]||0),0);
const hm=t=>t?new Date(t).toLocaleString("it-IT",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}):"mai (da questa apertura)";
