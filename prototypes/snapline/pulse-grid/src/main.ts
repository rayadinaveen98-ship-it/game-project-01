import type {Course,Route,Run,Vec,GameMode} from './core/types.js';
import {MODE_COPY,coursesForMode,isAccessibleCourse,firstCourse,nextCourse} from './game/catalog.js';
import {readProgress,writeProgress,recordWin,clearProgress,completedInMode,progressId} from './game/progress.js';
import type {LocalStore,Progress} from './game/progress.js';
import {MODE_GUIDES,readGuideHistory,markGuide,saveGuideHistory} from './game/onboarding.js';
import type {GuideHistory,GuideChoice} from './game/onboarding.js';
import {interruptionEffect} from './game/interruption.js';
import type {InterruptionReason,ActiveGesture} from './game/interruption.js';
import {distance,lengthOf,pointAtDistance} from './core/geometry.js';
import {validateRoute,beginRun,advanceRun,FIXED_STEP,START_ZONE} from './core/simulation.js';
import {COURSES,BOARD_WIDTH,BOARD_HEIGHT} from './game/courses.js';
import {appendStroke} from './game/drawing.js';
import {render} from './ui/render.js';
import {JellyField} from './ui/jelly.js';
import type {BoardMaterial} from './ui/jelly.js';
import {SlimeField} from './ui/slime.js';
import {createSnapPlan,previewSnap} from './core/snap.js';
import type {SnapPlan,SnapCheck,SnapEvent} from './core/snap.js';
import {appendLivePoint,adoptLiveRoute,advanceLiveRun,LIVE_LAUNCH_LENGTH,LIVE_JOIN_RADIUS,LIVE_GRACE_TICKS} from './core/live.js';
import {GOAL_ZONE} from './core/simulation.js';

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
let pauseNote:string|null=null;
let mode:GameMode='a';
const localStore:LocalStore|null=(()=>{try{return window.localStorage;}catch{return null;}})();
let progress:Progress=readProgress(localStore);
let guideHistory:GuideHistory=readGuideHistory(localStore);
// Presentation-only material: the runner, collisions and level fixtures are never modified.
const jelly=new JellyField();
const slime=new SlimeField();
const surfaceToggle=document.querySelector<HTMLButtonElement>('#surfaceToggle');
if(!surfaceToggle)throw new Error('Reactive surface selector missing');
const reducedMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false;
const MATERIAL_KEY='snapline-material-v01';
let material:BoardMaterial=(()=>{try{const saved=localStore?.getItem(MATERIAL_KEY);return saved==='jelly'||saved==='slime'?saved:'pulse';}catch{return 'pulse';}})();
let gelAccumulator=0;
const MATERIAL_SEQUENCE:readonly BoardMaterial[]=['pulse','jelly','slime'];
function refreshMaterial():void{
  const index=MATERIAL_SEQUENCE.indexOf(material);
  surfaceToggle!.setAttribute('aria-pressed',String(material!=='pulse'));
  surfaceToggle!.setAttribute('aria-label',`Board surface ${material==='pulse'?'Normal Pulse Grid':material==='jelly'?'Reactive Jelly':'Reactive Slime'}. Activate to switch to ${MATERIAL_SEQUENCE[(index+1)%MATERIAL_SEQUENCE.length]}.`);
  surfaceToggle!.title='Choose board material: Normal → Jelly → Slime';
  surfaceToggle!.innerHTML=`<span aria-hidden="true">◉</span> ${material==='pulse'?'NORMAL':material==='jelly'?'JELLY':'SLIME'} <small>${index+1}/3</small>`;
  document.body.dataset.material=material;
  const name=document.getElementById('styleName');if(name)name.textContent=material==='jelly'?'REACTIVE JELLY / EXPERIMENT':material==='slime'?'VISCOUS SLIME / EXPERIMENT':'PULSE GRID / APPROVED';
}
surfaceToggle.addEventListener('click',()=>{
  const index=MATERIAL_SEQUENCE.indexOf(material);
  material=MATERIAL_SEQUENCE[(index+1)%MATERIAL_SEQUENCE.length]!;
  jelly.reset();slime.reset();gelAccumulator=0;
  try{localStore?.setItem(MATERIAL_KEY,material);}catch{/* optional preference: game still works */}
  refreshMaterial();
});
refreshMaterial();

