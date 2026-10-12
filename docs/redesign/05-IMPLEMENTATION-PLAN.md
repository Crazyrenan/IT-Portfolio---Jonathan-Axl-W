# AXL_OS XP — Dependency-ordered implementation plan

Draft 1, 2026-10-12. Human approval PENDING. No task has started.
Normative requirements: [PRD](01-PRD.md); architecture/state: [TRD](02-TRD.md);
interactions: [flows](03-APP-FLOW.md); tokens: [design](04-DESIGN-BRIEF.md).
[Progress](07-PROGRESS.md) contains exactly the task IDs below.

## Execution prerequisites

Read root AGENTS.md and the complete planning packet. Obtain explicit human
approval for the exact committed planning revision and record it in
.workflow/APPROVAL.md through an authorized governance update. This planning
task writes only under docs/redesign/: the operational scaffold remains unchanged
and its NOT_YET_CREATED inventory is now stale. Before implementation, an
authorized actor must synchronize its references/stage/approval packet and record
the approved SHA. Do not treat this metaprompt as implementation approval.

Application baseline audited: 97718e55330aca669ec4063d64461a45eb149433.
Planning audit HEAD: e48e3e289941ecd43d93683863d3c5702829ae75.
project-implementation worktree currently at baseline; it does not automatically
contain uncommitted planning files. Orca assigns one writer per worktree.
Commit/push/integration require explicit authorization, exact SHA handoffs.
No branch-name-only review. New integration/conflict resolutions need re-review.

All NEW paths below are proposed; none exists yet. Existing directory globs
identify inspected files, not fabricated file names. Review actual imports before
editing. No dependencies, deployment configuration or infrastructure changes in
base scope. Antigravity must stop and report missing tools without silently
installing them. Human scope changes return to Codex planning and approval.

## Phases and checkpoints

| Phase | Tasks | Checkpoint / prerequisite for next phase |
| --- | --- | --- |
| 0 Baseline/content | T01–T03 | Source/browser parity, tooling limits, owner content choices, normalized shared data |
| 1 Tokens/primitives | T04–T05 | Approved Luna design states/contrast/provenance and usable chrome |
| 2 Window manager | T06–T09 | Pure invariant tests, focus/geometry/URL utilities demonstrated |
| 3 Start/taskbar/boot | T10–T12 | Menu dismissal and task states agree with registry, opt-in intro/audio |
| 4 Application content/Quick View | T13–T18 | All data/features/routes preserved, shared Quick View, accessible certificate/contact, deferred extras |
| 5 Adaptive shell/layout | T19–T21 | SSR/SEO/no-JS fallback, mobile/tablet/zoom/mode transition matrix |
| 6 Quality | T22–T23 | Motion/performance/a11y evidence against numeric criteria |
| 7 Review/release preparation | T24–T25 | Committed review target, independent PASS re-review, final validation same SHA; deployment still prohibited |

Phases describe checkpoints; follow task dependency edges even if a later-phase
task (such as layout mode scaffolding) can be developed in an isolated draft.
No parallel edits to DesktopManager/RetroWindow/global.css. Orca may schedule
independent content work only with explicit nonoverlapping ownership.

## Task specification convention

Every task lists objective, dependencies, existing files, proposed files,
expected changes, constraints, acceptance, tests, risks and completion evidence.
Acceptance references FR/NF IDs but also specifies concrete local checks.
Complexity S/M/L is comparative effort (roughly 0.5–1 / 1–3 / 3–5 focused agent
sessions, not a delivery promise). Regression risk L/M/H reflects impact.
All implementation belongs to Antigravity; T25 belongs to Codex independent
review/validation. Human approval is outside implementation task completion.

## T01 — Freeze regression inventory and owner content decisions

| Field | Specification |
| --- | --- |
| Phase / assigned agent | 0 / Antigravity |
| Objective | Establish source and browser parity before changing any application behavior. |
| Dependencies | Explicit approved planning SHA and source baseline; no task dependencies |
| Existing files affected | `src/components/retro/DesktopManager.tsx`; `src/components/retro/RetroProjectsDossier.tsx`; `src/content/projects/*.md (eight verified files)`; `src/data/certificates.ts`; `src/config/site.ts`; `docs/redesign/07-PROGRESS.md` |
| Proposed new paths | None required |
| Expected changes | Record exact approved planning/source/implementation baseline SHAs; enumerate eight route slugs, six certificate files, four history records, every skill/category and all extras/actions. Capture desktop/mobile current-state screenshots and reconcile source discrepancies with owner decisions. |
| Constraints | Do not rewrite claims/contact addresses or delete assets. Failed/unavailable browser checks remain NOT_RUN/BLOCKED; approval gate first. |
| Acceptance criteria | FR-01 baseline manifest covers every inventory row; explicit decision records for project title/source discrepancies, rendered email, licensed assets; snapshots include taskbar close/minimized and contact form without sending messages. |
| Testing method | Read-only route/link/data comparison; browser at 1440x900,768x1024,390x844 and keyboard-only; inspect actual contact mailto without dispatching real email. |
| Complexity / risks | M complexity / H regression risk; source and live deployment may differ. |
| Completion evidence | Baseline SHA, feature/route/data manifest, screenshot references with viewport/tool, unresolved decisions and browser command/action results. |

## T02 — Verify tooling and measure baseline

