import test from 'node:test';
import assert from 'node:assert/strict';
import {COURSES, SNAP_LAB_GUIDE} from '../dist/src/game/courses.js';
import {beginRun, advanceRun, simulateToEnd, validateRoute} from '../dist/src/core/simulation.js';
import {createSnapPlan,previewSnap,replayWithSnap} from '../dist/src/core/snap.js';
import {distance,pointAtDistance,lengthOf} from '../dist/src/core/geometry.js';
const lab=COURSES.find(c=>c.id==='snaplab');
const checked=validateRoute(SNAP_LAB_GUIDE,lab);
assert.ok(checked.ok,'Lab guide must remain within ink budget and touch the endpoints');
const first=beginRun(checked.route,lab);
function at(tick){let run=first;for(let i=0;i<tick;i++)run=advanceRun(run,lab);return run}
function pause(run){return {...run,phase:'paused'}}

test('P4 adds B-only practice definition without mutating the original two scored courses',()=>{
 assert.deepEqual(COURSES.map(c=>c.id),['detour','timing','snaplab']);
 assert.equal(lab.maxInk,870);
 assert.equal(lengthOf(SNAP_LAB_GUIDE)<lab.maxInk,true);
 assert.equal(COURSES[0].walls.length,2);
 assert.equal(COURSES[1].moving[0].axis,'y');
});
test('the explicitly illustrated guide really hits the moving patrol without a snap',()=>{
 const end=simulateToEnd(checked.route,lab);
 assert.equal(end.phase,'lost');
 assert.equal(end.failure,'Hit the moving hazard.');
});
test('one timely rightward snap rescues the SAME guide route with a deterministic win',()=>{
 const run=at(210),plan=createSnapPlan(run);
 assert.ok(plan);
 const target={x:330,y:303};
 const edit=previewSnap(pause(run),lab,plan,target);
 assert.ok(edit.ok,edit.reason);
 assert.ok(edit.route.length<=lab.maxInk);
 assert.deepEqual(edit.run.position,run.position);
 assert.equal(edit.run.ticks,run.ticks);
 const winner=replayWithSnap(first,lab,{tick:210,target});
 assert.equal(winner.phase,'won',winner.failure);
 assert.deepEqual(winner,replayWithSnap(first,lab,{tick:210,target}));
});
test('late snap is not retroactively helpful; collision remains real',()=>{
 const run=at(260),plan=createSnapPlan(run),target={x:330,y:303};
 const edit=previewSnap(pause(run),lab,plan,target);
 assert.ok(edit.ok,edit.reason);
 assert.equal(replayWithSnap(first,lab,{tick:260,target}).phase,'lost');
});
test('invalid snap does not mutate the run, position, source geometry or input',()=>{
 const run=at(210),plan=createSnapPlan(run),baseline=JSON.stringify(run);
 const targets=[{x:-1,y:300},{x:360,y:300},{x:120,y:412},{x:NaN,y:330},{x:plan.anchor.x,y:plan.anchor.y}];
 for(const target of targets){
  const edit=previewSnap(pause(run),lab,plan,target);
  assert.equal(edit.ok,false,`unexpected valid edit ${JSON.stringify(target)}`);
  assert.equal(JSON.stringify(run),baseline);
 }
});
test('seeded model fuzz: all accepted snaps preserve current runner coordinate, tick and ink',()=>{
 let seed=0x3f5a11ac;
 const rand=()=>{seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;return (seed>>>0)/2**32};
 let accepted=0,rejected=0;
 for(const tick of [20,80,145,200,225,265]){
  const run=at(tick),plan=createSnapPlan(run);
  assert.ok(plan);
  const src=JSON.stringify(run);
  for(let n=0;n<80;n++){
   const target={x:14+rand()*332,y:58+rand()*520};
   const result=previewSnap(pause(run),lab,plan,target);
   if(!result.ok){rejected++;continue}
   accepted++;
   assert.deepEqual(result.run.position,run.position);
   assert.equal(result.run.distance,run.distance);
   assert.equal(result.run.ticks,run.ticks);
   assert.ok(result.route.length<=lab.maxInk+1e-7);
   assert.ok(distance(pointAtDistance(result.route.points,run.distance),run.position)<1e-5);
   assert.equal(result.route.points.at(-1).x,lab.finish.x);
  }
  assert.equal(JSON.stringify(run),src);
 }
 assert.ok(accepted>30,`need nontrivial accepted edits, got ${accepted}`);
 assert.ok(rejected>30,`need nontrivial rejected edits, got ${rejected}`);
});
test('snap replay cannot forge an impossible event tick',()=>{
 assert.throws(()=>replayWithSnap(first,lab,{tick:-1,target:{x:330,y:303}}),/never reached/);
 assert.throws(()=>replayWithSnap(first,lab,{tick:10000,target:{x:330,y:303}},300),/never reached/);
});
