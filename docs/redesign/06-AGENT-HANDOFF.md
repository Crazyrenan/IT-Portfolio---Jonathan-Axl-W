# AXL_OS XP — Antigravity implementation handoff

Draft 1, 2026-10-12. Planning author: Codex. Implementation agent: Google
Antigravity. Human approval: PENDING. Approved planning SHA: NOT_SET.
Implementation tasks: all NOT_STARTED. This file is the plan-level source of
truth for the implementing agent; operational transfers remain in
`.workflow/HANDOFF.md`. Read root `AGENTS.md` and the entire seven-file packet.
If any instruction conflicts with the approved user scope, record the conflict,
follow the user instruction and obtain required architecture/scope decisions.

## Context and authorization boundary

Evolve Jonathan Axl Wibowo's existing portfolio at https://jonathanaxl.my.id/
into AXL_OS XP: a coherent Windows XP Luna-inspired desktop plus a direct
professional Quick View. Keep real content/features, routes/CV/contact/extras;
do not substitute a new framework or erase source functionality.

Planning audited app source at `97718e55330aca669ec4063d64461a45eb149433`.
Planning worktree HEAD became `e48e3e289941ecd43d93683863d3c5702829ae75` during
audit through an external scaffolding commit, not a Codex commit. Git diff
confirms only six workflow files added; application source stayed identical.
The planning packet itself is uncommitted at authoring time. Do not mistake
either SHA for an approved plan or implemented redesign.

Registered worktrees at final audit:

| Worktree | Branch / HEAD |
| --- | --- |
| `C:/Users/Vinny/Project/portfolio` | main / application baseline SHA above |
| `C:/Users/Vinny/orca/workspaces/portfolio/project-planning` | project-planning / scaffolding SHA above |
| `C:/Users/Vinny/orca/workspaces/portfolio/project-implementation` | project-implementation / application baseline SHA above |

Before executing a task: verify exact committed plan availability and explicit
human APPROVED decision with full SHA/notes in `.workflow/APPROVAL.md`. Missing
approval blocks implementation. Orca must assign one writer to each worktree,
supply shared instructions, and coordinate integration of the approved plan.
Uncommitted files do not travel between worktrees. Never implement directly
from the older baseline without importing/verifying the authorized plan revision.

This planning phase wrote only `docs/redesign/`: AGENTS and `.workflow` were
deliberately not edited. Their existing planning inventory/stage text remains
stale (NOT_YET_CREATED / awaiting metaprompt). An authorized actor must synchronize
the references and proposed packet SHA before human approval. The stale scaffold
is not proof the seven documents are absent and is not permission to implement.
Commit/share/integrate only when separately authorized; no push/deploy implied.

## Verified stack and repository map

Lock versions: Astro 5.18.2, React/ReactDOM 19.2.4, @astrojs/react 4.4.2,
Tailwind 3.4.19, framer-motion 12.33.0, TypeScript 5.9.3, tsx 4.23.13,
@astrojs/node 9.5.5, @keystatic/astro 5.0.6 / core 0.5.48. npm lock v3.
GSAP 3.14.2 and Three 0.182.0 are declared/locked but no runtime imports found.
Local inspection Node v22.19.0 / npm 10.9.3; deployment versions unverified.
Current planning worktree had no node_modules, test/lint scripts or test config.