| Field | Specification |
| --- | --- |
| Phase / assigned agent | 0 / Antigravity |
| Objective | Know build, type, route and performance baseline without assuming installed runners. |
| Dependencies | T01 |
| Existing files affected | `package.json`; `package-lock.json`; `astro.config.mjs`; `tsconfig.json`; `docs/redesign/07-PROGRESS.md` |
| Proposed new paths | None required |
| Expected changes | Use authorized prepared npm environment; record Node/npm and lock versions. Run existing build/dev/preview when available; list generated routes, transfer sizes, three cold-cache mobile performance runs and desktop interaction trace. Select baseline verification tooling. |
| Constraints | No installs/upgrades or package/config changes under this task. Ask separately if missing dependencies/browser/checker prevent evidence. Do not run npx downloads. |
| Acceptance criteria | NF-03–NF-05 baseline values or explicit blocked checks recorded; build result includes exit/log; type coverage limitations documented; no invented pass. |
| Testing method | npm run build; npm run dev -- --host 127.0.0.1; npm run preview -- --host 127.0.0.1; local compiler/checker only if available; recorded browser network/Lighthouse/Performance panels. |
| Complexity / risks | S complexity / M risk; preexisting errors, environment dependencies, browser tooling missing. |
| Completion evidence | Commands/worktree/SHA/tool/environment/exit codes and baseline report, actual JS/CSS/assets/CWV proxy metrics; no baseline measurement currently exists. |

## T03 — Normalize shared portfolio and collection data

| Field | Specification |
| --- | --- |
| Phase / assigned agent | 0 / Antigravity |
| Objective | One content source for desktop, Quick View and articles without sacrificing existing information. |
| Dependencies | T01, T02 |
| Existing files affected | `src/components/retro/PixelHero.tsx`; `src/components/retro/RetroSkillsGrid.tsx`; `src/components/retro/RetroTimeline.tsx`; `src/components/retro/RetroProjectsDossier.tsx`; `src/config/site.ts`; `src/content/config.ts`; `src/content/projects/*.md`; `src/data/certificates.ts` |
| Proposed new paths | `src/data/portfolio.ts` (NEW; not yet created); `src/lib/portfolio.ts` (NEW; not yet created); `tests/portfolio-parity.test.mjs` (NEW; not yet created) |
| Expected changes | Extract existing profile/skills/history/rendered contacts into typed data; reuse certificates. Build normalized ProjectSummary from legacy CC; include all eight slugs, deterministic curated featured order. Reconcile desktop seven-item content against Markdown; keep canonical Markdown titles/source links and preserve unmatched existing factual text through reviewed reconciliation, not silent loss. |
| Constraints | No CMS schema/API/storage migration; lib adapter server-only. Do not serialize Markdown bodies to shell. If owner refuses wording changes, record explicit stable display alias once centrally, not divergent copies. |
| Acceptance criteria | FR-01,FR-07,FR-08,FR-10; eight summary IDs map to existing routes and specific sources; profile/history/skills/cert data parity; no duplicated arrays in renderers; contact choice documented. |
| Testing method | Build CC pages, compare normalized slugs/content fields against baseline; test pure project-summary normalizer exported from src/data/portfolio.ts with absent date/image/source and empty fixtures. Plain Node tests must not import astro:content; run fixtures with the T06 verifier once available. |
| Complexity / risks | M complexity / H risk; correcting presentation drift can alter unsupported claims; keep approval evidence. |
| Completion evidence | Data reconciliation table, module schemas, exact before/after destinations, parity assertion results. |

## T04 — Add Luna tokens and original asset strategy

| Field | Specification |
| --- | --- |
| Phase / assigned agent | 1 / Antigravity |
| Objective | Establish a coherent accessible visual foundation using existing tooling. |
| Dependencies | T03 |
| Existing files affected | `src/styles/global.css`; `tailwind.config.js`; `public/icons/retro/`; `public/images/`; `public/assets/` |
| Proposed new paths | `public/icons/xp/ (proposed original SVG assets)` (NEW; not yet created) |
| Expected changes | Implement 04-DESIGN-BRIEF CSS variables/scoping and Tailwind v3 aliases; static original CSS wallpaper; original icon family/asset ledger. Retain old selectors/assets until consumer migration verified. Add focus/forced-colors/type/spacing/pressed variants. |
| Constraints | No XP/Bliss/logo/sound extraction, new fonts/framework/v4 migration; no blanket asset deletion. Resolve root DESIGN.md skill gate by approved runtime alias/override to this brief before UI work. |
| Acceptance criteria | FR-02,NF-01,NF-09; tokens match brief; contrast evaluated on actual gradient text areas; original assets/attribution documented; existing article routes still legible. |
| Testing method | Rendered token/state swatches, contrast tool with actual RGB, forced-colors and 200% zoom; build existing routes. |
| Complexity / risks | M complexity / M risk; bright gradients/old selectors can reduce contrast. |
| Completion evidence | Token/state screenshots, contrast values, provenance/asset byte ledger; approved design-instruction conflict resolution. |

## T05 — Implement desktop and shared chrome primitives

| Field | Specification |
| --- | --- |
| Phase / assigned agent | 1 / Antigravity |
| Objective | Provide a bounded Luna desktop plane and identifiable window/icon controls before interaction rewiring. |
| Dependencies | T04 |
| Existing files affected | `src/components/retro/DesktopManager.tsx`; `src/components/retro/RetroWindow.tsx`; `src/styles/global.css` |
| Proposed new paths | None required |
| Expected changes | Replace flow-based desktop surface with workspace plane; style original icons/labels, active/inactive titlebars, frame/button states and grouped 32px controls. Provide visible Quick View anchor and useful Open selection action. Use nonmodal named regions and real buttons; wire behavior in dependent tasks. |
| Constraints | Keep existing app IDs/components; don't introduce empty standalone apps. No fake File/Edit/Help/paint click affordances. No desktop-only content source. |
| Acceptance criteria | FR-02,FR-03; responsive workspace reserves 48px taskbar/safe-area; active/inactive body stays readable; glyph controls names include app title; no placeholder action advertised as complete. |
| Testing method | Build/render desktop normal/inactive chrome and icon selection/focus; keyboard reachable native Open/controls; screenshots at 1024/1440. |
| Complexity / risks | M complexity / H risk; transformed layers and existing content wrappers. |
| Completion evidence | Chrome visual-state captures, semantic checks and workspace bounding measurements. |

