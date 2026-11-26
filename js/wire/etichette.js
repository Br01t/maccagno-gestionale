/* wire/etichette.js — Collegamenti: etichette. */
$("lb-k").innerHTML=LBK.map(([a,b])=>`<option value="${a}">${b}</option>`).join("");
$("lb-k").onchange=()=>{LB.k=$("lb-k").value;$("lb-q").value=LB.k==="lot"&&shopU()?"shop":"app";lbFill()};
["lb-i","lb-s","lb-d","lb-t","lb-q"].forEach(i=>$(i).oninput=lbRender);
$("lb-u").onchange=()=>{cfg.x=cfg.x||{};cfg.x.shop=$("lb-u").value.trim();cfgSave();lbRender()};
$("lb-x").onclick=()=>$("lb").hidden=true;
$("lb").onclick=e=>{if(e.target===$("lb"))$("lb").hidden=true};
$("lb-ok").onclick=()=>{const o=lbOpts(),n=Math.max(1,Math.min(60,+$("lb-n").value||1)),E1=$("lb-a").checked?LB.L:[LB.L[+$("lb-i").value]].filter(Boolean);if(!E1.length)return;printOut(E1.map(e=>Array(n).fill(lbHtml(lbModel(LB.k,e),o)).join("")).join(""))};
$("l-l").addEventListener("click",e=>{const b=e.target.closest("[data-lb]");if(!b)return;const l=LS[+b.dataset.lb];if(!l)return;LB.k="lot";const L=lbList("lot");lbOpen("lot",L.findIndex(x=>x.o===l))});
$("viv").addEventListener("click",e=>{const b=e.target.closest("[data-lbv]");if(!b)return;const id=b.closest(".vc").dataset.id,L=lbList("nv");lbOpen("nv",L.findIndex(x=>x.o.id===id))});