let liveComplete=false,liveWaitingTicks=0,liveError:string|null=null,liveInputReleased=false;
let snapSpent=false,snapEditing=false,snapDragging=false,snapPointer:number|null=null;
let snapPlan:SnapPlan|null=null,snapTarget:Vec|null=null,snapPreview:SnapCheck|null=null;
const snapHistory:SnapEvent[]=[];
const btnSnap=document.querySelector<HTMLButtonElement>('#snapBtn');
const modeA=document.querySelector<HTMLButtonElement>('#modeA');
const modeB=document.querySelector<HTMLButtonElement>('#modeB');
const modeC=document.querySelector<HTMLButtonElement>('#modeC');
const modeDescription=document.querySelector<HTMLElement>('#modeDescription');
if(!btnSnap||!modeA||!modeB||!modeC||!modeDescription)throw new Error('P3 controls missing');
const buttonSnap=btnSnap,buttonA=modeA,buttonB=modeB,buttonC=modeC,modeInfo=modeDescription;
function cancelEdit(resume:boolean):void{
  if(snapEditing&&run?.phase==='paused'&&resume)run={...run,phase:'running'};
  snapEditing=false;snapDragging=false;snapPointer=null;snapPlan=null;snapTarget=null;snapPreview=null;
  accumulator=0;
  if(resume)pauseNote=null;
}