## T06 — Create atomic window reducer and invariant tests

| Field | Specification |
| --- | --- |
| Phase / assigned agent | 2 / Antigravity |
| Objective | Replace coupled state setters/unbounded z-index with deterministic singleton lifecycle. |
| Dependencies | T03, T05 |
| Existing files affected | `src/components/retro/DesktopManager.tsx` |
| Proposed new paths | `src/lib/window-manager.ts` (NEW; not yet created); `tests/window-manager.test.mjs` (NEW; not yet created); `scripts/verify-redesign.mjs` (NEW; not yet created) |
| Expected changes | Implement TRD registry/types/events, unique stack, derived activeId/z, minimized mode, saved geometry, visited state, show-desktop snapshot and atomic all-app utilities. Effects remain outside reducer. Proposed Node verifier compiles pure TS modules using existing local compiler to checked OS temp location then runs tests. |
| Constraints | No global state dependency; no nested setState side effects; unknown IDs no-op; tests assert behavior/invariants, not implementation details; test output not tracked. |
| Acceptance criteria | FR-04,FR-06,NF-05; activeId matches visible stack front; no duplicate IDs; open is idempotent; task click alone minimizes; normal/max/min transitions and closed tasks correct; stale show-desktop snapshot cannot resurrect closed app. |
| Testing method | Proposed node scripts/verify-redesign.mjs with lifecycle sequences, unknown IDs, double-open, rapid open/min/close, show-desktop modifications, invalid geometry/bounds; exact commands defined when script created. |
| Complexity / risks | M complexity / H risk; existing all-app/focus assumptions and React updater behavior. |
| Completion evidence | Meaningful sequence/invariant test output, typecheck coverage, reducer API and integration diff. |

## T07 — Integrate frame controls and focus restoration

| Field | Specification |
| --- | --- |
| Phase / assigned agent | 2 / Antigravity |
| Objective | Connect frames to lifecycle and provide keyboard-equivalent focus semantics. |
| Dependencies | T06 |
| Existing files affected | `src/components/retro/RetroWindow.tsx`; `src/components/retro/DesktopManager.tsx` |
| Proposed new paths | None required |
| Expected changes | Control frame visibility/mode through reducer; mount on first visit, hide minimized/inert; close unmounts. Implement title system menu, focusin raising, remembered focus refs, close/minimize fallback and app switcher access. Portal transient menus/modal outside transformed app ancestors. |
| Constraints | Do not trap nonmodal app focus or globally close on Escape. Preserve typed contact draft on minimize, reset on close; no input pointer focus stealing. |
| Acceptance criteria | FR-04,FR-14; all controls activate with Enter/Space; closed/hidden body absent from tab/AX navigation; focus restores to connected visible target; covered inactive content not focus-obscured. |
| Testing method | Open three apps then keyboard/pointer focus, minimize/restore/max/close order; verify task/frame count and app-specific labels; form entry survives minimize not close. |
| Complexity / risks | M complexity / H risk; focus races and hidden nodes during transition. |
| Completion evidence | Keyboard action log/AX observations, lifecycle state screenshots, regression checks. |

## T08 — Bound gestures and implement nondrag geometry controls

| Field | Specification |
| --- | --- |
| Phase / assigned agent | 2 / Antigravity |
| Objective | Make dragging/resizing predictable, recoverable and equally operable without dragging. |
| Dependencies | T07 |
| Existing files affected | `src/components/retro/RetroWindow.tsx`; `src/components/retro/DesktopManager.tsx`; `src/lib/window-manager.ts`; `tests/window-manager.test.mjs` |
| Proposed new paths | None required |
| Expected changes | Workspace-local Rect ownership; title pointer capture, RAF/local transient update, edge/corner resize; clamp min sizes to viewport; commit/cancel behavior. System menu Move/Resize with arrows, Center/Fit native actions; cleanup pointercancel/lost capture/unmount and viewport invalidation. |
| Constraints | Desktop fine-pointer only; controls don't start drag; no root rerender per movement; restore retains premaximize clamped normal rect; no scroll hijack. |
| Acceptance criteria | FR-05,NF-05; all edges reachable; correct max/restore after moving/resizing; Escape cancels; pointer cancel leaves no listeners; nondrag alternatives position/size equivalently. |
| Testing method | Reducer bounds property/edge-case tests including 320px/short height, pointer gestures to all edges, cancel/unmount, menu keyboard and click presets; interaction trace with three apps. |
| Complexity / risks | L complexity / H risk; resize frames, visual viewport zoom, capture cleanup. |
| Completion evidence | Geometry assertions, before/after screenshots, listener/RAF counts and trace for gesture isolation. |

## T09 — Separate launch intents, URLs and desktop utilities

| Field | Specification |
| --- | --- |
| Phase / assigned agent | 2 / Antigravity |
| Objective | Eliminate hash-to-unmounted-target and shared launcher/task toggle defects. |
| Dependencies | T07, T08 |
| Existing files affected | `src/components/retro/DesktopManager.tsx`; `src/components/retro/PixelHero.tsx`; `src/lib/window-manager.ts` |
| Proposed new paths | None required |
| Expected changes | Dispatch OPEN from desktop/Start/profile; desktop select/double-click/Enter semantics; native touch launch and explicit Open action. Parse approved/legacy hashes and project slug, Back/Forward history handling, open-core/minimize-all/close-all/show-desktop utilities. |
| Constraints | No duplicate history pushes on focus/resize; invalid intent safe fallback; no geometry or contact persistence. Preserve five-core launch utility while adding approved certificate access. |
| Acceptance criteria | FR-03,FR-06,FR-13; desktop/Start/profile repeated launch never minimizes; #projects legacy opens; #app=projects&project=valid selects; invalid slug recovers; refresh/back work; show-desktop restore exact saved surviving set. |
| Testing method | Browser all launch surfaces, hashes/refresh/back/forward, task-click distinction, fast repeated activation; Node URL/utility fixtures if parsing isolated. |
| Complexity / risks | M complexity / H risk; ClientRouter lifecycle and history loops. |
| Completion evidence | Intent/history test matrix, URL samples, utility state results. |

