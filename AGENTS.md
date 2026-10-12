# Shared repository workflow

This is the shared instruction source for Codex, Antigravity, the human, and
Orca. Read it at the start of every task, then read `.workflow/STATUS.md`,
`.workflow/APPROVAL.md`, `.workflow/HANDOFF.md`, the referenced plans, and the
latest review/validation records. Orca must explicitly supply this file to
Antigravity until instruction discovery has been verified in that runtime.

## Repository audit and scope

- Application: Astro 5, React 19 islands, Tailwind, Keystatic, TypeScript strict
  configuration; source in `src/`, static assets in `public/`.
- Preserve the four existing planning/guidance documents at their current paths;
  they are indexed in `.workflow/APPROVAL.md` as historical context.
- The seven redesign planning documents are intentionally NOT_YET_CREATED.
  Their expected paths under `docs/redesign/` are recorded in APPROVAL. Codex
  will generate them later in the `project-planning` worktree after receiving
  the separate planning metaprompt. Do not generate them during scaffolding.
  Their planned absence does not block scaffolding; planning is PENDING.
- `README.md` is the Astro starter guide. `package.json` exposes `dev`, `build`,
  `preview`, and `astro`; it has no test or lint script. Historical plan and
  performance claims are context, not evidence for a current revision.
- This setup task permits documentation scaffolding only. Do not implement
  features, change application architecture, install dependencies, deploy,
  migrate, commit, or push without separate explicit authorization.

## Ownership

| File or activity | Owner |
| --- | --- |
| Planning documents and proposed scope/acceptance criteria in APPROVAL | Codex |
| Future `docs/redesign/06-AGENT-HANDOFF.md` | Codex authors plan-level implementation instructions; operational transfers remain in `.workflow/HANDOFF.md` |
| Future `docs/redesign/07-PROGRESS.md` | Codex initializes the plan task tracker; Antigravity updates implementation tasks; `.workflow/STATUS.md` remains the stage/gate record |
| Approval decision, approved plan SHA, identity/date, and approval notes | Human; an agent may transcribe an explicit human decision with its source |
| Application implementation and corrections | Antigravity |
| STATUS stage/progress/blockers | Current responsible agent; Orca coordinates updates under a single writer |
| HANDOFF | Outgoing agent; incoming agent records receipt after revision checks |
| REVIEW_REPORT and FINAL_VALIDATION | Codex |
| Task scheduling, worktree assignment, integration coordination | Orca |

Codex owns planning, independent review, and final validation. During review,
Codex must not modify implementation code; write actionable findings instead.
Antigravity follows approved requirements and dependencies, runs relevant
verification, updates progress/handoffs, and fixes findings. Architecture or
scope changes require a return to planning and explicit human approval. The
human owns architecture/scope decisions and resolves blocked decisions.

## Required sequence and gates

Stage statuses: `PENDING`, `IN_PROGRESS`, `BLOCKED`, `COMPLETED`.

| Stage | Responsible | Exit gate / next stage |
| --- | --- | --- |
| PLANNING | Codex | Complete referenced plans, dependencies, scope and measurable acceptance criteria; hand off to HUMAN_APPROVAL |
| HUMAN_APPROVAL | Human | Explicit APPROVED decision for an exact committed plan revision; then IMPLEMENTATION |
| IMPLEMENTATION | Antigravity | All approved tasks implemented and verification recorded at a committed revision; then INDEPENDENT_REVIEW |
| INDEPENDENT_REVIEW | Codex | PASS -> FINAL_VALIDATION; CHANGES_REQUIRED -> CORRECTIONS if cycles remain; BLOCKED -> resolve blocker |
| CORRECTIONS | Antigravity | Commit fixes with finding IDs and evidence; always return to INDEPENDENT_REVIEW |
| FINAL_VALIDATION | Codex | PASS -> workflow complete; implementation failure -> findings and CORRECTIONS/re-review if cycles remain; BLOCKED -> resolve blocker |

