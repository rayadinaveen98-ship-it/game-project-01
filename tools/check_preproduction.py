#!/usr/bin/env python3
"""GP-01 historical documentation gate. No external dependencies.

Checks document structure and internal metadata, not game functionality or fun.
"""
import csv
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "docs" / "01-pre-production" / "baseline-v0.4"
errors = []

def expect(ok, message):
    if not ok:
        errors.append(message)

def load_json(filename):
    try:
        return json.loads((BASE / filename).read_text(encoding="utf-8-sig"))
    except (OSError, ValueError) as exc:
        errors.append(f"{filename}: {exc}")
        return {}

required = [
    "00_Project_Charter.md", "01_Concept_Discovery.md", "05_Production_Gates.md",
    "07_Decisions.csv", "08_Risks.csv", "09_Backlog.csv", "10_Concept_Scorecard.csv",
    "14_Concept_Slate_2026-11-07.md", "17_Competitor_Audit_2026-11-07.csv",
    "22_Concept_Lab_Brief_v0.4.md", "23_Puzzle_Card_Sets_And_Verification.md",
    "24_Detective_Case_Files.md", "25_Film_Montage_Test.md",
    "26_User_Research_Protocol.md", "28_Concept_Lab_Status_v0.4.md",
    "29_Sources_Addendum.md", "30_Prototype_QA_Results.json",
    "project_state.json", "README.md",
]
for name in required:
    f = BASE / name
    expect(f.is_file() and f.stat().st_size > 30, f"Missing/empty: {name}")

state = load_json("project_state.json")
expect(state.get("project_id") == "GP-01", "Wrong project ID")
expect(state.get("version") == "0.4.0", "Historical v0.4 version changed")
expect(state.get("concept") == "UNDECIDED", "Historical concept was not approved")
expect(state.get("genre") == "UNDECIDED", "Historical genre was not approved")
expect(state.get("discovery", {}).get("real_human_player_tests_completed") == 0,
       "v0.4 cannot claim real player tests")
goals = state.get("product_objectives", {})
expect(goals.get("creative_quality_weight") == 0.5 and
       goals.get("commercial_viability_weight") == 0.5, "Balanced objective changed")

qa = load_json("30_Prototype_QA_Results.json")
checks = qa.get("checks", [])
expect(len(checks) == 2, "Expected two P1/P2 QA records")
for check in checks:
    n = len(check.get("start", ""))
    expect(check.get("number_of_assignments_checked") == 2 ** n,
           f"{check.get('board')}: enumeration count inconsistent")
    expect(check.get("static_verification") == "PASS" and
           len(check.get("solutions", [])) == 1,
           f"{check.get('board')}: QA metadata inconsistent")

for name, ids_needed in [
    ("07_Decisions.csv", ["DEC-001", "DEC-009", "DEC-010", "DEC-018"]),
    ("08_Risks.csv", ["R-001", "R-004"])
]:
    try:
        with (BASE / name).open(encoding="utf-8-sig", newline="") as fh:
            rows = list(csv.DictReader(fh))
        ids = [row["ID"] for row in rows]
        expect(len(ids) == len(set(ids)), f"{name}: duplicate IDs")
        for id_ in ids_needed:
            expect(id_ in ids, f"{name}: missing {id_}")
    except (OSError, KeyError, ValueError) as exc:
        errors.append(f"{name}: {exc}")

try:
    with (BASE / "10_Concept_Scorecard.csv").open(
        encoding="utf-8-sig", newline=""
    ) as fh:
        scores = list(csv.DictReader(fh))
    expect(len(scores) == 8, "Expected eight concept hypotheses")
    expect(all(not row.get("Weighted_Score_0to100", "").strip() for row in scores),
           "No scores allowed before player evidence")
except (OSError, ValueError) as exc:
    errors.append(f"scorecard: {exc}")

if errors:
    print("FAIL: GP-01 documentation checks\n" + "\n".join(" - " + x for x in errors))
    sys.exit(1)
print(f"PASS: historical v0.4 documentation gate ({len(required)} required files).")
print("This does not verify gameplay, player enjoyment, originality or mobile builds.")
