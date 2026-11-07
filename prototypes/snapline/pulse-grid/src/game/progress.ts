import type {GameMode} from '../core/types.js';
import {isAccessibleCourse,MODES} from './catalog.js';

export const PROGRESS_KEY='snapline-pulse-progress-v1';
export interface BestResult{
  /** Actual completions, capped to prevent persistent integer overflow. */
  readonly wins:number;
  readonly bestTimeTicks:number;
  readonly bestInk:number;
}
export type Progress=Readonly<Record<string,BestResult>>;
export interface LocalStore{
  getItem(key:string):string|null;
  setItem(key:string,value:string):void;
  removeItem(key:string):void;
}
function isMode(value:string):value is GameMode{
  return MODES.some(mode=>mode===value);
}
export function progressId(mode:GameMode,courseId:string):string{return `${mode}:${courseId}`;}
function validResult(data:unknown):data is BestResult{
  if(!data||typeof data!=='object')return false;
  const v=data as Partial<BestResult>;
  return Number.isSafeInteger(v.wins)&&v.wins!>=1&&v.wins!<=1000000&&
    Number.isSafeInteger(v.bestTimeTicks)&&v.bestTimeTicks!>=1&&v.bestTimeTicks!<=10000000&&
    typeof v.bestInk==='number'&&Number.isFinite(v.bestInk)&&v.bestInk>0&&v.bestInk<=100000;
}
/** Unknown keys, wrong versions, and corrupted records never enter the app state. */
export function parseProgress(raw:string|null):Progress{
  if(!raw||raw.length>30000)return {};
  try{
    const parsed:unknown=JSON.parse(raw);
    if(!parsed||typeof parsed!=='object'||Array.isArray(parsed))return {};
    const obj=parsed as {version?:unknown,results?:unknown};
    if(obj.version!==1||!obj.results||typeof obj.results!=='object'||Array.isArray(obj.results))return {};
    const results:Record<string,BestResult>=Object.create(null);
    for(const [key,record] of Object.entries(obj.results)){
      const [mode,id,...rest]=key.split(':');
      if(!mode||!id||rest.length||!isMode(mode)||!isAccessibleCourse(mode,id)||!validResult(record))continue;
      results[key]={wins:record.wins,bestTimeTicks:record.bestTimeTicks,bestInk:record.bestInk};
    }
    return results;
  }catch{return {};}
}
export function readProgress(storage:LocalStore|null):Progress{
  try{return parseProgress(storage?.getItem(PROGRESS_KEY)??null);}catch{return {};}
}
/** Only actual won runs should call this function. It does not accept a game phase. */
export function recordWin(progress:Progress,mode:GameMode,courseId:string,timeTicks:number,ink:number):Progress{
  if(!isAccessibleCourse(mode,courseId)||!Number.isSafeInteger(timeTicks)||timeTicks<=0||!Number.isFinite(ink)||ink<=0) return progress;
  const key=progressId(mode,courseId),old=progress[key];
  const result:BestResult={
    wins:Math.min(1000000,(old?.wins??0)+1),
    bestTimeTicks:Math.min(old?.bestTimeTicks??Infinity,timeTicks),
    bestInk:Math.min(old?.bestInk??Infinity,ink)
  };
  return {...progress,[key]:result};
}
export function writeProgress(storage:LocalStore|null,progress:Progress):boolean{
  if(!storage)return false;
  try{storage.setItem(PROGRESS_KEY,JSON.stringify({version:1,results:progress}));return true;}
  catch{return false;}
}
export function clearProgress(storage:LocalStore|null):boolean{
  if(!storage)return false;
  try{storage.removeItem(PROGRESS_KEY);return true;}catch{return false;}
}
export function completedInMode(progress:Progress,mode:GameMode):number{
  return Object.keys(progress).filter(key=>key.startsWith(mode+':')&&isAccessibleCourse(mode,key.slice(2))).length;
}
