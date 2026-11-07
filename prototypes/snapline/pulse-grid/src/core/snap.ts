import type {Course,Route,Run,Vec} from './types.js';
import {distance,isValidVec,lengthOf,pointAtDistance,segmentHitsRect} from './geometry.js';
import {validateRoute,advanceRun} from './simulation.js';
import {BOARD_HEIGHT,BOARD_WIDTH,RUNNER_RADIUS} from '../game/courses.js';

/** The edit window is chosen in arclength coordinates, always strictly ahead of the runner. */
export interface SnapPlan {
  readonly atTick: number;
  readonly leadDistance: number;
  readonly pivotDistance: number;
  readonly tailDistance: number;
  readonly anchor: Vec;
}
export type SnapCheck =
  | {readonly ok:true;readonly route:Route;readonly run:Run;readonly lengthDelta:number}
  | {readonly ok:false;readonly reason:string};

/** Return a complete prefix ending at the requested arclength (including that point). */
export function pathPrefix(points:readonly Vec[],at:number):Vec[]{
  const result:Vec[]=[{...points[0]!}];
  let covered=0;
  for(let i=1;i<points.length;i++){
    const segment=distance(points[i-1]!,points[i]!);
    if(covered+segment>=at-1e-8){
      const p=pointAtDistance(points,at);
      if(distance(result[result.length-1]!,p)>1e-8)result.push(p);
      return result;
    }
    result.push({...points[i]!});covered+=segment;
  }
  return result;
}
/** Return a complete suffix starting at the requested arclength (including that point). */
export function pathSuffix(points:readonly Vec[],at:number):Vec[]{
  const result:Vec[]=[pointAtDistance(points,at)];let covered=0;
  for(let i=1;i<points.length;i++){
    const segment=distance(points[i-1]!,points[i]!);
    if(covered+segment>at+1e-8){
      result.push(...points.slice(i).map(p=>({...p})));return result;
    }
    covered+=segment;
  }
  if(distance(result[result.length-1]!,points[points.length-1]!)>1e-8)result.push({...points[points.length-1]!});
  return result;
}
export function createSnapPlan(run:Run):SnapPlan|null{
  if(run.phase!=='running' && run.phase!=='paused')return null;
  const left=run.route.length-run.distance;
  if(left<190)return null;
  const pivot=run.distance+Math.min(180,left*.51);
  const lead=Math.max(run.distance+30,pivot-65);
  const tail=Math.min(run.route.length-30,pivot+65);
  if(!(tail>pivot+10 && lead<pivot-10))return null;
  return {atTick:run.ticks,leadDistance:lead,pivotDistance:pivot,tailDistance:tail,anchor:pointAtDistance(run.route.points,pivot)};
}
/**
 * Pure, deterministic snap. Already-travelled geometry and runner world position cannot change.
 * The same run, plan and target always generate the same route or rejection reason.
 */
export function previewSnap(run:Run,course:Course,plan:SnapPlan,target:Vec):SnapCheck{
  if(run.phase!=='paused')return {ok:false,reason:'Pause the runner before editing.'};
  if(plan.atTick!==run.ticks)return {ok:false,reason:'Snap time changed. Try again.'};
  if(run.courseId!==course.id)return {ok:false,reason:'Wrong course.'};
  if(run.route.length-run.distance<190)return {ok:false,reason:'Too close to the finish to snap.'};
  if(!isValidVec(target)||target.x<14||target.x>BOARD_WIDTH-14||target.y<58||target.y>BOARD_HEIGHT-62)
    return {ok:false,reason:'Keep the anchor inside the playable area.'};
  if(distance(target,plan.anchor)<13)return {ok:false,reason:'Move the anchor farther to redirect.'};
  const prefix=pathPrefix(run.route.points,plan.leadDistance);
  const suffix=pathSuffix(run.route.points,plan.tailDistance);
  const from=prefix[prefix.length-1]!,to=suffix[0]!;
  for(const wall of course.walls){
    if(segmentHitsRect(from,target,wall,RUNNER_RADIUS)||segmentHitsRect(target,to,wall,RUNNER_RADIUS))
      return {ok:false,reason:'New route crosses a solid obstacle.'};
  }
  const points=[...prefix,{x:target.x,y:target.y},...suffix];
  const checked=validateRoute(points,course);
  if(!checked.ok)return {ok:false,reason:checked.reason};
  // If editing any past point accidentally changes the current coordinate, the operation is illegal.
  if(distance(pointAtDistance(checked.route.points,run.distance),run.position)>1e-5)
    return {ok:false,reason:'The edit would move your runner.'};
  const newRun:Run={...run,route:checked.route,position:{...run.position}};
  return {ok:true,route:checked.route,run:newRun,lengthDelta:lengthOf(points)-run.route.length};
}
/** Event-log format for fixture replay (tick and position are data, not wall-clock time). */
export interface SnapEvent {readonly tick:number; readonly target:Vec}
export function replayWithSnap(initial:Run,course:Course,event:SnapEvent,maxTicks=30000):Run{
  // The only event is the snap at a deterministic tick. No hidden animation or random effects.
  let run=initial,applied=false;
  for(let n=0;n<maxTicks&&run.phase==='running';n++){
    if(!applied&&run.ticks===event.tick){
      const plan=createSnapPlan(run);
      if(!plan)throw new Error('Cannot create replay snap plan.');
      const result=previewSnap({...run,phase:'paused'},course,plan,event.target);
      if(!result.ok)throw new Error('Replay snap invalid: '+result.reason);
      run={...result.run,phase:'running'};applied=true;
    }
    run=advanceRun(run,course);
  }
  if(!applied)throw new Error('Replay snap tick never reached.');
  return run;
}
