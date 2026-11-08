import type {Run,Vec} from '../core/types.js';
import {BOARD_WIDTH,BOARD_HEIGHT} from '../game/courses.js';

/** A visual-only viscous wake. The stable world-space runner and hitboxes never change. */
export interface SlimeTrail {readonly x:number;readonly y:number;readonly dx:number;readonly dy:number;readonly strength:number;readonly age:number}
export interface SlimePulse {readonly x:number;readonly y:number;readonly age:number;readonly power:number}
const clamp=(x:number,a:number,b:number)=>Math.max(a,Math.min(b,x));
const DT=1/60;
const MAX_TRAIL=54;
export class SlimeField {
  readonly trails:SlimeTrail[]=[];
  readonly pulses:SlimePulse[]=[];
  private previous:Vec|null=null;
  private previousDirection:Vec|null=null;
  private lastTick=-1;
  private lastPhase:string|null=null;
  private lastCourse:string|null=null;
  private traveledSinceDeposit=0;
  time=0;
  deposits=0;
  traveled=0;
  reset():void{
    this.trails.length=0;this.pulses.length=0;
    this.previous=null;this.previousDirection=null;this.lastTick=-1;this.lastPhase=null;
    this.lastCourse=null;this.traveledSinceDeposit=0;this.time=0;this.deposits=0;this.traveled=0;
  }
  /** Observe authoritative movement only once per run tick; pauses do not create artificial force. */
  observeRunner(run:Run|null):void{
    if(!run){this.previous=null;this.lastTick=-1;this.lastPhase=null;this.previousDirection=null;return;}
    if(run.courseId!==this.lastCourse||run.ticks<this.lastTick){
      this.reset();this.lastCourse=run.courseId;
    }
    const previous=this.previous;
    if(previous&&run.ticks!==this.lastTick){
      const dx=run.position.x-previous.x,dy=run.position.y-previous.y;
      const d=Math.hypot(dx,dy);
      if(d>.05&&d<40){
        const dir={x:dx/d,y:dy/d};
        const turn=this.previousDirection?clamp(1-(dir.x*this.previousDirection.x+dir.y*this.previousDirection.y),0,2):0;
        this.traveled+=d;
        this.traveledSinceDeposit+=d;
        // The wake is deposited in space, not bound to the player's finger position.
        // At least one control point every 6 world units; a turn leaves a stronger slug.
        if(this.traveledSinceDeposit>=5.5||turn>.22){
          const power=clamp(.7+d*.12+turn*.9,.65,2.8);
          this.trails.push({x:run.position.x,y:run.position.y,dx:dir.x,dy:dir.y,strength:power,age:0});
          if(this.trails.length>MAX_TRAIL)this.trails.shift();
          this.deposits++;this.traveledSinceDeposit=0;
        }
        if(turn>.26)this.pushPulse(run.position,clamp(.6+turn*.9,.6,2.6));
        this.previousDirection=dir;
      }
    }
    if(run.phase==='lost'&&this.lastPhase!=='lost')this.pushPulse(run.position,3.6);
    this.previous={...run.position};this.lastTick=run.ticks;this.lastPhase=run.phase;
  }
  pushPulse(at:Vec,power:number):void{
    this.pulses.push({x:at.x,y:at.y,age:0,power:clamp(power,0,4)});
    if(this.pulses.length>9)this.pulses.shift();
  }
  /** Viscosity: wake drifts slowly and loses elasticity over ~2.5s. */
  step():void{
    this.time+=DT;
    for(let i=this.trails.length-1;i>=0;i--){
      const t=this.trails[i]!,age=t.age+DT;
      if(age>=2.4)this.trails.splice(i,1);
      else this.trails[i]={...t,age};
    }
    for(let i=this.pulses.length-1;i>=0;i--){
      const t=this.pulses[i]!,age=t.age+DT;
      if(age>=1.3)this.pulses.splice(i,1);
      else this.pulses[i]={...t,age};
    }
  }
  /** 0 at rest and finite for every bounded input. */
  energy():number{
    let energy=0;
    for(const t of this.trails)energy+=t.strength*Math.pow(1-t.age/2.4,2);
    for(const p of this.pulses)energy+=p.power*Math.pow(1-p.age/1.3,2);
    return energy;
  }
  /** Attractive contact-lens displacement for the colored substrate, never a hitbox change. */
  displacement(x:number,y:number):Vec{
    let dx=0,dy=0;
    for(const t of this.trails){
      const d2=(x-t.x)**2+(y-t.y)**2;
      if(d2>70*70)continue;
      const decay=(1-t.age/2.4)**2;
      const w=Math.exp(-d2/(2*25*25))*decay*t.strength;
      dx+=t.dx*w*5.2;dy+=t.dy*w*5.2;
    }
    return {x:clamp(dx,-18,18),y:clamp(dy,-18,18)};
  }
  snapshot(){return {energy:Number(this.energy().toFixed(3)),deposits:this.deposits,traveled:Number(this.traveled.toFixed(2)),trails:this.trails.length,pulses:this.pulses.length,tick:Math.round(this.time*60)};}
}