| Critical verified path | Responsibility / preservation |
| --- | --- |
| `package.json`, `package-lock.json` | Existing dependencies, dev/build/preview/astro scripts; no install/change permission |
| `astro.config.mjs` | Static output, standalone Node adapter; keep deployment setup |
| `tsconfig.json`, `tailwind.config.js` | Strict Astro types and Tailwind v3 JS tokens; no v4 migration |
| `keystatic.config.js`, `src/content/config.ts` | Local projects/status storage and legacy collection schema; preserve APIs |
| `src/pages/index.astro` | Homepage shell client:load; pass build-time normalized summary props |
| `src/pages/projects/[slug].astro` | Existing static routes via getCollection/project.render; preserve URLs/bodies |
| `src/pages/404.astro` | Error route and return navigation |
| `src/layouts/Layout.astro` | Metadata/fonts/ClientRouter/video/reveal; refactor safely for reading vs desktop modes |
| `src/styles/global.css` | Win95 and cinematic leftovers; migrate to scoped Luna tokens with reachability checks |
| `src/components/retro/DesktopManager.tsx` | Nine existing app records, icons, utilities, mobile resize logic; main integration risk |
| `src/components/retro/RetroWindow.tsx` | Existing flow-based frames/drag/local resize; replace with bounded geometry/focus contract |
| `src/components/retro/RetroTaskbar.tsx` | Menu/task tabs/clock; preserve closed removal/minimized tabs |
| `src/components/retro/RetroBootScreen.tsx` | Timed skip/gesture chime/replay; make optional, resource-clean |
| `src/components/retro/PixelHero.tsx` | Profile/portrait/CV/hash actions |
| `src/components/retro/RetroSkillsGrid.tsx` | Skills/categories/properties and external icon fallbacks |
| `src/components/retro/RetroProjectsDossier.tsx` | Seven hard-coded summaries/select/detail; use eight canonical Markdown entries instead |
| `src/components/retro/RetroTimeline.tsx` | Four history/education records |
| `src/components/retro/RetroTerminal.tsx` | Encoded mailto draft/clear/social links; no backend delivery |
| `src/components/retro/RetroCertificateGallery.tsx`, `src/data/certificates.ts` | Six certs/dock/drawer/preview/zoom/raw links; integrate app + one true modal |
| `src/components/retro/RetroEasterEggs.tsx` | Persona/Apex/Elden/demo browser; preserve real local interactions, defer chunks |
| `src/config/site.ts` | Old nav/social config with different email; no current import found |
| `src/content/projects/` | Eight .md case studies: help-desk-ai, field-service-pro, lkh-internal-platform, imip-recruitment, optical-intel-ocr, personal-developer-portfolio, windbreaker-ai, tb-detection-comparative-study |
| `src/content/status/current.md` | Stored CMS data; not proven displayed, retain |
| `public/cv.pdf`, `public/certificates/`, `public/images/projects/` | Real CV, six certificate image files, project screenshots; keep original URLs/files |
| `public/icons/retro/`, `public/icons/`, `public/assets/` | Icons/game/social art, 3 videos; original/licensed asset policy, no deletion on suspicion |

Preserve `docs/cinematic-hero-planning-doc.md`, `docs/neo-retro-8bit-prd.md`,
`docs/PERFORMANCE_CHECKLIST.md`, and `cert-gallery-responsive.md` unchanged.
Reuse lifecycle/performance/accessibility ideas, not old stack/design/seed data
or historical PASS claims. Current source supersedes unsupported old feature lists.

Proposed NEW implementation paths (not discovered/created yet):

- `src/data/portfolio.ts`: extracted shared profile/skills/history/contact plus
  pure project-summary type/normalizer for dependency-free Node fixture testing.
- `src/lib/portfolio.ts`: build/server-only Astro collection adapter calling that
  normalizer; never import this Astro virtual-module consumer in plain Node.
- `src/lib/window-manager.ts`: registry, lifecycle reducer, bounds helpers.
- `src/components/portfolio/PortfolioContent.tsx`: named reusable professional bodies.
- `src/components/retro/StartMenu.tsx`, `SystemClock.tsx`, `MobileAppShell.tsx`.
- `src/pages/quick-view.astro`: SSR professional route, no shell hydration.
- `public/icons/xp/`: original, provenance-recorded illustrations if needed.
- `tests/window-manager.test.mjs`, `tests/portfolio-parity.test.mjs`,
  `scripts/verify-redesign.mjs`: Node behavior/parity verification, no new runner.

## Architecture and design contract

