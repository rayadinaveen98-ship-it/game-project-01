import test from 'node:test';
import assert from 'node:assert/strict';
import {interruptionEffect} from '../dist/src/game/interruption.js';

test('A interrupted plan stroke discards unfinished draft without pausing a nonexistent run',()=>{
  assert.deepEqual(interruptionEffect('a','stroke',false,false,'pointer-cancel'),{discardDraft:true,preserveLiveRoute:false,cancelSnapEdit:false,pauseRun:false});
});
test('B interrupted prepared stroke also discards draft but does not consume a snap',()=>{
  assert.deepEqual(interruptionEffect('b','stroke',false,false,'capture-lost'),{discardDraft:true,preserveLiveRoute:false,cancelSnapEdit:false,pauseRun:false});
});
test('C pointercancel preserves the validated trail and pauses the moving runner',()=>{
  assert.deepEqual(interruptionEffect('c','stroke',false,true,'pointer-cancel'),{discardDraft:false,preserveLiveRoute:true,cancelSnapEdit:false,pauseRun:true});
});
test('C unexpected capture loss cannot continue movement without input',()=>{
  const policy=interruptionEffect('c','stroke',false,true,'capture-lost');
  assert.equal(policy.pauseRun,true);assert.equal(policy.preserveLiveRoute,true);assert.equal(policy.discardDraft,false);
});
test('C manual pause preserves live trail and stops movement for thumb safety',()=>{
  const p=interruptionEffect('c','stroke',false,true,'manual-pause');
  assert.equal(p.preserveLiveRoute,true);assert.equal(p.pauseRun,true);
});
test('B interrupted active snap cancels the edit without changing previous route',()=>{
  const p=interruptionEffect('b','snap',true,false,'pointer-cancel');
  assert.equal(p.cancelSnapEdit,true);assert.equal(p.discardDraft,false);assert.equal(p.pauseRun,false);
});
test('B background blur during snap preview closes edit even with no dragging',()=>{
  const p=interruptionEffect('b','none',true,false,'window-blur');
  assert.equal(p.cancelSnapEdit,true);
});
test('A/B/C background hidden pauses a running simulation with no finger gesture',()=>{
  for(const mode of ['a','b','c']){
    assert.equal(interruptionEffect(mode,'none',false,true,'page-hidden').pauseRun,true);
  }
});
test('navigation out of game pauses a running simulation and cancels the snap UI',()=>{
  const p=interruptionEffect('b','none',true,true,'navigate');
  assert.equal(p.pauseRun,true);assert.equal(p.cancelSnapEdit,true);
});
test('unrelated pointer cancel with no active finger does not pause a running simulation',()=>{
  assert.equal(interruptionEffect('a','none',false,true,'pointer-cancel').pauseRun,false);
});
test('gesture interruption cannot resume a previously paused run',()=>{
  for(const mode of ['a','b','c']){
    assert.equal(interruptionEffect(mode,'stroke',false,false,'capture-lost').pauseRun,false);
  }
});
