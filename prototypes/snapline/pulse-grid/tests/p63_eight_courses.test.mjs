import test from 'node:test';
import assert from 'node:assert/strict';
import {COURSES,getCourse,SECOND_CHANCE_GUIDE,SNAP_LAB_GUIDE} from '../dist/src/game/courses.js';
import {coursesForMode,isAccessibleCourse,MODE_COURSE_ORDER,nextCourse} from '../dist/src/game/catalog.js';
import {validateRoute,simulateToEnd,beginRun,advanceRun} from '../dist/src/core/simulation.js';
import {createSnapPlan,previewSnap,replayWithSnap} from '../dist/src/core/snap.js';
import {appendLivePoint,adoptLiveRoute,advanceLiveRun,LIVE_LAUNCH_LENGTH} from '../dist/src/core/live.js';
import {distance,lengthOf,pointAtDistance} from '../dist/src/core/geometry.js';
import {recordWin,writeProgress,readProgress,completedInMode} from '../dist/src/game/progress.js';

const P=(x,y)=>({x,y});
const start=P(38,555),finish=P(319,87);
// Authored continuous safe routes are implementation QA fixtures, not fake progress statistics.
const safe={
 planbasics:[start,P(47,415),P(57,275),P(285,265),finish],
 efficient:[start,P(42,290),P(320,280),finish],
 liveahead:[start,P(40,305),P(315,292),finish],
 liveflow:[start,P(44,280),P(315,278),finish]
};
function checked(id,points){const c=getCourse(id),v=validateRoute(points,c);assert.equal(v.ok,true,`${id}: ${v.reason}`);return [c,v.route]}

 test('P6.3: exactly eight unique level IDs and twelve legal mode/course assignments',()=>{
  assert.equal(COURSES.length,8);
  assert.equal(new Set(COURSES.map(c=>c.id)).size,8);
  assert.deepEqual(COURSES.slice(0,3).map(c=>c.id),['detour','timing','snaplab']);
  assert.equal(coursesForMode('a').length,4);assert.equal(coursesForMode('b').length,4);assert.equal(coursesForMode('c').length,4);
  assert.deepEqual(coursesForMode('a').map(c=>c.id),MODE_COURSE_ORDER.a);
  assert.deepEqual(coursesForMode('b').map(c=>c.id),MODE_COURSE_ORDER.b);
  assert.deepEqual(coursesForMode('c').map(c=>c.id),MODE_COURSE_ORDER.c);
  assert.equal(coursesForMode('a').length+coursesForMode('b').length+coursesForMode('c').length,12);
  assert.equal(COURSES.filter(c=>c.family==='shared').length,2);
  assert.equal(COURSES.filter(c=>c.family==='practice').length,3);
  assert.equal(COURSES.filter(c=>c.family==='signature').length,3);
 });

test('P6.3: forbidden levels never leak to another mode, and mode-specific navigation never wraps',()=>{
 for(const mode of ['a','b','c']){
  const list=coursesForMode(mode);const ids=new Set(list.map(c=>c.id));
  assert.equal(ids.size,4);assert.ok(list.every(c=>isAccessibleCourse(mode,c.id)));
  for(let i=0;i<list.length-1;i++)assert.equal(nextCourse(mode,list[i].id)?.id,list[i+1].id);
  assert.equal(nextCourse(mode,list.at(-1).id),null);
 }
 for(const c of COURSES.filter(x=>x.family!=='shared')){
  for(const mode of ['a','b','c'])assert.equal(isAccessibleCourse(mode,c.id),c.supportedModes.includes(mode));
 }
});

test('P6.3: each A and C new level has a continuous obstacle-free route that wins within budget',()=>{
 for(const [id,points] of Object.entries(safe)){
  const [c,r]=checked(id,points);
  assert.ok(r.length<c.maxInk,`${id}: route budget too strict`);
  const outcome=simulateToEnd(r,c);
  assert.equal(outcome.phase,'won',`${id}: ${outcome.failure}`);
  assert.ok(outcome.ticks>0&&outcome.ticks<20000);
 }
});

