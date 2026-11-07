import type {Course,Rect,Run,Vec,Route} from '../core/types.js';
import {hazardPosition,BOARD_WIDTH,BOARD_HEIGHT,RUNNER_RADIUS} from '../game/courses.js';

export interface VisualState {
  course:Course;draft:readonly Vec[];route:Route|null;run:Run|null;
  inkUsed:number;invalid:boolean;drawing:boolean;
  snap?:{anchor:Vec;original:Vec;lead:Vec;tail:Vec;preview:Route|null;valid:boolean};
}
type ThemeKey='pulse'|'ink'|'micro';
interface Palette{bg:string;grid:string;major:string;ink:string;inkSoft:string;wall:string;edge:string;text:string;muted:string;mint:string;accent:string;moving:string;runner:string;barBack:string}
const PAL:Record<ThemeKey,Palette>={
  pulse:{bg:'#0e1c2b',grid:'#193449',major:'#29485c',ink:'#71f3da',inkSoft:'#71f3da33',wall:'#344353',edge:'#f9957c',text:'#e9fbfa',muted:'#809aad',mint:'#72f3d8',accent:'#f9957c',moving:'#ffc47d',runner:'#eaffff',barBack:'#284152'},
  ink:{bg:'#f5e9d5',grid:'#decfb8',major:'#d4bda3',ink:'#19796d',inkSoft:'#19796d33',wall:'#e8ac8d',edge:'#ae5d49',text:'#403b36',muted:'#927f73',mint:'#19796d',accent:'#d66d47',moving:'#a36b8d',runner:'#fff9e7',barBack:'#dfcbb1'},
  micro:{bg:'#d9d7ff',grid:'#cbc6f2',major:'#b3abeb',ink:'#584bda',inkSoft:'#584bda36',wall:'#f7a7c1',edge:'#ba5a91',text:'#373171',muted:'#857bb5',mint:'#584bda',accent:'#ed6f94',moving:'#f9b936',runner:'#fff9fe',barBack:'#bbb3ee'}
};
const rr=(ctx:CanvasRenderingContext2D,x:number,y:number,w:number,h:number,r:number)=>{ctx.beginPath();ctx.roundRect(x,y,w,h,r)};
const stroke=(ctx:CanvasRenderingContext2D,pts:readonly Vec[],color:string,width:number)=>{
  if(pts.length<2)return;ctx.beginPath();ctx.moveTo(pts[0]!.x,pts[0]!.y);
  for(let i=1;i<pts.length;i++)ctx.lineTo(pts[i]!.x,pts[i]!.y);
  ctx.lineCap='round';ctx.lineJoin='round';ctx.lineWidth=width;ctx.strokeStyle=color;ctx.stroke();
};
function dot(ctx:CanvasRenderingContext2D,p:Vec,r:number,color:string){ctx.beginPath();ctx.arc(p.x,p.y,r,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();}
function themeKey():ThemeKey{const t=document.body.dataset.theme;return t==='ink'||t==='micro'?t:'pulse'}
function drawBackground(ctx:CanvasRenderingContext2D,theme:ThemeKey,p:Palette){
  ctx.fillStyle=p.bg;ctx.fillRect(0,0,BOARD_WIDTH,BOARD_HEIGHT);
  if(theme==='pulse'){
    let g=ctx.createRadialGradient(306,85,8,180,335,470);g.addColorStop(0,'#183653');g.addColorStop(1,p.bg);ctx.fillStyle=g;ctx.fillRect(0,0,BOARD_WIDTH,BOARD_HEIGHT);
    for(let x=0;x<=360;x+=24){ctx.strokeStyle=x%96===0?p.major:p.grid;ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,640);ctx.stroke()}
    for(let y=0;y<=640;y+=24){ctx.strokeStyle=y%96===0?p.major:p.grid;ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(360,y);ctx.stroke()}
    for(const [x,y] of ([[305,140],[44,192],[285,472],[74,482],[322,304]] as [number,number][])){dot(ctx,{x,y},1.6,'#75e9d650')}
  }else if(theme==='ink'){
    // Paper-like grain is deterministic; strokes stay registered to hitbox geometry.
    for(let x=12;x<360;x+=22)for(let y=15;y<640;y+=22){dot(ctx,{x,y},.7,(x+y)%3===0?'#a18a7155':'#c9ac8b5a')}
    for(let y=55;y<600;y+=55){ctx.strokeStyle='#d8bf9e44';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(13,y);ctx.lineTo(345,y);ctx.stroke()}
    ctx.strokeStyle='#c36d5048';ctx.lineWidth=1.7;ctx.setLineDash([4,8]);ctx.strokeRect(12,66,336,512);ctx.setLineDash([]);
  }else{
    let g=ctx.createLinearGradient(0,0,360,640);g.addColorStop(0,'#e8e7ff');g.addColorStop(1,'#d0cafa');ctx.fillStyle=g;ctx.fillRect(0,0,360,640);
    for(let y=54;y<610;y+=58)for(let x=27;x<360;x+=60){dot(ctx,{x,y},2.2,'#c4bff2')}
    ctx.strokeStyle='#bab0eb80';ctx.lineWidth=1.3;ctx.setLineDash([5,9]);for(let y=85;y<550;y+=116){ctx.beginPath();ctx.moveTo(20,y);ctx.lineTo(340,y);ctx.stroke()}ctx.setLineDash([]);
  }
}
function drawWall(ctx:CanvasRenderingContext2D,r:Rect,theme:ThemeKey,p:Palette){
  ctx.save();
  if(theme==='pulse'){
    rr(ctx,r.x,r.y,r.w,r.h,8);ctx.fillStyle=p.wall;ctx.fill();ctx.strokeStyle=p.edge;ctx.lineWidth=2;ctx.stroke();
    ctx.beginPath();ctx.rect(r.x,r.y,r.w,r.h);ctx.clip();
    ctx.strokeStyle='#f9957c30';ctx.lineWidth=2;for(let x=r.x-r.h;x<r.x+r.w+r.h;x+=16){ctx.beginPath();ctx.moveTo(x,r.y+r.h);ctx.lineTo(x+r.h,r.y);ctx.stroke()}
    ctx.fillStyle='#ffd9cc';ctx.globalAlpha=.75;ctx.fillRect(r.x+10,r.y+9,22,3);ctx.globalAlpha=1;
  }else if(theme==='ink'){
    rr(ctx,r.x,r.y,r.w,r.h,7);ctx.fillStyle=p.wall;ctx.fill();ctx.strokeStyle=p.edge;ctx.lineWidth=2.7;ctx.stroke();
    ctx.strokeStyle='#fff2d773';ctx.lineWidth=1.6;
    for(let y=r.y+10;y<r.y+r.h-7;y+=13){ctx.beginPath();ctx.moveTo(r.x+8,y);ctx.lineTo(r.x+r.w-8,y-3);ctx.stroke()}
  }else{
    rr(ctx,r.x,r.y,r.w,r.h,14);ctx.fillStyle=p.wall;ctx.fill();ctx.strokeStyle=p.edge;ctx.lineWidth=2.6;ctx.stroke();
    rr(ctx,r.x+7,r.y+6,r.w-14,Math.max(5,r.h*.20),7);ctx.fillStyle='#fff7ff86';ctx.fill();
    for(let x=r.x+18;x<r.x+r.w-8;x+=33){dot(ctx,{x,y:r.y+r.h-13},3.5,'#d47ca1')}
  }
  ctx.restore();
}
function drawTerminal(ctx:CanvasRenderingContext2D,p:Vec,r:number,color:string,letter:string,theme:ThemeKey,pal:Palette){
  ctx.save();if(theme==='pulse'){ctx.shadowColor=color;ctx.shadowBlur=15}
  ctx.beginPath();ctx.arc(p.x,p.y,r,0,Math.PI*2);ctx.fillStyle=theme==='ink'?'#fffaf0':theme==='micro'?'#fffafd':'#12263b';ctx.fill();ctx.shadowBlur=0;
  ctx.strokeStyle=color;ctx.lineWidth=theme==='micro'?4:2.8;ctx.stroke();
  if(theme==='micro'){ctx.beginPath();ctx.arc(p.x,p.y,r-5,0,Math.PI*2);ctx.strokeStyle='#ffffff9c';ctx.lineWidth=1.5;ctx.stroke()}
  ctx.font=theme==='ink'?'bold 13px Georgia,serif':'900 11px system-ui';ctx.fillStyle=theme==='ink'?pal.text:color;ctx.textBaseline='middle';ctx.textAlign='center';ctx.fillText(letter,p.x,p.y+.5);ctx.restore();
}
function drawMoving(ctx:CanvasRenderingContext2D,s:VisualState,theme:ThemeKey,p:Palette){
  const elapsed=s.run?s.run.ticks/120:0;
  for(const h of s.course.moving){
    const a=h.axis==='y'?{x:h.center.x,y:h.center.y-h.amplitude}:{x:h.center.x-h.amplitude,y:h.center.y};
    const b=h.axis==='y'?{x:h.center.x,y:h.center.y+h.amplitude}:{x:h.center.x+h.amplitude,y:h.center.y};
    ctx.setLineDash(theme==='ink'?[2,8]:[5,8]);stroke(ctx,[a,b],p.moving+'88',2);ctx.setLineDash([]);
    const pos=hazardPosition(h,elapsed);ctx.beginPath();ctx.arc(pos.x,pos.y,h.radius,0,Math.PI*2);ctx.fillStyle=theme==='pulse'?'#ffc47d42':theme==='ink'?'#a36b8d25':'#ffcc6cdd';ctx.fill();ctx.lineWidth=2.5;ctx.strokeStyle=p.moving;ctx.stroke();
    ctx.beginPath();ctx.moveTo(pos.x-9,pos.y);ctx.lineTo(pos.x+9,pos.y);ctx.moveTo(pos.x,pos.y-9);ctx.lineTo(pos.x,pos.y+9);ctx.lineWidth=2;ctx.stroke();
  }
}
function drawRunner(ctx:CanvasRenderingContext2D,s:VisualState,theme:ThemeKey,p:Palette){
  if(!s.run)return;const pos=s.run.position;const fill=s.run.phase==='lost'?p.accent:p.runner;
  ctx.save();if(theme==='pulse'){ctx.shadowBlur=17;ctx.shadowColor=p.mint}
  dot(ctx,pos,RUNNER_RADIUS,fill);ctx.shadowBlur=0;ctx.beginPath();ctx.arc(pos.x,pos.y,RUNNER_RADIUS,0,Math.PI*2);ctx.lineWidth=2.5;ctx.strokeStyle=p.mint;ctx.stroke();
  if(theme==='micro'){dot(ctx,{x:pos.x+2,y:pos.y-2},1.6,'#30266d')}
  if(s.run.phase==='lost'){ctx.strokeStyle=p.accent;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(pos.x-13,pos.y-13);ctx.lineTo(pos.x+13,pos.y+13);ctx.moveTo(pos.x+13,pos.y-13);ctx.lineTo(pos.x-13,pos.y+13);ctx.stroke()}
  ctx.restore();
}
export function render(canvas:HTMLCanvasElement,s:VisualState):void{
  const ctx=canvas.getContext('2d');if(!ctx)return;
  const dpr=Math.min(2.5,Math.max(1,window.devicePixelRatio||1));const cw=Math.round(360*dpr),ch=Math.round(640*dpr);
  if(canvas.width!==cw||canvas.height!==ch){canvas.width=cw;canvas.height=ch;}
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,360,640);
  const theme=themeKey(),p=PAL[theme];drawBackground(ctx,theme,p);
  ctx.textBaseline='alphabetic';ctx.textAlign='left';ctx.fillStyle=p.muted;
  ctx.font=theme==='ink'?'bold 12px Georgia,serif':'800 12px system-ui';ctx.fillText(theme==='pulse'?(s.course.id==='detour'?'01 // DRAW THE DETOUR':'02 // TIME THE GATE'):theme==='ink'?'01 — The winding way':'01  •  THE DETOUR',16,24);
  ctx.font='700 11px system-ui';ctx.fillText(s.course.id==='detour'?'STATIC HAZARDS':'MOVING HAZARD',16,42);
  if(theme==='pulse'){ctx.strokeStyle=p.mint+'66';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(299,23);ctx.lineTo(341,23);ctx.stroke()}
  if(theme==='ink'){ctx.strokeStyle=p.accent;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(295,27);ctx.quadraticCurveTo(312,17,342,25);ctx.stroke()}
  if(theme==='micro'){dot(ctx,{x:329,y:26},11,'#ffffffaa');dot(ctx,{x:329,y:26},4,p.accent)}
  for(const wall of s.course.walls)drawWall(ctx,wall,theme,p);
  drawMoving(ctx,s,theme,p);
  const pts=s.snap?.preview?.points??s.route?.points??s.draft;
  if(pts.length>1){
    if(theme==='pulse'){ctx.save();ctx.shadowColor=s.invalid?p.accent:p.ink;ctx.shadowBlur=11;stroke(ctx,pts,s.invalid?p.accent:p.ink,7);ctx.restore();stroke(ctx,pts,'#eefffa',2)}
    else if(theme==='ink'){stroke(ctx,pts,s.invalid?p.accent:p.inkSoft,10);stroke(ctx,pts,s.invalid?p.accent:p.ink,4.6)}
    else {stroke(ctx,pts,s.invalid?p.accent:'#ffffff90',13);stroke(ctx,pts,s.invalid?p.accent:p.ink,6)}
  }
  if(s.snap){
    const a=s.snap;
    if(!a.preview){
      ctx.save();ctx.globalAlpha=.7;ctx.setLineDash([5,6]);ctx.lineWidth=3;ctx.strokeStyle=a.valid?p.mint:p.accent;
      ctx.beginPath();ctx.moveTo(a.lead.x,a.lead.y);ctx.lineTo(a.anchor.x,a.anchor.y);ctx.lineTo(a.tail.x,a.tail.y);ctx.stroke();ctx.setLineDash([]);ctx.restore();
    }
    dot(ctx,a.original,6,'#7b9eb080');
    ctx.save();ctx.shadowBlur=19;ctx.shadowColor=a.valid?p.mint:p.accent;
    dot(ctx,a.anchor,17,a.valid?'#102c38':'#4d2432');ctx.shadowBlur=0;
    ctx.strokeStyle=a.valid?p.mint:p.accent;ctx.lineWidth=3;
    ctx.beginPath();ctx.arc(a.anchor.x,a.anchor.y,17,0,Math.PI*2);ctx.stroke();
    ctx.fillStyle=a.valid?p.mint:p.accent;ctx.beginPath();ctx.arc(a.anchor.x,a.anchor.y,6,0,Math.PI*2);ctx.fill();ctx.restore();
    ctx.font='900 11px system-ui';ctx.textAlign='center';ctx.fillStyle=a.valid?p.mint:p.accent;
    ctx.fillText('DRAG',Math.min(324,Math.max(36,a.anchor.x)),a.anchor.y-29);
  }
  drawTerminal(ctx,s.course.start,16,p.mint,'S',theme,p);drawTerminal(ctx,s.course.finish,18,p.accent,'F',theme,p);
  drawRunner(ctx,s,theme,p);
  const f=Math.min(1,s.inkUsed/s.course.maxInk);
  rr(ctx,16,601,328,23,7);ctx.fillStyle=p.barBack;ctx.fill();
  const used=Math.max(0,322*f);if(used>0){rr(ctx,19,604,used,17,5);ctx.fillStyle=s.invalid?p.accent:p.mint;ctx.fill()}
  ctx.textBaseline='middle';ctx.textAlign='center';ctx.font='900 12px system-ui';
  ctx.fillStyle=theme==='pulse'?'#effdfd':theme==='ink'?'#292d26':'#251d55';
  ctx.fillText(`INK    ${Math.round(s.inkUsed)} / ${s.course.maxInk}`,180,613.5);
  ctx.textAlign='right';ctx.textBaseline='alphabetic';ctx.fillStyle=p.muted;ctx.font='800 10px system-ui';ctx.fillText(s.course.id==='detour'?'PATH / 01':'PATH / 02',343,590);
}
