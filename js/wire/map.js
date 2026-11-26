/* wire/map.js — Collegamenti: interazione con la mappa (puntatore, zoom, strumenti, livelli). */
$("plc").onclick=e=>{const b=e.target.closest("[data-p]");if(!b)return;const k=b.dataset.p,F=fo();if(k==="out"){focusOff();return}if(k==="tr"&&F){goCrop(F,"tr");return}if(k==="pn"&&F){goCrop(F,"pl");return}if(k==="pl"&&F){const q=(F.tr||[]).map((t,i)=>[t,i]).filter(x=>!x[0].p).map(x=>x[1]),q2=(F.pl||[]).map((t,i)=>[t,i]).filter(x=>!x[0].p).map(x=>x[1]);if(q.length)startPlace(F,q,"tr");else if(q2.length)startPlace(F,q2,"pl");else sy("Tutto è già posizionato: aggiungi piante dalla scheda «Piante»","ok");return}if(!placing)return;if(k==="end"){endPlace();return}placing.q.shift();if(!placing.q.length)endPlace();else updPlace()};
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&$("dlg").hidden){if(placing)endPlace();else if(focus)focusOff()}});
svg.addEventListener("click",e=>{if(mv){mv=0;return}if(placing){const p=pos(e),o=placing.o,t=o[placing.a][placing.q[0]];if(o.p.length>2&&!pip([p[0],p[1]],o.p)){sy("Fuori dall’area: tocca dentro lo spazio dei funghi","err");return}t.p=[+p[0].toFixed(2),+p[1].toFixed(2)];placing.q.shift();save();if(!placing.q.length)endPlace();else{updPlace();draw()}return}const t=$("tool").value,g=e.target.closest("[data-i]"),tg=e.target.closest("[data-tr]"),pg=e.target.closest("[data-pn]");if(t==="info"&&pg&&!g){const ci=+pg.dataset.pn.split(".")[0];if(it[ci])goCrop(it[ci],"pl");return}if(t==="info"&&tg&&!g){const[ci,ti]=tg.dataset.tr.split(".").map(Number);if(it[ci]){trOpen=ti;goCrop(it[ci],"tr")}return}if(t==="info"){const q=e.target.closest("[data-p]");sel=g?+g.dataset.i:q?"p:"+q.dataset.p:null;full=false;draw();panel();return}
if(t==="del"){if(g){sel=null;it.splice(+g.dataset.i,1);save();draw();panel();toSel()}return}
if(t==="edit"){if(g){it[+g.dataset.i].l=$("lab").value;save();draw();toSel()}return}
if(t==="pan")return;const p=pos(e),k=$("kind").value,l=$("lab").value,v=vtag(p);
if(t==="crop"||t==="zone"||t==="line"||t==="meas"){cur.push(p);draw()}
else if(t==="slope"){cur.push(p);if(cur.length===2){let L=l||"?%";const m=l.match(/^(\d+(?:[.,]\d+)?)\s*m$/),ln=len(cur);if(m&&ln>0)L=(+m[1].replace(",",".")/ln*100).toFixed(0)+"% ("+m[1]+" m su "+ln.toFixed(0)+" m)";it.push({t:"slope",l:L,p:cur,v:vtag(cur[0])});cur=[];save();draw();toSel();return}draw()}

else if(t==="pt"){it.push({t:"pt",k,l:l||(k==="Campione suolo"?"S"+(it.filter(o=>o.k===k).length+1):""),p:[p],v});save();toSel()}
else if(t==="note"&&l){it.push({t:"note",l,p:[p],v});save();toSel()}});
svg.addEventListener("dblclick",()=>{const t=$("tool").value;if(t==="crop"||t==="zone"||t==="line"){cur.pop();fin()}});
let dr=null,mv=0,pin=null;
const ptr=new Map();
svg.addEventListener("pointerdown",e=>{ptr.set(e.pointerId,[e.clientX,e.clientY]);if(ptr.size===2){dr=null;const p=[...ptr.values()];pin={d:Math.hypot(p[0][0]-p[1][0],p[0][1]-p[1][1])||1,a:Math.atan2(p[1][1]-p[0][1],p[1][0]-p[0][0]),c:[(p[0][0]+p[1][0])/2,(p[0][1]+p[1][1])/2],v:{...vb},rot,ro:0};{const r=svg.getBoundingClientRect(),q=[pin.v.x+(pin.c[0]-r.left)/r.width*pin.v.w,pin.v.y+(pin.c[1]-r.top)/r.height*pin.v.h];pin.W=rpA(q[0],q[1],-AT())}mv=1;return}mv=0;dr={x:e.clientX,y:e.clientY,v:{...vb},m:0}});
svg.addEventListener("pointermove",e=>{if(ptr.has(e.pointerId))ptr.set(e.pointerId,[e.clientX,e.clientY]);const r=svg.getBoundingClientRect();
if(pin&&ptr.size>=2){const p=[...ptr.values()],d=Math.hypot(p[0][0]-p[1][0],p[0][1]-p[1][1])||1,c=[(p[0][0]+p[1][0])/2,(p[0][1]+p[1][1])/2],f=pin.d/d,W=pin.v.w*f,w2=Math.min(Math.max(W,ZMIN),FW*1.5),k2=w2/W,h2=pin.v.h*f*k2;let da=(Math.atan2(p[1][1]-p[0][1],p[1][0]-p[0][0])-pin.a)*180/Math.PI;da=((da+540)%360)-180;if(!pin.ro&&Math.abs(da)>8)pin.ro=1;let nr=pin.ro?pin.rot+da:pin.rot;if(Math.abs(((nr%360)+540)%360-180)>176)nr=Math.round(nr/360)*360;rot=nr;const S=rpA(pin.W[0],pin.W[1],nr+((cfg&&cfg.tilt)||0));vb={w:w2,h:h2,x:S[0]-(c[0]-r.left)/r.width*w2,y:S[1]-(c[1]-r.top)/r.height*h2};sched();return}
if(!dr)return;const a=e.clientX-dr.x,b=e.clientY-dr.y;if(Math.hypot(a,b)>5)dr.m=1;if(!dr.m)return;vb.x=dr.v.x-a/r.width*vb.w;vb.y=dr.v.y-b/r.height*vb.h;sched()});
addEventListener("pointerup",pend);
addEventListener("pointercancel",pend);
let rq=0,za=0;
svg.addEventListener("wheel",e=>{e.preventDefault();const dy=e.deltaMode===1?e.deltaY*30:e.deltaY;
if(e.altKey){setRot(rot+Math.max(-60,Math.min(60,dy))*.12);sched();return}
if(e.ctrlKey){zoom(Math.exp(Math.max(-40,Math.min(40,dy))*.011),e);return}
if(Math.abs(dy)>=50&&!e.deltaX){zoom(Math.exp(Math.max(-100,Math.min(100,dy))*.0015),e);return}
const r=svg.getBoundingClientRect();vb.x+=e.deltaX/r.width*vb.w;vb.y+=dy/r.height*vb.h;sched()},{passive:false});
$("tool").onchange=fillKind;
$("fin").onclick=fin;
$("un").onclick=()=>{if(cur.length)cur.pop();else{let i=it.length;while(i--&&NG.includes(it[i].t));if(i>=0)it.splice(i,1);sel=null}save();draw()};
$("gr").onchange=$("cx").onchange=()=>draw();
(()=>{const b=document.querySelector(".body"),h=$("sdh"),ap=c=>{b.classList.toggle("col",c);h.setAttribute("aria-expanded",String(!c));$("sdt").textContent=c?"Mostra strumenti":"Nascondi strumenti";try{localStorage.setItem("maccagno-col",c?"1":"")}catch(e){}};h.onclick=()=>ap(!b.classList.contains("col"));try{if(localStorage.getItem("maccagno-col")==="1")ap(true)}catch(e){}})();
new ResizeObserver(()=>{const r=svg.getBoundingClientRect();if(!r.width||!r.height)return;const a=r.height/r.width;if(Math.abs(vb.h/vb.w-a)>.003){const cy=vb.y+vb.h/2;vb.h=vb.w*a;vb.y=cy-vb.h/2;draw()}}).observe($("w"));
$("zn").onclick=()=>rotAnim(Math.round(rot/360)*360);
$("rl").onclick=()=>rotAnim(rot-15);
$("rr").onclick=()=>rotAnim(rot+15);
$("zi").onclick=()=>zoom(1/1.3,null,1);
$("zo").onclick=()=>zoom(1.3,null,1);
addEventListener("keydown",e=>{if(e.key==="Enter")fin();if(e.key==="Escape"){cur=[];if(sel!=null){sel=null;panel()}if($("tool").value!=="info")toSel();else draw()}if((e.key==="Delete"||e.key==="Backspace")&&typeof sel==="number"&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){it.splice(sel,1);sel=null;save();draw();panel()}});
addEventListener("resize",()=>{fit();draw()});
$("tabs").onclick=e=>{const b=e.target.closest("button");if(!b)return;if(b.dataset.v==="viv"){openViv();return}if(vivOn){vivOn=false;document.querySelector(".body").classList.remove("viv");$("viv").hidden=true}view=b.dataset.v;cur=[];fit();tabs();draw()};
$("lay").onchange=e=>{const l=e.target.dataset.l;if(l){hid[l]=!e.target.checked;draw()}};
$("ct").onchange=$("sn").onchange=$("dt").onchange=$("dm").onchange=$("pn").onchange=()=>draw();
$("pal").onclick=e=>{const b=e.target.closest("button");if(!b)return;if($("tool").value===b.dataset.t&&b.dataset.t!=="info"){toSel();return}$("tool").value=b.dataset.t;side("draw");fillKind()};
$("kinds").onclick=e=>{const b=e.target.closest("button");if(!b)return;const n=b.dataset.k;if(n==="__new")openMg($("tool").value);else{$("kind").value=n;chips()}};