## T10 — Redesign optional boot and sound lifecycle

| Field | Specification |
| --- | --- |
| Phase / assigned agent | 3 / Antigravity |
| Objective | Preserve personality/replay without gating professional access or forcing motion/audio. |
| Dependencies | T09 |
| Existing files affected | `src/components/retro/RetroBootScreen.tsx`; `src/components/retro/DesktopManager.tsx`; `src/styles/global.css` |
| Proposed new paths | None required |
| Expected changes | Replace 2800ms gate with <=800ms optional intro plus native skip; identity/Quick View usable immediately; reduced-motion skips. Chime only with explicit sound opt-in and user gesture; close AudioContext and cleanup timers/listeners. Replay retains workspace. |
| Constraints | No borrowed OS sound/logo, brightness flash or default sound/video. Session boot-dismiss flag only if needed; never store drafts/PII. |
| Acceptance criteria | FR-12,NF-02; one-action skip keyboard/touch; replay doesn't reset apps; no delay Quick View; resources return baseline after ten replays. |
| Testing method | Reduced-motion, sound off/on gesture, skip before timeout/rapid replay, route away during boot; timer/AudioContext cleanup and focus accessibility. |
| Complexity / risks | S complexity / M risk; autoplay policies/duplicate callback and intro race. |
| Completion evidence | Actual duration/skip logs, audio policy result and cleanup counts. |

## T11 — Extract two-column Start navigation

| Field | Specification |
| --- | --- |
| Phase / assigned agent | 3 / Antigravity |
| Objective | Provide a complete Luna navigation disclosure with accessible dismissal. |
| Dependencies | T09, T10 |
| Existing files affected | `src/components/retro/RetroTaskbar.tsx`; `src/components/retro/DesktopManager.tsx` |
| Proposed new paths | `src/components/retro/StartMenu.tsx` (NEW; not yet created) |
| Expected changes | Identity header, app/destination columns, CV/contact/Quick View/Extras and truthful utility footer. aria-controls/expanded, native links/buttons, focus entry/return, scoped Escape and outside pointer/touch handler. |
| Constraints | Do not add ARIA menu without full behavior; no Tab trap/OS-key interception; outside click must retain clicked focus, Start toggle must not race. |
| Acceptance criteria | FR-02,FR-06,FR-14; keyboard/touch open/select/close; two-column desktop layout and narrow fallback; all current menu actions reachable. |
| Testing method | Start repeated toggle, pointer outside including Start, Escape/Tab/Enter/Home-End optional, app focus after launch, real link navigation; capture state variants. |
| Complexity / risks | M complexity / M risk; disclosure focus/outside listener lifecycle. |
| Completion evidence | Menu interaction matrix, AX names/relationships, visual captures and cleanup. |

## T12 — Redesign task strip, tray and Show Desktop

| Field | Specification |
| --- | --- |
| Phase / assigned agent | 3 / Antigravity |
| Objective | Make tasks match managed windows and retain usable tray/navigation. |
| Dependencies | T11 |
| Existing files affected | `src/components/retro/RetroTaskbar.tsx`; `src/components/retro/DesktopManager.tsx` |
| Proposed new paths | `src/components/retro/SystemClock.tsx` (NEW; not yet created) |
| Expected changes | Blue taskbar/green Start; closed omitted/minimized retained; accessible active/minimized names; overflow scroll affordances, Show Desktop/Quick View; isolate minute clock with WIB full label. Remove fake ONLINE assertion; sound control only if functional. |
| Constraints | Task click dispatches TASK_ACTIVATE; never use all-nine-app truthiness for Quick View. Clock not aria-live; preserve Asia/Jakarta time semantics. |
| Acceptance criteria | FR-04,FR-06,NF-05; task states exactly match registry; all 10 app tasks accessible without losing Start/tray; minute updates do not rerender shell. |
| Testing method | Three mode transitions per task, 10-app overflow at 1024 and adaptive bar, clock timezone/date fallback, screen-reader task labels; compare render counts. |
| Complexity / risks | M complexity / H risk; task strip overflow/closed tabs regression from last source commit. |
| Completion evidence | State/task count assertions, overflow keyboard test and isolated clock render trace. |

## T13 — Extract and redesign profile, skills and history content

| Field | Specification |
| --- | --- |
| Phase / assigned agent | 4 / Antigravity |
| Objective | Reuse professional content across app chrome and static route. |
| Dependencies | T03, T05, T09, T12 |
| Existing files affected | `src/components/retro/PixelHero.tsx`; `src/components/retro/RetroSkillsGrid.tsx`; `src/components/retro/RetroTimeline.tsx`; `src/data/portfolio.ts` |
| Proposed new paths | `src/components/portfolio/PortfolioContent.tsx` (NEW; not yet created) |
| Expected changes | Named presentational content exports; wrappers keep stable IDs; Welcome Center with real OPEN/link actions, skills filters/detail reset on missing filtered selection, four history records. Remove misleading decorative Paint affordances without removing actual actions. |
| Constraints | No rewritten employment/research facts or injected metrics; profile image natural rendering, dimensions/fallback; semantic SSR bodies no client directive in Quick View. |
| Acceptance criteria | FR-01,FR-08,FR-10,NF-09; all skills/details/categories and four records preserved; identity/CV/contact visible; no dead hash CTA; body readable >=14px. |
| Testing method | Data parity, category empty/change selection, thumbnail failure, keyboard filters, profile CTA closed-app launch, screenshots normal/narrow content widths. |
| Complexity / risks | M complexity / M risk; extraction alters selection/dense layout or loses facts. |
| Completion evidence | Content diff/parity checklist, category/CTA browser observations, responsive captures. |

