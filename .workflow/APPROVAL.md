# Human plan approval

## Current decision

| Field | Value |
| --- | --- |
| Approval status | PENDING |
| Proposed planning Git SHA | NOT_SET; existing source HEAD is not an approval packet |
| Approved Git commit SHA | NOT_SET |
| Human approver / date | NOT_SET |
| Human approval evidence | None received |
| Implementation baseline SHA | NOT_SET |
| Planning inventory | PENDING; seven redesign documents intentionally NOT_YET_CREATED |

Allowed decisions: PENDING, APPROVED, CHANGES_REQUESTED, REJECTED. Only the human
may grant approval. An agent may record the human's explicit decision with its
source, identity/date and exact approved full SHA. Preserve previous decisions.
This request authorizes workflow scaffolding, not application implementation.

## Existing planning and guidance references

Paths below are relative to this file and verified in the current worktree.
These four files are not asserted to be the seven-document planning set.

| Document | Purpose / audit observation |
| --- | --- |
| [Cinematic hero plan](../docs/cinematic-hero-planning-doc.md) | PRD, architecture, design tokens, sprint dependencies, metrics and historical decisions; describes Astro 4 / React 18, unlike current package versions |
| [Neo-retro 8-bit PRD](../docs/neo-retro-8bit-prd.md) | Retro desktop design direction and component layout; potentially conflicts with cinematic direction |
| [Certificate gallery and responsive plan](../cert-gallery-responsive.md) | Draft implementation tasks and verification viewports; explicitly awaiting approval |
| [Performance checklist](../docs/PERFORMANCE_CHECKLIST.md) | Historical checks and recommendations; claims are not current verified evidence |

The other registered worktree (`C:/Users/Vinny/Project/portfolio`) contains these
same paths. Preserve these four documents without moving, replacing or
duplicating them. They are historical context, not substitutes for the future
redesign planning packet or evidence of human approval.

## Expected redesign planning references

Codex will generate this packet in the `project-planning` worktree only after
the human supplies the separate planning metaprompt. Paths are repository-relative
references, intentionally not links to nonexistent files. Their absence does
not block scaffolding. Do not create placeholder planning documents now.

| Expected path | Status | Planning revision |
| --- | --- | --- |
| `docs/redesign/01-PRD.md` | NOT_YET_CREATED | NOT_SET |
| `docs/redesign/02-TRD.md` | NOT_YET_CREATED | NOT_SET |
| `docs/redesign/03-APP-FLOW.md` | NOT_YET_CREATED | NOT_SET |
| `docs/redesign/04-DESIGN-BRIEF.md` | NOT_YET_CREATED | NOT_SET |
| `docs/redesign/05-IMPLEMENTATION-PLAN.md` | NOT_YET_CREATED | NOT_SET |
| `docs/redesign/06-AGENT-HANDOFF.md` | NOT_YET_CREATED | NOT_SET |
| `docs/redesign/07-PROGRESS.md` | NOT_YET_CREATED | NOT_SET |

After generation, replace these references with verified links and record the
committed planning revision before human approval and implementation handoff.
`06-AGENT-HANDOFF.md` provides plan-level implementation instructions;
`.workflow/HANDOFF.md` records operational agent transfers. `07-PROGRESS.md`
tracks plan tasks; `.workflow/STATUS.md` tracks stages, gates and correction cycles.

## Architecture decisions requiring human approval

| ID | Decision to resolve | Status |
| --- | --- | --- |
| AD-01 | Review requirements and treatment of historical guidance in the future seven-document redesign packet | PENDING; planning not started |
| AD-02 | Select the application scope and design direction; resolve plan/current-stack discrepancies without silently changing architecture | PENDING |
| AD-03 | Approve any architecture decisions in the selected plan with rationale, alternatives, affected files and dependencies | PENDING; decision list incomplete |

No application architecture decision is made by this scaffold.

## Scope and acceptance criteria

Completed setup scope: documentation structure, shared responsibilities, approval
gate, committed-revision handoffs, independent review/re-review, final validation
and a three-cycle correction limit. Excludes application changes, dependency
installation, deployment, migrations, commits and pushes.

Application implementation scope: NOT_DEFINED. Codex must supply in-scope and
out-of-scope requirements, ordered tasks/dependencies, affected files, risks,
and measurable acceptance criteria before requesting approval.

| Criterion ID | Approved requirement / plan section | Verification method | Status |
| --- | --- | --- | --- |
| NOT_SET | Application criteria await the authoritative plan | NOT_SET | PENDING |

Setup completeness checks: all six requested instruction/workflow files exist;
existing documentation is untouched; both agents have explicit ownership and
gate rules; no human approval or application test results are fabricated.
These setup checks do not substitute for application acceptance criteria.

## Human approval notes

No approval notes received. For an explicit decision record: decision, approver,
timestamp, full planning SHA, selected documents at that SHA, approved decision
IDs, scope/criteria, conditions and the original human message or durable source.
Any architecture/scope/criteria change requires a new pending approval packet.

## Approval history

No previous workflow approvals recorded. Append decisions here before replacing
the current decision; never silently overwrite approval evidence.
