import type {Course,Route,Run,Vec} from './core/types.js';
import {distance,lengthOf} from './core/geometry.js';
import {validateRoute,beginRun,advanceRun,FIXED_STEP,START_ZONE} from './core/simulation.js';
import {COURSES,BOARD_WIDTH,BOARD_HEIGHT} from './game/courses.js';
import {appendStroke} from './game/drawing.js';
import {render} from './ui/render.js';

const canvas=document.querySelector<HTMLCanvasElement>('#courseCanvas');
const goBtn=document.querySelector<HTMLButtonElement>('#goBtn');
const resetBtn=document.querySelector<HTMLButtonElement>('#resetBtn');
const pauseBtn=document.querySelector<HTMLButtonElement>('#pauseBtn');
const muteBtn=document.querySelector<HTMLButtonElement>('#muteBtn');
const select=document.querySelector<HTMLSelectElement>('#courseSelect');
const banner=document.querySelector<HTMLElement>('#status');
const sub=document.querySelector<HTMLElement>('#substatus');
const result=document.querySelector<HTMLElement>('#result');
if(!canvas||!goBtn||!resetBtn||!pauseBtn||!muteBtn||!select||!banner||!sub||!result)throw new Error('UI element missing');
const canvasEl=canvas,btnGo=goBtn,btnReset=resetBtn,btnPause=pauseBtn,btnMute=muteBtn,sel=select,txt=banner,hint=sub,resultEl=result;
const baseStates=['ready','running','paused','won','lost'] as const;
let course:Course=COURSES[0]!;
let draft:Vec[]=[],route:Route|null=null,run:Run|null=null;
let drawing=false,activePointer:number|null=null,lastTime=0,accumulator=0,attempts=0;
// Audio is deliberately absent from this P1 mechanical proof.
function phase(){return run?.phase??'ready';}
function message(top:string,bottom:string){txt.textContent=top;hint.textContent=bottom;}
function refresh():void{
  const p=phase();
  btnGo.disabled=!route||p!=='ready';
  btnPause.disabled=p!=='running'&&p!=='paused';
  btnPause.textContent=p==='paused'?'Resume':'Pause';
  sel.disabled=p==='running'||p==='paused';
  resultEl.hidden=p!=='won'&&p!=='lost';
  if(p==='won'){
    resultEl.textContent=`✓ FINISHED — ${((run?.ticks??0)*FIXED_STEP).toFixed(2)} s / ${attempts} attempt${attempts===1?'':'s'}`;
    message('Completed successfully.', 'Try a shorter or safer route, or switch courses.');
  }else if(p==='lost'){
    resultEl.textContent=`✕ ${run?.failure??'Attempt failed'}`;
    message('Collision detected.', 'Your route hit a hazard. Reset to redraw.');
  }else if(p==='running')message('Running route…','Watch the runner and the moving hazard.');
  else if(p==='paused')message('Paused.','Press Resume to continue from the same simulation tick.');
  else if(route)message('Route ready. Press GO.',`${Math.round(route.length)} / ${course.maxInk} ink used. You can reset to redraw.`);
  else if(!drawing)message('Draw a line from S to F.',course.hint);
}
function newCourse(id:string):void{
  course=COURSES.find(x=>x.id===id)??COURSES[0]!;
  draft=[];route=null;run=null;drawing=false;activePointer=null;accumulator=0;attempts=0;
  sel.value=course.id;refresh();
}
function pointFromEvent(e:PointerEvent):Vec{
  const rect=canvasEl.getBoundingClientRect();
  return {x:Math.max(0,Math.min(BOARD_WIDTH,(e.clientX-rect.left)*BOARD_WIDTH/rect.width)),
          y:Math.max(0,Math.min(BOARD_HEIGHT,(e.clientY-rect.top)*BOARD_HEIGHT/rect.height))};
}
function beginStroke(e:PointerEvent):void{
  if(phase()!=='ready'||drawing)return;
  if(e.pointerType==='mouse'&&e.button!==0)return;
  const pos=pointFromEvent(e);
  if(distance(pos,course.start)>START_ZONE){message('Start inside the circle marked S.','Touch or click S, then drag to F in one gesture.');return;}
  if(activePointer!==null)return;
  drawing=true;activePointer=e.pointerId;draft=[pos];route=null;accumulator=0;
  canvasEl.setPointerCapture(e.pointerId);txt.textContent='Drawing…';hint.textContent='Keep dragging towards the finish circle.';refresh();e.preventDefault();
}
function moveStroke(e:PointerEvent):void{
  if(!drawing||e.pointerId!==activePointer)return;
  const samples=e.getCoalescedEvents?.()??[];
  for(const event of samples){if(event.pointerId===activePointer)draft=appendStroke(draft,pointFromEvent(event));}
  draft=appendStroke(draft,pointFromEvent(e));
  const used=lengthOf(draft);
  txt.textContent=used>course.maxInk?'Over ink limit — simplify route.':'Drawing route…';
  hint.textContent=`Ink: ${Math.round(used)} / ${course.maxInk}`;
  e.preventDefault();
}
function endStroke(e:PointerEvent):void{
  if(!drawing||e.pointerId!==activePointer)return;
  if(e.type==='pointerup')draft=appendStroke(draft,pointFromEvent(e));
  drawing=false;activePointer=null;
  if(canvasEl.hasPointerCapture(e.pointerId))canvasEl.releasePointerCapture(e.pointerId);
  if(e.type!=='pointerup'){
    draft=[];route=null;message('Stroke interrupted.','Try drawing again from the start.');refresh();return;
  }
  const check=validateRoute(draft,course);
  if(check.ok){route=check.route;draft=[];refresh();}
  else{route=null;message('Route not accepted.',`${check.reason} Draw again from S.`);}
}
canvasEl.addEventListener('pointerdown',beginStroke);
canvasEl.addEventListener('pointermove',moveStroke);
canvasEl.addEventListener('pointerup',endStroke);
canvasEl.addEventListener('pointercancel',endStroke);
canvasEl.addEventListener('lostpointercapture',e=>{
  if(drawing&&activePointer===e.pointerId){drawing=false;activePointer=null;draft=[];route=null;message('Input interrupted.','Try another stroke.');refresh();}
});
btnGo.addEventListener('click',()=>{
  if(!route||phase()!=='ready')return;
  const checked=validateRoute(route.points,course);
  if(!checked.ok){message('Invalid route.',checked.reason);return;}
  attempts++;run=beginRun(checked.route,course);accumulator=0;refresh();
});
btnReset.addEventListener('click',()=>newCourse(course.id));
btnPause.addEventListener('click',()=>{
  if(run?.phase==='running'){run={...run,phase:'paused'};accumulator=0;}
  else if(run?.phase==='paused'){run={...run,phase:'running'};accumulator=0;}
  refresh();
});

