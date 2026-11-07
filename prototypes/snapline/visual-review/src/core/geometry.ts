import type { Vec,Rect } from './types.js';

export const distance = (a: Vec,b: Vec): number => Math.hypot(a.x-b.x,a.y-b.y);
export const clamp = (n:number,min:number,max:number):number=>Math.max(min,Math.min(max,n));
export const lerpPoint=(a:Vec,b:Vec,t:number):Vec=>({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t});
export const isValidVec=(p:Vec):boolean=>Number.isFinite(p.x)&&Number.isFinite(p.y);

/** Distance along connected segments; no curve smoothing or hidden alteration. */
export function lengthOf(points:readonly Vec[]):number{
  let sum=0;
  for(let i=1;i<points.length;i++) sum+=distance(points[i-1]!,points[i]!);
  return sum;
}
export function pointAtDistance(points:readonly Vec[],d:number):Vec{
  if(!points.length) throw new Error('empty route');
  if(points.length===1 || d<=0)return {...points[0]!};
  let left=d;
  for(let i=1;i<points.length;i++){
    const a=points[i-1]!,b=points[i]!,len=distance(a,b);
    if(len===0)continue;
    if(left<=len) return lerpPoint(a,b,clamp(left/len,0,1));
    left-=len;
  }
  return {...points[points.length-1]!};
}

/** Exact segment-vs-inflated AABB (swept circle). Edges count as collision. */
export function segmentHitsRect(a:Vec,b:Vec,rect:Rect,radius=0):boolean{
  const loX=rect.x-radius,hiX=rect.x+rect.w+radius;
  const loY=rect.y-radius,hiY=rect.y+rect.h+radius;
  const dx=b.x-a.x,dy=b.y-a.y;
  let t0=0,t1=1;
  const pairs:[number,number][]=[[-dx,a.x-loX],[dx,hiX-a.x],[-dy,a.y-loY],[dy,hiY-a.y]];
  for(const [p,q] of pairs){
    if(Math.abs(p)<1e-12){if(q<0)return false;continue;}
    const t=q/p;
    if(p<0){t0=Math.max(t0,t)} else {t1=Math.min(t1,t)}
    if(t0>t1)return false;
  }
  return t0<=t1;
}
/** Squared distance of segment from stationary circle centre. */
export function pointSegmentDistanceSq(c:Vec,a:Vec,b:Vec):number{
  const dx=b.x-a.x,dy=b.y-a.y,lenSq=dx*dx+dy*dy;
  const t=lenSq>0?clamp(((c.x-a.x)*dx+(c.y-a.y)*dy)/lenSq,0,1):0;
  const x=a.x+dx*t-c.x,y=a.y+dy*t-c.y;
  return x*x+y*y;
}
/** Moving circle swept in relative coordinates against runner segment. */
export function movingCircleHitsSegment(
  runnerFrom:Vec,runnerTo:Vec,
  centreFrom:Vec,centreTo:Vec,
  combinedRadius:number
):boolean{
  const a={x:runnerFrom.x-centreFrom.x,y:runnerFrom.y-centreFrom.y};
  const b={x:runnerTo.x-centreTo.x,y:runnerTo.y-centreTo.y};
  return pointSegmentDistanceSq({x:0,y:0},a,b)<=combinedRadius*combinedRadius;
}
