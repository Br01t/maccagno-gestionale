/* wire/riepilogo.js — Collegamenti: riepilogo. */
$("rs-y").onchange=rsRender;
$("rs-x").onclick=()=>$("rs").hidden=true;
$("rs").onclick=e=>{if(e.target===$("rs"))$("rs").hidden=true};
$("rs-p").onclick=()=>printOut(rsHtml($("rs-y").value),true);
$("rs-b").onclick=rsOpen;
