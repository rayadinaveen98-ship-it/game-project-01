import test from 'node:test';
import assert from 'node:assert/strict';
import {COURSES} from '../dist/src/game/courses.js';
import {validateRoute,simulateToEnd,beginRun,advanceRun,FIXED_STEP} from '../dist/src/core/simulation.js';
import {lengthOf} from '../dist/src/core/geometry.js';
const [a,b]=COURSES;
const safe=[a.start,{x:310,y:550},a.finish];
const straight=[a.start,a.finish];
const route=(pts)=>({points:pts,length:lengthOf(pts)});

test('both course definitions work with a safe right-side route',()=>{
 for(const c of COURSES){
  const p=[c.start,{x:310,y:550},c.finish];
  const checked=validateRoute(p,c);
  assert.equal(checked.ok,true,c.id);
  const res=simulateToEnd(checked.route,c);
  assert.equal(res.phase,'won',`${c.id}: ${res.failure}`);
  assert.equal(res.ticks>0,true);
 }
});
test('static detour catches visible straight-line collision',()=>{
 const check=validateRoute(straight,a); assert.equal(check.ok,true);
 const result=simulateToEnd(check.route,a);
 assert.equal(result.phase,'lost');
 assert.equal(result.failure,'Hit a solid obstacle.');
});
test('route validation rejects invalid start, goal, out-of-bounds, ink, NaN',()=>{
 const bad=[
  [{x:80,y:555},a.finish],
  [a.start,{x:250,y:300}],
  [a.start,{x:-3,y:700},a.finish],
  [a.start,{x:NaN,y:200},a.finish],
  [a.start,{x:320,y:500},{x:20,y:480},{x:320,y:400},{x:20,y:300},a.finish]
 ];
 for(const pts of bad)assert.equal(validateRoute(pts,a).ok,false,JSON.stringify(pts));
});
test('two runs with identical inputs have exactly identical deterministic outcomes',()=>{
 const p=route(safe);
 const one=simulateToEnd(p,a),two=simulateToEnd(p,a);
 assert.deepEqual(one,two);
 const stage2=[b.start,{x:170,y:330},b.finish];
 const x=simulateToEnd(route(stage2),b),y=simulateToEnd(route(stage2),b);
 assert.deepEqual(x,y);
 assert.ok(['won','lost'].includes(x.phase));
});
test('runner fixed step advances exact time and refuses variable timestep',()=>{
 const initial=beginRun(route(safe),a);
 const next=advanceRun(initial,a,FIXED_STEP);
 assert.equal(next.ticks,1);
 assert.ok(Math.abs(next.distance-a.runnerSpeed*FIXED_STEP)<1e-9);
 assert.throws(()=>advanceRun(initial,a,0.03),/fixed timestep/);
});
test('moving hazard trajectory deterministic for initial course timing',()=>{
 const p=[b.start,{x:170,y:330},b.finish];
 const input=validateRoute(p,b);
 assert.equal(input.ok,true);
 const x=simulateToEnd(input.route,b);
 assert.equal(x.phase,'lost');
 assert.ok(x.failure?.includes('hazard') || x.failure?.includes('obstacle'));
});
