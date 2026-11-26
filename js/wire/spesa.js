/* wire/spesa.js — Eventi della lista della spesa, delle spese generali e del costo orario. */
const spSave=()=>{save();spForce=true;spesa();if(!$("p-oggi").hidden)oggi()};
const spFields=f=>{const v=k=>{const e=f.querySelector('[data-f="'+k+'"]');return e?e.value:""};return{n:v("n").trim(),q:+v("q")||0,u:v("u").trim()||"pz",up:v("up")===""?"":+v("up")||0,cat:v("cat")||"Altro",cid:v("cid"),note:v("note").trim()}};
$("sp-v").addEventListener("change",e=>{const t=e.target;
if(t.id==="sp-l"){spL=t.value;spEd=null;spForce=true;spesa();return}
if(t.dataset.ck){const x=it.find(o=>o.id===t.dataset.ck);if(!x)return;x.ck=t.checked;x.dt=t.checked?today():"";if(!t.checked)x.ac="";slSync(x);spSave();return}
if(t.dataset.ac){const x=it.find(o=>o.id===t.dataset.ac);if(!x)return;x.ac=t.value===""?"":Math.max(0,+t.value||0);slSync(x);spSave()}});
$("sp-v").addEventListener("click",async e=>{const b=e.target.closest("button");if(!b)return;const D=b.dataset,L=it.find(o=>o.id===spL);
if(b.id==="sp-nl"){$("sp-nlf").hidden=false;$("sp-nn").focus();return}
if(b.id==="sp-nno"){$("sp-nlf").hidden=true;return}
if(b.id==="sp-nok"){const n=$("sp-nn").value.trim();if(!n)return;const l={t:"sl",id:uid(),n,note:"",d:today(),v:"all",p:[]};it.push(l);spL=l.id;spSave();return}
if(b.id==="sp-rok"&&L){L.n=$("sp-rn").value.trim()||L.n;L.note=$("sp-rt").value.trim();spSave();return}
if(b.id==="sp-dup"&&L){const l={t:"sl",id:uid(),n:L.n+" (copia)",note:L.note||"",d:today(),v:"all",p:[]};it.push(l);slItems(L.id).forEach(x=>it.push(Object.assign({},x,{id:uid(),l:l.id,ck:false,dt:"",ac:""})));spL=l.id;spSave();return}
if(b.id==="sp-rst"&&L){slItems(L.id).filter(x=>x.ck).forEach(x=>{x.ck=false;x.dt="";x.ac="";slSync(x)});spSave();return}
if(b.id==="sp-dl"&&L){const I=slItems(L.id),n=I.filter(x=>x.ck&&slCost(x)>0).length;if(!await askConfirm("Eliminare la lista «"+L.n+"»?",I.length+" elementi."+(n?" Le "+n+" spese già registrate da questa lista verranno rimosse dai costi.":""),{ok:"Elimina",danger:true}))return;I.forEach(slDelItem);it=it.filter(o=>o!==L);spL="";spEd=null;spSave();return}
if(D.svi&&L){const f=b.closest("[data-form]"),v=spFields(f);if(!v.n){f.querySelector('[data-f="n"]').focus();return}
if(D.svi==="new"){const x=Object.assign({t:"si",id:uid(),l:L.id,ck:false,dt:"",ac:"",v:"all",p:[]},v);it.push(x)}
else{const x=it.find(o=>o.id===D.svi);if(!x)return;Object.assign(x,v);slSync(x)}spEd=null;spSave();return}
if(D.cn!==undefined){spEd=null;spForce=true;spesa();return}
if(D.ed){spEd=spEd===D.ed?null:D.ed;spForce=true;spesa();return}
if(D.del){const x=it.find(o=>o.id===D.del);if(!x)return;if(!await askConfirm("Eliminare «"+x.n+"»?",x.ck&&slCost(x)>0?"La spesa registrata verrà rimossa dai costi.":"",{ok:"Elimina",danger:true}))return;slDelItem(x);spSave();return}
if(b.id==="sg-a"){const n=$("sg-n").value.trim(),v=+$("sg-e").value;if(!n||!(v>0))return;it.push({t:"sp",id:uid(),d:$("sg-d").value||today(),n,e:v,cat:"",v:"all",p:[]});spSave();return}
if(D.dsg){const x=it.find(o=>o.id===D.dsg);if(!x)return;if(!await askConfirm("Eliminare la spesa «"+x.n+"»?",x.si?"Nella lista l'elemento resterà spuntato ma non conterà più nei costi.":"",{ok:"Elimina",danger:true}))return;if(x.si){const q=it.find(o=>o.id===x.si);if(q)q.ac=0}it=it.filter(o=>o!==x);spSave()}});
onMac("change",e=>{const t=e.target;if(t.id==="hr-r"){cfg.x=cfg.x||{};cfg.x.hr=Math.max(0,+t.value||0);cfgSave();prodList(true)}});
