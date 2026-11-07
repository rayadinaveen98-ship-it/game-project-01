import test from 'node:test';
import assert from 'node:assert/strict';
import {COURSES} from '../dist/src/game/courses.js';
import {beginRun,advanceRun,simulateToEnd} from '../dist/src/core/simulation.js';
import {lengthOf,distance,pointAtDistance} from '../dist/src/core/geometry.js';
import {createSnapPlan,previewSnap,pathPrefix,pathSuffix,replayWithSnap} from '../dist/src/core/snap.js';
const c=COURSES[0];
const safePts=[c.start,{x:310,y:550},c.finish];
const route={points:safePts,length:lengthOf(safePts)};
const advance=(run,n)=>{for(let i=0;i<n;i++)run=advanceRun(run,c);return run};
const pause=(run)=>({...run,phase:'paused'});

test('prefix and suffix preserve path positions, without deleting ends',()=>{
  const p=pathPrefix(safePts,110),s=pathSuffix(safePts,260);
  assert.deepEqual(p[0],safePts[0]);
  assert.deepEqual(s.at(-1),safePts.at(-1));
  assert.ok(distance(p.at(-1),pointAtDistance(safePts,110))<1e-6);
  assert.ok(distance(s[0],pointAtDistance(safePts,260))<1e-6);
});
test('snap plan ahead of runner; impossible near finish',()=>{
  const run=advance(beginRun(route,c),35);
  const p=createSnapPlan(run);assert.ok(p);
  assert.ok(p.leadDistance>run.distance && p.pivotDistance>p.leadDistance && p.tailDistance>p.pivotDistance);
  const tooLate={...run,distance:route.length-100,position:pointAtDistance(route.points,route.length-100)};
  assert.equal(createSnapPlan(tooLate),null);
});
test('valid snap preserves runner world position and already traversed geometry EXACTLY',()=>{
  const before=advance(beginRun(route,c),30),plan=createSnapPlan(before);
  const target={x:280,y:470};
  const applied=previewSnap(pause(before),c,plan,target);
  assert.ok(applied.ok,applied.reason);
  assert.deepEqual(applied.run.position,before.position);
  assert.equal(applied.run.distance,before.distance);
  assert.equal(applied.run.ticks,before.ticks);
  assert.ok(distance(pointAtDistance(applied.route.points,before.distance),before.position)<1e-6);
  assert.ok(applied.route.length<=c.maxInk);
  assert.ok(!Number.isNaN(applied.lengthDelta));
  assert.equal(applied.route.points[0].x,c.start.x);
  assert.equal(applied.route.points.at(-1).x,c.finish.x);
});
test('invalid snap targets reject without mutating original run',()=>{
  const before=advance(beginRun(route,c),30),plan=createSnapPlan(before);
  const copy=JSON.stringify(before);
  for(const t of [{x:-10,y:300},{x:NaN,y:300},plan.anchor,{x:130,y:335}]){
    const result=previewSnap(pause(before),c,plan,t);
    assert.equal(result.ok,false,`expected rejection ${JSON.stringify(t)}`);
  }
  assert.equal(JSON.stringify(before),copy);
  assert.equal(previewSnap(before,c,plan,{x:280,y:470}).ok,false,'must pause before edit');
});
test('same correction at same fixed tick produces an identical deterministic replay',()=>{
  const initial=beginRun(route,c),early=advance(initial,30),p=createSnapPlan(early);
  const target={x:280,y:470},check=previewSnap(pause(early),c,p,target);
  assert.ok(check.ok,check.reason);
  const manual=simulateFrom({...check.run,phase:'running'});
  const replay1=replayWithSnap(initial,c,{tick:30,target});
  const replay2=replayWithSnap(initial,c,{tick:30,target});
  assert.deepEqual(replay1,manual);
  assert.deepEqual(replay2,replay1);
  assert.ok(['won','lost'].includes(replay1.phase));
});
function simulateFrom(run){for(let n=0;n<30000&&run.phase==='running';n++)run=advanceRun(run,c);return run;}
