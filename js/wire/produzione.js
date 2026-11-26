/* wire/produzione.js — Collegamenti: produzione. */
$("ip").addEventListener("focusout",()=>setTimeout(()=>{if(mgDirty&&!$("mgp").contains(document.activeElement))mgpRender(true)},0));
$("ip").addEventListener("change",e=>{if(e.target.id==="ss3")setSeason(e.target.value)});
$("prl").addEventListener("focusout",()=>setTimeout(()=>{if(colDirty&&!$("prl").contains(document.activeElement))prodList(true)},0));
onMac("toggle",e=>{const k=e.target.dataset&&e.target.dataset.key;if(!k)return;if(e.target.open)colOpen.add(k);else colOpen.delete(k)},true);
onMac("change",e=>{const t=e.target;if(t.id==="col-e"){colEmpty=t.checked;prodList(true);return}const f=t.closest(".pdf");if(f&&t.dataset.pd){const y=f.dataset.y,x=pdGet(f.dataset.g,f.dataset.p,y,true);x[t.dataset.pd]=t.value;try{seedAll()}catch(_){}try{localStorage.setItem(KEY,JSON.stringify(it))}catch(_){}if(!adopting)touch();colDirty=true;refresh()}});
onMac("click",async e=>{const b=e.target.closest("button");if(!b)return;const D=b.dataset,flat=s=>E(s);
if(D.lsa){const l=it.find(x=>x.t==="lot"&&x.k===D.lsa),f=b.parentElement,g=k=>f.querySelector('[data-ls="'+k+'"]').value,q=+g("q");if(!l||!q)return;(l.sa=l.sa||[]).push({d:g("d")||today(),q,p:+g("p")||0,c:g("c")});colOpen.add("g:"+(l.pg||""));save();return}
if(D.lsr){const[k,j]=D.lsr.split("|"),l=it.find(x=>x.t==="lot"&&x.k===k);if(l&&l.sa){l.sa.splice(+j,1);save()}return}
if(D.lsl){LB.k="lot";const L=lbList("lot");lbOpen("lot",L.findIndex(x=>x.o&&x.o.k===D.lsl));return}
if(b.id==="ng-a"){const n=$("ng-n").value.trim();if(!n)return;if(macsAll().some(g=>nrm(g.n)===nrm(n))){colMsg="Esiste già un gruppo con questo nome.";prodList(true);return}colMsg="";macEdit(M=>M.push({n,c:"#6b8f71",ks:[],sk:[],p:[],h:[]}));colOpen.add("g:"+n);prodList(true);return}
if(D.reg!=null){const r=b.closest(".rg"),q=f=>{const x=r.querySelector('[data-f="'+f+'"]');return x?x.value:""},g0=macsAll().find(x=>x.n===r.dataset.g),o=crops().find(x=>x.id===q("cid"));
if(!o){colMsg="Scegli la coltura a cui appartiene la registrazione.";prodList(true);return}
const d=q("d")||today(),h=+q("h")||0,f=q("f"),s=q("s"),u=q("u")||"kg",c=+q("c")||0,a=q("a").trim();let pn=(r.dataset.p||q("n")||"").trim();
if(!(h||+f||+s||c||a)){colMsg="Inserisci almeno ore, resa, costo o una nota.";prodList(true);return}colMsg="";
let lk=q("lk");if(lk==="__new"){const qn=+s||+f;if(!g0||!qn){colMsg="Per creare un nuovo lotto serve una resa (fresca o lavorata).";prodList(true);return}lk=lotNew(g0,pn,d,qn,u,+s?"essiccato":"fresco");const nl=it.find(x=>x.t==="lot"&&x.k===lk);if(nl){nl.cid=o.id;nl.cn=cname(o)}}
if(lk){const l0=it.find(x=>x.t==="lot"&&x.k===lk),v0=it.find(x=>x.t==="nv"&&x.lc===lk);if(l0&&!pn&&l0.pn)pn=l0.pn;if(v0&&!pn)pn=spKey(v0.sp)||v0.sp}
const lg=h>0||(a&&!(+f||+s||c));if(lg)it.push({t:"log",cid:o.id,cn:cname(o),d,h,tp:"Lavoro",pn,lk:lk||"",a,n:"",nx:"",v:"all",p:[]});
if(+f||+s)it.push({t:"hv",id:uid(),cid:o.id,d,f:f||"",s:s||"",u,n:lg?"":a,pn,lk:lk||""});
if(c)(o.co=o.co||[]).push({n:a||"Costo",v:"",e:c,pn,d});
colOpen.add("g:"+r.dataset.g);if(pn)colOpen.add("p:"+r.dataset.g+"|"+pn);save();return}
if(D.dreg){const p=D.dreg.split(":"),k=p[0];if(k==="co"){const o=it[+p[1]];if(o&&o.co&&o.co[+p[2]]){o.co.splice(+p[2],1);save()}}else{const i=+p[1];if(it[i]&&it[i].t===k){it.splice(i,1);save()}}return}
if(D.dpe){const x=it.find(q=>q.id===D.dpe);if(x){it.splice(it.indexOf(x),1);save()}return}
if(D.addp!=null){const i=b.parentNode.querySelector(".np"),n=i.value.trim();if(!n)return;const g=macs().find(x=>x.n===D.addp)?D.addp:null;macEdit(M=>{let G=M.find(x=>x.n===D.addp);if(!G){G={n:D.addp,c:"#8a8a8a",ks:[],sk:[],p:[],h:[]};M.push(G)}if(!macProds0(G).some(x=>nrm(x)===nrm(n)))G.p.push(n);G.h=G.h.filter(x=>nrm(x)!==nrm(n))});colOpen.add("g:"+D.addp);colOpen.add("p:"+D.addp+"|"+n);prodList(true);return}
if(D.hidep!=null){macEdit(M=>{const G=M.find(x=>x.n===D.g);if(G&&!G.h.includes(D.hidep))G.h.push(D.hidep)});return}
if(D.delp!=null){if(await askConfirm("Eliminare il prodotto?","«"+D.delp+"» sparisce dall’elenco. Le registrazioni già fatte restano e il prodotto riappare finché ci sono dati.",{ok:"Elimina",danger:1}))macEdit(M=>{const G=M.find(x=>x.n===D.g);if(G)G.p=G.p.filter(x=>nrm(x)!==nrm(D.delp))});return}
if(D.renp!=null){const n=prompt("Nuovo nome del prodotto",D.renp);if(n&&n.trim()&&n.trim()!==D.renp){const nn=n.trim();macEdit(M=>{const G=M.find(x=>x.n===D.g);if(G)G.p=G.p.map(x=>x===D.renp?nn:x)});it.forEach(x=>{if((x.t==="pe"||x.t==="pd")&&x.k===D.g&&x.n===D.renp)x.n=nn});save()}return}
if(D.reng!=null){const n=prompt("Nuovo nome del gruppo",D.reng);if(n&&n.trim()&&n.trim()!==D.reng){const nn=n.trim();if(macsAll().some(g=>nrm(g.n)===nrm(nn))){colMsg="Esiste già un gruppo con questo nome.";prodList(true);return}macEdit(M=>{const G=M.find(x=>x.n===D.reng);if(G)G.n=nn});it.forEach(x=>{if((x.t==="pe"||x.t==="pd")&&x.k===D.reng)x.k=nn});save()}return}
if(D.delg!=null){if(it.some(x=>(x.t==="pe"||x.t==="pd")&&x.k===D.delg)){colMsg="«"+D.delg+"» ha registrazioni o previsioni: eliminale prima, oppure rinomina il gruppo.";prodList(true);return}if(await askConfirm("Eliminare il gruppo?","«"+D.delg+"» sparisce dall’elenco. Le colture sulla mappa non vengono toccate (compariranno in un gruppo con il nome del loro tipo).",{ok:"Elimina",danger:1})){colMsg="";macEdit(M=>{const i=M.findIndex(x=>x.n===D.delg);if(i>=0)M.splice(i,1)})}}});
$("prl").onchange=$("prl-map").onchange=e=>{if(e.target.id==="ss"||e.target.id==="ss2")setSeason(e.target.value)};
$("prl").onclick=$("prl-map").onclick=prClk;
$("pr-sw").onclick=e=>{const b=e.target.closest("button");if(!b)return;prMode=b.dataset.m;try{localStorage.setItem("maccagno-prm",prMode)}catch(_){}rcEd=rcPr=null;prodList(true)};
$("ip").addEventListener("click",e=>{const b=e.target.closest("[data-gogrp]");if(!b)return;const n=b.dataset.gogrp;colOpen.add("g:"+n);colEmpty=false;prMode="mac";try{localStorage.setItem("maccagno-prm","mac")}catch(_){}go("prod");setTimeout(()=>{const d=[...document.querySelectorAll("#prl details.mc")].find(x=>x.dataset.key==="g:"+n);if(d)d.scrollIntoView({block:"start"})},80)});
onMac("change",e=>{const t=e.target;if(t.dataset.asg==null||!t.value)return;const x=it[+t.dataset.asg],o=crops().find(c=>c.id===t.value);if(!x||x.t!=="pe"||!o)return;const h=+x.h||0,pn=x.n||"";
if(h||(x.a&&!(+x.f||+x.s||+x.c)))it.push({t:"log",cid:o.id,cn:cname(o),d:x.d,h,tp:"Lavoro",pn,lk:x.lk||"",a:x.a||"",n:"",nx:"",v:"all",p:[]});
if(+x.f||+x.s)it.push({t:"hv",id:uid(),cid:o.id,d:x.d,f:x.f||"",s:x.s||"",u:x.u||"kg",n:h?"":(x.a||""),pn,lk:x.lk||""});
if(+x.c)(o.co=o.co||[]).push({n:x.a||"Costo",v:"",e:+x.c,pn,d:x.d});
if(+x.r){x.h=x.f=x.s=x.c="";x.a=""}else it.splice(it.indexOf(x),1);save()});
