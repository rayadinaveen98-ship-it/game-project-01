/** GP-01 P5 experimental live trail; no new visual or physics engine. */
import type {Course,Run,Route,Vec} from './types.js';
import {distance,isValidVec,lengthOf,pointAtDistance,segmentHitsRect,movingCircleHitsSegment} from './geometry.js';
import {appendStroke} from '../game/drawing.js';
import {BOARD_WIDTH,BOARD_HEIGHT,RUNNER_RADIUS,hazardPosition} from '../game/courses.js';
import {advanceRun,FIXED_STEP,GOAL_ZONE} from './simulation.js';

export const LIVE_LAUNCH_LENGTH=85;
export const LIVE_GRACE_TICKS=90; // 0.75s at fixed 120Hz, with hazards still advancing.
export const LIVE_JOIN_RADIUS=29;
export type LiveAppend={ok:true;route:Route;completed:boolean}|{ok:false;reason:string};
/** Reject barrier crossings *before* committing a fresh visible stroke. */
export function appendLivePoint(points:readonly Vec[],target:Vec,course:Course):LiveAppend{
  if(!isValidVec(target)||target.x<0||target.x>BOARD_WIDTH||target.y<0||target.y>BOARD_HEIGHT)
    return {ok:false,reason:'Stay inside the course.'};
  if(points.length===0){
    if(distance(target,course.start)>29)return {ok:false,reason:'Start at S.'};
    return {ok:true,route:{points:[{...course.start}],length:0},completed:false};
  }
  if(points.length>4980)return {ok:false,reason:'Too many route points. Reset and redraw.'};
  const previous=points[points.length-1]!;
  const nextPoints=appendStroke(points,target,8);
  for(let k=points.length;k<nextPoints.length;k++){
    const a=nextPoints[k-1]!,b=nextPoints[k]!;
    if(course.walls.some(w=>segmentHitsRect(a,b,w,RUNNER_RADIUS)))
      return {ok:false,reason:'Trail cannot cross a coral wall.'};
  }
  const len=lengthOf(nextPoints);
  if(len>course.maxInk+1e-8)return {ok:false,reason:'Ink limit reached; redraw a shorter trail.'};
  return {ok:true,route:{points:nextPoints,length:len},completed:distance(nextPoints.at(-1)!,course.finish)<=GOAL_ZONE};
}
/** Append-only: current position and elapsed ticks stay fixed exactly. */
export function adoptLiveRoute(run:Run,route:Route):Run{
  if(route.length+1e-8<run.route.length)throw Error('Cannot erase traversed trail.');
  if(route.points.length<run.route.points.length)throw Error('Live route must append only.');
  for(let i=0;i<run.route.points.length;i++){
    if(distance(route.points[i]!,run.route.points[i]!)>1e-8)throw Error('Cannot alter existing trail points.');
  }
  if(distance(pointAtDistance(route.points,run.distance),run.position)>1e-5)
    throw Error('Live route update would teleport runner.');
  return {...run,route};
}
export interface LiveStep{run:Run;waitingTicks:number}
/** A stationary runner may wait at the line tip for 0.75s; this is SIMULATION time. */
export function advanceLiveRun(run:Run,course:Course,completed:boolean,waitingTicks:number):LiveStep{
  if(run.phase!=='running')return {run,waitingTicks};
  if(run.route.length-run.distance>1e-7){
    const progressed=advanceRun(run,course,FIXED_STEP,true);
    const atTip=!completed&&progressed.phase==='running'&&progressed.route.length-progressed.distance<=1e-7;
    return {run:progressed,waitingTicks:atTip?1:0};
  }
  if(completed){ // P1 reaches FINISH on the last moving tick, so no premature win in waiting state.
    const won=distance(run.position,course.finish)<=GOAL_ZONE;
    return {run:{...run,phase:won?'won':'lost',failure:won?null:'Missed finish zone.'},waitingTicks:0};
  }
  const t0=run.ticks*FIXED_STEP,t1=(run.ticks+1)*FIXED_STEP;
  if(course.moving.some(h=>movingCircleHitsSegment(run.position,run.position,hazardPosition(h,t0),hazardPosition(h,t1),RUNNER_RADIUS+h.radius)))
    return {run:{...run,phase:'lost',ticks:run.ticks+1,failure:'Hit the moving hazard while waiting for ink.'},waitingTicks:waitingTicks+1};
  const nextWait=waitingTicks+1;
  if(nextWait>=LIVE_GRACE_TICKS)
    return {run:{...run,phase:'lost',ticks:run.ticks+1,failure:'Your runner caught the end of your line.'},waitingTicks:nextWait};
  return {run:{...run,ticks:run.ticks+1},waitingTicks:nextWait};
}
