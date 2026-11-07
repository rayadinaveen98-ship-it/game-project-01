import test from 'node:test';
import assert from 'node:assert/strict';
import {COURSES} from '../dist/src/game/courses.js';
import {appendLivePoint,adoptLiveRoute,advanceLiveRun,LIVE_GRACE_TICKS,LIVE_LAUNCH_LENGTH} from '../dist/src/core/live.js';
import {beginRun,FIXED_STEP} from '../dist/src/core/simulation.js';
import {distance,pointAtDistance} from '../dist/src/core/geometry.js';
const [course,hazard]=COURSES;
const draw=(prev,p,c=course)=>{const r=appendLivePoint(prev,p,c);assert.equal(r.ok,true,r.reason);return r.route};
const safe=[course.start,{x:310,y:550},course.finish];
function exhaust(run,c,complete){let waiting=0;for(let t=0;t<30000&&run.phase==='running';t++){const x=advanceLiveRun(run,c,complete,waiting);run=x.run;waiting=x.waitingTicks;}return run}

test('P5 live trail validates start, wall clearance, ink, and board bounds',()=>{
 assert.equal(appendLivePoint([], {x:90,y:555},course).ok,false);
 const start=draw([],course.start);
 assert.equal(appendLivePoint(start.points,{x:125,y:330},course).ok,false,'coral wall must reject');
 assert.equal(appendLivePoint(start.points,{x:-1,y:555},course).ok,false);
 const long=draw(start.points,{x:310,y:550});
 const long2=draw(long.points,{x:310,y:0});
 assert.equal(appendLivePoint(long2.points,{x:310,y:620},course).ok,false,'must not accept overlong route');
 assert.deepEqual(long.points[0],course.start);
});

test('P5 live drawing starts on a partial route and runner follows extensions to finish',()=>{
 let r=draw([],course.start);
 r=draw(r.points,{x:140,y:551});
 assert.ok(r.length>=LIVE_LAUNCH_LENGTH);
 assert.equal(distance(r.points.at(-1),course.finish)>32,true);
 let run=beginRun(r,course),wait=0;
 for(let t=0;t<25;t++){const a=advanceLiveRun(run,course,false,wait);run=a.run;wait=a.waitingTicks}
 const previous=structuredClone(run);
 const extension=draw(r.points,{x:310,y:550});
 run=adoptLiveRoute(run,extension);
 assert.equal(run.ticks,previous.ticks);assert.equal(run.distance,previous.distance);
 assert.deepEqual(run.position,previous.position);
 const complete=appendLivePoint(extension.points,course.finish,course);
 assert.equal(complete.ok,true);assert.equal(complete.completed,true);
 run=adoptLiveRoute(run,complete.route);
 assert.equal(exhaust(run,course,true).phase,'won');
});

test('P5 live tip timeout occurs at exact deterministic tick count with stationary tip',()=>{
 let r=draw([],course.start);r=draw(r.points,{x:150,y:550});
 let run=beginRun(r,course),waiting=0,tipPosition=null,tipTick=null;
 for(let i=0;i<1000&&run.phase==='running';i++){
  const x=advanceLiveRun(run,course,false,waiting);run=x.run;waiting=x.waitingTicks;
  if(waiting===1){tipPosition=run.position;tipTick=run.ticks;}
 }
 assert.equal(run.phase,'lost');assert.match(run.failure,/end of your line/);
 assert.equal(run.ticks,tipTick+LIVE_GRACE_TICKS-1);
 assert.deepEqual(run.position,tipPosition);
});

test('P5 path editing never changes points behind the runner',()=>{
 const a=draw([],course.start),b=draw(a.points,{x:140,y:550}),c=draw(b.points,{x:310,y:550});
 let run=beginRun(c,course);for(let i=0;i<65;i++)run=advanceLiveRun(run,course,false,0).run;
 const extended=draw(c.points,course.finish);
 const next=adoptLiveRoute(run,extended);
 assert.deepEqual(next.route.points.slice(0,run.route.points.length),run.route.points);
 assert.ok(distance(pointAtDistance(next.route.points,run.distance),run.position)<1e-8);
 assert.throws(()=>adoptLiveRoute(run,{...extended,points:extended.points.map((p,i)=>i===1?{x:143,y:555}:p)}),/Cannot alter/);
 assert.throws(()=>adoptLiveRoute(run,b),/Cannot erase/);
});

test('P5 live input is deterministic for repeated same path and timed extension',()=>{
 const initial=draw(draw([],course.start).points,{x:140,y:550});
 const extended=draw(draw(initial.points,{x:310,y:550}).points,course.finish);
 function replay(){let r=beginRun(initial,course),w=0;
  for(let k=0;k<50;k++){const x=advanceLiveRun(r,course,false,w);r=x.run;w=x.waitingTicks}
  r=adoptLiveRoute(r,extended);
  return exhaust(r,course,true);
 }
 assert.deepEqual(replay(),replay());assert.equal(replay().phase,'won');
});

test('P5 mobile-sized motion hazards remain dangerous during the grace window',()=>{
 const position={x:182,y:303};
 const route={points:[hazard.start,{x:182,y:303}],length:300};
 const run={...beginRun(route,hazard),position,distance:route.length,ticks:0};
 const res=exhaust(run,hazard,false);
 assert.equal(res.phase,'lost');assert.match(res.failure,/moving hazard/);
});
