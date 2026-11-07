export interface Vec { readonly x: number; readonly y: number }
export interface Rect { readonly x: number; readonly y: number; readonly w: number; readonly h: number }
export interface MovingHazard {
  readonly center: Vec;
  readonly radius: number;
  readonly amplitude: number;
  readonly phase: number;
  readonly angularSpeed: number;
  readonly axis: 'x'|'y';
}
export interface Course {
  readonly id: 'detour' | 'timing';
  readonly title: string;
  readonly hint: string;
  readonly start: Vec;
  readonly finish: Vec;
  readonly maxInk: number;
  readonly runnerSpeed: number;
  readonly walls: readonly Rect[];
  readonly moving: readonly MovingHazard[];
}
export type Phase = 'ready'|'running'|'paused'|'won'|'lost';
export interface Route {
  readonly points: readonly Vec[];
  readonly length: number;
}
export interface Run {
  readonly phase: Phase;
  readonly route: Route;
  readonly distance: number;
  readonly ticks: number;
  readonly position: Vec;
  readonly failure: string | null;
  readonly courseId: Course['id'];
}
