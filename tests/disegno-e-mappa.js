const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[],dlg=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>{dlg.push(d.message());d.accept()});
const R=[];const chk=(n,c,i)=>R.push((c?'PASS ':'FAIL ')+n+(c?'':'  -> '+JSON.stringify(i)));
await p.goto('file://'+require('path').resolve(__dirname,'..','index.html'));await p.waitForTimeout(700);
const ev=(f,a)=>p.evaluate(f,a);
// punto sullo schermo dentro la particella 1241
const pt=await ev(()=>{const c=cen(P["1241"].p);const r=svg.getBoundingClientRect(),m=svg.getScreenCTM();const pnt=svg.createSVGPoint();return null});
const scr2=await ev(()=>{const c=cen(P["1241"].p);const s=svg.getBoundingClientRect();return{r:[s.x,s.y,s.width,s.height],c,vb:{...vb},rot}});
console.log('vb',JSON.stringify(scr2));
// usa conversione inversa: trova funzione di posizione
const tryClick=async(dx,dy)=>{const s=await ev(()=>{const r=svg.getBoundingClientRect();return[r.x+r.width/2,r.y+r.height/2]});await p.mouse.click(s[0]+dx,s[1]+dy)};
await p.click('#pal [data-t="crop"]');await p.waitForTimeout(100);
await tryClick(-40,-40);await tryClick(40,-40);await tryClick(40,40);await tryClick(-40,40);
await p.keyboard.press('Enter');await p.waitForTimeout(300);
let st=await ev(()=>({n:it.filter(x=>x.t==="crop").length,last:(it.filter(x=>x.t==="crop")[0]||{}),sel,tool:$("tool").value}));
chk('disegno coltura: creata con id, stagione e particella',st.n===1&&!!st.last.id&&!!st.last.v,st);
console.log('crop fields',JSON.stringify({k:st.last.k,y:st.last.y,v:st.last.v,id:!!st.last.id,pl:st.last.pl,sd:st.last.sd}));
// zona, linea, punto, nota
await p.click('#pal [data-t="zone"]');await tryClick(100,-100);await tryClick(160,-100);await tryClick(160,-50);await p.keyboard.press('Enter');await p.waitForTimeout(150);
await p.click('#pal [data-t="line"]');await tryClick(-150,100);await tryClick(-100,150);await p.keyboard.press('Enter');await p.waitForTimeout(150);
await p.click('#pal [data-t="pt"]');await tryClick(-120,-120);await p.waitForTimeout(150);
const types=await ev(()=>it.map(x=>x.t).join(","));console.log('types',types);
chk('zona, linea e punto creati',/zone/.test(types)&&/line/.test(types)&&/pt/.test(types),types);
// selezione coltura dal click sulla mappa → scheda rapida
await p.click('#pal [data-t="info"]');await tryClick(0,0);await p.waitForTimeout(200);
const q=await ev(()=>({sel,qm:$("qm").hidden,txt:$("qm").innerText.replace(/\n/g,' | ').slice(0,200)}));chk('click sulla coltura apre la scheda rapida',q.qm===false,q);
// registra ore dalla scheda coltura e verifica in Gestione
await ev(()=>{full=true;ptab="data";panel()});await p.waitForTimeout(150);
await p.fill('#lg-h','2');await p.click('#lg-b');await p.waitForTimeout(200);
const g1=await ev(()=>{const g=macsAll().find(q=>q.ks.includes(it.find(x=>x.t==="crop").k));return sumD(macData(g,"all")).h});chk('ore dalla scheda coltura arrivano al macro gruppo',g1===2,g1);
// goHome dal logo
await p.click('#md-sw [data-m="gest"]');await p.click('#home');await p.waitForTimeout(200);
chk('clic sul logo riporta alla mappa',await ev(()=>mode==="map"),await ev(()=>mode));
console.log(dlg);console.log(R.join('\n'));console.log('errs',errs);await b.close()})()
