/* wire/tipi.js — Collegamenti: gestione tipi. */
$("mgo").onclick=()=>openMg($("tool").value);
$("kind").onchange=()=>{if($("kind").value==="__new"){openMg($("tool").value);$("kind").selectedIndex=0}};
