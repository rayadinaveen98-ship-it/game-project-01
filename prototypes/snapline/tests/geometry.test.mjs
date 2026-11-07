import test from 'node:test';
import assert from 'node:assert/strict';
import {segmentHitsRect,pointAtDistance,lengthOf,movingCircleHitsSegment,pointSegmentDistanceSq} from '../dist/src/core/geometry.js';
import {appendStroke} from '../dist/src/game/drawing.js';

test('route length uses visible connected polyline distance',()=>{
 const p=[{x:0,y:0},{x:3,y:4},{x:3,y:9}];
 assert.equal(lengthOf(p),10);
 assert.deepEqual(pointAtDistance(p,7),{x:3,y:6});
 assert.deepEqual(pointAtDistance(p,200),p[2]);
 assert.deepEqual(pointAtDistance(p,-2),p[0]);
});
test('continuous swept collision catches tunnelling and edge contact',()=>{
 const wall={x:100,y:100,w:50,h:50};
 assert.equal(segmentHitsRect({x:70,y:120},{x:175,y:120},wall,9),true);
 assert.equal(segmentHitsRect({x:70,y:90},{x:175,y:90},wall,9),false);
 assert.equal(segmentHitsRect({x:70,y:91},{x:175,y:91},wall,9),true);
 assert.equal(segmentHitsRect({x:95,y:95},{x:95,y:95},wall,9),true);
 assert.equal(segmentHitsRect({x:20,y:20},{x:30,y:20},wall,9),false);
});
test('moving circle sweep is relative to player, not frame endpoint only',()=>{
 assert.equal(movingCircleHitsSegment({x:0,y:0},{x:100,y:0},{x:70,y:30},{x:30,y:-30},5),true);
 assert.equal(movingCircleHitsSegment({x:0,y:0},{x:100,y:0},{x:70,y:50},{x:30,y:50},20),false);
 assert.equal(pointSegmentDistanceSq({x:0,y:0},{x:4,y:0},{x:4,y:0}),16);
});
test('stroke interpolation never alters the original finger-defined line',()=>{
 const pts=appendStroke([{x:1,y:2}],{x:41,y:2},8);
 assert.equal(pts.length,6);
 assert.deepEqual(pts[0],{x:1,y:2});
 assert.deepEqual(pts[5],{x:41,y:2});
 assert.equal(lengthOf(pts),40);
 assert.ok(pts.every(p=>p.y===2));
});
