import type {Run,Vec} from '../core/types.js';
import {BOARD_HEIGHT,BOARD_WIDTH} from '../game/courses.js';

/** A visual-only damped spring lattice. It never affects the authoritative collision engine. */
export type BoardMaterial='pulse'|'jelly'|'slime';
export interface GelRipple {readonly x:number;readonly y:number;readonly age:number;readonly force:number;readonly angle:number}
const NX=19, NY=33, SPACING=20;
const clamp=(v:number,min:number,max:number)=>Math.min(max,Math.max(min,v));
const dist=(a:Vec,b:Vec)=>Math.hypot(a.x-b.x,a.y-b.y);
export class JellyField {
  readonly columns=NX;
  readonly rows=NY;
  readonly height=new Float32Array(NX*NY);
  private readonly motion=new Float32Array(NX*NY);
  readonly ripples:GelRipple[]=[];
  private previous:Vec|null=null;
  private lastTick=-1;
  private lastPhase:string|null=null;
  private lastCourse:string|null=null;
  private lastDirection:Vec|null=null;
  private sinceRipple=0;
  private clock=0;
  impulseCount=0;
  traveled=0;
  reset():void{
    this.height.fill(0);this.motion.fill(0);this.ripples.length=0;
    this.previous=null;this.lastTick=-1;this.lastPhase=null;this.lastCourse=null;
    this.lastDirection=null;this.sinceRipple=0;this.clock=0;this.impulseCount=0;this.traveled=0;
  }
  /** Reacts only to simulated runner movement, not touch or mouse coordinates. */
  observeRunner(run:Run|null):void{
    if(!run){this.previous=null;this.lastTick=-1;this.lastPhase=null;this.lastDirection=null;return;}
    if(this.lastCourse!==run.courseId||run.ticks<this.lastTick){
      this.reset();this.lastCourse=run.courseId;
    }
    const previous=this.previous;
    if(previous&&run.ticks!==this.lastTick){
      const traveled=dist(previous,run.position);
      if(traveled>.05&&traveled<40){
        this.traveled+=traveled;this.sinceRipple+=traveled;
        const direction={x:(run.position.x-previous.x)/traveled,y:(run.position.y-previous.y)/traveled};
        const turn=this.lastDirection?1-clamp(direction.x*this.lastDirection.x+direction.y*this.lastDirection.y,-1,1):0;
        this.kick(run.position,clamp(1.2+traveled*.9,1.4,5.4));
        if(turn>.08)this.kick(run.position,clamp(2+turn*5,2,8));
        if(this.sinceRipple>=13||turn>.16){
          this.ripples.push({x:run.position.x,y:run.position.y,age:0,force:clamp(1.3+turn*.7,1.3,2.5),angle:Math.atan2(direction.y,direction.x)});
          if(this.ripples.length>20)this.ripples.shift();
          this.sinceRipple=0;
        }
        this.lastDirection=direction;
      }
    }
    if(run.phase==='lost'&&this.lastPhase!=='lost'){
      this.kick(run.position,12);
      this.ripples.push({x:run.position.x,y:run.position.y,age:0,force:3.7,angle:0});
    }
    this.previous={...run.position};this.lastTick=run.ticks;this.lastPhase=run.phase;
  }
  /** Gaussian force localized to the moving runner; does not move any world-space hitboxes. */
  kick(at:Vec,force:number):void{
    for(let iy=0;iy<NY;iy++)for(let ix=0;ix<NX;ix++){
      const dx=ix*SPACING-at.x,dy=iy*SPACING-at.y;
      const radius2=dx*dx+dy*dy;
      if(radius2>90*90)continue;
      const i=iy*NX+ix;
      this.motion[i]=clamp(this.motion[i]!-force*Math.exp(-radius2/(2*34*34))*.50,-8,8);
    }
    this.impulseCount++;
  }
  /** One fixed 60Hz visual tick; bounded for stability even after backgrounding. */
  step():void{
    this.clock++;
    const before=this.height,velocity=this.motion;
    for(let y=1;y<NY-1;y++)for(let x=1;x<NX-1;x++){
      const i=y*NX+x;
      const lap=before[i-1]!+before[i+1]!+before[i-NX]!+before[i+NX]!-4*before[i]!;
      velocity[i]=clamp((velocity[i]!+lap*.17-before[i]!*.018)*.965,-9,9);
    }
    for(let y=1;y<NY-1;y++)for(let x=1;x<NX-1;x++){
      const i=y*NX+x;before[i]=clamp(before[i]!+velocity[i]!, -19,19);
    }
    for(let i=this.ripples.length-1;i>=0;i--){
      const r=this.ripples[i]!;const age=r.age+1/60;
      if(age>=1.18)this.ripples.splice(i,1);else this.ripples[i]={...r,age};
    }
  }
  /** Smooth height sampling for the deformed sheen/ridges. */
  sample(x:number,y:number):number{
    const gx=clamp(x/SPACING,0,NX-1.001),gy=clamp(y/SPACING,0,NY-1.001);
    const ix=Math.floor(gx),iy=Math.floor(gy),fx=gx-ix,fy=gy-iy;
    const a=this.height[iy*NX+ix]!,b=this.height[iy*NX+ix+1]!;
    const c=this.height[(iy+1)*NX+ix]!,d=this.height[(iy+1)*NX+ix+1]!;
    return (a*(1-fx)+b*fx)*(1-fy)+(c*(1-fx)+d*fx)*fy;
  }
  energy():number{let n=0;for(const h of this.height)n+=Math.abs(h);for(const v of this.motion)n+=Math.abs(v);return n;}
  snapshot(){return {energy:Number(this.energy().toFixed(3)),impulseCount:this.impulseCount,traveled:Number(this.traveled.toFixed(2)),waves:this.ripples.length,tick:this.clock};}
}