ADR-01 keep framework/legacy CC/deployment; ADR-02 static `/quick-view/`; ADR-03
shared data/Markdown authority; ADR-04 preserve wrappers/extract bodies; ADR-05
pure reducer/local gestures; ADR-06 adaptive single-app mode; ADR-07 existing
FM/CSS only; ADR-08 PDF/external links and demo browser, no embedding engine;
ADR-09 original assets/static background; ADR-10 hash intents/no draft/geometry
persistence; ADR-11 existing Node/manual tests and separately approved optional
tooling; ADR-12 design brief authority with runtime alias/override decision.
Full rationale/tradeoffs are in 02-TRD. Every ADR is proposed, not human-approved.

Luna chrome: blue glossy titlebar/taskbar, green Start, off-white content,
rounded frame tops, active/inactive chrome, Explorer, two-column identity menu.
Use exact CSS tokens/dimensions/contrast protocol in 04-DESIGN-BRIEF. Avoid
Win95 grey bevels, tactical HUD/neon, glass dashboard, unreadable small text,
fake File/Edit controls, default video/audio and XP asset ripping. Portrait
natural rendering, body >=14px and Quick View >=16px. Touch controls >=44px.
Game-specific app bodies may retain intentional personality, shell chrome uniform.

One singleton record per AppId: existing hero,skills,projects,experience,contact,
browser,p5r,apex,elden plus newly managed certificates. State phases closed,
normal,maximized,minimized; beforeMinimize saves mode; normal/restore Rect stored
in manager. Unique visible stack derives activeId/z; no unbounded counters.
OPEN from launcher never minimizes. TASK_ACTIVATE alone toggles active minimize.
Minimize keeps visited renderer hidden/inert, close resets/unmounts local state.
Show Desktop snapshot restores only surviving open apps. All utilities atomic.

Desktop workspace excludes taskbar/safe-area, all bounds clamp to available
screen, preferred min size capped by screen. Max restores saved normal rect.
Title/resize pointer capture, cancel/unmount cleanup, locally animated transient
rect -> reducer commit only at gesture end. System menu Move/Resize with arrows
and Center/Fit alternatives. No pointer-only control, focus theft or hidden Tab
target. Only true modal traps focus; inactive covered body inert with app-switch
access. App/control labels unique, scoped Escape/restore follows 03-APP-FLOW.

<768 mobile / 768–1023 tablet / >=1024 fine desktop; primary coarse input uses
full-screen apps even wide. Same content/registry, no resize auto-open. Root
valid hash opens app/selected project; Back/Forward applies intent without loops;
refresh resets geometry; root no-JS identity + real Quick View link. Article
routes and Quick View SSR content survive JS disabled and hydration failures.

## Baseline features that must remain working

Boot skip/replay (not compulsory delay), nine original app destinations, profile/
portrait fallback, CV link, skill categories/selection/details, seven existing
desktop project destinations plus eighth canonical portfolio case study, all
eight slugs/article Markdown/galleries/source links, four work/education records,
six certificate thumbnails/detail/75–250% zoom/reset/raw files, required contact
draft/clear and rendered Gmail/LinkedIn/GitHub channels, desktop controls and
multi-window focus/tasks, Start actions, WIB clock and all-app utilities.

Preserve Persona calling-card reveal/close and attack toggle; Apex random loot;
Elden message cycling; browser mock search/back/home/refresh and real links.
Label fictional results/metrics as demo/flavor, not verification evidence.
No real browsing proxy was discovered. Nonfunctional menu/tool affordances may
become decoration or be omitted; they are not functionality to replace secretly.

Contact currently renders `vinny.jonathan.axl@gmail.com`; old site.ts contains
`jonathan.axlw@gmail.com`. Preserve rendered contact provisionally and obtain
owner confirmation. No API/contact backend exists in inspected source. Required
test email fixtures must not actually send messages. CV “download” currently
opens PDF new tab; use truthful labels and retain open/download fallback.

## Task ordering and responsibilities

