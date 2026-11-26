/* features/ricerca.js — Ricerca globale e apertura da QR. */
function gsClose(){$("gs").hidden=true}
function gsOpen(){$("fam").hidden=true;$("gs").hidden=false;$("gs-q").value="";gsRun();setTimeout(()=>$("gs-q").focus(),0)}
function gsRun(){const q=nrm($("gs-q").value),G=[],mt=s=>nrm(s).includes(q);GSA=[];if(q.length<2){$("gs-r").innerHTML=`<p class="mut">Scrivi almeno 2 lettere: cerco in colture, piante, specie, vivaio, lotti, ricette e diario.</p>`;return}
const add=(t,L)=>{if(L.length)G.push([t,L.slice(0,6)])};
add("Colture",crops().filter(o=>mt(cname(o)+" "+(o.n||"")+" "+(o.k||""))).map(o=>({l:cname(o),s:o.k+" · stagione "+seasonOf(o),a:()=>{gsClose();goCrop(o,"data")}})));
add("Piante",crops().flatMap(o=>(o.pl||[]).filter(p=>mt(p.n)).map(p=>({l:p.n+(p.q>1?" ×"+p.q:""),s:"in "+cname(o),a:()=>{gsClose();goCrop(o,"pl")}}))));
add("Specie",Object.keys(SP).filter(mt).map(n=>({l:n,s:SP[n][0]+(()=>{const s=schedOf(n),p=[];if(s.sv)p.push("vivaio "+rng(s.sv));if(s.sd)p.push("semina "+rng(s.sd));if(s.tr)p.push("trapianto "+rng(s.tr));if(s.ra)p.push("raccolta "+rng(s.ra));return p.length?" · "+p.join(" · "):""})(),a:null,card:n})));
add("Vivaio",nvs().filter(x=>mt(x.sp)).map(x=>({l:x.sp+" ×"+x.q,s:x.st,a:()=>{gsClose();openViv()}})));
add("Magazzino",it.filter(x=>x.t==="lot"&&mt((x.np||"")+" "+(x.k||"")+" "+(x.cn||""))).map(x=>({l:(x.k||"")+" · "+(x.np||""),s:nf(Math.max(0,(+x.q||0)-sld(x)),2)+" "+x.u+" in giacenza",a:()=>{gsClose();go("st")}})));
add("Ricette",rcAll().filter(r=>mt(r.n+" "+r.ing.map(i=>i.n).join(" "))).map(r=>({l:r.n,s:r.ing.map(i=>i.n).join(", "),a:()=>{gsClose();prMode="rc";try{localStorage.setItem("maccagno-prm","rc")}catch(_){}go("prod")}})));
add("Codici",["nv","crop","pl","tr","hv"].flatMap(k=>lbList(k).filter(e=>nrm(e.code).includes(q)).map(e=>({l:e.code,s:e.lab,a:()=>{gsClose();e.open()}}))));
add("Diario",it.filter(x=>x.t==="log"&&mt((x.a||"")+" "+(x.n||"")+" "+(x.cn||"")+" "+(x.tp||""))).sort((a,b)=>a.d<b.d?1:-1).map(x=>({l:(x.a||x.tp||"Lavoro")+" · "+(x.cn||"Generale"),s:fd(x.d),a:()=>{gsClose();go("di")}})));
if(!G.length){$("gs-r").innerHTML=`<p class="mut">Nessun risultato per «${E($("gs-q").value)}».</p>`;return}
$("gs-r").innerHTML=G.map(([t,L])=>`<h4>${t}</h4>`+L.map(x=>{GSA.push(x);return`<button class="ev" data-g="${GSA.length-1}"><span><b>${E(x.l)}</b> · ${E(x.s)}</span></button>${x.card?`<div class="gsc" hidden></div>`:""}`}).join("")).join("")}