/** The thick wake flows behind the real runner; color layering implies translucent slime. */
export function drawSlimeBackground(ctx:CanvasRenderingContext2D,slime:SlimeField|null):void{
  const base=ctx.createLinearGradient(30,0,335,640);
  base.addColorStop(0,'#0a2830');base.addColorStop(.52,'#103b38');base.addColorStop(1,'#09262c');
  ctx.fillStyle=base;ctx.fillRect(0,0,BOARD_WIDTH,BOARD_HEIGHT);
  const glow=ctx.createRadialGradient(250,230,15,192,305,410);
  glow.addColorStop(0,'#6fdb9c2c');glow.addColorStop(.7,'#2ea98914');glow.addColorStop(1,'#0b242c00');
  ctx.fillStyle=glow;ctx.fillRect(0,0,BOARD_WIDTH,BOARD_HEIGHT);
  ctx.save();
  // Viscous surface lines sag behind movement: field sampling never touches collision geometry.
  ctx.lineCap='round';ctx.lineJoin='round';
  for(let y=22,idx=0;y<=605;y+=29,idx++){
    ctx.beginPath();
    for(let x=0;x<=360;x+=12){
      const d=slime?.displacement(x,y)??{x:0,y:0};
      if(x===0)ctx.moveTo(x+d.x*.75,y+d.y*.6);else ctx.lineTo(x+d.x*.75,y+d.y*.6);
    }
    ctx.strokeStyle=idx%4===0?'#bbfdbb32':'#90e9be15';
    ctx.lineWidth=idx%4===0?2.0:1.0;ctx.stroke();
  }
  for(let x=22,i=0;x<360;x+=35,i++){
    ctx.beginPath();
    for(let y=0;y<=640;y+=13){
      const d=slime?.displacement(x,y)??{x:0,y:0};
      if(y===0)ctx.moveTo(x+d.x*.7,y+d.y*.7);else ctx.lineTo(x+d.x*.7,y+d.y*.7);
    }
    ctx.strokeStyle=i%3===0?'#c0ffc026':'#91eec010';ctx.lineWidth=i%3===0?1.2:.7;ctx.stroke();
  }
  // Directionally stretched gelatin slugs with bright wet edges and matte centers.
  for(const trail of slime?.trails??[]){
    const fade=Math.pow(1-trail.age/2.4,1.45);
    const width=12+trail.strength*5;
    const length=19+trail.strength*11;
    const angle=Math.atan2(trail.dy,trail.dx);
    ctx.save();ctx.translate(trail.x,trail.y);ctx.rotate(angle);
    ctx.beginPath();ctx.ellipse(-length*.44,0,length,width*.93,0,0,Math.PI*2);
    ctx.fillStyle=`rgba(62,174,111,${(.15*fade).toFixed(4)})`;ctx.fill();
    ctx.strokeStyle=`rgba(159,255,179,${(.42*fade).toFixed(4)})`;
    ctx.lineWidth=2.1;ctx.stroke();
    ctx.beginPath();ctx.ellipse(-length*.4,-width*.38,length*.69,width*.27,-.11,Math.PI*.97,Math.PI*1.85);
    ctx.strokeStyle=`rgba(220,255,212,${(.53*fade).toFixed(4)})`;ctx.lineWidth=1.4;ctx.stroke();
    ctx.restore();
  }
  for(const pulse of slime?.pulses??[]){
    const fade=Math.pow(1-pulse.age/1.3,2),radius=10+pulse.age*55;
    ctx.beginPath();ctx.ellipse(pulse.x,pulse.y,radius*1.18,radius*.78,0,0,Math.PI*2);
    ctx.lineWidth=2.5*fade+1;ctx.strokeStyle=`rgba(186,255,177,${(.4*fade).toFixed(4)})`;ctx.stroke();
  }
  // Slow pooled lens at the edges, restrained enough not to hide wall outlines.
  ctx.beginPath();ctx.moveTo(-40,135);ctx.bezierCurveTo(80,75,175,130,402,40);
  ctx.lineWidth=18;ctx.strokeStyle='#9bf5a515';ctx.stroke();
  ctx.beginPath();ctx.moveTo(-30,597);ctx.bezierCurveTo(118,528,234,657,401,555);
  ctx.lineWidth=31;ctx.strokeStyle='#c0f5af17';ctx.stroke();
  ctx.restore();
}