test('P6.3: both C courses accept the actual spaced finger-trail path and can finish live',()=>{
 for(const id of ['liveahead','liveflow']){
  const c=getCourse(id);const points=safe[id];let route=null;
  for(const p of points){const check=appendLivePoint(route?.points??[],p,c);assert.equal(check.ok,true,`${id}: ${check.reason}`);route=check.route;}
  assert.ok(route.length>=LIVE_LAUNCH_LENGTH);
  const initial=appendLivePoint(appendLivePoint([],points[0],c).route.points,points[1],c).route;
  let run=beginRun(initial,c),waiting=0;
  for(let i=0;i<30;i++){const step=advanceLiveRun(run,c,false,waiting);run=step.run;waiting=step.waitingTicks;}
  const previous={ticks:run.ticks,position:run.position};
  const edited=adoptLiveRoute(run,route);
  assert.deepEqual(edited.position,previous.position);
  assert.equal(edited.ticks,previous.ticks);
  run=edited;
  for(let i=0;i<30000&&run.phase==='running';i++){
   const next=advanceLiveRun(run,c,true,waiting);run=next.run;waiting=next.waitingTicks;
  }
  assert.equal(run.phase,'won',`${id}: ${run.failure}`);
 }
});

test('P6.3: distinct B signature guide fails without snap, timely left snap rescues deterministically',()=>{
 const [course,guide]=checked('snapchoice',SECOND_CHANCE_GUIDE);
 const noSnap=simulateToEnd(guide,course);
 assert.equal(noSnap.phase,'lost');assert.match(noSnap.failure,/moving hazard/);
 const first=beginRun(guide,course);
 let runner=first;for(let i=0;i<210;i++)runner=advanceRun(runner,course);
 assert.equal(runner.phase,'running');
 const plan=createSnapPlan(runner);assert.ok(plan);
 const target=P(180,250);
 const preview=previewSnap({...runner,phase:'paused'},course,plan,target);
 assert.ok(preview.ok,preview.reason);
 assert.ok(preview.route.length<=course.maxInk);
 assert.deepEqual(preview.run.position,runner.position);
 assert.equal(preview.run.distance,runner.distance);
 assert.equal(preview.run.ticks,runner.ticks);
 const win=replayWithSnap(first,course,{tick:210,target});
 assert.equal(win.phase,'won',win.failure);
 assert.deepEqual(win,replayWithSnap(first,course,{tick:210,target}));
 const late=(()=>{let run=first;for(let i=0;i<260&&run.phase==='running';i++)run=advanceRun(run,course);return run})();
 assert.notEqual(late.phase,'won','guide must not be accidentally winnable without snap');
});

test('P6.3: B signature invalid corrections do not mutate the route',()=>{
 const [c,r]=checked('snapchoice',SECOND_CHANCE_GUIDE);let run=beginRun(r,c);
 for(let i=0;i<210;i++)run=advanceRun(run,c);
 const plan=createSnapPlan(run);const immutable=JSON.stringify(run);
 for(const p of [P(-1,140),P(110,405),P(plan.anchor.x,plan.anchor.y),P(NaN,250)]){
  const x=previewSnap({...run,phase:'paused'},c,plan,p);
  assert.equal(x.ok,false,`unexpected snap accepted ${JSON.stringify(p)}`);
  assert.equal(JSON.stringify(run),immutable);
 }
});

test('P6.3: old original B practice and original shared geometry are preserved',()=>{
 const old=COURSES.slice(0,3);assert.deepEqual(old.map(c=>c.id),['detour','timing','snaplab']);
 assert.deepEqual(old[0].walls,[{x:93,y:305,w:170,h:75},{x:177,y:152,w:70,h:82}]);
 assert.equal(old[1].moving[0].axis,'y');
 assert.equal(simulateToEnd(checked('snaplab',SNAP_LAB_GUIDE)[1],old[2]).phase,'lost');
});

test('P6.3: local results for each new course remain isolated by mode, original keys still load',()=>{
 let p={};p=recordWin(p,'a','planbasics',500,690);p=recordWin(p,'c','liveahead',550,730);
 p=recordWin(p,'b','snapchoice',650,833);
 const previous=p;
 assert.equal(recordWin(p,'a','liveahead',450,740),previous);
 assert.equal(recordWin(p,'c','efficient',450,740),previous);
 assert.equal(recordWin(p,'b','liveflow',450,740),previous);
 assert.equal(completedInMode(p,'a'),1);assert.equal(completedInMode(p,'b'),1);assert.equal(completedInMode(p,'c'),1);
 const data=new Map();const storage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)};
 assert.equal(writeProgress(storage,p),true);
 assert.deepEqual({...readProgress(storage)},p);
});
