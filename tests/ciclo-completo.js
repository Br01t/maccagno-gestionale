const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[],dlg=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>{dlg.push(d.message());d.accept()});
await p.addInitScript(require('./openall.js'));
const R=[];const chk=(n,c,i)=>{R.push((c?'PASS ':'FAIL ')+n+(c?'':'  -> '+JSON.stringify(i)))};
await p.goto('file://'+require('path').resolve(__dirname,'..','index.html'));await p.waitForTimeout(600);
const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const c=cen(P["1241"].p),sq=(x,y)=>[[c[0]+x,c[1]+y],[c[0]+x+5,c[1]+y],[c[0]+x+5,c[1]+y+5],[c[0]+x,c[1]+y+5]];
it=[{t:"crop",id:"cA",k:"Erbe aromatiche",l:"Aiuola A",p:sq(0,0),v:"1241",y:"2026",sd:"2026-12-05",h1:"2027-06-01",pl:[],tr:[],ck:[{t:"Preparare il terreno",d:false,dt:"2026-11-28"}]},
{t:"crop",id:"cB",k:"Erbe aromatiche",l:"Aiuola B",p:sq(7,0),v:"1241",y:"2026",pl:[{id:"pb",k:"Erbe aromatiche",n:"Origano",q:3,r:[]}],tr:[],ck:[]},
{t:"crop",id:"cZ",k:"Zafferano",l:"Zaff",p:sq(0,7),v:"1241",y:"2026",pl:[],tr:[],ck:[]},
{t:"nv",id:"n1",v:"all",sp:"Timo",k:"Erbe aromatiche",q:10,loc:"Milano",st:"Pronta",d0:"2026-09-01",dt:"",h:[]}];setSeason("2026");save()});
// 1 trapianto
await ev(()=>openViv());await p.waitForTimeout(150);await p.click('[data-tr]');await p.waitForTimeout(100);
await ev(()=>{const s=document.querySelector('[data-dst]');s.value="cA";s.dispatchEvent(new Event('change',{bubbles:true}));const q=document.querySelector('[data-tq]');if(q)q.value="4"});
await p.click('[data-trok]');await p.waitForTimeout(300);
const st1=await ev(()=>({pl:it.find(x=>x.id==="cA").pl.map(x=>[x.n,x.q,x.lc]),nv:it.filter(x=>x.t==="nv").map(x=>[x.id,x.q,x.st,x.lc,(x.h||[]).length]),lc:it.find(x=>x.t==="nv").lc}));
chk('trapianto: pianta aggiunta alla coltura con codice lotto',st1.pl.length===1&&st1.pl[0][0]==="Timo"&&st1.pl[0][1]===4&&st1.pl[0][2]===st1.lc,st1);
chk('trapianto: restano 6 in vivaio',st1.nv.some(x=>x[1]===6),st1.nv);
await ev(()=>closeViv&&closeViv());
// 2 ore da Diario
await ev(()=>setMode("gest","di"));await p.waitForTimeout(150);
await ev(()=>{$("d-c").value="cA"});await p.fill('#d-h','3');await p.fill('#d-a','Zappatura');await p.click('#d-b');await p.waitForTimeout(150);
// 3 resa + lotto da Produzione
await ev(()=>{setMode("gest","prod");colOpen.add("g:Erbe aromatiche");prodList(true)});await p.waitForTimeout(150);
const rgs='details.pls[data-key="reg:Erbe aromatiche|"] .rg';
await ev((s)=>{const r=document.querySelector(s);r.querySelector('[data-f="cid"]').value="cA";r.querySelector('[data-f="lk"]').value="__new";r.querySelector('[data-f="n"]')&&(r.querySelector('[data-f="n"]').value="Timo");r.querySelector('[data-f="h"]').value="2";r.querySelector('[data-f="f"]').value="2";r.querySelector('[data-f="s"]').value="1";r.querySelector('[data-f="c"]').value="10";},rgs);
await p.click(rgs+' [data-reg]');await p.waitForTimeout(300);
const s3=await ev(()=>({lots:it.filter(x=>x.t==="lot").map(l=>[l.k,l.q,l.u,l.f,l.cid,l.pn,l.pg]),logs:it.filter(x=>x.t==="log").map(x=>[x.cid,x.h,x.pn,x.lk]),hv:it.filter(x=>x.t==="hv").map(x=>[x.cid,x.f,x.s,x.pn,x.lk]),co:it.find(x=>x.id==="cA").co}));
chk('produzione: lotto creato e legato alla coltura A',s3.lots.length===1&&s3.lots[0][4]==="cA",s3);
chk('produzione: ore (3+2) e raccolto presenti',s3.logs.reduce((s,x)=>s+x[1],0)===5&&s3.hv.length===1,s3);
chk('produzione: prodotto del lotto coerente',s3.lots[0][5]==="Timo",s3.lots);
// 4 vendita rapida
const code=s3.lots[0][0];
await ev(()=>qsOpen());await ev((c)=>{$("qs-l").value=c;$("qs-l").dispatchEvent(new Event('change'))},code);
await p.fill('#qs-q','0.4');await p.fill('#qs-p','30');await p.fill('#qs-c','Ristorante Lago');await p.click('#qs-b');await p.waitForTimeout(200);
const s4=await ev(()=>({sa:it.find(x=>x.t==="lot").sa,stock:lotStock(it.find(x=>x.t==="lot")),cl:cliAll().map(c=>[c.n||c.name,c.tot||c.t])}));
chk('vendita: registrata sul lotto',s4.sa.length===1&&s4.sa[0].q===0.4&&s4.sa[0].p===30,s4);
chk('vendita: giacenza = 1 - 0.4 (unità del lotto)',Math.abs(s4.stock-0.6)<1e-6,s4.stock);
// 5 coerenza totali
const T=await ev(()=>{const g=macsAll().find(q=>q.n==="Erbe aromatiche"),d=sumD(macData(g,"2026")),a=it.find(x=>x.id==="cA");return{g:d,hA:hrs(a),eA:econ(a),eB:econ(it.find(x=>x.id==="cB")),hvA:hvOf(a).length}});
chk('totali gruppo: ore 5',T.g.h===5,T.g);chk('totali gruppo: incassato 12',Math.abs(T.g.i-12)<1e-6,T.g);chk('totali gruppo: costi 10',T.g.c===10,T.g);
chk('coltura A: ore 5, incasso 12 (stessa fonte)',T.hA===5&&Math.abs(T.eA.inc-12)<1e-6,T);
chk('coltura B non toccata',T.eB.inc===0,T.eB);
const rs=await ev(()=>rsHtml("2026").replace(/<[^>]+>/g," ").replace(/\s+/g," "));
chk('riepilogo contiene ore e incassi corretti',/12(,00)? €|12 €/.test(rs)&&/5 h/.test(rs),rs.slice(0,400));
// 6 stagione
await ev(()=>{setSeason("2027")});const T27=await ev(()=>{const g=macsAll().find(q=>q.n==="Erbe aromatiche");return sumD(macData(g,"2027"))});
chk('stagione 2027 vuota',T27.h===0&&T27.i===0,T27);await ev(()=>setSeason("2026"));
// 7 duplicazione coltura
await ev(()=>{sel=it.findIndex(x=>x.id==="cA");full=true;setMode("map","draw");draw();panel()});await p.click('#dup-b');await p.waitForTimeout(200);await p.click('#dlg .dl-ok');await p.waitForTimeout(400);
const d7=await ev(()=>({n:it.filter(x=>x.t==="crop").length,logs:it.filter(x=>x.t==="log").length,new:it.filter(x=>x.t==="crop"&&x.y==="2027").map(x=>[x.l,x.pl.map(q=>q.n+q.q),x.sd,(x.co||[]).length])}));
chk('duplica: nuova coltura 2027 senza dati reali duplicati',d7.n===4&&d7.logs===2&&d7.new.length===1&&d7.new[0][3]===0,d7);
// 8 ricerca / etichette / agenda / oggi
const gs=await ev((c)=>{$("gs-q").value=c;gsRun();return $("gs-r").innerText.replace(/\n/g," | ")},code);chk('ricerca trova il lotto',gs.includes(code),gs);
const lb=await ev(()=>lbList("lot").map(x=>x.code));chk('etichette: lotto presente',lb.includes(code),lb);
const ag=await ev(()=>{agM=new Date(2026,10,1);return agenda&&1}); 
const AGn=await ev(()=>{agenda();return (typeof AG!=="undefined"?AG:[]).map(x=>x.t||x.l||"").slice(0,8)});console.log('agenda items',JSON.stringify(AGn));
const og=await ev(()=>{oggi();return $("og").innerText.replace(/\n+/g," | ").slice(0,300)});console.log('oggi',og);
// 9 export / ripristino
const ex=await ev(()=>{const j=expJ();const o=JSON.parse(j);return{n:o.items.length,hasCfg:!!o.cfg,keys:Object.keys(o).join(",")}});chk('export contiene tutti gli elementi',ex.n===await ev(()=>it.length),ex);
// 10 elimina coltura A
await ev(()=>{sel=it.findIndex(x=>x.id==="cA");full=true;setMode("map","draw");draw();panel()});await p.click('#f-d');await p.waitForTimeout(200);console.log('DEL DIALOG:',await ev(()=>$('dlg').innerText.replace(/\n/g,' | ')));await p.click('#dlg .dl-ok');await p.waitForTimeout(400);
const o10=await ev(()=>({crops:it.filter(x=>x.t==="crop").map(x=>x.id),logsOrph:it.filter(x=>(x.t==="log"||x.t==="hv")&&x.cid&&!it.some(c=>c.id===x.cid)).length,lot:it.filter(x=>x.t==="lot").map(l=>[l.k,l.cid,l.pg]),stock:lotStock(it.find(x=>x.t==="lot"))}));
chk('elimina coltura: nessun log/raccolto orfano',o10.logsOrph===0,o10);
chk('elimina coltura: il lotto resta e rimane nel gruppo',o10.lot.length===1&&!!o10.lot[0][2],o10);
console.log(dlg.slice(-2));
console.log(R.join('\n'));console.log('errs',errs);await b.close()})()
