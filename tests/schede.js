const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(require('./openall.js'));const R=[];const chk=(n,c,i)=>R.push((c?'PASS ':'FAIL ')+n+(c?'':'  -> '+JSON.stringify(i)));const ev=(f,a)=>p.evaluate(f,a);
await p.goto('file://'+require('path').resolve(__dirname,'..','index.html'));await p.waitForTimeout(600);
await ev(()=>{const c=cen(P["1241"].p),sq=(x,y)=>[[c[0]+x,c[1]+y],[c[0]+x+5,c[1]+y],[c[0]+x+5,c[1]+y+5],[c[0]+x,c[1]+y+5]];
it=it.filter(x=>x.t!=="crop");const Y=String(YEAR());
it.push({t:"crop",id:"cF",k:"Funghi",l:"Tronchi",p:sq(0,7),v:"1241",y:Y,pl:[],tr:[{id:"t1",sp:"Shiitake",d:today()},{id:"t2",sp:"Pleurotus",d:today()}],ck:[]});
it.push({t:"crop",id:"cM",k:"Fiori",l:"Fiori",p:sq(8,7),v:"1241",y:Y,pl:[],tr:[],ck:[]});
it.push({t:"crop",id:"cA",k:"Api e miele",l:"Arnie",p:sq(0,14),v:"1241",y:Y,pl:[],tr:[],ck:[]});
it.push({t:"crop",id:"cS",k:"Spezie",l:"Spezie",p:sq(8,14),v:"1241",y:Y,pl:[],tr:[],ck:[]});
it.forEach(o=>{if(o.t==="crop"){delete o.tv;delete o.tech}});seedAll();setSeason(Y);save()});
const s=await ev(()=>Object.fromEntries(it.filter(x=>x.t==="crop").map(o=>[o.k,[(o.tech||[]).length,(o.ck||[]).length]])));
chk('ogni coltura riceve scheda tecnica e checklist dalla guida',Object.values(s).every(v=>v[0]>0&&v[1]>0),s);
// macro gruppi: scheda e checklist
await ev(()=>{prMode="mac";setMode("gest","prod");prodList(true)});await p.waitForTimeout(250);
const g=await ev(()=>macsAll().map(m=>[m.n,grpGuide(m).includes("Checklist")&&grpGuide(m).includes("<table")]));
chk('ogni macro gruppo ha scheda e checklist',g.every(x=>x[1]),g.filter(x=>!x[1]));
chk('il gruppo Funghi mostra scheda del gruppo e scheda dello Shiitake',await ev(()=>{const m=macsAll().find(x=>x.n==="Funghi");return secs(m,"",season,true).includes("Scheda tecnica e checklist del gruppo")&&secs(m,"Shiitake",season,false).includes("Scheda tecnica e checklist: Shiitake")}),0);
// scheda coltura: specie e checklist suggerita
await ev(()=>{sel=it.findIndex(x=>x.id==="cF");full=true;ptab="tech";setMode("map","draw");draw();panel()});await p.waitForTimeout(250);
const sp=await ev(()=>document.querySelectorAll('#ip .spc b').length&&[...document.querySelectorAll('#ip .spc b')].map(x=>x.textContent));
chk('scheda coltura Funghi mostra Shiitake e Pleurotus',sp&&sp.includes("Shiitake")&&sp.includes("Pleurotus"),sp);
await ev(()=>{ptab="ck";panel()});await p.waitForTimeout(150);await p.click('#ck-s');await p.waitForTimeout(200);
const ck=await ev(()=>it.find(x=>x.id==="cF").ck.map(x=>x.t));
chk('checklist suggerita include i passi per specie',ck.some(t=>t.startsWith("Shiitake: "))&&ck.some(t=>t.startsWith("Pleurotus: ")),ck.slice(0,4));
console.log(R.join('\n'));console.log('errs',JSON.stringify(errs));await b.close()})();