// Audio is deliberately absent from this P1 mechanical proof.
function phase(){return run?.phase??'ready';}
function message(top:string,bottom:string){txt.textContent=top;hint.textContent=bottom;}
function refresh():void{
  const p=phase();
  btnGo.hidden=mode==='c';
  btnGo.disabled=mode==='c'||!route||p!=='ready';
  buttonSnap.hidden=mode!=='b';
  buttonSnap.disabled=mode==='a'||snapSpent||(!snapEditing&&p!=='running');
  buttonSnap.textContent=snapEditing?'CANCEL':snapSpent?'USED':'SNAP';
  buttonSnap.setAttribute('aria-label',snapEditing?'Cancel route correction':snapSpent?'Snap already used':'Pause to adjust your route once');
  document.body.dataset.mode=mode;
  buttonA.setAttribute('aria-pressed',String(mode==='a'));
  buttonB.setAttribute('aria-pressed',String(mode==='b'));
  buttonC.setAttribute('aria-pressed',String(mode==='c'));
  modeInfo.textContent=mode==='b'?'Draw • Run • Snap once':mode==='c'?'Draw ahead • runner follows live':'Draw • Run • Improve';
  btnPause.disabled=snapEditing||(p!=='running'&&p!=='paused');
  btnPause.textContent=p==='paused'?'▶':'Ⅱ';
  btnPause.setAttribute('aria-label',p==='paused'?'Resume run':'Pause run');
  sel.disabled=snapEditing||p==='running'||p==='paused';
  resultEl.hidden=p!=='won'&&p!=='lost';
  if(mode==='c'){
    if(p==='won') { resultEl.textContent=`✓ FINISHED — ${((run?.ticks??0)*FIXED_STEP).toFixed(2)} s / ${attempts} attempt${attempts===1?'':'s'}`; message('Live trail completed.', 'The runner followed your drawing in real time.'); }
    else if(p==='lost') { resultEl.textContent=`✕ ${run?.failure??'Attempt failed'}`; message('Live trail interrupted.',run?.failure??'Reset and draw ahead.'); }
    else if(p==='paused')message('Live run paused.',pauseNote??'Press Resume to keep the runner moving.');
    else if(p==='running')message(liveError??(liveWaitingTicks>0?'DRAW AHEAD — runner at the tip':'Keep drawing ahead of the runner.'), `Ink ${Math.round(route?.length??0)} / ${course.maxInk} • ${Math.max(0,Math.round((LIVE_GRACE_TICKS-liveWaitingTicks)/120*10)/10)}s tip grace`);
    else message(liveError??'Touch S and draw continuously.', 'The runner launches after a short trail. Continue drawing to F.');
  } else if(snapEditing){
    message('SNAP PAUSED — move mint anchor',snapPreview?.ok?`Valid correction • ${Math.round(snapPreview.route.length)} / ${course.maxInk} ink`:snapPreview&&!snapPreview.ok?snapPreview.reason:course.id==='snaplab'?'Drag the ring right, then release.':course.id==='snapchoice'?'Drag the ring left, then release.':'Drag the ring to a safer location.');
  } else if(p==='won'){
    resultEl.textContent=`✓ FINISHED — ${((run?.ticks??0)*FIXED_STEP).toFixed(2)} s / ${attempts} attempt${attempts===1?'':'s'}`;
    message('Completed successfully.', 'Try a shorter or safer route, or switch courses.');
  }else if(p==='lost'){
    resultEl.textContent=`✕ ${run?.failure??'Attempt failed'}`;
    message('Collision detected.', 'Your route hit a hazard. Reset to redraw.');
  }else if(p==='running')message('Running route…',course.id==='snaplab'?'Tap SNAP while climbing; drag the ring right.':course.id==='snapchoice'?'Tap SNAP while climbing; move the ring left.':'Watch the runner and the moving hazard.');
  else if(p==='paused')message('Paused.',pauseNote??'Press Resume to continue from the same simulation tick.');
  else if(route)message('Route ready. Press GO.',`${Math.round(route.length)} / ${course.maxInk} ink used. You can reset to redraw.`);
  else if(!drawing)message('Draw a line from S to F.',course.hint);
}
/** Safe when reset, Android gestures, the tab switcher, or focus loss cancels input. */
function releaseActivePointers():void{
  for(const id of [activePointer,snapPointer]){
    if(id===null)continue;
    try{if(canvasEl.hasPointerCapture(id))canvasEl.releasePointerCapture(id);}catch{ /* pointer already removed by OS */ }
  }
}
function interruptInputs(reason:InterruptionReason):void{
  const gesture:ActiveGesture=snapDragging?'snap':drawing?'stroke':'none';
  const plan=interruptionEffect(mode,gesture,snapEditing,phase()==='running',reason);
  if(gesture!=='none')releaseActivePointers();
  if(plan.discardDraft){draft=[];route=null;}
  if(plan.preserveLiveRoute){liveInputReleased=true;liveError='Touch interrupted. Resume, then rejoin at the mint tip.';}
  drawing=false;activePointer=null;snapDragging=false;snapPointer=null;
  if(plan.cancelSnapEdit)cancelEdit(false); // keeps runner paused; never spends the snap.
  if(plan.pauseRun&&run?.phase==='running'){
    run={...run,phase:'paused'};
    pauseNote=reason==='manual-pause'?'Press Resume to continue from this position.':
      'App or touch interrupted. Press Resume to continue safely.';
  }else if(plan.cancelSnapEdit&&run?.phase==='paused'){
    pauseNote='Snap interrupted; press Resume, or try SNAP again after resuming.';
  }
  accumulator=0;
  refresh();
}
function newCourse(id:string,clearAttempts=true):void{
  releaseActivePointers();
  jelly.reset();slime.reset();gelAccumulator=0;
  course=COURSES.find(x=>x.id===id&&isAccessibleCourse(mode,id))??firstCourse(mode);
  draft=[];route=null;run=null;drawing=false;activePointer=null;accumulator=0;cancelEdit(false);snapSpent=false;tutorialPrompted=false;snapHistory.length=0;
  liveComplete=false;liveWaitingTicks=0;liveError=null;liveInputReleased=false;pauseNote=null;if(clearAttempts)attempts=0;
  const eligible=coursesForMode(mode);
  // Rebuild the selector for every mode: static P6.2 options cannot represent 8 courses.
  sel.replaceChildren();
  for(const [i,entry] of eligible.entries()){
    const option=document.createElement('option');
    option.value=entry.id;
    option.textContent=String(i+1).padStart(2,'0')+(entry.family==='practice'?' ★':'');
    sel.append(option);
  }
  sel.value=course.id;
  const ordinal=String(eligible.findIndex(c=>c.id===course.id)+1).padStart(2,'0');
  const max=String(eligible.length).padStart(2,'0');
  const label=document.querySelector<HTMLElement>('#courseLabel');
  if(label)label.textContent=`${ordinal} ${course.title.toUpperCase()}`;
  const progress=document.querySelector<HTMLElement>('#courseProgress');if(progress)progress.innerHTML=`${ordinal} <span>/</span> ${max}`;
  refresh();
}
function pointFromEvent(e:PointerEvent):Vec{
  const rect=canvasEl.getBoundingClientRect();
  return {x:Math.max(0,Math.min(BOARD_WIDTH,(e.clientX-rect.left)*BOARD_WIDTH/rect.width)),
          y:Math.max(0,Math.min(BOARD_HEIGHT,(e.clientY-rect.top)*BOARD_HEIGHT/rect.height))};
}
function beginStroke(e:PointerEvent):void{
  if(mode==='c'){
    if(phase()==='paused')return; // Do not modify the trail behind a pause/help overlay.
    if(e.pointerType==='mouse'&&e.button!==0)return;
    if(drawing||activePointer!==null||liveComplete||phase()==='lost'||phase()==='won')return;
    const pos=pointFromEvent(e);
    const join=route?.points.at(-1)??course.start;
    if(distance(pos,join)>LIVE_JOIN_RADIUS){liveError='Continue from the glowing trail tip.';refresh();return;}
    const initial=route?.points??[];
    const check=appendLivePoint(initial,pos,course);
    if(!check.ok){liveError=check.reason;refresh();return;}
    if(!route)route=check.route;
    liveComplete=check.completed;liveError=null;
    drawing=true;activePointer=e.pointerId;liveInputReleased=false;
    canvasEl.setPointerCapture(e.pointerId);refresh();e.preventDefault();return;
  }
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
function applyLivePoint(position:Vec):void{
  if(liveComplete)return;
  const result=appendLivePoint(route?.points??[],position,course);
  if(!result.ok){liveError=result.reason;refresh();return;}
  if(route && result.route.length<=route.length+1e-7)return;
  route=result.route;liveComplete=result.completed;liveError=null;
  if(!run && route.length>=LIVE_LAUNCH_LENGTH){run=beginRun(route,course);attempts++;accumulator=0;liveWaitingTicks=0;pauseNote=null;}
  else if(run){run=adoptLiveRoute(run,route);liveWaitingTicks=0;}
  refresh();
}
function moveStroke(e:PointerEvent):void{
  if(mode==='c'&&drawing&&e.pointerId===activePointer){
    const samples=e.getCoalescedEvents?.()??[];
    for(const ev of samples){if(ev.pointerId===activePointer)applyLivePoint(pointFromEvent(ev));}
    applyLivePoint(pointFromEvent(e));e.preventDefault();return;
  }
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
  if(mode==='c'&&drawing&&e.pointerId===activePointer){
    if(e.type==='pointerup')applyLivePoint(pointFromEvent(e));
    drawing=false;activePointer=null;liveInputReleased=true;
    if(canvasEl.hasPointerCapture(e.pointerId))canvasEl.releasePointerCapture(e.pointerId);
    if(e.type!=='pointerup')liveError='Trail released. Continue from the mint tip.';
    refresh();e.preventDefault();return;
  }
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
        pauseNote=null;snapSpent=true;cancelEdit(false);refresh();e.preventDefault();return;
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
canvasEl.addEventListener('pointercancel',e=>{
  if(e.pointerId!==activePointer&&e.pointerId!==snapPointer)return;
  interruptInputs('pointer-cancel');e.preventDefault();
});
canvasEl.addEventListener('lostpointercapture',e=>{
  // A normal pointerup already cleared the active pointer; only unplanned loss matters.
  if(e.pointerId===activePointer||e.pointerId===snapPointer)interruptInputs('capture-lost');
});
btnGo.addEventListener('click',()=>{
  if(!route||phase()!=='ready')return;
  const checked=validateRoute(route.points,course);
  if(!checked.ok){message('Invalid route.',checked.reason);return;}
  attempts++;run=beginRun(checked.route,course);accumulator=0;pauseNote=null;refresh();
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
  mode=next;newCourse(firstCourse(mode).id);refresh();
}
buttonA.addEventListener('click',()=>selectMode('a'));
buttonB.addEventListener('click',()=>selectMode('b'));
buttonC.addEventListener('click',()=>selectMode('c'));
btnReset.addEventListener('click',()=>newCourse(course.id,false));
btnPause.addEventListener('click',()=>{
  if(snapEditing)return;
  if(run?.phase==='running')interruptInputs('manual-pause');
  else if(run?.phase==='paused'){run={...run,phase:'running'};accumulator=0;pauseNote=null;refresh();}
});

sel.addEventListener('change',()=>newCourse(sel.value));
document.addEventListener('visibilitychange',()=>{
  if(document.hidden)interruptInputs('page-hidden');
  lastTime=performance.now();
});
window.addEventListener('blur',()=>{interruptInputs('window-blur');lastTime=performance.now();});
function loop(now:number){
  const delta=lastTime===0?0:Math.min(.05,Math.max(0,(now-lastTime)/1000));lastTime=now;
  if(run?.phase==='running'){
    accumulator+=delta;
    let safety=0;
    while(accumulator>=FIXED_STEP&&run.phase==='running'&&safety<8){
      if(mode==='c'){const next=advanceLiveRun(run,course,liveComplete,liveWaitingTicks);run=next.run;liveWaitingTicks=next.waitingTicks;}
      else run=advanceRun(run,course);
      accumulator-=FIXED_STEP;safety++;
    }
    if((course.id==='snaplab'||course.id==='snapchoice')&&mode==='b'&&!snapSpent&&!tutorialPrompted&&run.phase==='running'&&run.ticks>=(course.id==='snapchoice'?185:170)){
      tutorialPrompted=true;
      message(course.id==='snapchoice'?'NOW: SNAP TO THE LEFT':'NOW: SNAP AND MOVE RIGHT',course.id==='snapchoice'?'Tap SNAP, then drag the mint ring left.':'Tap SNAP, then drag the mint ring right.');
    }
    if(run.phase!=='running'){refresh();if(run.phase==='won')showEarnedResult();}
  }
  if(material!=='pulse'&&!reducedMotion){
    if(material==='jelly')jelly.observeRunner(run);else slime.observeRunner(run);
    gelAccumulator=Math.min(.066,gelAccumulator+delta);
    while(gelAccumulator>=1/60){if(material==='jelly')jelly.step();else slime.step();gelAccumulator-=1/60;}
  }
  render(canvasEl,{course,mode,draft,route,run,material,jelly:material==='jelly'&&!reducedMotion?jelly:undefined,slime:material==='slime'&&!reducedMotion?slime:undefined,inkUsed:snapEditing&&snapPreview?.ok?snapPreview.route.length:(route?.length??lengthOf(draft)),invalid:!route&&lengthOf(draft)>course.maxInk,drawing,
    live:mode==='c'?{completed:liveComplete,waiting:liveWaitingTicks>0,tip:route?.points.at(-1)??course.start, grace:Math.max(0,1-liveWaitingTicks/LIVE_GRACE_TICKS)}:undefined,
    snap:snapEditing&&snapPlan?{anchor:snapTarget??snapPlan.anchor,original:snapPlan.anchor,lead:pointAtDistance(run!.route.points,snapPlan.leadDistance),tail:pointAtDistance(run!.route.points,snapPlan.tailDistance),preview:snapPreview?.ok?snapPreview.route:null,valid:snapPreview===null?true:snapPreview.ok}:undefined});
  requestAnimationFrame(loop);
}
newCourse(course.id);requestAnimationFrame(loop);
// Material observability for browser tests: no private data, no remote analytics.
Object.assign(window,{__jellySnapshot:()=>({...jelly.snapshot(),material,reducedMotion,course:course.id,runPhase:phase(),runTick:run?.ticks??0}),__materialSnapshot:()=>({material,reducedMotion,jelly:jelly.snapshot(),slime:slime.snapshot(),course:course.id,mode,phase:phase(),tick:run?.ticks??0})});
// A read-only debugging snapshot for automated browser checks; never includes personal data.
Object.assign(window,{__snaplineSnapshot:()=>({course:course.id,phase:phase(),ink:Math.round(route?.length??lengthOf(draft)),points:route?.points.length??draft.length,ticks:run?.ticks??0,attempts,result:run?.failure??null,mode,snapSpent,snapEditing,snapDragging,snapAnchor:snapTarget,snapValid:snapPreview?.ok??null,snapError:snapPreview&&!snapPreview.ok?snapPreview.reason:null,snapEvents:snapHistory.map(x=>({...x})),drawing,activePointer,pauseNote,liveComplete,liveWaitingTicks,liveError,liveInputReleased,runnerPosition:run?.position,runDistance:run?.distance,tutorialPrompted})});

// P2.1 Pulse Grid refinement: one owner-selected theme, actual app flow and truthful live metrics.
type AppView='home'|'courses'|'game'|'result';
let appView:AppView='home';
const howto=document.querySelector<HTMLElement>('#howtoOverlay');
if(!howto)throw new Error('Help overlay missing');
const guideKicker=document.getElementById('guideKicker');
const guideTitle=document.getElementById('howtoTitle');
const guideTagline=document.getElementById('guideTagline');
const guideSteps=document.getElementById('guideSteps');
const guideGo=document.querySelector<HTMLButtonElement>('#closeHowto');
const guideSkip=document.querySelector<HTMLButtonElement>('#skipHowto');
const guideFromCourses=document.querySelector<HTMLButtonElement>('#courseGuideBtn');
if(!guideKicker||!guideTitle||!guideTagline||!guideSteps||!guideGo||!guideSkip||!guideFromCourses)throw new Error('Mode guides controls missing');
let guideReturnFocus:HTMLElement|null=null;
function openModeGuide(origin:HTMLElement|null):void{
  // Help must revoke any captured finger before freezing the simulation.
  // Otherwise a late pointerup can append an invisible segment behind the dialog.
  if(run?.phase==='running'||drawing||snapEditing)interruptInputs('manual-pause');
  const copy=MODE_GUIDES[mode];
  guideKicker!.textContent=copy.label;
  guideTitle!.textContent=copy.title;
  guideTagline!.textContent=copy.tagline;
  guideSteps!.replaceChildren();
  for(const step of copy.steps){const item=document.createElement('li');item.textContent=step;guideSteps!.append(item);}
  guideGo!.replaceChildren(document.createTextNode(copy.button+' '));
  const mark=document.createElement('span');mark.setAttribute('aria-hidden','true');mark.textContent='✓';guideGo!.append(mark);
  guideReturnFocus=origin;
  howto!.hidden=false;
  guideGo!.focus();
}
function closeModeGuide(choice:GuideChoice):void{
  if(howto!.hidden)return;
  guideHistory=markGuide(guideHistory,mode,choice);
  saveGuideHistory(localStore,guideHistory);
  howto!.hidden=true;
  guideReturnFocus?.focus();
  guideReturnFocus=null;
}
function showView(view:AppView):void{
  if(view!=='game')interruptInputs('navigate');
  appView=view;
  if(view!=='game')howto!.hidden=true;
  document.body.dataset.view=view;
  for(const [name,id] of [['home','homeScreen'],['courses','courseScreen'],['game','gameScreen'],['result','resultScreen']] as const){
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
  const eligible=coursesForMode(mode),ordinal=eligible.findIndex(c=>c.id===course.id)+1;
  assignText('resultSequence',`${String(ordinal).padStart(2,'0')} / ${String(eligible.length).padStart(2,'0')}`);
  assignText('resultOverline','ROUTE COMPLETE');
  const headline=document.getElementById('resultHeadline');if(headline)headline.innerHTML='Beautifully<br><em>done.</em>';
  const completion:Partial<Record<Course['id'],string>>={
    detour:'You made it around the detour.',timing:'You navigated the moving hazard.',
    snaplab:'You redirected around the crossing patrol.',planbasics:'Your first planned route worked.',
    efficient:'You found a precise path through both blocks.',snapchoice:'Your well-timed correction saved the run.',
    liveahead:'You kept the line moving ahead of your runner.',liveflow:'You kept flowing through the moving corridor.'
  };
  assignText('resultMessage',completion[course.id]??'You made it from start to finish.');
  assignText('resultCourseLabel',`${course.family==='practice'?'PRACTICE':'COURSE'} ${String(ordinal).padStart(2,'0')}`);
  assignText('resultCourseTitle',course.title.toUpperCase());
  assignText('resultInk',String(Math.round(route.length)));
  assignText('resultTime',(run.ticks*FIXED_STEP).toFixed(2));
  assignText('resultAttempts',String(attempts));
  progress=recordWin(progress,mode,course.id,run.ticks,route.length);
  const persisted=writeProgress(localStore,progress);
  const best=progress[progressId(mode,course.id)];
  assignText('resultDetail',`${MODE_COPY[mode].name} • ${best?.wins??1} clear${(best?.wins??1)===1?'':'s'} • best ${((best?.bestTimeTicks??run.ticks)*FIXED_STEP).toFixed(2)}s${persisted?'':' • this session only'}`);
  const next=document.querySelector<HTMLButtonElement>('#nextDemo');
  if(next)next.innerHTML=nextCourse(mode,course.id)?'NEXT COURSE <span>➜</span>':'COURSE SELECT <span>➜</span>';
  showView('result');
}
const courseList=document.getElementById('courseCards');
const courseHeading=document.getElementById('courseModeHeading');
const courseSummary=document.getElementById('courseSummary');
if(!courseList||!courseHeading||!courseSummary)throw new Error('P6.1 course catalog missing');
function showCourseMenu():void{
  courseHeading!.textContent=MODE_COPY[mode].name;
  guideFromCourses!.setAttribute('aria-label',`How to play ${MODE_COPY[mode].name}`);
  courseSummary!.textContent=`${completedInMode(progress,mode)} / ${coursesForMode(mode).length} cleared locally`;
  const storageNote=document.querySelector<HTMLElement>('#storageNote');
  if(storageNote)storageNote.textContent=localStore?'Progress is stored by this browser when storage is permitted.':'Storage unavailable: progress lasts only for this session.';
  courseList!.replaceChildren();
  for(const [index,entry] of coursesForMode(mode).entries()){
    const button=document.createElement('button');button.type='button';button.className='course-card';
    const saved=progress[progressId(mode,entry.id)];
    const overline=document.createElement('small');overline.textContent=`COURSE ${String(index+1).padStart(2,'0')}  ·  ${entry.family==='practice'?'PRACTICE':entry.family==='signature'?'SIGNATURE':'CHALLENGE'}`;
    const title=document.createElement('strong');title.textContent=entry.title;
    const details=document.createElement('span');details.textContent=saved?`✓ CLEARED · ${saved.wins} WIN${saved.wins===1?'':'S'} · BEST ${(saved.bestTimeTicks*FIXED_STEP).toFixed(2)}s`:'NOT YET CLEARED';
    button.append(overline,title,details);
    button.addEventListener('click',()=>{newCourse(entry.id);showView('game');if(!guideHistory[mode])openModeGuide(btnHelp);});
    courseList!.append(button);
  }
  showView('courses');
}
document.getElementById('startDemo')?.addEventListener('click',showCourseMenu);
document.getElementById('courseBack')?.addEventListener('click',()=>showView('home'));
document.getElementById('resetProgress')?.addEventListener('click',()=>{
  if(!window.confirm('Clear saved course results for all three modes on this device?'))return;
  progress={};clearProgress(localStore);showCourseMenu();
});
document.getElementById('nextDemo')?.addEventListener('click',()=>{
  const next=nextCourse(mode,course.id);
  if(next){newCourse(next.id);showView('game');}else showCourseMenu();
});
document.getElementById('retryResult')?.addEventListener('click',()=>{newCourse(course.id,false);showView('game');});
document.getElementById('resultHome')?.addEventListener('click',()=>showView('home'));
document.getElementById('backToHome')?.addEventListener('click',()=>showView('home'));
guideFromCourses!.addEventListener('click',()=>openModeGuide(guideFromCourses!));
btnHelp.addEventListener('click',()=>openModeGuide(btnHelp));
guideGo!.addEventListener('click',()=>closeModeGuide('viewed'));
guideSkip!.addEventListener('click',()=>closeModeGuide('skipped'));
document.addEventListener('keydown',e=>{
  if(howto.hidden)return;
  if(e.key==='Escape'){e.preventDefault();closeModeGuide('skipped');return;}
  if(e.key==='Tab'){
    const active=document.activeElement;
    if(e.shiftKey&&active===guideGo){e.preventDefault();guideSkip!.focus();}
    else if(!e.shiftKey&&active===guideSkip){e.preventDefault();guideGo!.focus();}
  }
});
showView('home');selectMode('a');
Object.assign(window,{__p2Refine:()=>({view:appView,course:course.id,phase:phase(),ink:Math.round(route?.length??lengthOf(draft)),attempts,mode,snapSpent,liveComplete,liveWaitingTicks,resultDuration:run?.ticks?Number((run.ticks*FIXED_STEP).toFixed(2)):null}),
  __p61Snapshot:()=>({view:appView,mode,course:course.id,available:coursesForMode(mode).map(c=>c.id),cleared:completedInMode(progress,mode),progress:JSON.parse(JSON.stringify(progress))}),
  __p62Snapshot:()=>({view:appView,mode,course:course.id,guideOpen:!howto.hidden,guideTitle:guideTitle?.textContent,guideSteps:guideSteps?.children.length,guideHistory:{...guideHistory}}),
  __p63Snapshot:()=>({view:appView,mode,course:course.id,courseCount:coursesForMode(mode).length,eligible:coursesForMode(mode).map(c=>c.id),courseOptions:Array.from(sel.options).map(o=>o.value),resultTitle:document.getElementById('resultCourseTitle')?.textContent,progress:JSON.parse(JSON.stringify(progress))})});
