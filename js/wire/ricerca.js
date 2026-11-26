/* wire/ricerca.js — Collegamenti: ricerca. */
{const m=/^#find=(.+)$/.exec(location.hash);if(m){const code=decodeURIComponent(m[1]);try{history.replaceState(null,"",location.pathname+location.search)}catch(_){}let n=0;const t=setInterval(()=>{if(++n>240){clearInterval(t);return}if(!document.documentElement.classList.contains("locked")){clearInterval(t);setTimeout(()=>{gsOpen();$("gs-q").value=code;gsRun()},400)}},500)}}
$("gs-q").oninput=gsRun;
$("gs-r").onclick=e=>{const b=e.target.closest("[data-g]");if(!b)return;const x=GSA[+b.dataset.g];if(x.a)x.a();else if(x.card){const c=b.nextElementSibling;c.innerHTML=spCard(x.card);c.hidden=!c.hidden}};
$("gs").onclick=e=>{if(e.target===$("gs"))gsClose()};
$("h-s").onclick=gsOpen;