| Phase | Tasks / outcome |
| --- | --- |
| 0 | T01 baseline feature/owner decisions -> T02 tooling/performance -> T03 shared data |
| 1 | T04 approved tokens/assets -> T05 shared desktop/frame primitives |
| 2 | T06 atomic reducer -> T07 focus/controls -> T08 bounded gestures -> T09 launch/hash/utilities |
| 3 | T10 optional boot -> T11 Start -> T12 taskbar/clock |
| 4 | T13 core bodies -> T14 Explorer/articles -> T15 Quick View; T16 certificates, T17 contact, T18 extras follow their explicit dependencies |
| 5 | T19 route/layout/SEO -> T20 adaptive shell -> T21 mode/viewport recovery |
| 6 | T22 measured motion/performance -> T23 accessibility evidence/corrections |
| 7 | T24 Antigravity regression/handoff -> T25 Codex independent review/re-review/final validation |

Follow each precise edge in 05-IMPLEMENTATION-PLAN, not phase labels alone.
Orca manages scheduling/worktree writer assignments, not approval. Human
approves architecture/scope and resolves blocked decisions. Antigravity owns
implementation/corrections, runs evidence and updates progress. Codex never
modifies implementation code during independent review. Do not invoke legacy
multi-agent minimums or deployment procedures to expand this scope.

## Running and testing

Existing scripts, to run later only in authorized prepared implementation env:

```powershell
git status --short
git rev-parse HEAD
git worktree list --porcelain
npm run dev -- --host 127.0.0.1
npm run build
npm run preview -- --host 127.0.0.1
```

No npm test/lint/check:agents/check:antigravity/test:antigravity scripts exist.
Proposed T06 command `node scripts/verify-redesign.mjs` does not exist yet.
It must use local TypeScript in node_modules to compile pure TS to a checked
temporary directory, run Node tests and clean only its own temporary target.
Test reducer lifecycle/order, bounds/restore/cancel, utility snapshots, URL
validation and pure project normalization/data parity. Use build+generated
route/content comparison for Astro adapter integration; Node tests must not
pretend to import astro:content runtime outside Astro.

`npm run astro -- check` is conditional on @astrojs/check already present and
noninteractive; not in current manifest. Local tsc --noEmit if available checks
TS/TSX, not Astro templates. No npx downloads/install/ci or Python/Playwright
downloads without explicit authorization. An optional test-tool request must
specify package/config/browser changes and commands before installation.

Required browser evidence: normal/active/minimized/max/restored/closed windows,
duplicate launch, stack/focus, bounded drag/resize+keyboard equivalents, Start
dismissal, task overflow, hashes/refresh/back, no-JS root/Quick View/articles,
all eight case-study/CV/cert/contact links, touch keyboard/rotation, modal focus,
reduced-motion, forced-colors, 200% zoom/320px reflow, asset failures, extras.
Use 1440x900,1920x1080,1024x768,768x1024,375x667,390x844 as named screenshots;
additional 320/412 widths and short/mobile landscape for overflow coverage.

Performance targets: lab LCP <=2.5s, CLS <=0.1; field INP <=200ms p75 when
data exists. Three matched cold mobile runs with median/range; initial desktop
JS <=250KiB gzip/CSS <=50KiB, Quick View application JS 0 and total route JS
<=50KiB, initial images <=400KiB. Drag/resize 3 apps 10s: target p95 frame <=20ms
at 60Hz, no attributable >50ms task; 50 lifecycle cycles resource baseline.
These are proposed targets, not achieved numbers. Record full PRD FR/NF coverage.

## Antigravity skills compatibility audit

Scope: read-only inventory/metadata/selected instructions, not skill activation.
Current planning worktree has no `.agents/` or `.antigravity/`; both ignored by
`.gitignore`. The main worktree at `C:/Users/Vinny/Project/portfolio` has a local
AG Kit tree with 67 skill directories (count verified during audit),
`.agents/rules/`, `.agents/agent/`, `.agents/workflows/`, `.agents/memory/` and
`.agents/README.md`. These files are not automatically in project-implementation.
Existence is not tested installation, discovery or executable/tool availability.
Global Antigravity skills were not accessible through a verified runtime catalog
in this session: UNVERIFIED, not assumed absent. Codex's available global skill
list is not Antigravity's list. Do not copy this skill installation or activate
hooks/MCP as a side effect of the redesign.

