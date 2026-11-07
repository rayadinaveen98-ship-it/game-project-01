import type {Vec} from '../core/types.js';
import {distance,lerpPoint} from '../core/geometry.js';

/** Capture the literal input stroke, inserting collinear samples for consistent stroke spacing. */
export function appendStroke(points:readonly Vec[],next:Vec,spacing=8):Vec[]{
  if(!points.length)return [next];
  const previous=points[points.length-1]!,d=distance(previous,next);
  if(d<1) return [...points];
  const added:Vec[]=[...points];
  const count=Math.ceil(d/spacing);
  for(let i=1;i<=count;i++)added.push(lerpPoint(previous,next,i/count));
  return added;
}
