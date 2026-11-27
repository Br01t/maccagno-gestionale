/* features/schede.js — Scheda tecnica e checklist per macro gruppo e per colture singole con procedimento proprio. */
const gkHtml=k=>{const t=TECH[k],g=GUIDE[k];if(!t&&!(g&&g.ck))return"";return`<div class="spc"><b>${E(k)}</b>${g&&(g.s||g.h)?` <span>${g.s?"semina o impianto: "+E(g.s)+". ":""}${g.h?"raccolta: "+E(g.h)+".":""}</span>`:""}${t?`<table>${t.map(r=>`<tr><th>${E(r[0])}</th><td>${E(r[1])}</td></tr>`).join("")}</table>`:""}${g&&g.ck&&g.ck.length?`<h5>Checklist</h5><ul class="cku">${g.ck.map(x=>`<li>${E(x)}</li>`).join("")}</ul>`:""}</div>`};
const grpGuide=g=>g.ks.map(gkHtml).join("")||`<p class="mut">Nessuna scheda per questo gruppo.</p>`;
const spGBlock=n=>{const s=SPECG[n],k=spKey(n);return(s?`<div class="spc"><b>${E(n)}</b><table>${s.t.map(r=>`<tr><th>${E(r[0])}</th><td>${E(r[1])}</td></tr>`).join("")}</table><h5>Checklist</h5><ul class="cku">${s.ck.map(x=>`<li>${E(x)}</li>`).join("")}</ul></div>`:"")+(k&&!s?spCard(k):"")};
const cropSpecies=o=>{const s=new Set();(o.tr||[]).forEach(t=>t.sp&&s.add(t.sp));(o.pl||[]).forEach(p=>{if(p.n)s.add(spKey(p.n)||p.n)});return[...s]};
const cropSpecG=o=>cropSpecies(o).filter(n=>SPECG[n]);