Every skill path below is relative to that inspected main-worktree `.agents/skills/`,
ending `/SKILL.md`. Directory name may differ from skill frontmatter identity
(tactical-ui-designer advertises tactical-ui-architect). Relevant skill metadata
was inspected; this audit does not certify every referenced resource/script.

| Available skill | Purpose / relevant tasks | Compatibility and use recommendation |
| --- | --- | --- |
| frontend-design | Audit-first web redesign; T04,T05,T13–T20 | Apply Luna brief, not generic anti-template stylistic mandates; audit existing UI |
| frontend-architecture | UI/logic/data separation; T03,T06,T13 | Use React/Astro boundaries; Next/Vue scaffolding suggestions inapplicable |
| architecture | Requirement tradeoffs/ADR planning | Useful for documented deviations, not authority to rewrite approved ADRs |
| design-spec | DESIGN.md token/rationale format; T04 | Requires root DESIGN.md; conflict resolution below, do not generate one during planning |
| tactical-ui-designer | Portfolio-specific polished Astro design/lifecycle | Reuse safe lifecycle/performance principles only; cinematic Ada/Umbrella palette conflicts with Luna |
| nextjs-react-expert | React performance and Next-specific rules; T06,T18,T22 | Use applicable React rules only; no Next.js routes/cache/server actions |
| tailwind-patterns | Tailwind v4 CSS-first guidance | Current v3: do not apply @theme/v4 migration; general token concepts only |
| web-design-guidelines | Web UI/accessibility review; T23,T25 | Fetch/read actual referenced guidance if invoked; cannot replace executed AT/browser evidence |
| webapp-testing | E2E/Playwright/browser audit; T01,T20,T24 | Script advises pip/playwright/browser install; requires separate approval and script/tool inspection |
| testing-patterns, tdd-workflow | Behavior/unit/integration testing; T03,T06,T08,T24 | Existing Node runner sufficient; no automatic framework installation |
| verify-changes | Execution evidence; every checkpoint/T24 | Generic npm test/lint commands absent here; run only real available checks |
| lint-and-validate | Syntax/types/quality checks | npm lint/npx eslint --fix advice inapplicable without approved config/tooling; no auto-fix or installs |
| performance-profiling | Measurement/analysis; T02,T22 | Use measured evidence, no claimed 60fps from code inspection |
| seo-fundamentals | Metadata/discoverability; T15,T19 | No invented personal facts/analytics/backend/provider changes |
| animate, emil-design-eng | Purposeful motion implementation/polish; T10,T22 | Existing FM/CSS, brief timings and reduced-motion override novelty |
| improve-animations, find-animation-opportunities | Read-only motion audit/proposals; T02/T22 planning | Advisor skills do not perform fixes; Antigravity implements approved proposals separately |
| review-animations | Motion diff review; T25 | Focused review only; preserve Codex independent review ownership |
| code-review-checklist, code-review-graph | General review / optional graph-assisted blast radius | Optional evidence aids; graph MCP/tool availability unverified, no install by implication |
| mobile-design | Native iOS/Android/React Native design | Explicitly not web apps; do not route responsive Astro work to native stack |
| clean-code, simplify-code, systematic-debugging | Maintainable code/scoped simplification/root cause | Useful throughout; no unrelated cleanup or changing requirements silently |
| powershell-windows | Native shell quoting/safe operations | Relevant implementation host; avoid Bash-only commands/deletion chaining |

Additional directory inventory, grouped by advertised subject (not all bodies
audited; not required to invoke):

| Group / purpose | Available directory names |
| --- | --- |
| Agent workflow/routing/context | behavioral-modes, brainstorming, intelligent-routing, coordinator-mode, parallel-agents, context-compression, batch-operations, memory-system, plan-writing, documentation-templates |
| Discovery/customization | find-skills, skillify, mcp-builder, pick-ui-library, prototype |
| Specialized review/advice hubs | ponytail, ponytail-audit, ponytail-debt, ponytail-gain, ponytail-help, ponytail-review |
| Alternative style/motion vocabulary | apple-design, animation-vocabulary, animate-expo (native Expo, not this stack) |
| Server/API/data/language architecture | api-patterns, app-builder, database-design, nodejs-best-practices, python-patterns, rust-pro, write-swift, bash-linux |
| Release/security/SEO/localization | deployment-procedures, server-management, vulnerability-scanner, red-team-tactics, geo-fundamentals, i18n-localization |
| Library/game additions | ask-sonner, game-development; no new toast/game runtime required |

