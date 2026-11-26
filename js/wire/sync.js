/* wire/sync.js — Collegamenti: sincronizzazione e file. */
$("fl-c").onclick=async()=>{try{const h=await showSaveFilePicker({suggestedName:"mappa-maccagno-sync.json",...FT});try{await idb("set",h)}catch(e){}useFile(h)}catch(e){}};
$("fl-o").onclick=async()=>{try{try{const s=await idb("get");if(s&&await ensurePerm(s)){useFile(s);return}}catch(e){}const[h]=await showOpenFilePicker(FT);await ensurePerm(h);try{await idb("set",h)}catch(e){}useFile(h)}catch(e){}};
window.MAPSYNC={use:(r,m,who)=>{ref=r;liveOK=false;SS.mode="cloud";SS.who=who||"";SS.err="";sy(m,"ok")},drop:m=>{ref=null;liveOK=true;SS.mode="local";sy(m,"")},setLive:b=>{if(liveOK===b)return;liveOK=b;if(b&&dirty&&ref)push();syncUI()},state:(k,m)=>{SS.mode=k;SS.err=m||"";sy(m||"","")},err:e=>{SS.err=(e&&(e.code||e.message))||"errore";sy("Cloud: "+SS.err,"err")},remote:s=>{SS.err="";onRemote(s);syncUI()},syncNow:f=>syncNow(f),sy,touch,hasData:()=>it.length>0};
$("fl-x").onclick=async()=>{fh=null;ref=null;try{await idb("del")}catch(e){}$("fl-x").hidden=true;sy("Solo su questo dispositivo","")};
document.addEventListener("visibilitychange",()=>{if(document.hidden&&dirty&&ref)push()});
$("sy-n").onclick=async()=>{const b=$("sy-n");b.textContent="Sincronizzo…";await syncNow(true);b.textContent="Sincronizza ora";syncUI()};
$("sy-u").onclick=()=>askConfirm("Inviare i dati di questo dispositivo?","Sostituiscono quelli nel cloud (e quindi sugli altri dispositivi). La versione del cloud resta nei punti di ripristino.",{ok:"Invia"}).then(async y=>{if(!y||!ref)return;try{if(ref.get){const s=await ref.get();if(s.exists){snapBody("Cloud, prima di sovrascrivere",s.data().j);remRev=s.data().rev||0}}}catch(_){}dirty=true;lss(KEY+"-dirty","1");SS.note="Dati di questo dispositivo inviati al cloud.";push();syncUI()});
$("sy-d").onclick=()=>askConfirm("Scaricare i dati dal cloud?","Sostituiscono quelli di questo dispositivo. La versione attuale resta nei punti di ripristino.",{ok:"Scarica",danger:1}).then(async y=>{if(!y||!ref||!ref.get)return;try{const s=await ref.get();if(!s.exists){sy("Nel cloud non ci sono ancora dati","err");return}SS.note="Dati scaricati dal cloud.";adopt(s.data())}catch(e){SS.err=(e&&(e.code||e.message))||"errore";sy("Cloud: "+SS.err,"err")}});
syncUI();
addEventListener("online",()=>syncNow());
document.addEventListener("visibilitychange",()=>{if(!document.hidden)syncNow()});