## T14 — Unify Projects Explorer and existing article routes

| Field | Specification |
| --- | --- |
| Phase / assigned agent | 4 / Antigravity |
| Objective | Make every project selectable/readable with one normalized source and retained URLs. |
| Dependencies | T03, T12, T13 |
| Existing files affected | `src/components/retro/RetroProjectsDossier.tsx`; `src/pages/projects/[slug].astro`; `src/pages/index.astro`; `src/lib/portfolio.ts`; `src/content/projects/*.md` |
| Proposed new paths | None required |
| Expected changes | Pass summaries as props, actual title/excerpt/tags/source/cover; all eight entries including portfolio; working category/reset/list preview; desktop internal preview, case-study real links. Re-skin article body with Luna reading chrome, descriptive gallery alt/dimensions. |
| Constraints | No new project schema/migration, renamed slugs, fabricated statuses/metrics, nested iframe renderer or client import of Astro content; preserve Markdown body/galleries. |
| Acceptance criteria | FR-01,FR-08,FR-13; eight exact routes work, generic sources replaced by canonical existing specific URLs per approved reconciliation; empty optional data and filters render honestly. |
| Testing method | Build static paths; route/source/parity script; browser preview/filter/empty, each case-study link/gallery/source and return/back behavior; JS-disabled article. |
| Complexity / risks | M complexity / H risk; content discrepancy and legacy CC APIs. |
| Completion evidence | Eight-route manifest/HTTP checks, normalized data versus article comparisons, screenshots/link destinations. |

## T15 — Create direct SSR Quick View

| Field | Specification |
| --- | --- |
| Phase / assigned agent | 4 / Antigravity |
| Objective | Offer professional information without shell learning or duplicated content. |
| Dependencies | T13, T14 |
| Existing files affected | `src/pages/index.astro`; `src/data/portfolio.ts`; `src/lib/portfolio.ts`; `src/components/portfolio/PortfolioContent.tsx` |
| Proposed new paths | `src/pages/quick-view.astro` (NEW; not yet created) |
| Expected changes | Static semantic sections with identity/specialization, skills, featured plus all eight projects, experience, certificate links, CV/contact and Extras entry. Reuse presentational data/renderers, minimal chrome, print style; root no-JS identity/Quick View anchor. |
| Constraints | No shell hydration/video/boot on Quick View; no copied arrays, backend or alternate source; same canonical content in desktop and route. |
| Acceptance criteria | FR-07,FR-15,NF-04,NF-07; direct/refresh/no-JS all core information/actions usable, section links work; CV/contact within two actions from root; print legible. |
| Testing method | HTTP HTML content and direct route, JS disabled, in-page anchors, print preview, mobile reading flow; check route initial JS requests/budget. |
| Complexity / risks | M complexity / M risk; SSR React composition can accidentally hydrate interactive bodies. |
| Completion evidence | No-JS/print screenshots, route HTML content assertion, network transfer and shared-data parity. |

## T16 — Integrate certificate app and accessible viewer

| Field | Specification |
| --- | --- |
| Phase / assigned agent | 4 / Antigravity |
| Objective | Preserve six certificates/zoom/raw links within one managed app. |
| Dependencies | T07, T13, T15 |
| Existing files affected | `src/components/retro/RetroCertificateGallery.tsx`; `src/components/retro/DesktopManager.tsx`; `src/data/certificates.ts` |
| Proposed new paths | None required |
| Expected changes | Remove independent permanent dock state, register certificates app; reusable list, same metadata/raw URLs; true viewer modal with portal, background inert, initial/return focus and Escape; no nested mobile drawer. Keep zoom 0.75–2.5 increments 0.25/reset and accessible image pan/scroll. |
| Constraints | No invented verification claims or new certs; don't trap normal certificate app; selected item focus origin survives filter/close fallback. |
| Acceptance criteria | FR-01,FR-09,FR-14; all six preview/raw URLs available; zoom limits/reset correct; Enter/Space prevent page scroll; modal containment/escape/focus restore; titlebar/taskbar consistent. |
| Testing method | Every certificate keyboard/pointer selection, zoom at both limits/reset, raw open, modal Tab/Shift+Tab/Escape/outside; touch and missing-image fallback. |
| Complexity / risks | M complexity / H risk; overflow at high zoom/nested modality/layering. |
| Completion evidence | Six-entry link checks, modal keyboard log/AX and zoom/narrow screenshots. |

## T17 — Preserve contact draft and truthful actions

| Field | Specification |
| --- | --- |
| Phase / assigned agent | 4 / Antigravity |
| Objective | Keep real contact channels and encoded mailto behavior accessible. |
| Dependencies | T03, T13 |
| Existing files affected | `src/components/retro/RetroTerminal.tsx`; `src/config/site.ts`; `src/data/portfolio.ts` |
| Proposed new paths | None required |
| Expected changes | Associated input ids/labels, visible focus and native validation guidance, optional subject/name fallback, clear action, local mail-client notice, direct address/copy fallback, accurate CV open/download wording across consumers. |
| Constraints | No /api/contact, mail provider, credentials, submission telemetry or fabricated sent confirmation. Retain rendered address unless human confirms change; don't send test messages. |
| Acceptance criteria | FR-10,FR-14; required/type-invalid fields described; unicode/&/#/newline encode once; form clear and minimize/close behavior correct; external rel/new-tab labels truthful. |
| Testing method | Intercept/inspect mailto URI generation without opening/sending real mail; invalid/valid input, special characters, clear, copy failure fallback, keyboard labels and actual link hrefs. |
| Complexity / risks | M complexity / H risk; mailto recipients/data escaping/privacy expectations. |
| Completion evidence | Draft URI assertions/redacted test fixtures (no real personal messages), label/keyboard checks and channel parity. |

