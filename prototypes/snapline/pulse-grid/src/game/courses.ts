import type {Course,MovingHazard,Vec} from '../core/types.js';
export const BOARD_WIDTH=360, BOARD_HEIGHT=640, RUNNER_RADIUS=9;
/** Tutorial guide: an intentionally risky starting route; a timely rightward snap rescues it. */
export const SNAP_LAB_GUIDE:readonly Vec[]=[{x:38,y:555},{x:255,y:550},{x:319,y:87}];
export const COURSES:readonly Course[]=[
  {
    id:'detour',title:'01 · Static Detour',
    hint:'Draw around the two solid blocks. Keep within your ink budget.',
    start:{x:38,y:555},finish:{x:319,y:87},maxInk:850,runnerSpeed:160,
    walls:[{x:93,y:305,w:170,h:75},{x:177,y:152,w:70,h:82}],moving:[]
  },
  {
    id:'timing',title:'02 · Moving Hazard',
    hint:'The circular hazard moves on a predictable cycle. Choose a safer route.',
    start:{x:38,y:555},finish:{x:319,y:87},maxInk:865,runnerSpeed:160,
    walls:[{x:94,y:385,w:95,h:54},{x:205,y:180,w:62,h:49}],
    moving:[{center:{x:182,y:303},radius:23,amplitude:92,phase:0,angularSpeed:1.7,axis:'y'}]
  },
  {
    id:'snaplab',title:'03 · Patrol Crossing (B Practice)',
    hint:'Trace guide, press GO, then SNAP right.',
    start:{x:38,y:555},finish:{x:319,y:87},maxInk:870,runnerSpeed:160,
    walls:[{x:100,y:393,w:90,h:50},{x:105,y:158,w:65,h:70}],
    moving:[{center:{x:235,y:305},radius:24,amplitude:40,phase:-3,angularSpeed:1.7,axis:'x'}]
  }
] as const;
export function hazardPosition(h:MovingHazard,seconds:number):Vec{
  const offset=Math.sin(seconds*h.angularSpeed+h.phase)*h.amplitude;
  return h.axis==='y'?{x:h.center.x,y:h.center.y+offset}:{x:h.center.x+offset,y:h.center.y};
}
export function getCourse(id:Course['id']):Course{
  const found=COURSES.find(c=>c.id===id);
  if(!found) throw new Error('missing course '+id);
  return found;
}
