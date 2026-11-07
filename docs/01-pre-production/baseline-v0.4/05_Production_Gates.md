# Production roadmap and definition of ready/done
**Note:** Stages are gated by acceptance evidence, not arbitrary dates. No game release timing is promised.

| Gate | Purpose | Exit evidence | Owner of approval |
|---|---|---|---|
| P0 Charter | Establish collaboration, constraints and questions | Charter, current-state snapshot, decision/risk registers reviewed | Product owner |
| P1 Concept | Choose viable player experience | 3–5 concept cards, competitor evidence, criteria score, selected idea, signed vision | Product owner |
| P2 Design | Specify playable game | Approved GDD, art north star, UX flows, vertical-slice scope, costs and risk mitigation | Product owner |
| P3 Feasibility | Prove pipeline and primary mechanic | Reproducible APK workflow and minimal interactive prototype, recorded results | Engineering + owner |
| P4 Vertical slice | Demonstrate final-quality bar | One representative playable section with cohesive art, audio, UI, feedback and benchmark results | Product owner |
| P5 Alpha | Feature complete for agreed first release | All must-have features integrated, no critical design gaps, tracked known defects | QA/engineering |
| P6 Beta | Stable, tested and understandable | Diverse device tests, fresh-user playtests, no release-blocking defects, rights/policy audit | Product owner |
| P7 Launch | Public distribution readiness | Signed AAB, store compliance, account/closed-test gates, launch listing and support plan | Product owner |
| P8 Live Ops | Support and improve released game | Bug triage, reviews, measured user outcomes, roadmap based on data | Product owner |

## Gate policy
- **Designed** != **Implemented** != **Built** != **Tested** != **Approved** != **Published**.
- A stage is BLOCKED if an unmitigated critical risk or unverified tool requirement affects the next stage.
- No expanding feature scope in the middle of stabilizing a release; approved change requests must specify impact and trade-offs.
- Maintain explicit **Won't Ship V1** list; important for protecting the quality of core gameplay.

## Suggested reporting format
- **Stage/Version:** ...
- **Completed with evidence:** ...
- **In progress:** ...
- **Blocked/risks:** ...
- **Decisions required:** ...
- **Next committed actions:** ...
- **Build artifact and hash:** ... or NONE
- **Test outcome:** ... or NOT RUN