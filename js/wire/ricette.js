/* wire/ricette.js — Collegamenti: ricette. */
$("rc-v").onclick=async e=>{const b=e.target.closest("button");if(!b)return;const D=b.dataset;
if(b.id==="rc-new"){rcEd={n:"",ing:[{n:"",p:"",x:false}],note:""};ricette();return}
if(D.rp){const r=it.find(x=>x.id===D.rp);rcPr={id:D.rp,g:500,d:today(),x:addD(today(),365)};ricette();return}
if(D.re){const r=it.find(x=>x.id===D.re);if(r){rcEd=JSON.parse(JSON.stringify({id:r.id,n:r.n,ing:r.ing,note:r.note||""}));ricette()}return}
if(D.rd){const r=it.find(x=>x.id===D.rd);if(r&&await askConfirm("Eliminare la ricetta?","«"+r.n+"» verrà eliminata. I lotti già prodotti restano nel magazzino.",{ok:"Elimina",danger:1})){it.splice(it.indexOf(r),1);save()}return}
if(b.id==="re-a"){rcRead();rcEd.ing.push({n:"",p:"",x:false});ricette();return}
if(D.rx!=null){rcRead();rcEd.ing.splice(+D.rx,1);if(!rcEd.ing.length)rcEd.ing.push({n:"",p:"",x:false});ricette();return}
if(b.id==="re-c"){rcEd=null;ricette();return}
if(b.id==="re-s"){rcRead();const ing=rcEd.ing.filter(i=>i.n.trim()&&+i.p>0).map(i=>({n:i.n.trim(),p:+i.p,x:!!i.x}));if(!rcEd.n.trim()||!ing.length){alert("Servono un nome e almeno un ingrediente con le parti.");return}if(rcEd.id){const r=it.find(x=>x.id===rcEd.id);if(r){r.n=rcEd.n.trim();r.ing=ing;r.note=rcEd.note}}else it.push({t:"rc",id:uid(),v:"all",p:[],n:rcEd.n.trim(),ing,note:rcEd.note});rcEd=null;save();return}
if(b.id==="rp-c"){rcPr=null;ricette();return}
if(b.id==="rp-ok"){const r=it.find(x=>x.id===rcPr.id),g=+$("rp-g").value,d=$("rp-d").value||today(),x=$("rp-x").value;const code=rcMake(r,g,d,x);if(code){rcPr=null;save();go("st")}}};
$("rc-v").oninput=e=>{if(e.target.id==="rp-g"||e.target.id==="rp-d"||e.target.id==="rp-x"){if(rcPr){rcPr.g=+$("rp-g").value;rcPr.d=$("rp-d").value;rcPr.x=$("rp-x").value}if(e.target.id==="rp-g")rpTable()}};
