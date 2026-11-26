/* core/store.js — Persistenza locale (localStorage), configurazione utente, import/export JSON. */
const fix=()=>it.forEach(o=>{if(!o.id)o.id=uid();if(!o.v)o.v=o.p&&o.p.length?vtag(o.p[0]):"all"});
function save(){fix();try{nvFix()}catch(_){}try{seedAll()}catch(_){}try{cliFill()}catch(_){}if(!adopting&&Date.now()-lastSnap()>30*864e5)snap("Automatico");const n=it.filter(o=>!NG.includes(o.t)).length;if(pl>=0)added=Math.max(0,added+n-pl);pl=n;try{localStorage.setItem(KEY,JSON.stringify(it))}catch(e){}if(!adopting)touch();prodList();refresh()}
function load(){try{const x=localStorage.getItem(KEY);if(x){it=JSON.parse(x);if(localStorage.getItem(KEY+"-geo")!=="2"){localStorage.setItem(KEY+"-backup-geo1",x);mig(it);localStorage.setItem(KEY,JSON.stringify(it))}}localStorage.setItem(KEY+"-geo","2")}catch(e){}}
const pend=e=>{ptr.delete(e.pointerId);const was=!!pin;if(ptr.size<2)pin=null;mv=(was||(dr&&dr.m))?1:0;dr=null};
const sched=()=>{if(!rq)rq=requestAnimationFrame(()=>{rq=0;draw()})};
const expJ=()=>JSON.stringify({v:2,geo:2,ts:+lsg(KEY+"-ts")||Date.now(),items:it,cfg});
const cfgX=v=>{cfg.x=Object.assign({grp:{},gl:null,kr:{},sp:{},sph:[]},v||{})};
function cfgApply(){for(const c in cfg.add)Object.assign(TAB[c],cfg.add[c]);try{spRebuild()}catch(e){}}
function cfgSave(){try{localStorage.setItem(KEY+"-cfg",JSON.stringify(cfg))}catch(e){}if(!adopting)touch()}
function cfgLoad(){try{const x=JSON.parse(localStorage.getItem(KEY+"-cfg"));if(x){cfg.tilt=+x.tilt||0;cfgX(x.x);for(const c in cfg.add){Object.assign(cfg.add[c],(x.add||{})[c]||{});cfg.hide[c]=(x.hide||{})[c]||[]}}}catch(e){}cfgApply()}
const snapJ=()=>JSON.stringify({geo:2,items:it,cfg});
function touch(){lss(KEY+"-ts",Date.now());dirty=true;lss(KEY+"-dirty","1");if(ref){sy("Salvataggio…");clearTimeout(tm);tm=setTimeout(push,4000)}}
const ikey=o=>o.id?"#"+o.id:JSON.stringify(o),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