## T18 — Preserve extras and defer their loading

| Field | Specification |
| --- | --- |
| Phase / assigned agent | 4 / Antigravity |
| Objective | Retain personality without making novelty part of initial professional rendering. |
| Dependencies | T12, T15, T17 |
| Existing files affected | `src/components/retro/RetroEasterEggs.tsx`; `src/components/retro/DesktopManager.tsx` |
| Proposed new paths | None required |
| Expected changes | Lazy-load existing extra exports on OPEN with loading/error/retry fallback, common Luna frame. Preserve Persona calling card/attack toggle, Apex random loot, Elden messages, browser keyword/demo interactions and real links; label mock browsing/flavor text and disable nonworking Forward genuinely. |
| Constraints | No iframe/proxy/WebGL/game runtime or strengthened factual metric claims; asset provenance review. Render Extras directory in Quick View as links to root app hash. |
| Acceptance criteria | FR-01,FR-16,NF-04; baseline demo actions remain reachable desktop/app-view; shell contains module load failure; no extras chunk/network load before requested; links unchanged. |
| Testing method | All four extras via Start/Quick View hashes, demo forms/toggles/message cycle, random result belongs existing table, external links, module failure simulation/retry, initial network trace. |
| Complexity / risks | M complexity / M risk; code splitting export identity/loading and unlicensed art. |
| Completion evidence | Functional extra parity, mock-label captures, chunk load timing and provenance disposition. |

## T19 — Unify layout, metadata, fallbacks and navigation lifecycle

| Field | Specification |
| --- | --- |
| Phase / assigned agent | 5 / Antigravity |
| Objective | Keep all routes discoverable/readable without JS reveal/video dependency. |
| Dependencies | T14, T15, T16, T17, T18 |
| Existing files affected | `src/layouts/Layout.astro`; `src/pages/index.astro`; `src/pages/projects/[slug].astro`; `src/pages/404.astro`; `src/pages/quick-view.astro`; `src/styles/global.css` |
| Proposed new paths | None required |
| Expected changes | Mode-aware layout props for shell/reading route; static wallpaper opt-in shell only, body visible by default, unique metadata/canonical/OG using verified domain, skip link/one main landmark/404 links. Reconcile ClientRouter scripts/listener cleanup; root SSR fallback hides only after successful hydration. |
| Constraints | No deploy/adapter/CMS changes, unapproved schema/profile assertions, sitemap integration install or provider assumption; no content disappearance during failed hydration. |
| Acceptance criteria | FR-13,FR-15,NF-07; root/Quick View/eight slugs/404 metadata and landmarks correct; JS-disabled professional content works; 10 route swaps no doubled listeners/boot. |
| Testing method | Build generated HTML metadata/landmarks, HTTP route direct/404 test in preview, JS-off/reduced-motion, ten client-route navigation cycles; document actual server 404 behavior. |
| Complexity / risks | M complexity / H risk; opacity reveals, view transitions, nested main and SSR hydration. |
| Completion evidence | HTML/route results, metadata checklist, no-JS capture and route lifecycle resource counts. |

## T20 — Add mobile/tablet application shell

| Field | Specification |
| --- | --- |
| Phase / assigned agent | 5 / Antigravity |
| Objective | Adapt navigation to touch rather than shrink desktop windows. |
| Dependencies | T09, T12, T13, T14, T15, T16, T17, T18, T19 |
| Existing files affected | `src/components/retro/DesktopManager.tsx`; `src/components/retro/RetroWindow.tsx`; `src/components/retro/RetroTaskbar.tsx`; `src/styles/global.css` |
| Proposed new paths | `src/components/retro/MobileAppShell.tsx` (NEW; not yet created) |
| Expected changes | Central <768 mobile /768–1023 tablet /wide-coarse app-view policy; single visible active app, app directory/header/back/switcher, safe-area/100dvh, >=44px touch controls; same registry/render bodies. Narrow body layout stacks Explorer/skills regardless of viewport. |
| Constraints | No resize auto-open, duplicate datasets or disabled professional actions; keyboard access with coarse input; full-screen views retain visited state/minimized metadata. |
| Acceptance criteria | FR-11,FR-14,FR-16,NF-06; all apps/data/CV/contact accessible at 320/375/390/768/1024; no horizontal document overflow or offscreen nav; virtual keyboard does not hide submit. |
| Testing method | Phone/tablet portrait+landscape, coarse primary wide device, app switch/back/close state, keyboard focus, 320px/reflow and contact virtual-keyboard test on available real device/emulator. |
| Complexity / risks | L complexity / H risk; keyboard viewport, concurrent CSS/JS mode mismatch. |
| Completion evidence | Viewport/device matrix, navigation parity and overflow measurements, keyboard/rotation captures. |

## T21 — Handle workspace resize, zoom and mode transitions

