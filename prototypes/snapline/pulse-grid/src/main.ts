import type {Course,Route,Run,Vec} from './core/types.js';
import {distance,lengthOf,pointAtDistance} from './core/geometry.js';
import {validateRoute,beginRun,advanceRun,FIXED_STEP,START_ZONE} from './core/simulation.js';
import {COURSES,BOARD_WIDTH,BOARD_HEIGHT} from './game/courses.js';
import {appendStroke} from './game/drawing.js';
import {render} from './ui/render.js';
import {createSnapPlan,previewSnap} from './core/snap.js';
import type {SnapPlan,SnapCheck,SnapEvent} from './core/snap.js';

const canvas=document.querySelector<HTMLCanvasElement>('#courseCanvas');
const goBtn=document.querySelector<HTMLButtonElement>('#goBtn');
const resetBtn=document.querySelector<HTMLButtonElement>('#resetBtn');
const pauseBtn=document.querySelector<HTMLButtonElement>('#pauseBtn');
const helpBtn=document.querySelector<HTMLButtonElement>('#helpBtn');
const select=document.querySelector<HTMLSelectElement>('#courseSelect');
const banner=document.querySelector<HTMLElement>('#status');
const sub=document.querySelector<HTMLElement>('#substatus');
const result=document.querySelector<HTMLElement>('#result');
if(!canvas||!goBtn||!resetBtn||!pauseBtn||!helpBtn||!select||!banner||!sub||!result)throw new Error('UI element missing');
const canvasEl=canvas,btnGo=goBtn,btnReset=resetBtn,btnPause=pauseBtn,btnHelp=helpBtn,sel=select,txt=banner,hint=sub,resultEl=result;

let course:Course=COURSES[0]!;
let draft:Vec[]=[],route:Route|null=null,run:Run|null=null;
let drawing=false,activePointer:number|null=null,lastTime=0,accumulator=0,attempts=0,tutorialPrompted=false;
type GameMode='a'|'b';
let mode:GameMode='a';
let snapSpent=false,snapEditing=false,snapDragging=false,snapPointer:number|null=null;
let snapPlan:SnapPlan|null=null,snapTarget:Vec|null=null,snapPreview:SnapCheck|null=null;
const snapHistory:SnapEvent[]=[];
const btnSnap=document.querySelector<HTMLButtonElement>('#snapBtn');
const modeA=document.querySelector<HTMLButtonElement>('#modeA');
const modeB=document.querySelector<HTMLButtonElement>('#modeB');
const modeDescription=document.querySelector<HTMLElement>('#modeDescription');
if(!btnSnap||!modeA||!modeB||!modeDescription)throw new Error('P3 controls missing');
const buttonSnap=btnSnap,buttonA=modeA,buttonB=modeB,modeInfo=modeDescription;
function cancelEdit(resume:boolean):void{
  if(snapEditing&&run?.phase==='paused'&&resume)run={...run,phase:'running'};
  snapEditing=false;snapDragging=false;snapPointer=null;snapPlan=null;snapTarget=null;snapPreview=null;
  accumulator=0;
}

