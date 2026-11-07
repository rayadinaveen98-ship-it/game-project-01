import type {Course,Route,Run,Vec} from './types.js';
import {distance,isValidVec,lengthOf,movingCircleHitsSegment,pointAtDistance,segmentHitsRect} from './geometry.js';
import {RUNNER_RADIUS,hazardPosition} from '../game/courses.js';

export const FIXED_STEP=1/120;
export const START_ZONE=28, GOAL_ZONE=32;
const MAX_POINTS=5000;
export type RouteCheck = {ok:true;route:Route} | {ok:false;reason:string};
export function validateRoute(points:readonly Vec[],course:Course):RouteCheck{
  if(points.length<2) return {ok:false,reason:'Draw a route from START to FINISH.'};
  if(points.length>MAX_POINTS)return {ok:false,reason:'Too many points. Use one smoother stroke.'};
  if(points.some(p=>!isValidVec(p)||p.x<0||p.y<0||p.x>360||p.y>640))return {ok:false,reason:'Route must stay inside the course.'};
  if(distance(points[0]!,course.start)>START_ZONE)return {ok:false,reason:'Begin your line inside the START circle.'};
  if(distance(points[points.length-1]!,course.finish)>GOAL_ZONE)return {ok:false,reason:'End your line inside the FINISH circle.'};
  const total=lengthOf(points);
  if(total<20)return {ok:false,reason:'Your route is too short.'};
  if(total>course.maxInk+1e-7)return {ok:false,reason:`Ink exceeded by ${Math.ceil(total-course.maxInk)} units.`};
  return {ok:true,route:{points:points.map(p=>({x:p.x,y:p.y})),length:total}};
}
export function beginRun(route:Route,course:Course):Run{
  if(route.points.length<2||route.length<=0)throw new Error('route not valid');
  return {phase:'running',route,distance:0,ticks:0,position:{...route.points[0]!},failure:null,courseId:course.id};
}
export function advanceRun(run:Run,course:Course,dt=FIXED_STEP):Run{
  if(run.phase!=='running')return run;
  if(run.courseId!==course.id)throw new Error('course changed during attempt');
  if(Math.abs(dt-FIXED_STEP)>1e-12)throw new Error('use fixed timestep');
  const prev=run.position,nd=Math.min(run.distance+dt*course.runnerSpeed,run.route.length);
  const next=pointAtDistance(run.route.points,nd);
  const t0=run.ticks*dt,t1=(run.ticks+1)*dt;
  for(const wall of course.walls){
    if(segmentHitsRect(prev,next,wall,RUNNER_RADIUS))
      return {...run,phase:'lost',position:next,distance:nd,ticks:run.ticks+1,failure:'Hit a solid obstacle.'};
  }
  for(const h of course.moving){
    if(movingCircleHitsSegment(prev,next,hazardPosition(h,t0),hazardPosition(h,t1),RUNNER_RADIUS+h.radius))
      return {...run,phase:'lost',position:next,distance:nd,ticks:run.ticks+1,failure:'Hit the moving hazard.'};
  }
  if(nd>=run.route.length-1e-8){
    if(distance(next,course.finish)<=GOAL_ZONE) return {...run,phase:'won',position:next,distance:nd,ticks:run.ticks+1,failure:null};
    return {...run,phase:'lost',position:next,distance:nd,ticks:run.ticks+1,failure:'Missed the finish zone.'};
  }
  return {...run,position:next,distance:nd,ticks:run.ticks+1};
}
export function simulateToEnd(route:Route,course:Course,maxTicks=30000):Run{
  let run=beginRun(route,course);
  for(let i=0;i<maxTicks&&run.phase==='running';i++)run=advanceRun(run,course);
  return run;
}