| Field | Specification |
| --- | --- |
| Phase / assigned agent | 5 / Antigravity |
| Objective | Prevent lost windows/state when available workspace changes. |
| Dependencies | T08, T20 |
| Existing files affected | `src/components/retro/DesktopManager.tsx`; `src/components/retro/RetroWindow.tsx`; `src/components/retro/MobileAppShell.tsx`; `src/lib/window-manager.ts`; `tests/window-manager.test.mjs` |
| Proposed new paths | None required |
| Expected changes | Observe usable shell size/visual viewport, cancel active geometry interaction, clamp rect and restoreRect, recompute maximized bounds; crossing mode preserves app lifecycle/content selection and saved desktop geometry. |
| Constraints | No auto-opening closed apps, stale transform offsets or listener multiplication; observer cleanup after route unmount. |
| Acceptance criteria | FR-05,FR-11,NF-06; resizing 1440->1024->768->390->1440 preserves opened/minimized state and reachable controls; max restore within bounds; 200%/400% zoom usable. |
| Testing method | Node bounds tests across extreme dimensions; browser resize during drag/max/min and rotation/zoom/address-bar collapse; 20 mode flips and listener count. |
| Complexity / risks | M complexity / H risk; feedback loop observer/resize and stale app mode. |
| Completion evidence | Transition-state comparison, geometry screenshots and observer cleanup test. |

## T22 — Apply measured motion and performance budgets

| Field | Specification |
| --- | --- |
| Phase / assigned agent | 6 / Antigravity |
| Objective | Meet motion/reduced-motion and performance criteria with actual evidence. |
| Dependencies | T10, T18, T19, T21 |
| Existing files affected | `src/components/retro/RetroWindow.tsx`; `src/components/retro/RetroBootScreen.tsx`; `src/components/retro/RetroTaskbar.tsx`; `src/components/retro/DesktopManager.tsx`; `src/layouts/Layout.astro`; `src/styles/global.css`; `public/images/projects/`; `public/images/` |
| Proposed new paths | None required |
| Expected changes | Use brief durations/easings, interruptible transitions, no filter flashes/default video; static reduced-motion and isolated clock/gesture rerenders. Generate appropriately licensed compressed derivatives/responsive images with dimensions using already authorized tooling; keep originals/links; verify per-route bundles and resource lifecycle. |
| Constraints | No dependency install/removal/bundler migration on speculation; unused libraries not assumed bundled; don't call lab interaction measurements field INP; no forced slow boot. |
| Acceptance criteria | NF-02–NF-05; gzip/asset budgets, recorded frame/long-task targets and three-run LCP/CLS medians; 50 lifecycle cycles return resources baseline; no unexpected shift on image/font/module load. |
| Testing method | Compare baseline/final network and Performance traces same environment; three cold-cache mobile lab runs; 10s drag/resize 3 apps; reduced-motion including boot/scroll/extras; module/image delay tests. |
| Complexity / risks | L complexity / H risk; budget may require human tradeoff, device variance; image compression correctness. |
| Completion evidence | Before/after transfer/build sizes, measured runs/range/hardware/tool/throttle, frame percentile/resource counts, static-motion captures; blocked checks explicit. |

## T23 — Verify and correct accessibility behavior

| Field | Specification |
| --- | --- |
| Phase / assigned agent | 6 / Antigravity |
| Objective | Prove complete keyboard/assistive-technology equivalence and visual access. |
| Dependencies | T07, T08, T11, T16, T17, T20, T21, T22 |
| Existing files affected | `src/components/retro/`; `src/components/portfolio/PortfolioContent.tsx`; `src/layouts/Layout.astro`; `src/pages/quick-view.astro`; `src/styles/global.css` |
| Proposed new paths | None required |
| Expected changes | Run approved criterion matrix, repair scoped labels/focus/contrast/target-size/landmarks, modal semantics and nondrag alternatives; add meaningful assertions to existing proposed verifier where applicable. |
| Constraints | Automated scan is not WCAG certification; no whole-app modal traps, OS shortcut hijacking or removal of target functionality to pass checks. |
| Acceptance criteria | FR-14,NF-01,NF-06,NF-09; end-to-end keyboard path, actual AT announcement/focus return, forced-colors and no focus obscuring, 320px reflow/200% zoom; no serious/critical automated findings if approved scanner available. |
| Testing method | Keyboard-only all core flows, NVDA/available AT with browser version, contrast on gradients, target measurement and nondrag system menu, modal Escape/Tab, reduced-motion/forced-colors; record unavailable AT/scanner as NOT_RUN. |
| Complexity / risks | M complexity / H risk; screen-reader behavior cannot be inferred from ARIA attributes. |
| Completion evidence | Criterion-by-criterion log, actual AT/browser observations, contrast values/focus-state captures and findings with fixes. |

## T24 — Run full regression and prepare reviewable implementation

| Field | Specification |
| --- | --- |
| Phase / assigned agent | 7 / Antigravity |
| Objective | Give Codex a committed, evidenced revision with no silent scope drift. |
| Dependencies | T01, T02, T03, T04, T05, T06, T07, T08, T09, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23 |
| Existing files affected | `docs/redesign/07-PROGRESS.md`; `.workflow/STATUS.md`; `.workflow/HANDOFF.md` |
| Proposed new paths | None required |
| Expected changes | Run full matrix/build/pure tests/routes/visual checks; attach requirements coverage and limitations; update tracker/operational handoff. With explicit authorization only, commit/share implementation and evidence, record exact target/approved plan/integration SHA. |
| Constraints | No deployment/migrations/push/merge by implication; cannot mark VERIFIED based on build alone; code corrections remain Antigravity's role; uncommitted handoff not review-ready. |
| Acceptance criteria | All FR/NF covered; acceptance blockers listed or resolved; no missing required evidence passed; exact reviewed target reproducibly available to Codex with changed files and commands. |
| Testing method | Existing npm run build, proposed node scripts/verify-redesign.mjs, all eight routes/Quick View/CV/cert external destinations, browser visual/keyboard/mode/50-cycle suite with final SHA. |
| Complexity / risks | M complexity / H risk; wrong worktree/revision or unavailable verification. |
| Completion evidence | Full logs/exit codes/manual results, final screenshots, requirement-to-task coverage, committed handoff SHA and approval source. |

