# DEC-028 — P6.3 positive feedback and P6.4 reliability work

**Date:** 2026-11-07
**Status:** AUTHORISED TO CONTINUE DEVELOPMENT, NOT FINAL DEVICE ACCEPTANCE
**Owner statement:** "ok bro continue" following the P6.3 eight-course implementation.

## Direction
Keep all three gameplay modes, eight distinct courses and approved Pulse Grid visuals. Target P6.4 reliability: safe pointer cancellation, OS/background pause, lost capture, one-snap recovery without spending an edit, and truthful storage messaging. Do not add levels, redesign, or monetization.

## Engineering implementation
P6.4 fixes have been coded and browser-tested locally: deterministic interruption policy, cancel/release captured input on lost focus/navigation/help, runner pause with explicit resume, preserved C live trail, discarded incomplete A/B drafts, and B snap preview cancellation without consumption.

## Evidence and limits
59 strict TypeScript/Node tests pass (48 prior + 11 new); Playwright Chromium normal and synthetic-touch cancellation plus previous A/B/C regressions pass. These are emulator/browser checks, not measurements of real Android hardware, owned origin storage, player preference, or accessibility screen reader coverage. P6.4 user physical-device acceptance remains outstanding.

## Next decision boundary
Only after owner real-phone testing and recorded actual device findings should P6.4 be considered accepted. P6.5 unfamiliar player testing and commercial viability are separate goals.
