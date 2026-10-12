# Independent review report

| Field | Value |
| --- | --- |
| Reviewer | Codex |
| Review status | PENDING; implementation review not performed |
| Review verdict | BLOCKED |
| Reviewed Git revision | NOT_SET |
| Approved plan revision | NOT_SET |
| Implementation baseline revision | NOT_SET |
| Review branch / worktree / date | NOT_SET / NOT_SET / NOT_SET |
| Correction cycle | 0 / 3 |

Blocked because there is no approved plan or committed implementation target.
This is a scaffold, not a PASS review or a claim that no defects exist.
This placeholder verdict concerns future implementation review only; workflow
scaffolding is complete. The seven redesign plans are intentionally not yet
created and await the separate planning metaprompt.

## Review scope and evidence

Before review, verify explicit human approval, exact target SHA availability,
checked-out target, approved baseline-to-target diff and plan criteria. Record
reviewed paths, commands, exit codes, outputs/evidence, manual steps, and
limitations here. Codex must not edit implementation code during review.

No implementation checks run. Historical performance documentation is not
evidence for a current revision. Allowed verdicts: PASS, CHANGES_REQUIRED, BLOCKED.

## Findings by severity

Severity: CRITICAL (unsafe or unusable core behavior), HIGH (major failure or
material acceptance violation), MEDIUM (limited behavior/regression issue), LOW
(minor issue). Record whether each finding blocks acceptance; do not treat a
low-severity acceptance violation as automatically optional.

No findings recorded because review has not started. Use one entry per finding:

| Required field | To be filled during actual review |
| --- | --- |
| Finding ID / severity / acceptance blocking | NOT_SET |
| Affected file and line(s) at reviewed SHA | NOT_SET |
| Reproduction steps, inputs and environment | NOT_SET |
| Expected behavior | NOT_SET; cite approved criterion |
| Actual behavior | NOT_SET; attach evidence |
| Acceptance criterion ID / violation | NOT_SET |
| Actionable correction and verification | NOT_SET; preserve approved architecture |
| Status / fix SHA / independent re-review evidence | OPEN -> FIXED_PENDING_REVIEW -> VERIFIED, or human disposition |

## Acceptance criteria coverage

| Criterion ID | Evidence at reviewed SHA | Result |
| --- | --- | --- |
| NOT_SET | Approved criteria unavailable | BLOCKED |

## Verdict and next action

BLOCKED: resolve planning/approval and committed target prerequisites first.
PASS requires every required criterion covered with evidence and no unresolved
acceptance blockers. CHANGES_REQUIRED must name finding IDs and next corrections.
Missing evidence is BLOCKED, never PASS by default.

## Review history

Append each attempt with date, plan/baseline/target SHAs, cycle number, findings,
commands/evidence and verdict. Preserve earlier findings. Every corrections
handoff requires a fresh independent review at its new target SHA before final
validation; after three unsuccessful correction cycles escalate to the human.
