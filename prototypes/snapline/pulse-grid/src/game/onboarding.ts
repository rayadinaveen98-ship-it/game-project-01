import type {GameMode} from '../core/types.js';
import type {LocalStore} from './progress.js';

/** A guide view or skip is a UI preference, not proof of gameplay mastery. */
export type GuideChoice='viewed'|'skipped';
export type GuideHistory=Readonly<Partial<Record<GameMode,GuideChoice>>>;
export interface ModeGuide {
  readonly label:string;
  readonly title:string;
  readonly tagline:string;
  readonly steps:readonly [string,string,string];
  readonly button:string;
}
export const GUIDE_KEY='snapline-pulse-mode-guides-v1';
export const MODE_GUIDES:Readonly<Record<GameMode,ModeGuide>>={
  a:{label:'A · PLAN & RUN',title:'Plan your path.',tagline:'Take your time. One clear route is enough.',
    steps:['Touch the glowing S and draw one continuous route to F.','Go around coral obstacles and stay inside the ink budget.','Tap GO to test your plan. Hit a hazard? Reset and try a better route.'],button:'START PLANNING'},
  b:{label:'B · SNAP & REDIRECT',title:'Plan. Then adapt.',tagline:'One correction can change everything.',
    steps:['Draw your complete route from S to F, then tap GO.','While running, tap SNAP. The runner pauses and a mint anchor appears.','Drag the anchor ahead of the runner to a clear path. Release to use your one correction.'],button:'TRY SNAP MODE'},
  c:{label:'C · LIVE DRAWING',title:'Stay ahead.',tagline:'Your line moves the game forward.',
    steps:['Touch S and draw. The runner launches automatically—there is no GO button.','Keep drawing ahead of the moving runner while avoiding coral obstacles.','Lift and rejoin at the mint trail tip if needed. Catching up gives a short 0.75s grace period.'],button:'START DRAWING'}
};
export function parseGuideHistory(raw:string|null):GuideHistory{
  if(!raw||raw.length>1024)return {};
  try{
    const input:unknown=JSON.parse(raw);
    if(!input||typeof input!=='object'||Array.isArray(input))return {};
    const obj=input as {version?:unknown,modes?:unknown};
    if(obj.version!==1||!obj.modes||typeof obj.modes!=='object'||Array.isArray(obj.modes))return {};
    const m=obj.modes as Record<string,unknown>,result:Partial<Record<GameMode,GuideChoice>>={};
    for(const k of ['a','b','c'] as const){if(m[k]==='viewed'||m[k]==='skipped')result[k]=m[k];}
    return result;
  }catch{return {};}
}
export function readGuideHistory(storage:LocalStore|null):GuideHistory{
  try{return parseGuideHistory(storage?.getItem(GUIDE_KEY)??null);}catch{return {};}
}
export function markGuide(history:GuideHistory,mode:GameMode,choice:GuideChoice):GuideHistory{
  return {...history,[mode]:choice};
}
export function saveGuideHistory(storage:LocalStore|null,history:GuideHistory):boolean{
  if(!storage)return false;
  try{storage.setItem(GUIDE_KEY,JSON.stringify({version:1,modes:history}));return true;}
  catch{return false;}
}