### Instructions, conflicts and invocation policy

Inspected `.agents/README.md` describes Antigravity discovery of rules/skills/
workflows/agent roles and advertises toolkit scripts absent from package.json.
`.agents/rules/core-protocol.md` requires reading relevant agent/skills and memory
before implementation. Frontend-specialist references frontend-design,
design-spec, nextjs-react-expert, frontend-architecture, web-design-guidelines,
tailwind-patterns, lint-and-validate; test-engineer references testing-patterns,
tdd-workflow, webapp-testing and code-review-checklist.

#### Verified Runtime Audit & Conflict Resolutions
1. **Frontend Implementation:**
   - `frontend-design`, `frontend-architecture`, `clean-code`: fully compatible. Used for clean module boundaries and component-level refactoring.
   - `nextjs-react-expert`: applied strictly for pure React 19 performance patterns (memoization, hooks, rendering isolation) without introducing Next.js routing, RSC server actions, or App Router constructs.
2. **UI/UX Design:**
   - `frontend-design`: anti-slop principles applied within the approved Windows XP Luna aesthetic brief.
   - `design-spec`: expects project-root `DESIGN.md`. Per approved TRD ADR-12, `docs/redesign/04-DESIGN-BRIEF.md` serves as the authoritative design system and token reference.
   - `tactical-ui-designer`: tactical Ada/Umbrella dark palette explicitly excluded as it directly contradicts Luna. Only component lifecycle guidelines are referenced.
3. **Browser Testing & Tools:**
   - `browser-testing-with-devtools`, `chrome-devtools`, `a11y-debugging`: evaluated in active CLI session. Note: external Chrome DevTools MCP server is not configured in this CLI runtime; automated browser checks and screenshots are recorded as NOT_RUN/BLOCKED per instructions, with reliance on Node tests and static verification.
   - `webapp-testing`: script references installing Playwright/pip; this is prohibited by project constraints without separate human authorization.
4. **Framework & Styling:**
   - Astro 5.18.2 + Tailwind 3.4.19: `tailwind-patterns` v4 `@theme` guidance is excluded to preserve locked Tailwind v3 compatibility.
   - `mobile-design`: designed for native mobile (iOS/Android/React Native). Excluded; responsive layout is handled via web media and container queries.

#### Skill-to-Task Implementation Matrix
| Phase | Tasks | Active / Invoked Skills | Excluded Aspects / Guardrails |
| --- | --- | --- | --- |
| Phase 0: Baseline & Data | T01–T03 | `clean-code`, `testing-patterns`, `tdd-workflow` | No data mutation or schema migration |
| Phase 1: Tokens & Primitives | T04–T05 | `frontend-design`, `design-spec` | Exclude v4 Tailwind; use `04-DESIGN-BRIEF.md` tokens |
| Phase 2: Window Manager | T06–T09 | `nextjs-react-expert`, `clean-code`, `tdd-workflow` | React 19 purity; no global stores (Zustand) |
| Phase 3: Start, Taskbar, Boot | T10–T12 | `frontend-design`, `frontend-ui-engineering` | No fake telemetry; no unskippable delays |
| Phase 4: Application Bodies & Quick View | T13–T18 | `frontend-design`, `frontend-architecture`, `api-and-interface-design` | No iframe engines; preserve Markdown canonical source |
| Phase 5: Adaptive Shell & Layout | T19–T21 | `frontend-architecture`, `powershell-windows` | No native mobile patterns; preserve safe-area 100dvh |
| Phase 6: Motion, Perf & Accessibility | T22–T23 | `performance-optimization`, `web-design-guidelines`, `a11y-debugging` | No default looping video/audio; WCAG 2.2 AA target |
| Phase 7: Regression & Verification | T24–T25 | `verify-changes`, `code-review-and-quality` | Run real Node test runner; unexecuted checks marked NOT_RUN |