## T25 — Independent review and final validation gate

| Field | Specification |
| --- | --- |
| Phase / assigned agent | 7 / Codex |
| Objective | Independently assess approved behavior and validate only latest PASS-reviewed implementation. |
| Dependencies | T24 |
| Existing files affected | `docs/reviews/REVIEW_REPORT.md`; `docs/reviews/FINAL_VALIDATION.md`; `.workflow/STATUS.md`; `.workflow/HANDOFF.md`; `docs/redesign/07-PROGRESS.md` |
| Proposed new paths | None required |
| Expected changes | Review exact baseline->target diff and evidence, reproduce actionable severity/file:line findings. Antigravity fixes findings in separate committed corrections, then Codex re-reviews. On PASS validate all criteria at exact latest reviewed implementation SHA; append verdict/evidence and remaining risks. |
| Constraints | Codex must not modify implementation code. Explicit human approval first; max 3 automated correction cycles across review+validation; escalate unresolved after third; no release/deployment permission implied. |
| Acceptance criteria | Review PASS only with criterion evidence/no unresolved acceptance blockers; final PASS uses exactly same latest implementation SHA; every correction re-reviewed; missing evidence BLOCKED; failed criteria FAIL. |
| Testing method | Independent rerun build/pure tests and relevant browser acceptance at exact target in assigned worktree; check Git SHA/clean source/approved plan and integration availability. |
| Complexity / risks | M complexity / H risk; stale review or changing target invalidates validation. |
| Completion evidence | Reviewed/validated full SHAs, commands/results, findings/reproduction/expected-actual/criterion IDs, re-review trail and final verdict. |

## Verification commands and evidence protocol

Commands already declared in package.json (future execution; NOT_RUN in planning):

```powershell
git status --short
git rev-parse HEAD
git worktree list --porcelain
npm run build
npm run dev -- --host 127.0.0.1
npm run preview -- --host 127.0.0.1
```

Dev/preview are local processes: record port, startup result and terminate only
the task's own process after evidence capture. They are not deployment.
Dependency environment must be explicitly authorized/prepared before these run.

Proposed verifier (T06, not an existing command/file):
`node scripts/verify-redesign.mjs` compiles pure modules with local TypeScript
to an OS temp directory, then `node --test` for the proposed tests. Verify its
actual implementation/exit before claiming execution. Pure tests: lifecycle
invariants, bounds, URL intents and data parity; no snapshot-only acceptance.

Astro syntax/type checking: `npm run astro -- check` ONLY if @astrojs/check is
already available and noninteractive (not a manifest dependency now).
`node node_modules/typescript/bin/tsc --noEmit` can check TS/TSX if available
but is not an Astro template check and may expose preexisting setup errors.
There is no npm test/lint script. Do not run npx, npm install/ci, pip installs,
Playwright browser downloads, legacy toolkit helpers or unreviewed commands
as a side effect. Optional automated browser/type tooling needs separate approval
for specific dependencies, configuration and invocation; base browser checks
may be manual but must actually execute.

Record each check: task ID, command/action steps, timestamp, worktree, full SHA,
tool/OS/browser/device, viewport/throttle/network/cache, expected and actual,
exit/log/screenshot or trace reference, PASS/FAIL/NOT_RUN, reason if unavailable.
For contact use synthetic fixture strings and inspect URI, never send emails.
Three cold mobile lab runs: same root/Quick View/featured article routes and
baseline environment; provide median/range, not invented field p75 INP.

## Definition of Done

1. Every FR/NF requirement has actual acceptance evidence and T01 feature parity.
2. Task files/import boundaries meet TRD, proposed/new paths actually verified.
3. Build and meaningful state/data tests pass at exact implementation SHA; browser
   keyboard/touch/window/URL/mobile/contrast/motion/performance cases performed.
4. Required missing evidence is BLOCKED; no skipped checks recorded PASS.
5. Seven planning files remain the approved intent; deviations explicitly approved.
6. Progress and outgoing operational handoff list exact changes, checks and blockers.
7. Codex independent review PASS after every corrections revision; max three
   automated cycles; final validation targets latest reviewed implementation SHA.
8. Release readiness is a report, not permission to deploy, merge, push or migrate.

Antigravity may mark task COMPLETED when its changes/checks/evidence are recorded.
Codex may mark VERIFIED only after independent verification. IN_PROGRESS and
BLOCKED require notes. Corrections reference review finding IDs, never silently
amend architecture. A failed review or final check can reopen affected tasks;
retain previous notes/results and exact revision history.

## Migration checkpoints and rollback

Preserve current routes/assets/content while extracting; app wrappers continue
to accept existing IDs/actions until manager migration. Each checkpoint compares
against T01 inventory. Do not delete old tokens until project/404 consumers
are migrated and selector reachability confirmed. Do not remove unused package
dependencies in this plan; import absence is not a dependency uninstall decision.

Before each checkpoint record prior working SHA and task changes. With explicit
Git authorization, create small reversible implementation commits. On regression,
stop dependent tasks, diagnose, and prepare an additive fix or authorized revert
of the responsible commit. No reset/clean/force or cross-worktree deletion.
Conflict resolution is an explicit integration step with new SHA and re-review.
Production rollback/provider workflow is unverified; no deployment is executed.

## Planning cross-check

T01–T25 cover FR-01–FR-16 and NF-01–NF-09. Each task above has concrete acceptance
and test/evidence requirements, dependencies refer only to these task IDs, and
07-PROGRESS uses the same IDs. Architectural rationale in TRD ADR-01–ADR-12;
baseline feature/source inventory in PRD; no production code or implementation
task completion is part of this planning packet.

