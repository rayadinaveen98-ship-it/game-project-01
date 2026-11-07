import test from 'node:test';
import assert from 'node:assert/strict';
import {MODE_GUIDES,GUIDE_KEY,parseGuideHistory,readGuideHistory,markGuide,saveGuideHistory} from '../dist/src/game/onboarding.js';

const storage=()=>{
 const data=new Map();
 return {data,getItem:key=>data.get(key)??null,setItem:(k,v)=>data.set(k,v),removeItem:key=>data.delete(key)};
};

test('P6.2: all modes have three concise, separate, accurate tutorials',()=>{
 assert.deepEqual(Object.keys(MODE_GUIDES),['a','b','c']);
 for(const g of Object.values(MODE_GUIDES)){
  assert.equal(g.steps.length,3);assert.ok(g.title&&g.label&&g.tagline&&g.button);
  for(const step of g.steps)assert.ok(step.length>25&&step.length<155);
 }
 assert.match(MODE_GUIDES.a.steps.join(' '),/GO/);
 assert.match(MODE_GUIDES.b.steps.join(' '),/SNAP/);
 assert.match(MODE_GUIDES.c.steps.join(' '),/automatically/);
 assert.doesNotMatch(MODE_GUIDES.c.steps.join(' '),/Tap GO/);
});

test('P6.2: tutorial preference is recorded separately per mode, not counted as game progress',()=>{
 let history={};history=markGuide(history,'a','viewed');history=markGuide(history,'b','skipped');
 assert.deepEqual(history,{a:'viewed',b:'skipped'});
 assert.equal(history.c,undefined);
 history=markGuide(history,'b','viewed');
 assert.deepEqual(history,{a:'viewed',b:'viewed'});
});

test('P6.2: stored guide preferences reload independently without removing saved results',()=>{
 const store=storage();store.setItem('snapline-pulse-progress-v1','saved-run-results');
 const h=markGuide(markGuide({},'a','viewed'),'c','skipped');
 assert.equal(saveGuideHistory(store,h),true);
 assert.equal(GUIDE_KEY,'snapline-pulse-mode-guides-v1');
 assert.deepEqual(readGuideHistory(store),h);
 assert.equal(store.getItem('snapline-pulse-progress-v1'),'saved-run-results');
});

test('P6.2: malformed guides and unexpected values are ignored without prototype pollution',()=>{
 for(const raw of [null,'not json','[]','{}','{"version":2,"modes":{"a":"viewed"}}', '"string"','x'.repeat(1100)]){
   assert.deepEqual(parseGuideHistory(raw),{});
 }
 const raw=JSON.stringify({version:1,modes:{a:'viewed',b:'hacked',c:'skipped',another:'viewed'}});
 assert.deepEqual(parseGuideHistory(raw),{a:'viewed',c:'skipped'});
 assert.equal(Object.prototype.hasOwnProperty.call(parseGuideHistory(raw),'another'),false);
});

test('P6.2: private browsing/storage errors do not prevent a mode guide from opening',()=>{
 const broken={getItem(){throw Error('read blocked')},setItem(){throw Error('write blocked')},removeItem(){throw Error('remove blocked')}};
 assert.deepEqual(readGuideHistory(broken),{});
 assert.equal(saveGuideHistory(broken,{a:'viewed'}),false);
 assert.equal(saveGuideHistory(null,{a:'viewed'}),false);
});

test('P6.2: reset of course results does not reset separate tutorial preference',()=>{
 const store=storage();saveGuideHistory(store,{a:'skipped'});
 store.setItem('snapline-pulse-progress-v1','some results');
 store.removeItem('snapline-pulse-progress-v1');
 assert.deepEqual(readGuideHistory(store),{a:'skipped'});
});
