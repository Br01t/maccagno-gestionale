const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[],dlg=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>{dlg.push(d.message());d.accept()});
await p.addInitScript(require('./openall.js'));
const R=[];const chk=(n,c,i)=>R.push((c?'PASS ':'FAIL ')+n+(c?'':'  -> '+JSON.stringify(i)));
await p.goto('file://'+require('path').resolve(__dirname,'..','index.html'));await p.waitForTimeout(600);
const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const c=cen(P["1241"].p),sq=(x,y)=>[[c[0]+x,c[1]+y],[c[0]+x+5,c[1]+y],[c[0]+x+5,c[1]+y+5],[c[0]+x,c[1]+y+5]];
it=[{t:"crop",id:"cA",k:"Erbe aromatiche",l:"A",p:sq(0,0),v:"1241",y:"2026",pl:[{id:"p1",k:"Erbe aromatiche",n:"Timo",q:2,r:[]}],tr:[],ck:[],co:[{n:"semi",v:"",e:5,pn:"Timo"}]},
{t:"log",cid:"cA",cn:"A",d:"2026-05-01",h:2,tp:"Lavoro",pn:"Timo",lk:"TIM-2026-01",a:"x",n:"",nx:"",v:"all",p:[]},
{t:"hv",cid:"cA",d:"2026-06-01",f:3,s:"",u:"kg",n:"",pn:"Timo",lk:"TIM-2026-01"},
{t:"lot",cid:"cA",cn:"A",pn:"Timo",pg:"Erbe aromatiche",np:"Timo",q:3,u:"kg",f:"fresco",d:"2026-06-02",x:"",k:"TIM-2026-01",sa:[{d:"2026-06-05",q:1,p:20,c:"Bar"}],v:"all",p:[]}];fix();setSeason("2026");save()});
const ids=await ev(()=>it.every(x=>!!x.id));chk('ogni elemento ha un id stabile (sync senza duplicati)',ids);
const tot=()=>ev(()=>{const g=macsAll().find(q=>q.ks.includes("Erbe aromatiche")||q.n==="Erbe di casa")||macsAll()[0];return JSON.stringify({g:g.n,d:sumD(macData(g,"2026")),lots:lotsG(g).length})});
const before=JSON.parse(await tot());
// a) rinomina tipo
await ev(()=>{kindRen("crop","Erbe aromatiche","Erbe di casa",CROPS["Erbe aromatiche"],"Aromatiche e spezie")});
const after=await ev(()=>{const o=it.find(x=>x.id==="cA"),g=macsAll().find(q=>q.ks.includes(o.k));const d=sumD(macData(g,"2026"));return{k:o.k,g:g.n,virtual:!!g.v,h:d.h,f:d.f,i:d.i,lots:lotsG(g).length,gs:macsAll().map(x=>x.n)}});
chk('rinomina tipo: la coltura resta nel suo macro gruppo (non ne nasce uno nuovo)',after.g==="Erbe aromatiche"&&!after.virtual&&after.h===2&&after.i===20,after);
// b) rinomina prodotto (personalizzato)
await ev(()=>{macEdit(M=>{const g=M.find(q=>q.ks.includes("Erbe di casa"));g.p.push("Mix X")});it.forEach(x=>{if(["log","hv","lot"].includes(x.t))x.pn="Mix X";if(x.t==="crop")x.co[0].pn="Mix X"});window.prompt=()=>"Mix Y";setMode("gest","prod");colOpen.add("g:Erbe aromatiche");colOpen.add("p:Erbe aromatiche|Mix X");prodList(true)});await p.waitForTimeout(150);
const hasBtn=await ev(()=>!!document.querySelector('[data-renp="Mix X"]'));
if(hasBtn){await ev(()=>document.querySelector('[data-renp="Mix X"]').click());await p.waitForTimeout(250)}
const rn=await ev(()=>({pn:[it.find(x=>x.t==="log").pn,it.find(x=>x.t==="hv").pn,it.find(x=>x.t==="lot").pn,it.find(x=>x.id==="cA").co[0].pn]}));
chk('rinomina prodotto: aggiorna log, raccolti, lotti e costi',hasBtn&&rn.pn.every(x=>x==="Mix Y"),{hasBtn,rn});
// c) rinomina gruppo
await ev(()=>{window.prompt=()=>"Aromatiche 2"});
const hasG=await ev(()=>!!document.querySelector('[data-reng="Erbe aromatiche"]'));
if(hasG){await ev(()=>document.querySelector('[data-reng="Erbe aromatiche"]').click());await p.waitForTimeout(250)}
const rg=await ev(()=>{const o=it.find(x=>x.id==="cA"),g=macsAll().find(q=>q.ks.includes(o.k));return{g:g&&g.n,lotg:lotGrp(it.find(x=>x.t==="lot")),lots:g?lotsG(g).length:-1,i:g?sumD(macData(g,"2026")).i:-1}});
chk('rinomina gruppo: il lotto e le vendite restano nel gruppo',hasG&&rg.g==="Aromatiche 2"&&rg.lots===1&&rg.i===20,{hasG,rg});
// d) elimina lotto: scollega lk
await ev(()=>{delLot(it.find(x=>x.t==="lot"))});await p.waitForTimeout(100);await p.click('#dlg .dl-ok');await p.waitForTimeout(250);
const dl=await ev(()=>({lot:it.filter(x=>x.t==="lot").length,lk:[it.find(x=>x.t==="log").lk,it.find(x=>x.t==="hv").lk]}));
chk('elimina lotto: log e raccolti collegati vengono scollegati',dl.lot===0&&dl.lk.every(x=>!x),dl);
// e) roundtrip export/import
const rt=await ev(async()=>{const j=expJ();const a=JSON.stringify(it);const o=JSON.parse(j);it=o.items;save&&0;return a===JSON.stringify(it)});
chk('export/import: elementi identici',rt);
// f) due dispositivi: stessa modifica → una sola copia (merge a tre vie)
const mg=await ev(()=>{const base=[{t:"lot",id:"L1",k:"X-1",q:5,sa:[]}],mine=[{t:"lot",id:"L1",k:"X-1",q:5,sa:[{d:"2026-01-01",q:1,p:2}]}],theirs=[{t:"lot",id:"L1",k:"X-1",q:5,sa:[],cn:"nota"}];const o=mergeItems(base,mine,theirs,true);return{n:o.length}});
chk('merge: stesso lotto modificato su due dispositivi resta uno solo',mg.n===1,mg);
console.log(dlg.slice(-3));console.log(R.join('\n'));console.log('errs',errs);await b.close()})()
