const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.dismiss());
await p.addInitScript(require('./openall.js'));
await p.goto('file://'+require('path').resolve(__dirname,'..','index.html'));await p.waitForTimeout(600);
await p.evaluate(()=>{const c=cen(P["1241"].p),sq=(x,y)=>[[c[0]+x,c[1]+y],[c[0]+x+6,c[1]+y],[c[0]+x+6,c[1]+y+8],[c[0]+x,c[1]+y+8]];it=[{t:"crop",k:"Erbe aromatiche",l:"Aiuola A",p:sq(0,0),v:"1241",y:"2026",pl:[{id:"a",k:"Erbe aromatiche",n:"Timo",q:2,r:[]}],tr:[],ck:[]},{t:"crop",k:"Erbe aromatiche",l:"Aiuola B",p:sq(8,0),v:"1241",y:"2026",pl:[{id:"b",k:"Erbe aromatiche",n:"Timo",q:1,r:[]}],tr:[],ck:[]},{t:"pe",id:"old1",k:"Erbe aromatiche",n:"Timo",d:"2026-11-10",h:"1",f:"",s:"",u:"kg",c:"4",r:"",a:"vecchia"}];fix();setSeason("2026");save()});
await p.click('#md-sw [data-m="gest"]');await p.click('#st-tabs [data-s="prod"]');await p.waitForTimeout(200);
await p.click('#prl details.mc[data-key="g:Erbe aromatiche"] > summary');
const rgc='#prl details.mc[data-key="g:Erbe aromatiche"] > .mcb > .rg, #prl details.mc[data-key="g:Erbe aromatiche"] .rg';
console.log('regForm crop options',await p.$$eval('#prl .rg [data-f="cid"]',e=>e[0]?[...e[0].options].map(o=>o.textContent):null));
// try without crop
await p.evaluate(()=>{const r=document.querySelector('details.pls[data-key="reg:Erbe aromatiche|"] .rg');r.querySelector('[data-f="h"]').value="2"});
await p.click('details.pls[data-key="reg:Erbe aromatiche|"] .rg [data-reg]');await p.waitForTimeout(200);
console.log('msg',await p.evaluate(()=>colMsg||document.querySelector('#prl .wr')?.textContent));
await p.evaluate(()=>{const r=document.querySelector('details.pls[data-key="reg:Erbe aromatiche|"] .rg');const o=it.filter(x=>x.t==="crop")[1];r.querySelector('[data-f="cid"]').value=o.id;r.querySelector('[data-f="h"]').value="2";r.querySelector('[data-f="f"]').value="1.5";r.querySelector('[data-f="c"]').value="10";r.querySelector('[data-f="a"]').value="raccolta"});
await p.click('details.pls[data-key="reg:Erbe aromatiche|"] .rg [data-reg]');await p.waitForTimeout(250);
console.log('items',await p.evaluate(()=>JSON.stringify(it.filter(x=>["log","hv"].includes(x.t)).map(x=>[x.t,x.cn||"",x.h||x.f,x.pn,x.a||x.n]))),await p.evaluate(()=>JSON.stringify(it[1].co)));
console.log('group card:',(await p.$eval('#prl details.mc[data-key="g:Erbe aromatiche"] > summary',e=>e.innerText)).replace(/\n/g,' | '));
console.log('log section:',(await p.$$eval('#prl details.mc[data-key="g:Erbe aromatiche"] details[data-key^="log:"] .ev2',e=>e.map(x=>x.innerText.replace(/\n/g,' ')))));
// crop panel B
await p.evaluate(()=>{sel=1;full=true;ptab="data";setMode("map","draw");draw();panel()});await p.waitForTimeout(250);
console.log('panel B lavoro:',await p.$eval('#hs',e=>e.innerText),'| raccolti:',(await p.$eval('#hv-l',e=>e.innerText)).replace(/\n/g,' '),'| costi:',await p.$$eval('#co-l input',e=>e.map(x=>x.value)));
// diario
await p.evaluate(()=>setMode("gest","di"));await p.waitForTimeout(200);console.log('diario:',(await p.$eval('#d-l',e=>e.innerText)).replace(/\n+/g,' / ').slice(0,150));
// assegna legacy
await p.evaluate(()=>{setMode("gest","prod");prodList(true)});await p.waitForTimeout(200);
await p.evaluate(()=>{const e=document.querySelector('details[data-key="log:Erbe aromatiche|"] select[data-asg]');e.value=e.options[1].value;e.dispatchEvent(new Event('change',{bubbles:true}))});await p.waitForTimeout(250);
console.log('after assign: pe left',await p.evaluate(()=>it.filter(x=>x.t==="pe").length),'logs',await p.evaluate(()=>it.filter(x=>x.t==="log").length),'cost A',await p.evaluate(()=>JSON.stringify(it[0].co)));
// delete the hv via list
const del=await p.$$('details[data-key="log:Erbe aromatiche|"] button[data-dreg]');console.log('delete buttons',del.length);
await del[0].click();await p.waitForTimeout(250);console.log('items after delete',await p.evaluate(()=>it.filter(x=>["log","hv"].includes(x.t)||x.t==="crop"&&x.co&&x.co.length).length));
console.log(errs);await b.close()})()
