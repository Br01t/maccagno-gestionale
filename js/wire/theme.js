/* wire/theme.js — Collegamenti: tema. */
let thm="auto";
try{thm=localStorage.getItem("maccagno-theme")||"auto"}catch(_){}
$("h-t").onclick=()=>{thm={auto:"light",light:"dark",dark:"auto"}[thm];try{localStorage.setItem("maccagno-theme",thm==="auto"?"":thm)}catch(_){}thmApply();if(typeof draw==="function")draw()};
try{matchMedia("(prefers-color-scheme:dark)").addEventListener("change",thmApply)}catch(_){}
thmApply();