// Audio is deliberately absent from this P1 mechanical proof.
function phase(){return run?.phase??'ready';}
function message(top:string,bottom:string){txt.textContent=top;hint.textContent=bottom;}
function refresh():void{
  const p=phase();
  btnGo.disabled=!route||p!=='ready';
  buttonSnap.hidden=mode==='a';
  buttonSnap.disabled=mode==='a'||snapSpent||(!snapEditing&&p!=='running');
  buttonSnap.textContent=snapEditing?'CANCEL':snapSpent?'USED':'SNAP';
  buttonSnap.setAttribute('aria-label',snapEditing?'Cancel route correction':snapSpent?'Snap already used':'Pause to adjust your route once');
  document.body.dataset.mode=mode;
  buttonA.setAttribute('aria-pressed',String(mode==='a'));
  buttonB.setAttribute('aria-pressed',String(mode==='b'));
  modeInfo.textContent=mode==='b'?'Draw • Run • Snap once':'Draw • Run • Improve';
  btnPause.disabled=snapEditing||(p!=='running'&&p!=='paused');
  btnPause.textContent=p==='paused'?'▶':'Ⅱ';
  btnPause.setAttribute('aria-label',p==='paused'?'Resume run':'Pause run');
  sel.disabled=snapEditing||p==='running'||p==='paused';
  resultEl.hidden=p!=='won'&&p!=='lost';
  if(snapEditing){
    message('SNAP PAUSED — move mint anchor',snapPreview?.ok?`Valid correction • ${Math.round(snapPreview.route.length)} / ${course.maxInk} ink`:snapPreview&&!snapPreview.ok?snapPreview.reason:course.id==='snaplab'?'Drag the ring right, then release.':'Drag the ring to a safer location.');
  } else if(p==='won'){
    resultEl.textContent=`✓ FINISHED — ${((run?.ticks??0)*FIXED_STEP).toFixed(2)} s / ${attempts} attempt${attempts===1?'':'s'}`;
    message('Completed successfully.', 'Try a shorter or safer route, or switch courses.');
  }else if(p==='lost'){
    resultEl.textContent=`✕ ${run?.failure??'Attempt failed'}`;
    message('Collision detected.', 'Your route hit a hazard. Reset to redraw.');
  }else if(p==='running')message('Running route…',course.id==='snaplab'?'Tap SNAP while climbing, drag ring right.':'Watch the runner and the moving hazard.');
  else if(p==='paused')message('Paused.','Press Resume to continue from the same simulation tick.');
  else if(route)message('Route ready. Press GO.',`${Math.round(route.length)} / ${course.maxInk} ink used. You can reset to redraw.`);
  else if(!drawing)message('Draw a line from S to F.',course.hint);
}
function newCourse(id:string,clearAttempts=true):void{
  course=COURSES.find(x=>x.id===id && (x.id!=='snaplab'||mode==='b'))??COURSES[0]!;
  draft=[];route=null;run=null;drawing=false;activePointer=null;accumulator=0;cancelEdit(false);snapSpent=false;tutorialPrompted=false;snapHistory.length=0;if(clearAttempts)attempts=0;
  const practice=sel.querySelector<HTMLOptionElement>('option[value="snaplab"]');
  if(practice){practice.hidden=mode!=='b';practice.disabled=mode!=='b';}
  sel.value=course.id;
  const ordinal=course.id==='detour'?'01':course.id==='timing'?'02':'03';
  const max=mode==='b'?'03':'02';
  const label=document.querySelector<HTMLElement>('#courseLabel');
  if(label)label.textContent=course.id==='detour'?'01 STATIC DETOUR':course.id==='timing'?'02 MOVING HAZARD':'03 SNAP PRACTICE';
  const progress=document.querySelector<HTMLElement>('#courseProgress');if(progress)progress.innerHTML=`${ordinal} <span>/</span> ${max}`;
  refresh();
}
function pointFromEvent(e:PointerEvent):Vec{
  const rect=canvasEl.getBoundingClientRect();
  return {x:Math.max(0,Math.min(BOARD_WIDTH,(e.clientX-rect.left)*BOARD_WIDTH/rect.width)),
          y:Math.max(0,Math.min(BOARD_HEIGHT,(e.clientY-rect.top)*BOARD_HEIGHT/rect.height))};
}
function beginStroke(e:PointerEvent):void{
  if(snapEditing){
    if(!snapPlan||!run||snapDragging)return;
    if(e.pointerType==='mouse'&&e.button!==0)return;
    const pos=pointFromEvent(e);
    if(distance(pos,snapTarget??snapPlan.anchor)>42){message('Touch the mint anchor ring.','Drag the highlighted circle to a safer position.');return;}
    snapDragging=true;snapPointer=e.pointerId;snapTarget=pos;
    snapPreview=previewSnap(run,course,snapPlan,pos);
    canvasEl.setPointerCapture(e.pointerId);refresh();e.preventDefault();return;
  }
  if(phase()!=='ready'||drawing)return;
  if(e.pointerType==='mouse'&&e.button!==0)return;
  const pos=pointFromEvent(e);
  if(distance(pos,course.start)>START_ZONE){message('Start inside the circle marked S.','Touch or click S, then drag to F in one gesture.');return;}
  if(activePointer!==null)return;
  drawing=true;activePointer=e.pointerId;draft=[pos];route=null;accumulator=0;
  canvasEl.setPointerCapture(e.pointerId);txt.textContent='Drawing…';hint.textContent='Keep dragging towards the finish circle.';refresh();e.preventDefault();
}
function moveStroke(e:PointerEvent):void{
  if(snapDragging&&e.pointerId===snapPointer&&snapPlan&&run){
    snapTarget=pointFromEvent(e);snapPreview=previewSnap(run,course,snapPlan,snapTarget);
    refresh();e.preventDefault();return;
  }
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
  if(snapDragging&&e.pointerId===snapPointer){
    snapDragging=false;snapPointer=null;
    if(canvasEl.hasPointerCapture(e.pointerId))canvasEl.releasePointerCapture(e.pointerId);
    if(e.type!=='pointerup'){
      snapTarget=snapPlan?.anchor??null;snapPreview=null;
      message('Snap gesture interrupted.','Drag the mint anchor again or press CANCEL.');refresh();return;
    }
    if(snapPlan&&run){
      snapTarget=pointFromEvent(e);
      snapPreview=previewSnap(run,course,snapPlan,snapTarget);
      if(snapPreview.ok){
        const event={tick:snapPlan.atTick,target:{...snapTarget}};
        snapHistory.push(event);
        route=snapPreview.route;
        run={...snapPreview.run,phase:'running'};
        snapSpent=true;cancelEdit(false);refresh();e.preventDefault();return;
      }
      refresh();e.preventDefault();return;
    }
  }
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
  if(snapDragging&&snapPointer===e.pointerId){snapDragging=false;snapPointer=null;snapTarget=snapPlan?.anchor??null;snapPreview=null;refresh();}
  if(drawing&&activePointer===e.pointerId){drawing=false;activePointer=null;draft=[];route=null;message('Input interrupted.','Try another stroke.');refresh();}
});
btnGo.addEventListener('click',()=>{
  if(!route||phase()!=='ready')return;
  const checked=validateRoute(route.points,course);
  if(!checked.ok){message('Invalid route.',checked.reason);return;}
  attempts++;run=beginRun(checked.route,course);accumulator=0;refresh();
});
buttonSnap.addEventListener('click',()=>{
  if(mode!=='b'||snapSpent||!run)return;
  if(snapEditing){cancelEdit(true);refresh();return;}
  if(run.phase!=='running')return;
  const plan=createSnapPlan(run);
  if(!plan){message('Snap no longer available.','Use the correction while more route remains ahead.');return;}
  run={...run,phase:'paused'};snapPlan=plan;snapTarget={...plan.anchor};snapPreview=null;snapEditing=true;accumulator=0;refresh();
});
function selectMode(next:GameMode):void{
  mode=next;newCourse('detour');refresh();
}
buttonA.addEventListener('click',()=>selectMode('a'));
buttonB.addEventListener('click',()=>selectMode('b'));
btnReset.addEventListener('click',()=>newCourse(course.id,false));
btnPause.addEventListener('click',()=>{
  if(snapEditing)return;
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
    if(course.id==='snaplab'&&mode==='b'&&!snapSpent&&!tutorialPrompted&&run.phase==='running'&&run.ticks>=170){
      tutorialPrompted=true;
      message('NOW: SNAP AND MOVE RIGHT','Tap SNAP, then drag mint ring right.');
    }
    if(run.phase!=='running'){refresh();if(run.phase==='won')showEarnedResult();}
  }
  render(canvasEl,{course,draft,route,run,inkUsed:snapEditing&&snapPreview?.ok?snapPreview.route.length:(route?.length??lengthOf(draft)),invalid:!route&&lengthOf(draft)>course.maxInk,drawing,
    snap:snapEditing&&snapPlan?{anchor:snapTarget??snapPlan.anchor,original:snapPlan.anchor,lead:pointAtDistance(run!.route.points,snapPlan.leadDistance),tail:pointAtDistance(run!.route.points,snapPlan.tailDistance),preview:snapPreview?.ok?snapPreview.route:null,valid:snapPreview===null?true:snapPreview.ok}:undefined});
  requestAnimationFrame(loop);
}
newCourse(course.id);requestAnimationFrame(loop);
// A read-only debugging snapshot for automated browser checks; never includes personal data.
Object.assign(window,{__snaplineSnapshot:()=>({course:course.id,phase:phase(),ink:Math.round(route?.length??lengthOf(draft)),points:route?.points.length??draft.length,ticks:run?.ticks??0,attempts,result:run?.failure??null,mode,snapSpent,snapEditing,snapDragging,snapAnchor:snapTarget,snapValid:snapPreview?.ok??null,snapError:snapPreview&&!snapPreview.ok?snapPreview.reason:null,snapEvents:snapHistory.map(x=>({...x})),tutorialPrompted})});

