/* wire/pwa.js — Collegamenti: installazione. */
hideIns();
try{matchMedia("(display-mode: standalone)").addEventListener("change",hideIns)}catch(_){}
let ip=null;
addEventListener("beforeinstallprompt",e=>{e.preventDefault();ip=e;$("inst").hidden=false});
$("inst").onclick=async()=>{if(!ip)return;ip.prompt();try{await ip.userChoice}catch(_){}ip=null;$("inst").hidden=true};
addEventListener("appinstalled",()=>{$("inst").hidden=true;$("insec").hidden=true});