Implementation must not start unless APPROVAL is `APPROVED`, with explicit
human evidence, an approved full Git SHA, a complete plan inventory and
unambiguous scope/acceptance criteria. `PENDING`, `CHANGES_REQUESTED`,
`REJECTED`, missing evidence, or a changed approved plan blocks implementation.
Never infer approval from silence, an old plan's wording, a task assignment,
or this scaffolding request. If approved requirements change, preserve the
previous decision in approval history and reset approval to PENDING.

Count one correction cycle when Antigravity starts a corrections attempt;
increment STATUS before work begins. A cycle includes its independent Codex
re-review. The maximum is three automated correction cycles per approved
scope, including fixes triggered by final validation. If issues remain after
cycle three, block the workflow and escalate to the human; never start cycle
four or silently reset the counter. A human decision must define any new scope
or authorized continuation. Failed validation never bypasses independent
re-review of corrections.

Final validation must use exactly the latest implementation SHA with a Codex
PASS review and the same approved plan. New implementation changes invalidate
that review and any prior validation. Codex must re-review before validation.
PASS requires evidence for every approved criterion and required check.
Record unexecuted checks as NOT_RUN with reasons, never as passed.

## Handoffs, Git and worktrees

1. The outgoing agent updates STATUS and HANDOFF with the branch/worktree,
   approved plan SHA, exact implementation SHA where applicable, completed
   tasks, changed files, verification commands/results, blockers, and next steps.
2. A usable cross-worktree handoff must reference committed revisions. A local
   draft may say NOT_COMMITTED, but it is not ready for execution by another
   agent. Committing/sharing requires explicit authorization; do not commit or
   push automatically to satisfy the handoff gate.
3. The incoming agent verifies commit availability (`git show <sha>`), its
   worktree (`git worktree list --porcelain`), local changes (`git status --short`),
   and the target (`git rev-parse HEAD`). Review the approved baseline-to-target
   diff (`git diff <baseline-sha> <implementation-sha> --`) at that exact target.
   A branch name alone is insufficient; never review an unrelated worktree HEAD.
4. Uncommitted edits are not shared automatically. Worktree files are separate
   even when Git objects/refs are shared. Orca assigns one writer per working
   tree and serializes workflow-document updates. Agents must not concurrently
   modify the same working tree.
5. Orca explicitly selects the integration branch and owner. Merge/cherry-pick
   only with task authorization, preserve local edits, and handle conflicts
   explicitly. Never use destructive resets, cleans, forced checkout/push, or
   discard another agent's work. Record conflict resolution and the resulting
   SHA; any new integrated implementation revision requires independent review
   followed by final validation at that revision.

Keep prior approvals, handoffs, findings, and validation attempts as dated
history in their existing files. Record full SHAs, actor, timestamp, and task ID
when known; use explicit UNKNOWN/NOT_SET rather than invented values. Do not
claim that a document's eventual commit is its own already-known SHA: record the
source revision, and record the handoff artifact revision after it exists.

## Verification and orchestration integration

Choose checks from approved acceptance criteria and available tooling. The
existing build command is `npm run build`; `npm run astro -- check` is only a
candidate if its checker dependencies are already available. Do not install
tools to run it without authorization. A build is not evidence of all type,
accessibility, interaction, or performance checks. Log command, worktree, SHA,
timestamp, exit code/output evidence, and limitations.

These Markdown files establish a protocol, not runtime enforcement. Orca still
needs verified agent instruction loading, a human approval capture mechanism,
stage-to-agent routing, single-writer/worktree coordination, committed artifact
sharing, exact-SHA review/validation checks, a correction counter and escalation
path, and explicit integration/conflict handling. No Orca automation was
configured or tested by this task.

The other registered worktree, `C:/Users/Vinny/Project/portfolio`, contains a
local ignored AG Kit `.agents/README.md` describing `.agents/rules/*.md`
discovery for Antigravity. That is local documentation, not proof of runtime
support here; its advertised check scripts are absent from this repository's
package.json. No separate Antigravity instruction file is created. If a verified
runtime requires an adapter, use its supported convention to point to this
AGENTS.md without copying the rules, and ensure the adapter is actually shared
and loaded. Existing ignored toolkit rules must not bypass this approval gate.
