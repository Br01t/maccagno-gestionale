/* map/geometry.js — Geometria della mappa: poligoni, aree, lunghezze, punti in particella, rotazione. */
const ptcol=k=>PCOL[k]||"#5d6b7a";
const dflt=(o,f)=>new Proxy(o,{get:(q,k)=>k in q?q[k]:f});
const mig=a=>{(a||[]).forEach(o=>{const m=CAL[o.v];if(m&&o.p)o.p=o.p.map(r=>[+(m.c[0]+(r[0]-m.c[0])*m.f).toFixed(3),+(m.c[1]+(r[1]-m.c[1])*m.f).toFixed(3)])});return a};
function rpA(x,y,a){if(!a)return[x,y];const r=rd(a),c=Math.cos(r),s=Math.sin(r),dx=x-CC[0],dy=y-CC[1];return[CC[0]+dx*c-dy*s,CC[1]+dx*s+dy*c]}
const AT=()=>rot+((typeof cfg!=="undefined"&&cfg.tilt)||0),rp=(x,y)=>rpA(x,y,AT()),ipv=(x,y)=>rpA(x,y,-AT());
const ar=p=>Math.abs(p.reduce((s,q,i)=>{const n=p[(i+1)%p.length];return s+q[0]*n[1]-n[0]*q[1]},0)/2);
const d=p=>"M"+p.map(q=>q[0].toFixed(1)+" "+(-q[1]).toFixed(1)).join("L");
const len=p=>p.reduce((s,q,i)=>i?s+Math.hypot(q[0]-p[i-1][0],q[1]-p[i-1][1]):0,0);
const pip=(pt,p)=>{let c=false;for(let i=0,j=p.length-1;i<p.length;j=i++)if((p[i][1]>pt[1])!=(p[j][1]>pt[1])&&pt[0]<(p[j][0]-p[i][0])*(pt[1]-p[i][1])/(p[j][1]-p[i][1])+p[i][0])c=!c;return c};
const parcelOf=pt=>Object.keys(P).find(k=>pip(pt,P[k].p));
const vtag=pt=>view==="all"?(parcelOf(pt)||"all"):view;
const fo=()=>focus&&it.find(x=>x.id===focus&&x.t==="crop")||null;
const cen=p=>[p.reduce((s,q)=>s+q[0],0)/p.length,p.reduce((s,q)=>s+q[1],0)/p.length];
const TC=o=>["crop","zone","line","pt"].includes(o.t)?o.t:null,hx6=x=>/^#[0-9a-f]{6}$/i.test(x)?x:/^#[0-9a-f]{3}$/i.test(x)?"#"+x.slice(1).replace(/./g,m=>m+m):"#888888";
function pInPoly(p,poly){let c=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])c=!c}return c}
function polyOverlap(A,B){const xs=A.map(q=>q[0]),ys=A.map(q=>q[1]),x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);let n=0,m=0;for(let i=0;i<12;i++)for(let j=0;j<12;j++){const p=[x0+(x1-x0)*(i+.5)/12,y0+(y1-y0)*(j+.5)/12];if(pInPoly(p,A)){n++;if(pInPoly(p,B))m++}}return n?m/n:0}
