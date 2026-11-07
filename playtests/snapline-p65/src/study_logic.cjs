(function(root){
  'use strict';
  const MODES=['a','b','c'];
  const LABELS=Object.freeze({a:'Plan & Run',b:'Snap & Redirect',c:'Live Drawing'});
  // Six permutations: keep sequence balanced for small exploratory rounds.
  const ORDERS=Object.freeze(['abc','bca','cab','acb','cba','bac']);
  const isInt=(n,lo,hi)=>Number.isInteger(n)&&n>=lo&&n<=hi;
  function orderForIndex(index){
    if(!Number.isInteger(index)||index<0)throw new RangeError('Invalid study index');
    return [...ORDERS[index%ORDERS.length]];
  }
  function makeSession(index,isoTime){
    const time=typeof isoTime==='string'&&/^\d{4}-\d\d-\d\dT/.test(isoTime)?isoTime:null;
    return {sessionId:'S'+String(index+1).padStart(2,'0'),order:orderForIndex(index),startedAt:time,observations:{},preference:null,note:'',completedAt:null};
  }
  function score(n){return n===null||isInt(n,1,5);}
  function cleanText(s,max=1000){return typeof s==='string'?s.trim().slice(0,max):'';}
  function validateObservation(mode,v){
    if(!MODES.includes(mode))throw new RangeError('Unknown gameplay mode');
    if(!v||typeof v!=='object')throw new TypeError('Missing observation');
    if(!['yes','no','unsure'].includes(v.understood))throw new RangeError('Choose how easily the first action was understood');
    if(!isInt(v.hints,0,20))throw new RangeError('Hints must be between 0 and 20');
    if(!isInt(v.wins,0,2))throw new RangeError('Wins must be between 0 and 2 shared courses');
    if(typeof v.retried!=='boolean')throw new RangeError('Retry must be explicitly recorded');
    for(const key of ['fun','comfort','fairness'])if(!score(v[key]))throw new RangeError('Score must be blank or 1–5');
    return {mode,understood:v.understood,hints:v.hints,wins:v.wins,retried:v.retried,fun:v.fun,comfort:v.comfort,fairness:v.fairness,problem:cleanText(v.problem),quote:cleanText(v.quote,500)};
  }
  function recordObservation(session,mode,obs){
    if(!session||!session.order?.includes(mode))throw new RangeError('Mode not in session');
    const clean=validateObservation(mode,obs);
    return {...session,observations:{...session.observations,[mode]:clean}};
  }
  function finalizeSession(session,preference,note,time){
    if(!session||Object.keys(session.observations||{}).length===0)throw new RangeError('Record at least one mode before finishing');
    if(![...MODES,'none','undecided'].includes(preference))throw new RangeError('Invalid preference');
    return {...session,preference,note:cleanText(note),completedAt:typeof time==='string'?time:null,
      status:Object.keys(session.observations).length===3?'complete':'partial'};
  }
  function studySummary(sessions){
    const result={sessions:sessions.length,complete:0,partial:0,observations:{a:0,b:0,c:0},retries:{a:0,b:0,c:0},preferred:{a:0,b:0,c:0,none:0,undecided:0},meanFun:{a:null,b:null,c:null}};
    const sums={a:0,b:0,c:0},counts={a:0,b:0,c:0};
    for(const s of sessions){
      if(s.status==='complete')result.complete++;else result.partial++;
      if(Object.hasOwn(result.preferred,s.preference))result.preferred[s.preference]++;
      for(const mode of MODES){const v=s.observations?.[mode];if(!v)continue;
        result.observations[mode]++;
        if(v.retried)result.retries[mode]++;
        if(v.fun!==null&&score(v.fun)){sums[mode]+=v.fun;counts[mode]++;}
      }
    }
    for(const mode of MODES)if(counts[mode])result.meanFun[mode]=Number((sums[mode]/counts[mode]).toFixed(2));
    return result;
  }
  function toJSON(sessions){return JSON.stringify({schema:'snapline-p65-observation-v1',privacy:'anonymous, facilitator-recorded, offline',exportedAt:null,sessions},null,2)+'\n';}
  function csvCell(v){const text=v===null||v===undefined?'':String(v);return '"'+text.replace(/"/g,'""')+'"';}
  function toCSV(sessions){
    const header=['session_id','status','order','mode','understood','hints','wins_out_of_2','voluntary_retry','fun_1_5','comfort_1_5','fairness_1_5','problem','direct_quote','overall_preference','session_note'];
    const out=[header.map(csvCell).join(',')];
    for(const s of sessions){for(const mode of s.order){const o=s.observations[mode];if(!o)continue;
      const row=[s.sessionId,s.status,s.order.join(''),mode,o.understood,o.hints,o.wins,o.retried,o.fun,o.comfort,o.fairness,o.problem,o.quote,s.preference,s.note];
      out.push(row.map(csvCell).join(','));
    }}
    return out.join('\r\n')+'\r\n';
  }
  const API={MODES,LABELS,ORDERS,orderForIndex,makeSession,validateObservation,recordObservation,finalizeSession,studySummary,toJSON,toCSV};
  root.SnaplineStudy=API;
  if(typeof module!=='undefined'&&module.exports)module.exports=API;
})(typeof globalThis!=='undefined'?globalThis:this);
