import {COURSES} from './courses.js';
import type {Course,GameMode} from '../core/types.js';

/** Mode identity is stable across course navigation and progress keys. */
export const MODES:readonly GameMode[]=['a','b','c'];
export const MODE_COPY:Readonly<Record<GameMode,{name:string,verb:string,summary:string}>>={
  a:{name:'PLAN & RUN',verb:'THINK',summary:'Draw your route. Press GO. Perfect the plan.'},
  b:{name:'SNAP & REDIRECT',verb:'ADAPT',summary:'Plan ahead. Make one careful mid-run correction.'},
  c:{name:'LIVE DRAWING',verb:'REACT',summary:'Keep drawing as your runner moves along the line.'}
};
export function supportsMode(course:Course,mode:GameMode):boolean{
  return course.supportedModes.includes(mode);
}
export function coursesForMode(mode:GameMode):readonly Course[]{
  return COURSES.filter(course=>supportsMode(course,mode));
}
export function isAccessibleCourse(mode:GameMode,id:string):boolean{
  return coursesForMode(mode).some(course=>course.id===id);
}
export function nextCourse(mode:GameMode,id:string):Course|null{
  const available=coursesForMode(mode),index=available.findIndex(course=>course.id===id);
  return index>=0?available[index+1]??null:null;
}
export function firstCourse(mode:GameMode):Course{
  const course=coursesForMode(mode)[0];
  if(!course)throw new Error(`No courses for mode ${mode}`);
  return course;
}
