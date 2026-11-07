import type {Course,Rect,Run,Vec,Route} from '../core/types.js';
import {hazardPosition,BOARD_WIDTH,BOARD_HEIGHT,RUNNER_RADIUS} from '../game/courses.js';

export interface VisualState {
  course:Course;draft:readonly Vec[];route:Route|null;run:Run|null;
  inkUsed:number;invalid:boolean;drawing:boolean;
}
const C={bg:'#12161a',grid:'#222a2e',gridMajor:'#2e3940',wall:'#52585d',wallEdge:'#9aa2a5',white:'#ecf0f0',muted:'#9fa8ac',line:'#75ced3',bad:'#efaa84',good:'#b8deaa',moving:'#e2c78f'};
const rounded=(ctx:CanvasRenderingContext2D,x:number,y:number,w:number,h:number,r:number):void=>{
  ctx.beginPath();ctx.roundRect(x,y,w,h,r);
};
function ring(ctx:CanvasRenderingContext2D,p:Vec,r:number,c:string,label:string):void{
  ctx.beginPath();ctx.arc(p.x,p.y,r,0,Math.PI*2);ctx.fillStyle=C.bg;ctx.fill();ctx.lineWidth=2;ctx.strokeStyle=c;ctx.stroke();
  ctx.font='700 10px ui-sans-serif, system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=c;ctx.fillText(label,p.x,p.y);
}
function obstacle(ctx:CanvasRenderingContext2D,r:Rect){
  rounded(ctx,r.x,r.y,r.w,r.h,5);ctx.fillStyle=C.wall;ctx.fill();ctx.strokeStyle=C.wallEdge;ctx.lineWidth=1.5;ctx.stroke();
  ctx.lineWidth=1;ctx.strokeStyle='#ffffff2b';
  for(let x=r.x+12;x<r.x+r.w-5;x+=16){ctx.beginPath();ctx.moveTo(x,r.y+8);ctx.lineTo(x,r.y+r.h-8);ctx.stroke();}
}
function line(ctx:CanvasRenderingContext2D,pts:readonly Vec[],color:string,width:number){
  if(pts.length<2)return;
  ctx.beginPath();ctx.moveTo(pts[0]!.x,pts[0]!.y);
  for(let i=1;i<pts.length;i++)ctx.lineTo(pts[i]!.x,pts[i]!.y);
  ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke();
}
export function render(canvas:HTMLCanvasElement,s:VisualState):void{
  const ctx=canvas.getContext('2d');if(!ctx)return;
  const dpr=Math.min(2.5,Math.max(1,window.devicePixelRatio||1));
  const cw=Math.round(BOARD_WIDTH*dpr),ch=Math.round(BOARD_HEIGHT*dpr);
  if(canvas.width!==cw||canvas.height!==ch){canvas.width=cw;canvas.height=ch;}
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,BOARD_WIDTH,BOARD_HEIGHT);
  ctx.fillStyle=C.bg;ctx.fillRect(0,0,BOARD_WIDTH,BOARD_HEIGHT);
  ctx.lineWidth=.7;
  for(let x=0;x<=BOARD_WIDTH;x+=20){ctx.strokeStyle=x%100===0?C.gridMajor:C.grid;ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,BOARD_HEIGHT);ctx.stroke();}
  for(let y=0;y<=BOARD_HEIGHT;y+=20){ctx.strokeStyle=y%100===0?C.gridMajor:C.grid;ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(BOARD_WIDTH,y);ctx.stroke();}
  ctx.textAlign='left';ctx.textBaseline='alphabetic';
  ctx.font='700 11px ui-sans-serif, system-ui';ctx.fillStyle=C.muted;ctx.fillText('P1  /  MECHANICS ONLY',15,24);
  ctx.font='500 10px ui-sans-serif, system-ui';ctx.fillText(s.course.id==='detour'?'STATIC DETOUR':'MOVING HAZARD',15,41);
  for(const r of s.course.walls)obstacle(ctx,r);
  const elapsed=s.run?s.run.ticks/120:0;
  for(const h of s.course.moving){
    // Ghosted travel envelope communicates motion even while the run is stopped.
    const from=h.axis==='y'?{x:h.center.x,y:h.center.y-h.amplitude}:{x:h.center.x-h.amplitude,y:h.center.y};
    const to=h.axis==='y'?{x:h.center.x,y:h.center.y+h.amplitude}:{x:h.center.x+h.amplitude,y:h.center.y};
    ctx.setLineDash([5,8]);line(ctx,[from,to],'#e2c78f77',2);ctx.setLineDash([]);
    const pos=hazardPosition(h,elapsed);ctx.beginPath();ctx.arc(pos.x,pos.y,h.radius,0,Math.PI*2);ctx.fillStyle='#e2c78f50';ctx.fill();ctx.strokeStyle=C.moving;ctx.lineWidth=2;ctx.stroke();
    ctx.strokeStyle=C.moving;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(pos.x-h.radius+5,pos.y);ctx.lineTo(pos.x+h.radius-5,pos.y);ctx.stroke();
  }
  const drawPts=s.route?.points??s.draft;
  if(drawPts.length>1){
    line(ctx,drawPts,s.invalid?C.bad:C.line,4);
    // explicit center stroke matches collision route; avoids a blurred 'hitbox' impression.
    line(ctx,drawPts,s.invalid?'#efaa8444':'#75ced333',10);
  }
  ring(ctx,s.course.start,17,C.good,'S');ring(ctx,s.course.finish,19,C.line,'F');
  if(s.run){
    ctx.beginPath();ctx.arc(s.run.position.x,s.run.position.y,RUNNER_RADIUS,0,Math.PI*2);
    ctx.fillStyle=s.run.phase==='lost'?C.bad:s.run.phase==='won'?C.good:C.white;ctx.fill();
    ctx.lineWidth=2;ctx.strokeStyle=C.bg;ctx.stroke();
    if(s.run.phase==='lost'){
      ctx.beginPath();ctx.moveTo(s.run.position.x-11,s.run.position.y-11);ctx.lineTo(s.run.position.x+11,s.run.position.y+11);
      ctx.moveTo(s.run.position.x+11,s.run.position.y-11);ctx.lineTo(s.run.position.x-11,s.run.position.y+11);
      ctx.strokeStyle=C.bad;ctx.lineWidth=2;ctx.stroke();
    }
  }
  rounded(ctx,16,602,328,22,6);ctx.fillStyle='#222b30';ctx.fill();
  const frac=Math.min(1,s.inkUsed/s.course.maxInk);
  rounded(ctx,19,605,322*frac,16,4);ctx.fillStyle=s.invalid?C.bad:C.line;ctx.fill();
  ctx.fillStyle=C.white;ctx.font='700 10px ui-sans-serif, system-ui';ctx.textAlign='center';
  ctx.fillText(`INK  ${Math.round(s.inkUsed)} / ${s.course.maxInk}`,180,616);
}