sel.addEventListener('change',()=>newCourse(sel.value));
document.addEventListener('visibilitychange',()=>{
  if(document.hidden&&run?.phase==='running'){run={...run,phase:'paused'};accumulator=0;refresh();}
  lastTime=performance.now();
});
function loop(now:number){
  const delta=lastTime===0?0:Math.min(.05,Math.max(0,(now-lastTime)/1000));lastTime=now;
  if(run?.phase==='running'){
    accumulator+=delta;
    let safety=0;
    while(accumulator>=FIXED_STEP&&run.phase==='running'&&safety<8){
      run=advanceRun(run,course);accumulator-=FIXED_STEP;safety++;
    }
    if(run.phase!=='running')refresh();
  }
  render(canvasEl,{course,draft,route,run,inkUsed:route?.length??lengthOf(draft),invalid:!route&&lengthOf(draft)>course.maxInk,drawing});
  requestAnimationFrame(loop);
}
newCourse(course.id);requestAnimationFrame(loop);
// A read-only debugging snapshot for automated browser checks; never includes personal data.
Object.assign(window,{__snaplineSnapshot:()=>({course:course.id,phase:phase(),ink:Math.round(route?.length??lengthOf(draft)),points:route?.points.length??draft.length,ticks:run?.ticks??0,attempts,result:run?.failure??null})});
