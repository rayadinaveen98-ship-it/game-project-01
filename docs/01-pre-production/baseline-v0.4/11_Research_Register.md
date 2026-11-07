# Research register — verified 2026-11-07
The entries below are external research references, not proof the game has been built or validated. Reverify policies before release.

| ID | Source | Observation | Production implication |
|---|---|---|---|
| SRC-01 | https://godotengine.org/download/archive/ | 4.7.2 stable (2026-08-18); 4.8 beta2 (2026-10-29) | Favor pinned stable engine for initial feasibility |
| SRC-02 | https://godotengine.org/license/ | Godot engine is free, open source and MIT licensed; license notice obligations apply | No engine royalty, maintain attribution/license compliance |
| SRC-03 | https://docs.godotengine.org/en/4.7/tutorials/export/exporting_for_android.html | Docs require Android toolchain; 4.7 setup examples show Android SDK 35 | Test exact target API / Gradle export compatibility |
| SRC-04 | https://docs.godotengine.org/en/latest/tutorials/editor/command_line_tutorial.html | Engine supports headless command-line exports when installed and configured; latest docs may be ahead of pinned stable | Remote CI build feasible in principle, not yet proven here |
| SRC-05 | https://support.google.com/googleplay/android-developer/answer/11926878 | New standard Android apps/updates require target Android 16/API36 starting 2026-08-31 | Release-blocking compliance check |
| SRC-06 | https://support.google.com/googleplay/android-developer/answer/14151465 | New personal Play accounts since 2023-11-13 require >=12 opted-in closed testers for >=14 continuous days before applying for production | Recruitment/test calendar could affect launch |
| SRC-07 | https://support.google.com/android-developer-console/answer/16604405 | Full distribution developer enrollment has a one-time USD25 fee | Free development is different from free store publishing |
| SRC-08 | https://learn.unity.com/tutorial/the-real-time-production-cycle | Preproduction before production includes planning, prototypes and a single-source design document | Justifies explicit preproduction gate |
| SRC-09 | https://developer.android.com/games/engines/godot/godot-export | Godot can export APK for device testing and AAB for Google Play | Separate proof for APK and release AAB |

## Research still required, after concept choice
- Named competitor games, store descriptions, real review concerns and pricing models.
- Existing target device performance and compatibility evidence.
- Art/audio sourcing workflow and licenses for the chosen style.
- Genre-specific accessibility risks and game-content rules.
- Monetization provider terms if and only if we approve monetization.


## Discovery sources — 2026-11-07 (v0.2)
The following sources establish market and game-product context only. Full citations/interpretations live in `13_Market_Genre_Research_2026-11-07.md`.

| ID | Source | What it supports |
|---|---|---|
| SRC-10 | https://sensortower.com/press/press-release-sensor-tower-state-of-gaming-gaming-drove-52-billion-downloads-82b-iap-revenue-on-mobile-and-12b-premium-revenue-on-steam | Global 2025 mobile $82B IAP, maturity |
| SRC-11 | https://sensortower.com/blog/india-mobile-game-insights-2025 | India FY2024-25 8.45B game downloads, >$400M IAP and genre mix |
| SRC-12 | https://www.pocketgamer.biz/puzzle-accounts-for-44-of-casual-mobile-earnings-in-h1-2026/ | AppMagic H1 2026 casual puzzle share and revenue |
| SRC-13 | https://sensortower.com/blog/india-mobile-app-market-q2-2026 | India Q2 2026 arrow puzzles rapid ranking, ad monetization |
| SRC-14 | https://sensortower.com/blog/india-mobile-market-q1-2026 | India Q1 2026 puzzle revenue category growth |
| SRC-15 | https://www.gameanalytics.com/benchmarks | Monthly cohort retention percentiles, sample caveat |
| SRC-16 | https://www.gameanalytics.com/cn/reports/2026-mobile-pc-gaming-benchmarks | Annual global median game retention |
| SRC-17 | https://sensortower.com/blog/h1-2026-digital-gaming-market-index | Stagnation of installs, rising ad competition |
| SRC-18 | https://www.adjust.com/blog/gaming-app-insights-2026/ | 2026 acquisition/retention pressure |
| SRC-19 | https://dinopoloclub.com/games/mini-metro/ | Minimal but deep systems benchmark |
| SRC-20 | https://www.greenheartgames.com/app/game-dev-tycoon/ | Management game / premium business-model benchmark |
| SRC-21 | https://www.goodpizzagreatpizza.com/press/ | Cozy job-simulator and story benchmark |
| SRC-22 | https://tinyroom.kiarygames.com/town-mystery | Detective / escape benchmark |
| SRC-23 | https://playdigious.com/games/shapez | Abstract systemic puzzle benchmark |
| SRC-24 | https://thegraysquare.com/ | Simple-rule puzzle benchmark |
| SRC-25 | https://developer.android.com/google/play/requirements/target-sdk | Google Play API36 requirement |
| SRC-26 | https://support.google.com/googleplay/android-developer/answer/14151465 | New personal Play account test requirements |

## v0.3 public competitor research additions (2026-11-07)
See `17_Competitor_Audit_2026-11-07.csv` for 19 direct Google Play URLs and corresponding mechanic/monetization observations. This register keeps direct URLs rather than third-party revenue estimates.
Additional qualitative community evidence (non-representative):
- Golden Idol UX discussion: https://www.reddit.com/r/patientgamers/comments/1fgpn0k
- Android premium purchase attitudes: https://www.reddit.com/r/AndroidGaming/comments/1vsf7qm/do_you_think_premium_games_are_worth_buying_on/
- Film-tycoon feature requests / dissatisfaction: https://www.reddit.com/r/tycoon/comments/1m1ynom/best_movie_tycoon_game/
Names and concept proximity checks: `18_Name_Originality_Collision_Audit.md`.