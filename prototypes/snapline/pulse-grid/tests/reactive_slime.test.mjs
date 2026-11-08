import test from 'node:test';
import assert from 'node:assert/strict';
import {SlimeField} from '../dist/src/ui/slime.js';
import {getCourse} from '../dist/src/game/courses.js';
import {validateRoute,beginRun,advanceRun,simulateToEnd} from '../dist/src/core/simulation.js';
const P=(x,y)=>({x,y});
const course=getCourse('planbasics');
const check=validateRoute([course.start,P(47,415),P(57,275),P(285,265),course.finish],course);
if(!check.ok)throw new Error(check.reason);
const start=()=>beginRun(check.route,course);

test('M2 idle slime is settled with no fabricated runner wake',()=>{
 const f=new SlimeField();for(let i=0;i<240;i++)f.step();
 assert.equal(f.deposits,0);assert.equal(f.energy(),0);
 assert.deepEqual(f.displacement(170,310),{x:0,y:0});
});
test('M2 real world-space runner motion emits a continuous viscous wake',()=>{
 const f=new SlimeField();let run=start();f.observeRunner(run);
 for(let i=0;i<100;i++){run=advanceRun(run,course);f.observeRunner(run);}
 assert.ok(f.deposits>0);assert.ok(f.traveled>0);assert.ok(f.energy()>0);
 assert.ok(f.trails.length>0);
 const hit=f.displacement(run.position.x,run.position.y);
 assert.ok(Number.isFinite(hit.x)&&Number.isFinite(hit.y));
});
test('M2 paused and unchanged simulation tick never deposit new slime',()=>{
 const f=new SlimeField();let run=start();f.observeRunner(run);
 for(let i=0;i<45;i++){run=advanceRun(run,course);f.observeRunner(run);}
 const before=f.deposits;
 for(let i=0;i<75;i++){f.observeRunner({...run,phase:'paused'});f.step();}
 assert.equal(f.deposits,before);
 assert.ok(f.energy()>=0);
});
test('M2 thick material decays gradually and vanishes after 2.4 seconds',()=>{
 const f=new SlimeField();let run=start();f.observeRunner(run);
 for(let i=0;i<130;i++){run=advanceRun(run,course);f.observeRunner(run);}
 const initial=f.energy();assert.ok(initial>0);
 for(let i=0;i<70;i++)f.step();assert.ok(f.energy()>0);assert.ok(f.energy()<initial);
 for(let i=0;i<100;i++)f.step();assert.equal(f.energy(),0);assert.equal(f.trails.length,0);
});
test('M2 collision makes a local visual splash without mutating the runner',()=>{
 const f=new SlimeField();let run=start();f.observeRunner(run);
 const saved=JSON.stringify(run);
 f.observeRunner({...run,phase:'lost',position:P(171,286),ticks:run.ticks+1});
 assert.equal(f.pulses.length,1);assert.ok(f.energy()>2);
 assert.equal(JSON.stringify(run),saved);
 assert.equal(simulateToEnd(check.route,course).phase,'won');
});
test('M2 wake is bounded under thousands of field updates and collision bursts',()=>{
 const f=new SlimeField();let run=start();f.observeRunner(run);
 for(let i=0;i<2500;i++){
  run=advanceRun(run,course);if(run.phase==='won'||run.phase==='lost'){run=start();f.observeRunner(null);}
  f.observeRunner(run);
  if(i%45===0)f.pushPulse(P(80+i%180,80+i%350),8);
  f.step();
  const d=f.displacement(i%360,i%640);
  assert.ok(Number.isFinite(d.x)&&Number.isFinite(d.y)&&Math.abs(d.x)<=18&&Math.abs(d.y)<=18);
 }
 assert.ok(f.trails.length<=54&&f.pulses.length<=9);
 assert.ok(Number.isFinite(f.energy()));
});
test('M2 course reset and material switch clears all reactive state',()=>{
 const f=new SlimeField();f.pushPulse(P(90,155),3.4);f.step();assert.ok(f.energy()>0);
 f.reset();assert.deepEqual(f.snapshot(),{energy:0,deposits:0,traveled:0,trails:0,pulses:0,tick:0});
 assert.deepEqual(f.displacement(90,155),{x:0,y:0});
});
test('M2 visual response is not driven by arbitrary finger coordinates',()=>{
 const f=new SlimeField();let run=start();
 f.observeRunner(run);for(let i=0;i<5;i++){f.displacement(100+i*40,160);f.step();}
 assert.equal(f.deposits,0);assert.equal(f.traveled,0);
});
