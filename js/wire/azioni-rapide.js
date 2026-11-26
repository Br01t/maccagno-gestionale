/* wire/azioni-rapide.js — Collegamenti: azioni rapide. */
$("qs-l").addEventListener("change",qsPrice);
$("qs-x").onclick=()=>{$("qs").hidden=true};
$("qs-b").onclick=()=>{const l=it.find(x=>x.t==="lot"&&x.k===$("qs-l").value),q=+$("qs-q").value;if(!l||!q){$("qs-m").textContent="Inserisci la quantità.";return}if(q>lotStock(l)+1e-9){$("qs-m").textContent="Giacenza insufficiente: disponibili "+nf(lotStock(l),2)+" "+l.u+".";return}(l.sa=l.sa||[]).push({d:$("qs-d").value||today(),q,p:+$("qs-p").value||0,c:$("qs-c").value.trim()});$("qs").hidden=true;save()};
$("cl-v").onclick=e=>{const b=e.target.closest("[data-cs]");if(b)qsOpen(b.dataset.cs)};
$("qh-x").onclick=()=>$("qh").hidden=true;
$("qh").onclick=e=>{if(e.target===$("qh"))$("qh").hidden=true};
$("qh-c").addEventListener("change",qhLots);
$("qh-b").onclick=()=>{const f=+$("qh-f").value,s=+$("qh-s").value;if(!f&&!s){$("qh-m").textContent="Inserisci almeno una quantità.";return}const o=crops().find(x=>x.id===$("qh-c").value),g=o&&macsAll().find(q=>q.ks.includes(o.k));let lk=$("qh-l").value;const dd=$("qh-d").value||today();if(lk==="__new"&&g){lk=lotNew(g,attrFn(g)(o)||"",dd,s||f,$("qh-u").value,s?"essiccato":"fresco");const nl=it.find(x=>x.t==="lot"&&x.k===lk);if(nl){nl.or=lotFrom(o,attrFn(g)(o)||"");nl.cid=o.id;nl.cn=cname(o)}}else if(lk==="__new")lk="";it.push({t:"hv",cid:$("qh-c").value,d:dd,f:f||"",s:s||"",u:$("qh-u").value,n:$("qh-n").value,lk});$("qh").hidden=true;save()};
$("fam").innerHTML=QA.map(([k,n],i)=>`<button data-q="${i}" role="menuitem">${ico(k,18)}<span>${n}</span></button>`).join("");
$("fab").onclick=famT;
$("h-q").onclick=famT;
$("fam").onclick=e=>{const b=e.target.closest("[data-q]");if(!b)return;$("fam").hidden=true;QA[+b.dataset.q][2]()};
document.addEventListener("click",e=>{if(!$("fam").hidden&&!e.target.closest("#fam,#fab,#h-q"))$("fam").hidden=true},true);
document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();gsOpen();return}if(e.key==="/"&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)&&$("gs").hidden){e.preventDefault();gsOpen();return}if(e.key==="Escape"){if(!$("gs").hidden)gsClose();else if(!$("qh").hidden)$("qh").hidden=true;else if(!$("fam").hidden)$("fam").hidden=true}});
