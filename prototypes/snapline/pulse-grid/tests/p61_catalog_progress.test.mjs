import test from 'node:test';
import assert from 'node:assert/strict';
import {COURSES} from '../dist/src/game/courses.js';
import {MODES,MODE_COPY,coursesForMode,isAccessibleCourse,nextCourse,firstCourse} from '../dist/src/game/catalog.js';
import {PROGRESS_KEY,parseProgress,readProgress,writeProgress,recordWin,clearProgress,progressId,completedInMode} from '../dist/src/game/progress.js';

function storage(){const data=new Map();return {data,getItem:key=>data.get(key)??null,setItem:(key,value)=>data.set(key,value),removeItem:key=>data.delete(key)};}

test('P6.1 course registry admits shared courses to all three modes and practice to B only',()=>{
 assert.deepEqual(MODES,['a','b','c']);
 assert.deepEqual(COURSES.slice(0,3).map(c=>c.id),['detour','timing','snaplab']);
 assert.deepEqual(coursesForMode('a').map(c=>c.id),['planbasics','detour','efficient','timing']);
 assert.deepEqual(coursesForMode('b').map(c=>c.id),['detour','snaplab','snapchoice','timing']);
 assert.deepEqual(coursesForMode('c').map(c=>c.id),['liveahead','detour','liveflow','timing']);
 assert.equal(isAccessibleCourse('a','snaplab'),false);
 assert.equal(isAccessibleCourse('c','snaplab'),false);
 assert.equal(isAccessibleCourse('b','snaplab'),true);
 assert.ok(Object.values(MODE_COPY).every(copy=>copy.name&&copy.summary&&copy.verb));
});
test('P6.1 next course stays in the selected mode and never wraps to another mode',()=>{
 assert.equal(firstCourse('a').id,'planbasics');
 assert.equal(firstCourse('b').id,'detour');
 assert.equal(firstCourse('c').id,'liveahead');
 for(const mode of MODES){
  const list=coursesForMode(mode);
  assert.equal(list.length,4);
  for(let i=0;i<list.length-1;i++)assert.equal(nextCourse(mode,list[i].id)?.id,list[i+1].id);
  assert.equal(nextCourse(mode,list.at(-1).id),null);
 }
 assert.equal(nextCourse('c','snaplab'),null);
 assert.equal(nextCourse('a','snapchoice'),null);
});
test('P6.1 wins isolate mode/level keys and update independent best time and ink values',()=>{
 let p={};p=recordWin(p,'a','detour',500,701.2);
 p=recordWin(p,'b','detour',300,800);
 p=recordWin(p,'a','detour',600,690);
 assert.equal(p['a:detour'].wins,2);
 assert.equal(p['a:detour'].bestTimeTicks,500);
 assert.equal(p['a:detour'].bestInk,690);
 assert.equal(p['b:detour'].bestTimeTicks,300);
 assert.equal(completedInMode(p,'a'),1);
 assert.equal(completedInMode(p,'b'),1);
 assert.equal(completedInMode(p,'c'),0);
 assert.equal(progressId('c','timing'),'c:timing');
 assert.equal(recordWin(p,'a','snaplab',400,710),p,'ineligible mode must be ignored');
 assert.equal(recordWin(p,'b','snaplab',NaN,710),p,'invalid result ignored');
});
test('P6.1 persisted results survive reload and reset without touching unrelated local keys',()=>{
 const store=storage();store.setItem('other-app','untouched');
 let p=recordWin({},'c','detour',720,720.25);
 assert.equal(writeProgress(store,p),true);
 const again=readProgress(store);
 assert.deepEqual(again['c:detour'],p['c:detour']);
 assert.equal(completedInMode(again,'c'),1);
 assert.equal(clearProgress(store),true);
 assert.deepEqual(readProgress(store),{});
 assert.equal(store.getItem('other-app'),'untouched');
});
test('P6.1 corrupted or unsupported saved data safely starts empty',()=>{
 for(const input of [null,'not-json','[1,2,3]','{}','{"version":9,"results":{"a:detour":{}}}',JSON.stringify({version:1,results:{'c:snaplab':{wins:1,bestTimeTicks:350,bestInk:500},'b:detour':{wins:-9,bestTimeTicks:2,bestInk:2}}})]){
  assert.equal(Object.keys(parseProgress(input)).length,0,input??'null');
 }
 const store={getItem:()=>{throw new Error('Storage blocked')},setItem:()=>{throw new Error('Private mode')},removeItem:()=>{throw new Error('Private mode')}};
 assert.deepEqual(readProgress(store),{});
 assert.equal(writeProgress(store,{}),false);
 assert.equal(clearProgress(store),false);
});
test('P6.1 serialized data ignores invalid keys instead of accepting untrusted prototype properties',()=>{
 const raw=JSON.stringify({version:1,results:{'a:detour':{wins:1,bestTimeTicks:180,bestInk:660},'a:snaplab':{wins:1,bestTimeTicks:50,bestInk:10},'__proto__':{wins:999,bestTimeTicks:1,bestInk:1},'b:timing':{wins:2,bestTimeTicks:'bad',bestInk:20}}});
 const p=parseProgress(raw);
 assert.deepEqual(Object.keys(p),['a:detour']);
 assert.equal(Object.prototype.hasOwnProperty.call(p,'__proto__'),false);
});
