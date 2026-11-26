/* wire/agenda.js — Collegamenti: agenda. */
$("a-p").onclick=()=>{agM=new Date(agM.getFullYear(),agM.getMonth()-1,1);agenda()};
$("a-n").onclick=()=>{agM=new Date(agM.getFullYear(),agM.getMonth()+1,1);agenda()};
$("a-i").onclick=ics;
$("a-l").onchange=e=>{const i=e.target.dataset.a;if(i!=null){const x=AG[+i];ckSet(x.o,x.ck,e.target.checked);save()}};
$("a-l").onclick=e=>{const sp=e.target.closest("[data-o]");if(!sp)return;const x=AG[+sp.dataset.o];if(x.go){go(x.go);return}if(x.viv){openViv();return}if(x.o.t==="crop"){sel=it.indexOf(x.o);if(view!=="all"&&x.o.v!==view){view=x.o.v;fit();tabs()}}else sel="p:"+x.o.v;full=true;ptab="data";draw();panel()};
$("ag-sw").onclick=e=>{const b=e.target.closest("button");if(!b)return;agMode=b.dataset.m;try{localStorage.setItem("maccagno-agm",agMode)}catch(_){}agenda()};
$("a-s").onclick=e=>{const b=e.target.closest("[data-vv]");if(!b)return;vivFo=true;openViv();const i=$("v-sp");if(i){i.value=b.dataset.vv;i.dispatchEvent(new Event("input",{bubbles:true}));i.focus()}};
$("a-s").onchange=e=>{if(e.target.id==="st-m"){stMine=e.target.checked;try{localStorage.setItem("maccagno-mine",stMine?"1":"")}catch(_){}stagione()}};
