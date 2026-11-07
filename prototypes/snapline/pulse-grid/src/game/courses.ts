import type {Course,MovingHazard,Vec} from '../core/types.js';
export const BOARD_WIDTH=360, BOARD_HEIGHT=640, RUNNER_RADIUS=9;
/** The existing B practice guide deliberately meets the patrol unless corrected. */
export const SNAP_LAB_GUIDE:readonly Vec[]=[{x:38,y:555},{x:255,y:550},{x:319,y:87}];
/** The second B lesson uses a separate hazard geometry. The guide is a starting hypothesis, not a solution. */
export const SECOND_CHANCE_GUIDE:readonly Vec[]=[{x:38,y:555},{x:258,y:548},{x:319,y:87}];
/** Author-crafted, solvable courses. Two original shared courses remain physically unchanged. */
export const COURSES:readonly Course[]=[
  {
    id:'detour',supportedModes:['a','b','c'],family:'shared',title:'Static Detour',
    hint:'Draw around the two solid blocks. Keep within your ink budget.',
    start:{x:38,y:555},finish:{x:319,y:87},maxInk:850,runnerSpeed:160,
    walls:[{x:93,y:305,w:170,h:75},{x:177,y:152,w:70,h:82}],moving:[]
  },
  {
    id:'timing',supportedModes:['a','b','c'],family:'shared',title:'Moving Hazard',
    hint:'The circular hazard moves on a predictable cycle. Choose a safer route.',
    start:{x:38,y:555},finish:{x:319,y:87},maxInk:865,runnerSpeed:160,
    walls:[{x:94,y:385,w:95,h:54},{x:205,y:180,w:62,h:49}],
    moving:[{center:{x:182,y:303},radius:23,amplitude:92,phase:0,angularSpeed:1.7,axis:'y'}]
  },
  {
    id:'snaplab',supportedModes:['b'],family:'practice',title:'Patrol Crossing',
    hint:'Trace the suggested line, press GO, then SNAP right.',
    start:{x:38,y:555},finish:{x:319,y:87},maxInk:870,runnerSpeed:160,
    walls:[{x:100,y:393,w:90,h:50},{x:105,y:158,w:65,h:70}],
    moving:[{center:{x:235,y:305},radius:24,amplitude:40,phase:-3,angularSpeed:1.7,axis:'x'}]
  },
  {
    id:'planbasics',supportedModes:['a'],family:'practice',title:'Planning Basics',
    hint:'One thoughtful line. Go left of the barrier, then around the top to F.',
    start:{x:38,y:555},finish:{x:319,y:87},maxInk:835,runnerSpeed:150,
    walls:[{x:118,y:310,w:110,h:90}],moving:[]
  },
  {
    id:'efficient',supportedModes:['a'],family:'signature',title:'Efficient Detour',
    hint:'Two blocks, one budget. Look for a safe upper corridor before pressing GO.',
    start:{x:38,y:555},finish:{x:319,y:87},maxInk:810,runnerSpeed:160,
    walls:[{x:68,y:330,w:135,h:48},{x:168,y:200,w:124,h:52}],moving:[]
  },
  {
    id:'snapchoice',supportedModes:['b'],family:'signature',title:'Second-Chance Timing',
    hint:'A different patrol timing. Draw the suggested line, then SNAP to escape its approach.',
    start:{x:38,y:555},finish:{x:319,y:87},maxInk:895,runnerSpeed:160,
    walls:[{x:92,y:390,w:85,h:52},{x:110,y:165,w:65,h:60}],
    moving:[{center:{x:252,y:290},radius:25,amplitude:42,phase:-2.6,angularSpeed:1.55,axis:'x'}]
  },
  {
    id:'liveahead',supportedModes:['c'],family:'practice',title:'Keep Ahead',
    hint:'Draw a little more trail than the runner needs. Lift and rejoin at the mint tip.',
    start:{x:38,y:555},finish:{x:319,y:87},maxInk:835,runnerSpeed:130,
    walls:[{x:130,y:365,w:95,h:80}],moving:[]
  },
  {
    id:'liveflow',supportedModes:['c'],family:'signature',title:'Continuous Flow',
    hint:'Keep moving across the middle corridor while the patrol passes below.',
    start:{x:38,y:555},finish:{x:319,y:87},maxInk:890,runnerSpeed:145,
    walls:[{x:105,y:410,w:110,h:50},{x:205,y:200,w:60,h:55}],
    moving:[{center:{x:190,y:317},radius:16,amplitude:45,phase:1.1,angularSpeed:1.4,axis:'x'}]
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
