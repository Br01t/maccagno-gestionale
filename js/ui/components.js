/* ui/components.js — Componenti riutilizzabili: stato vuoto, icone, KPI, sezioni comprimibili, handler delegati. */
const emp=(m,b,g)=>`<div class="emp"><p>${m}</p>${b?`<button data-go="${g}">${b}</button>`:""}</div>`;
const spKey=n=>Object.keys(SP).find(k=>k.toLowerCase()===String(n||"").trim().toLowerCase());
const ico=(k,s)=>`<svg class="i2" viewBox="0 0 24 24" style="width:${s||20}px;height:${s||20}px;cursor:inherit" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[k]||""}</svg>`;
const kpi=(h,f,s,c)=>{const y=s||f;return[c&&y?nf(c/y,2)+" €/kg":"",h&&y?nf(h/y,2)+" h/kg":""].filter(Boolean).join(" · ")};
const plDet=(k,t,h)=>`<details class="pls" data-key="${E(k)}"${colOpen.has(k)?" open":""}><summary>${t}</summary>${h}</details>`;
const onMac=(t,fn,c)=>{$("prl").addEventListener(t,fn,c);$("ip").addEventListener(t,e=>{if(e.target.closest&&e.target.closest("#mgp"))fn(e)},c)};
function fence(o,k){const pts=o?o.p:P[k].p,v=o?o.v:k,l="Recinzione "+(o?(o.l||o.k):"particella "+k);if(it.some(x=>x.t==="line"&&x.k==="Recinzione"&&x.l===l))return false;it.push({t:"line",k:"Recinzione",l,p:[...pts,pts[0]],v});save();draw();return true}
function summ(){const A={};it.forEach(o=>{const v=o.v==="all"?"Fuori dalle particelle":"Particella "+o.v;let k,u,x;if(o.t==="crop"||o.t==="zone"){k=(o.t==="crop"?"Coltura: ":"Zona: ")+(o.l||o.k)+" ("+o.k+")";u="m²";x=ar(o.p)}else if(o.t==="line"){k="Linea: "+o.k;u="m";x=len(o.p)}else if(o.t==="pt"){k="Punto: "+o.k;u="n";x=1}else if(o.t==="slope"){k="Pendenze";u="n";x=1}else return;const K=[v,k,u].join("|");A[K]=(A[K]||0)+x});return Object.entries(A).map(([k,x])=>k.split("|").concat([Math.round(x)])).sort()}
