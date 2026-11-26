/* wire/nav.js — Collegamenti: navigazione e barre. */
$("sdf").onclick=e=>{const b=e.target.closest("button[data-x]");if(!b)return;const sd=$("sd"),x=sd.dataset.x===b.dataset.x?"":b.dataset.x;sd.dataset.x=x;sdf_mark()};
$("sd").addEventListener("click",e=>{const b=e.target.closest("[data-retry]");if(b)side(b.dataset.retry)});
tabsBuild();
$("home").onclick=goHome;
$("md-sw").onclick=e=>{const b=e.target.closest("button");if(b&&b.dataset.m!==mode)setMode(b.dataset.m)};
{const nav=$("st-tabs"),sd=$("sd"),app=document.querySelector(".app"),mq=matchMedia("(max-width:760px)"),place=()=>{if(mq.matches){if(nav.parentNode!==app)app.appendChild(nav)}else if(nav.parentNode!==sd)sd.insertBefore(nav,$("sdh").nextSibling)};place();try{mq.addEventListener("change",place)}catch(_){}}
$("h-s").innerHTML=ico("search");
$("h-q").innerHTML=ico("plus",18)+"<span>Azione rapida</span>";
$("fab").innerHTML=ico("plus",26);
$("st-tabs").onclick=e=>{const b=e.target.closest("button");if(b)go(b.dataset.s)};
