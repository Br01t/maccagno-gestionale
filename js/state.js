/* state.js — Stato dell'applicazione (variabili condivise) e valori iniziali. */
var mode="map";
try{mode=localStorage.getItem("maccagno-mode")==="gest"?"gest":"map"}catch(_){}
const NG=["pn","log","lot","hv","nv","rc","pe","pd","sl","si","sp"];
let it=[],cur=[],vb={x:0,y:0,w:130,h:150},view="all";
const all=Object.values(P).flatMap(p=>p.p);
const bx=[Math.min(...all.map(p=>p[0])),Math.max(...all.map(p=>p[0]))],by=[Math.min(...all.map(p=>p[1])),Math.max(...all.map(p=>p[1]))];
let FW=130;
const ZMIN=6;
let rot=0;
const rd=d=>d*Math.PI/180,CC=[(bx[0]+bx[1])/2,-(by[0]+by[1])/2];
let ra=0;
let sel=null;
const hid={},LAY={crop:"Colture",zone:"Zone",line:"Linee",slope:"Pendenze",pt:"Punti",note:"Note"};
let focus=null,fprev=null;
let full=false,ptab="data";
let agM=new Date(new Date().getFullYear(),new Date().getMonth(),1),AG=[],LS=[],DL=[];
let season="all";
try{season=localStorage.getItem("maccagno-season")||"all"}catch(_){}
let OG=[];
let trOpen=null,trHi=null,placing=null;
const SNK="maccagno-snaps";
let snapT=-1;
const PANES=["oggi","draw","aree","prod","ag","di","st","sp"],MODEOF={draw:"map",aree:"map",oggi:"gest",prod:"gest",ag:"gest",di:"gest",st:"gest",sp:"gest"},MTABS={map:["draw","aree"],gest:["oggi","prod","ag","di","st","sp"]},TNM={oggi:"Oggi",draw:"Disegna",aree:"Aree",prod:"Produzione",ag:"Agenda",di:"Diario",st:"Magazzino",sp:"Spesa"},LASTP={map:"draw",gest:"oggi"};
let pl=it.filter(o=>!NG.includes(o.t)).length,added=0;
$("zr").onclick=()=>{fit();draw()};
let vivOn=false,vivTr=null,vivMsg="",vivFo=null;
let mgT="crop";
let spL="",spEd=null,spForce=false;
let agMode="ev",stMine=false;
try{agMode=localStorage.getItem("maccagno-agm")||"ev";stMine=localStorage.getItem("maccagno-mine")==="1"}catch(_){}
const STL={sv:["Semina in vivaio","Al coperto, a Milano (vaschette, davanzale, luce)"],tr:["Trapianto a Maccagno","Piantine pronte, fuori dopo le ultime gelate"],sd:["Semina diretta","Direttamente in terra"],ra:["Raccolta","Periodo di raccolta"]};
let prMode="mac",rcEd=null,rcPr=null;
try{prMode=localStorage.getItem("maccagno-prm")||"mac"}catch(_){}
let LB={k:"lot",L:[]};
let GSA=[];
let colOpen=new Set(),colEmpty=false,colDirty=false,colMsg="";
var mgO=null,mgDirty=false;
const cfg={tilt:0,add:{crop:{},zone:{},line:{},pt:{}},hide:{crop:[],zone:[],line:[],pt:[]},x:{grp:{},gl:null,kr:{},sp:{},sph:[]}},TAB={crop:CROPS,zone:ZONES,line:LINES,pt:PTS};
const APPV="v54",SS={mode:"local",who:"",lastUp:0,lastDown:0,err:"",size:0,note:""};
const DEV=uid();
let adopting=false,liveOK=true,ref=null,pushing=false,tm=null,remRev=0,crev=+(lsg(KEY+"-rev")||0),dirty=!!lsg(KEY+"-dirty");
let crev0=0;
let fh=null;
const FT={types:[{description:"Dati della mappa",accept:{"application/json":[".json"]}}]};