export function drawJellyBackground(ctx:CanvasRenderingContext2D,jelly:JellyField|null):void{
  // All physics/route obstacles are painted above this layer in authoritative world coordinates.
  const base=ctx.createLinearGradient(10,0,350,640);
  base.addColorStop(0,'#102839');base.addColorStop(.52,'#103946');base.addColorStop(1,'#082434');
  ctx.fillStyle=base;ctx.fillRect(0,0,BOARD_WIDTH,BOARD_HEIGHT);
  const pooled=ctx.createRadialGradient(273,105,8,190,270,460);
  pooled.addColorStop(0,'#4ecbba30');pooled.addColorStop(.53,'#2a9d9720');pooled.addColorStop(1,'#0b1e2b08');
  ctx.fillStyle=pooled;ctx.fillRect(0,0,BOARD_WIDTH,BOARD_HEIGHT);
  // Fixed translucent material is present even before a run; movement deforms these actual curves.
  const sample=(x:number,y:number)=>jelly?.sample(x,y)??0;
  ctx.save();ctx.lineCap='round';ctx.lineJoin='round';
  for(let iy=0;iy<28;iy++){
    const y=18+iy*23;ctx.beginPath();
    for(let x=0;x<=360;x+=9){
      const shift=sample(x,y), yy=y+shift*1.16;
      if(x===0)ctx.moveTo(x,yy);else ctx.lineTo(x,yy);
    }
    ctx.lineWidth=iy%5===0?5.2:2.0;
    ctx.strokeStyle=iy%5===0?'#65ffe018':'#7dfff010';ctx.stroke();
    ctx.lineWidth=iy%5===0?1.65:.77;ctx.strokeStyle=iy%5===0?'#a3fff04a':'#83ede529';ctx.stroke();
  }
  for(let ix=1;ix<13;ix++){
    const x=ix*28;ctx.beginPath();
    for(let y=0;y<=640;y+=11){
      const shift=sample(x,y),xx=x-shift*.65;
      if(y===0)ctx.moveTo(xx,y);else ctx.lineTo(xx,y);
    }
    ctx.strokeStyle=ix%3===0?'#73e9db28':'#4fc5c014';ctx.lineWidth=ix%3===0?1.1:.7;ctx.stroke();
  }
  // A tiny set of expanding anisotropic waves: direction and energy derive from runner travel.
  for(const r of jelly?.ripples??[]){
    const t=r.age/1.18,fade=(1-t)*(1-t),radius=10+r.age*77;
    ctx.save();ctx.translate(r.x,r.y);ctx.rotate(r.angle);
    ctx.beginPath();ctx.ellipse(0,0,radius*(1+r.force*.08),radius*.74,0,0,Math.PI*2);
    ctx.strokeStyle=`rgba(134,255,232,${Math.min(.62,fade*.3*r.force)})`;
    ctx.lineWidth=1.5+fade*2.8;ctx.stroke();
    ctx.beginPath();ctx.ellipse(0,0,radius*.68,radius*.5,0,0,Math.PI*2);
    ctx.strokeStyle=`rgba(86,242,218,${fade*.18})`;ctx.lineWidth=5;ctx.stroke();ctx.restore();
  }
  // The pool has layered reflective edge lenses rather than procedural noise obscuring the route.
  ctx.beginPath();ctx.moveTo(-20,100);ctx.bezierCurveTo(80,38,180,76,380,0);
  ctx.strokeStyle='#b4fff024';ctx.lineWidth=13;ctx.stroke();
  ctx.beginPath();ctx.moveTo(-35,594);ctx.bezierCurveTo(100,560,236,625,383,536);
  ctx.strokeStyle='#4be2cd25';ctx.lineWidth=25;ctx.stroke();
  ctx.restore();
}
