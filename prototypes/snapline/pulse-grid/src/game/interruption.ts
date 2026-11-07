import type {GameMode} from '../core/types.js';

/** Browser/OS interruptions are not player mistakes and must not advance the run. */
export type InterruptionReason='pointer-cancel'|'capture-lost'|'page-hidden'|'window-blur'|'navigate'|'manual-pause';
export type ActiveGesture='none'|'stroke'|'snap';
export interface InterruptionEffect{
  /** For A/B an unfinished plan stroke is invalid; for C keep the validated live trail. */
  readonly discardDraft:boolean;
  readonly preserveLiveRoute:boolean;
  readonly cancelSnapEdit:boolean;
  readonly pauseRun:boolean;
}
export function interruptionEffect(mode:GameMode,gesture:ActiveGesture,snapEditing:boolean,running:boolean,reason:InterruptionReason):InterruptionEffect{
  const external=reason==='page-hidden'||reason==='window-blur'||reason==='navigate'||reason==='manual-pause';
  return {
    discardDraft:gesture==='stroke'&&mode!=='c',
    preserveLiveRoute:gesture==='stroke'&&mode==='c',
    cancelSnapEdit:snapEditing&&(external||gesture==='snap'),
    pauseRun:running&&(external||(mode==='c'&&gesture==='stroke'))
  };
}
