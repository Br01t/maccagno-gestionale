const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(require('./openall.js'));
const R=[];const chk=(n,c,i)=>{R.push((c?'PASS ':'FAIL ')+n+(c?'':'  -> '+JSON.stringify(i)))};const ev=(f,a)=>p.evaluate(f,a);
await p.goto('file://'+require('path').resolve(__dirname,'..','index.html'));await p.waitForTimeout(600);
await ev(()=>{const c=cen(P["1241"].p),sq=(x,y)=>[[c[0]+x,c[1]+y],[c[0]+x+5,c[1]+y],[c[0]+x+5,c[1]+y+5],[c[0]+x,c[1]+y+5]];
it=it.filter(x=>x.t!=="crop");it.push({t:"crop",id:"cZ",k:"Zafferano",l:"Zaff",p:sq(0,7),v:"1241",y:String(YEAR()),pl:[],tr:[],ck:[]});setSeason(String(YEAR()));save()});
await ev(()=>setMode("gest","sp"));await p.waitForTimeout(200);
const s0=await ev(()=>({l:slLists().length,i:slItems("seed-sl-test").length,seed:cfg.x.seedSl}));
chk('lista di partenza creata',s0.l===1&&s0.i>=25&&s0.seed===1,s0);
await p.reload();await p.waitForTimeout(500);
chk('seed non duplicato dopo ricarica',await ev(()=>slLists().length===1&&slItems("seed-sl-test").length>=25),0);
// spunta bulbi (coltura zafferano assegnata) → costo sulla coltura
await ev(()=>setMode("gest","sp"));await p.waitForTimeout(200);
const id=await ev(()=>it.find(x=>x.t==="si"&&x.n.startsWith("Bulbi")).id);
await ev(i=>{it.find(x=>x.id===i).cid="cZ"},id);
await p.check(`[data-ck="${id}"]`);await p.waitForTimeout(200);
let c=await ev(()=>({co:it.find(x=>x.id==="cZ").co,T:macTot(String(YEAR()))}));
chk('spunta → costo 175€ sulla coltura',c.co&&c.co.length===1&&c.co[0].e===175&&c.T.c===175,c);
await p.fill(`[data-ac="${id}"]`,'160');await p.dispatchEvent(`[data-ac="${id}"]`,'change');await p.waitForTimeout(200);
c=await ev(()=>({co:it.find(x=>x.id==="cZ")&&it.find(x=>x.id==="cZ").co,n:it.filter(x=>x.t==="crop").length,ac:it.find(x=>x.t==="si"&&x.n.startsWith("Bulbi")).ac}));console.log(JSON.stringify(c));chk('importo pagato modificato → 160',c.co&&c.co.length===1&&c.co[0].e===160,c);
await p.uncheck(`[data-ck="${id}"]`);await p.waitForTimeout(200);
chk('de-spunta rimuove il costo',await ev(()=>(it.find(x=>x.id==="cZ").co||[]).length===0),0);
// elemento senza coltura → spesa generale
const id2=await ev(()=>it.find(x=>x.t==="si"&&x.n.startsWith("Rastrello")).id);
await p.check(`[data-ck="${id2}"]`);await p.waitForTimeout(200);
c=await ev(()=>({g:genExp("all"),T:macTot(String(YEAR())).x,sp:it.filter(x=>x.t==="sp").length}));
chk('senza coltura → spesa generale 12€',c.g===12&&c.sp===1,c);
// nuova lista, nuovo elemento, modifica, elimina
await p.click('#sp-nl');await p.fill('#sp-nn','Attrezzi');await p.click('#sp-nok');await p.waitForTimeout(200);
await ev(()=>{$('sp-add').open=true});await p.fill('#sp-add [data-f="n"]','Pala');await p.fill('#sp-add [data-f="up"]','20');await p.click('#sp-add [data-svi="new"]');await p.waitForTimeout(200);
chk('lista e elemento creati',await ev(()=>slLists().length===2&&it.filter(x=>x.t==="si"&&x.n==="Pala").length===1),0);
const id3=await ev(()=>it.find(x=>x.n==="Pala").id);
await p.click(`[data-ed="${id3}"]`);await p.waitForTimeout(150);await p.fill(`[data-form="${id3}"] [data-f="n"]`,'Pala grande');await p.click(`[data-svi="${id3}"]`);await p.waitForTimeout(200);
chk('elemento rinominato',await ev(()=>!!it.find(x=>x.n==="Pala grande")),0);
await p.check(`[data-ck="${id3}"]`);await p.waitForTimeout(200);
await p.click(`[data-del="${id3}"]`);await p.waitForTimeout(150);await p.click('#dlg .dl-ok');await p.waitForTimeout(200);
chk('elimina elemento spuntato → toglie anche la spesa',await ev(()=>!it.some(x=>x.n==="Pala grande")&&!it.some(x=>x.t==="sp"&&x.n==="Pala grande")),0);
await ev(()=>{$('sp-mng').open=true});await p.click('#sp-dl');await p.waitForTimeout(150);await p.click('#dlg .dl-ok');await p.waitForTimeout(200);
chk('elimina lista',await ev(()=>slLists().length===1),0);
// costo orario
await ev(()=>{cfg.x.hr=10;cfgSave();it.push({t:"log",id:"lg1",cid:"cZ",cn:"Zaff",d:today(),h:4,tp:"Lavoro",v:"all",p:[]});save()});
const m=await ev(()=>{const T=macTot(String(YEAR()));return[T.h,T.w]});chk('costo orario: 4h × 10 = 40',m[0]===4&&m[1]===40,m);
await ev(()=>{setMode("gest","prod");prodList(true)});await p.waitForTimeout(200);
chk('KPI margine con lavoro',(await p.textContent('#prl .kp'))?.includes('lavoro'),0);
await ev(()=>{cfg.x.hr=0;cfgSave()});
console.log(R.join('\n'));console.log('errs',JSON.stringify(errs));await b.close()})();