Before each phase Antigravity verifies which relevant skills actually load in
its assigned worktree, reads their appropriate resources, announces invoked
skills and records exclusions/conflicts. Do not assume Codex globals or ignored
main-worktree files are shared. Phase-to-skill mapping above is authoritative.

## Evidence, reporting and progress updates

Update 07-PROGRESS for each task with actual status, files, tests/results/open
issues, exact implementation SHA and notes. NOT_STARTED -> IN_PROGRESS ->
COMPLETED (Antigravity evidence) -> VERIFIED (Codex independent evidence);
BLOCKED includes cause and next action. Retain history, do not claim completion
during planning or convert inspection to runtime testing.

Outgoing report template:

```text
Source/destination agent; task IDs / phase; actor/time; branch/worktree
Approved planning full SHA + explicit human decision source
Implementation baseline/target full SHA + artifact/integration SHA
Completed changes; exact changed files; baseline features preserved
Acceptance FR/NF IDs and evidence for each
Commands/actions: environment/viewport/cache, expected/actual, exit/log/capture
PASS/FAIL/NOT_RUN; reasons and risks; unresolved findings/blockers
Deviations and human approvals; correction cycle; required next steps
```

Update operational STATUS/HANDOFF after the planning-only scope ends and within
the authorized implementation task. A handoff for review must point to committed
revisions, verified by receiving Codex using git show/full SHA/status/worktree.
New integration/conflict resolutions require new review at resulting SHA.

Definition of Done: every FR/NF and baseline feature evidenced; working build/
meaningful pure tests + actual browser matrix; shared data, bounds/focus/motion/
SEO/Quick View/asset rights meet contract; no unapproved architecture changes;
required unavailable checks block release verdict. Codex actionable review,
Antigravity corrections, independent re-review for every corrected revision,
maximum three automated cycles then human escalation. Final validation uses
exact latest PASS-reviewed implementation SHA. No deploy/release action implied.

## Known uncertainties and prohibited changes

U: browser desktop/mobile rendering, AT/contrast/interaction/performance results;
deployed commit/provider/runtime/env; global Antigravity skills/discovery; helper
tools/browser automation availability; scientific/business claim substantiation;
game/icon/wallpaper rights; owner contact/content reconciliation and approved ADRs.
Source/HTTP audit is sufficient to plan, not to claim tested production readiness.

Prohibited without new explicit scope/approval: framework/Tailwind/content-API/CMS
migration, dependency installation/upgrades/removal, new backend/email provider,
infra/deployment/migrations, copying .env/secrets, credential/auth changes, deleting
functional content/routes/links/extras, copyrighted OS asset extraction, commit/
push/merge/reset/clean/force by implication, parallel writes in one worktree,
Codex implementation edits during review, silent architecture deviations.

## Planning inspection outcomes (not implementation results)

- Source tree/config/component/content/asset/skill/agent instruction audit performed.
- Local Node/npm and lock versions parsed; no app build/tests run, no dependencies.
- Largest asset sizes and one duplicate PNG SHA256 pair verified; no CWV scores.
- Live HTTP 200/title/one-island HTML retrieved; browser unavailable, no captures.
- Required planning files/task coverage/link/dependency consistency checked before
  delivery; 07-PROGRESS remains all NOT_STARTED. Final validation of implementation
  remains NOT_PERFORMED and human approval PENDING.

Planning documentation validation on 2026-10-12: a Node read-only consistency
check confirmed seven nonempty documents, valid local Markdown links, no trailing
whitespace, exactly 25 matching plan/tracker task IDs, all eleven task fields,
no unknown/cyclic dependencies and mappings for 16 FR + 9 NF requirements.
Skill directory count is 67 and all names appear in this audit. `git diff
--exit-code` returned 0 for tracked files; only docs/redesign/ is newly untracked.
These checks validate documentation structure, not application functionality,
browser behavior, design fidelity or production performance. Mermaid source was
inspected but not rendered by a diagram renderer in this session.
