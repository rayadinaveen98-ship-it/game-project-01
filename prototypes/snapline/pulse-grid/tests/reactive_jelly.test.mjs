import test from 'node:test';
import assert from 'node:assert/strict';
import {JellyField} from '../dist/src/ui/jelly.js';
import {getCourse} from '../dist/src/game/courses.js';
import {validateRoute,beginRun,advanceRun,simulateToEnd} from '../dist/src/core/simulation.js';

const P=(x,y)=>({x,y});
const plan=getCourse('planbasics');
const safe=[plan.start,P(47,415),P(57,275),P(285,265),plan.finish];
const validated=validateRoute(safe,plan);if(!validated.ok)throw Error(validated.reason);

// All tests exercise a pure visual spring lattice; runner geometry is the source of truth.
test('M1: still jelly has zero energy and does not emit artificial movement ripples',()=>{
 const f=new JellyField();for(let i=0;i<120;i++)f.step();
 assert.equal(f.energy(),0);assert.equal(f.impulseCount,0);assert.equal(f.ripples.length,0);
});
test('M1: actual advanced runner injects waves only when world position changes',()=>{
 const f=new JellyField();let r=beginRun(validated.route,plan);
 f.observeRunner(r);assert.equal(f.impulseCount,0);
 for(let i=0;i<15;i++)r=advanceRun(r,plan);
 f.observeRunner(r);assert.ok(f.energy()>0);assert.ok(f.impulseCount>0);
 const a=f.impulseCount;f.observeRunner({...r,phase:'paused'});
 for(let i=0;i<10;i++)f.step();assert.equal(f.impulseCount,a);
 assert.ok(f.snapshot().traveled>0);
});
test('M1: collision creates a larger visual burst but leaves failure and route unchanged',()=>{
 const f=new JellyField();let r=beginRun(validated.route,plan);f.observeRunner(r);
 const input=JSON.stringify(r);
 f.kick(P(150,250),9);for(let i=0;i<5;i++)f.step();
 assert.equal(JSON.stringify(r),input);
 const failure={...r,phase:'lost',position:P(145,300),ticks:5,failure:'Hit a solid obstacle.'};
 f.observeRunner(failure);
 assert.equal(f.ripples.length,1);assert.ok(f.energy()>0);
});
test('M1: 1400 spring ticks stay finite/bounded after repeated hard impulses',()=>{
 const f=new JellyField();for(let i=0;i<1400;i++){
  if(i%11===0)f.kick(P(60+(i%220),80+(i%420)),16);
  f.step();
 }
 for(const x of f.height)assert.ok(Number.isFinite(x)&&Math.abs(x)<=19);
 assert.ok(Number.isFinite(f.energy()));assert.ok(f.ripples.length<=20);
});
test('M1: switching to a new course clears visual state without touching gameplay',()=>{
 const f=new JellyField();f.kick(P(160,300),6);f.step();assert.ok(f.energy()>0);
 f.reset();assert.equal(f.energy(),0);assert.equal(f.impulseCount,0);assert.equal(f.traveled,0);
 assert.equal(simulateToEnd(validated.route,plan).phase,'won');
});
test('M1: jelly sampling is continuous, finite, and clipped to the board',()=>{
 const f=new JellyField();f.kick(P(170,350),8);f.step();
 assert.ok(Math.abs(f.sample(170,350)-f.sample(171,351))<5);
 for(const q of [[-10,-10],[500,800],[0,0],[180,320]])assert.ok(Number.isFinite(f.sample(...q)));
});
