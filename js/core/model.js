/* core/model.js — Modello dati: accesso a colture, lotti, raccolte, ore, stagioni, vivaio e statistiche. */
const pnote=k=>it.find(o=>o.t==="pn"&&o.v===k)||{t:"pn",v:k,p:[],n:"",_new:1};
function desc(o){const w=o.v==="all"?"fuori dalle particelle":"particella "+o.v;return o.t==="crop"?`Coltura: ${o.l||o.k} (${o.k}) · ${Math.round(ar(o.p))} m² · ${w}`:o.t==="zone"?`Zona: ${o.l||o.k} · ${Math.round(ar(o.p))} m² · ${w}`:o.t==="line"?`${o.k}: ${Math.round(len(o.p))} m · ${w}`:o.t==="slope"?`Pendenza ${o.l} · ${w}`:o.t==="pt"?`Punto ${o.k} · ${w}`:`Nota · ${w}`}
function totals(o){const r=o.pr||[];return{f:r.reduce((s,x)=>s+kg(x.f,x.u),0),d:r.reduce((s,x)=>s+kg(x.d,x.u),0),a:ar(o.p),h:hrs(o)}}
const tip=o=>[desc(o),o.sd?"Semina "+fd(o.sd):"",o.h1?"Raccolto "+fd(o.h1)+(o.h2?"–"+fd(o.h2):""):"",...(o.t==="crop"?ind(o):[]),o.irr?"Irrigazione: "+o.irr:"",o.man?"Manutenzione: "+o.man:"",o.n?"Note: "+o.n:""].filter(Boolean).join("\n");
const crops=()=>it.filter(o=>o.t==="crop"),cid=o=>o.id||(o.id=uid()),cname=o=>o.l||o.k;
const hvOf=o=>it.filter(x=>x.t==="hv"&&x.cid===o.id),logsOf=o=>it.filter(x=>x.t==="log"&&x.cid===o.id),lotsOf=o=>it.filter(x=>x.t==="lot"&&x.cid===o.id&&!x.pl);
const hrs=o=>(+o.hr||0)+logsOf(o).reduce((s,x)=>s+(+x.h||0),0);
const sld=l=>(l.sa||[]).reduce((s,x)=>s+(+x.q||0),0),rev=l=>(l.sa||[]).reduce((s,x)=>s+(+x.q||0)*(+x.p||0),0);
function econ(o){const pot=(o.pr||[]).reduce((s,x)=>s+(((m)=>m==="d"?+x.d||0:m==="x"?+x.d||+x.f||0:+x.f||0)(x.m||(+x.d?"d":"f")))*(+x.p||0),0),co=(o.co||[]).reduce((s,x)=>s+(+x.v||0),0),ce=(o.co||[]).reduce((s,x)=>s+(+x.e||0),0),ls=lotsOf(o);return{pot,co,ce,inc:ls.reduce((s,l)=>s+rev(l),0),n:ls.reduce((s,l)=>s+(l.sa||[]).length,0)}}
function ind(o){const{f,d,a,h}=totals(o),e=econ(o),L=[];
if(f)L.push("Fresco: "+fmtkg(f)+" ("+nf(f/a,2)+" kg/m²)");
if(d)L.push("Essiccato: "+fmtkg(d)+(f?" · resa di essiccazione "+nf(d/f*100,0)+"%":""));
if(h)L.push(nf(h,1)+" h di lavoro"+(a?" · "+nf(h*60/a,1)+" min/m²":"")+(f?" · "+fmtkg(f/h)+"/h di fresco":"")+(d?" · "+fmtkg(d/h)+"/h di essiccato":""));
if(e.co||e.ce)L.push("Costi: "+(e.co?"previsti "+eur(e.co):"")+(e.co&&e.ce?" · ":"")+(e.ce?"effettivi "+eur(e.ce):""));
if(e.pot)L.push("Ricavo previsto: "+eur(e.pot)+" · margine "+eur(e.pot-e.co)+(a?" · "+nf((e.pot-e.co)/a,2)+" €/m²":"")+(h?" · "+nf((e.pot-e.co)/h,1)+" €/h":""));
{const IL=logsOf(o).filter(x=>x.tp&&x.tp!=="Lavoro").sort((a,b)=>a.d<b.d?1:-1),td=today(),nx=logsOf(o).filter(x=>x.nx&&x.nx>=td).sort((a,b)=>a.nx<b.nx?-1:1);if(IL[0])L.push("Ultimo intervento: "+IL[0].tp+" il "+fd(IL[0].d));if(nx[0])L.push("Prossimo promemoria: "+(nx[0].tp||"Intervento")+" il "+fd(nx[0].nx))}if(e.inc)L.push("Incassato: "+eur(e.inc)+" ("+e.n+" vendite) · margine reale "+eur(e.inc-(e.ce||e.co)));
return L}
function evts(){const V=[];crops().forEach(o=>{const n=cname(o);if(o.sd)V.push({d:o.sd,t:"Semina",s:n,o});if(o.h1)V.push({d:o.h1,e:o.h2||o.h1,t:"Raccolto",s:n,o});(o.ck||[]).forEach((x,i)=>{if(x.dt){V.push({d:x.dt,t:"Attività",s:x.t+(x.rp?" ↻":"")+" · "+n,o,ck:i,done:x.d});rpProj(V,o,x,x.t+" ↻ · "+n)}});it.filter(x=>x.t==="lot"&&x.cid===o.id).forEach(l=>{if(l.x)V.push({d:l.x,t:"Scadenza lotto",s:(l.k||"")+" "+(l.np||""),o})});logsOf(o).forEach(l=>{if(l.nx)V.push({d:l.nx,t:"Promemoria",s:(l.tp||"Intervento")+(l.a?": "+l.a:"")+(l.pn?" · "+l.pn:"")+" · "+n,o})})});
it.filter(x=>x.t==="pn").forEach(o=>(o.ck||[]).forEach((x,i)=>{if(x.dt){V.push({d:x.dt,t:"Attività",s:x.t+(x.rp?" ↻":"")+" · particella "+o.v,o,ck:i,done:x.d});rpProj(V,o,x,x.t+" ↻ · particella "+o.v)}}));
nvAct().forEach(x=>{if(x.dt)V.push({d:x.dt,t:"Trapianto",s:x.sp+" ×"+x.q+" (dal vivaio)",viv:1})});it.filter(x=>x.t==="pd").forEach(x=>[["sd","Semina"],["tr","Trapianto"],["h1","Inizio raccolta"],["h2","Fine raccolta"]].forEach(([f,t])=>{if(x[f])V.push({d:x[f],t,s:(x.n||x.k)+" · "+x.k,go:"prod"})}));it.filter(x=>x.t==="lot"&&!x.cid&&x.x).forEach(l=>V.push({d:l.x,t:"Scadenza lotto",s:(l.k||"")+" "+(l.np||""),go:"st"}));return V.sort((a,b)=>a.d<b.d?-1:1)}
const NOUN=o=>!o?"questo elemento":o.t==="crop"?"questa coltura":o.t==="zone"?"questa zona":o.t==="line"?"questa linea":o.t==="pt"?"questo punto":o.t==="slope"?"questa pendenza":o.t==="note"?"questa nota":"questo elemento";
const YEAR=()=>String(new Date().getFullYear());
const seasonOf=o=>o.y||(o.sd||o.h1||"").slice(0,4)||YEAR();
const seasons=()=>[...new Set(crops().map(seasonOf))].sort();
const setSeason=v=>{season=v;try{localStorage.setItem("maccagno-season",v)}catch(_){}draw();if(!$("p-prod").hidden)prodList();if(!$("p-aree").hidden)mapList();mgpRender(true)};
const seasonOpts=o=>{const c=+YEAR(),ys=[...new Set([...seasons(),String(c),String(c+1),seasonOf(o)])].sort();return ys.map(y=>`<option${y===seasonOf(o)?" selected":""}>${y}</option>`).join("")};
const hvOwn=o=>{const L=new Set((o.tr||[]).flatMap(t=>(t.r||[]).map(r=>r.h)));return hvOf(o).filter(h=>!L.has(h.id))};
const nvs=()=>it.filter(x=>x.t==="nv"),nvCode=x=>{const y=(x.d0||today()).slice(0,4),pf=(x.sp||"").replace(/[^A-Za-z]/g,"").slice(0,3).toUpperCase()||"VIV";let n=1,c;do{c="V-"+pf+"-"+y+"-"+String(n++).padStart(2,"0")}while(it.some(z=>z.t==="nv"&&z.lc===c));return c},nvFix=()=>{let ch=false;it.forEach(x=>{if(x.t==="nv"&&!x.lc){x.lc=nvCode(x);ch=true}});return ch},nvAct=()=>nvs().filter(x=>x.st!=="Trapiantata");
const GL=()=>cfg.x.gl||[...GDEF.map(g=>g[0]),GFB],KG=k=>{const g=cfg.x.grp[k]||GD[k]||GFB;return GL().includes(g)?g:GFB},visK=c=>Object.keys(TAB[c]).filter(n=>!cfg.hide[c].includes(n));
function grMat(){if(!cfg.x.gl){cfg.x.gl=GL();Object.keys(TAB.crop).forEach(k=>{if(!(k in cfg.x.grp))cfg.x.grp[k]=KG(k)})}}
const cropGroups=extra=>{const v=visK("crop");if(extra&&!v.includes(extra))v.push(extra);return GL().map(g=>[g,v.filter(n=>KG(n)===g)]).filter(x=>x[1].length)},
cropOpts=(sel,extra)=>cropGroups(extra).map(([g,a])=>`<optgroup label="${E(g)}">${a.map(n=>`<option${n===sel?" selected":""}>${E(n)}</option>`).join("")}</optgroup>`).join("");
const stockOf=n=>{const q=stem(n);if(q.length<2)return[];const re=new RegExp("(^|[^a-z])"+q.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"));return it.filter(l=>l.t==="lot"&&(l.u==="g"||l.u==="kg")&&re.test(nrm(l.np))).map(l=>({l,g:Math.max(0,((+l.q||0)-sld(l))*(l.u==="kg"?1000:1))})).filter(x=>x.g>0).sort((a,b)=>(a.l.x||"9999")<(b.l.x||"9999")?-1:1)};
function seasonStats(y){const C=crops().filter(o=>seasonOf(o)===y),rows=C.map(o=>{const t=totals(o),e=econ(o),H=hvOf(o),rf=H.reduce((s,x)=>s+kg(x.f,x.u),0),co=e.ce||e.co||0;return{o,a:ar(o.p),pf:t.f,rf,pe:e.pot,re:e.inc,co,h:hrs(o),m:e.inc-co}}),S=k=>rows.reduce((s,r)=>s+r[k],0);return{y,C,rows,t:{a:S("a"),pf:S("pf"),rf:S("rf"),pe:S("pe"),re:S("re"),co:S("co"),h:S("h"),m:S("m")}}}
const lotStock=l=>(+l.q||0)-sld(l);
const ptg=()=>{const o=Object.entries(PG).map(([g,v])=>[g,Object.keys(v).filter(k=>!cfg.hide.pt.includes(k))]),cu=Object.keys(cfg.add.pt).filter(k=>!cfg.hide.pt.includes(k));if(cu.length)o.push(["Personalizzati",cu]);return o.filter(x=>x[1].length)};
const lsg=k=>{try{return localStorage.getItem(k)}catch(e){return null}},lss=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