// P2.1 Pulse Grid refinement: one owner-selected theme, actual app flow and truthful live metrics.
type AppView='home'|'game'|'result';
let appView:AppView='home';
const howto=document.querySelector<HTMLElement>('#howtoOverlay');
if(!howto)throw new Error('Help overlay missing');
function showView(view:AppView):void{
  appView=view;
  document.body.dataset.view=view;
  for(const [name,id] of [['home','homeScreen'],['game','gameScreen'],['result','resultScreen']] as const){
    const element=document.getElementById(id);if(element)element.hidden=name!==view;
  }
  if(view!=='game'&&snapEditing)cancelEdit(false);
  if(view!=='game'&&run?.phase==='running'){
    run={...run,phase:'paused'};accumulator=0;refresh();
  }
}
function assignText(id:string,value:string):void{const e=document.getElementById(id);if(e)e.textContent=value;}
function showEarnedResult():void{
  if(run?.phase!=='won'||!route||appView!=='game')return;
  assignText('resultEyebrow','RUN COMPLETED');
  assignText('resultSequence',course.id==='detour'?'01 / 02':course.id==='timing'?'02 / 02':'03 / 03');
  assignText('resultOverline','ROUTE COMPLETE');
  const headline=document.getElementById('resultHeadline');if(headline)headline.innerHTML='Beautifully<br><em>done.</em>';
  assignText('resultMessage',course.id==='detour'?'You made it around the detour.':course.id==='timing'?'You navigated the moving hazard.':'You redirected around the crossing patrol.');
  assignText('resultCourseLabel',course.id==='detour'?'COURSE 01':course.id==='timing'?'COURSE 02':'PRACTICE 03');
  assignText('resultCourseTitle',course.id==='detour'?'THE DETOUR':course.id==='timing'?'THE MOVING GATE':'PATROL CROSSING');
  assignText('resultInk',String(Math.round(route.length)));
  assignText('resultTime',(run.ticks*FIXED_STEP).toFixed(2));
  assignText('resultAttempts',String(attempts));
  assignText('resultDetail',mode==='b'?(snapSpent?'Snap & Redirect • 1 correction used':'Snap & Redirect • no correction used'):'Plan & Run • live gameplay metrics.');
  const next=document.querySelector<HTMLButtonElement>('#nextDemo');
  if(next)next.innerHTML=(course.id==='detour'||(course.id==='timing'&&mode==='b'))?'NEXT COURSE <span>➜</span>':'PLAY COURSE 01 <span>➜</span>';
  showView('result');
}
document.getElementById('startDemo')?.addEventListener('click',()=>{newCourse('detour');showView('game');});
document.getElementById('nextDemo')?.addEventListener('click',()=>{newCourse(course.id==='detour'?'timing':course.id==='timing'&&mode==='b'?'snaplab':'detour');showView('game');});
document.getElementById('retryResult')?.addEventListener('click',()=>{newCourse(course.id,false);showView('game');});
document.getElementById('resultHome')?.addEventListener('click',()=>showView('home'));
document.getElementById('backToHome')?.addEventListener('click',()=>showView('home'));
btnHelp.addEventListener('click',()=>{howto.hidden=false;document.getElementById('closeHowto')?.focus();});
document.getElementById('closeHowto')?.addEventListener('click',()=>{howto.hidden=true;btnHelp.focus();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!howto.hidden){howto.hidden=true;btnHelp.focus();}});
showView('home');selectMode('a');
Object.assign(window,{__p2Refine:()=>({view:appView,course:course.id,phase:phase(),ink:Math.round(route?.length??lengthOf(draft)),attempts,mode,snapSpent,resultDuration:run?.ticks?Number((run.ticks*FIXED_STEP).toFixed(2)):null})});
