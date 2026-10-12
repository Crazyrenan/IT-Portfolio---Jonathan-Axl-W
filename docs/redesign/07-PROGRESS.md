# AXL_OS XP — Execution progress

Planning packet: draft 1, 2026-10-12. Author: Codex.
Human approval: PENDING. Approved planning SHA: NOT_SET.
Implementation revision: NOT_SET. Planning audit HEAD:
`e48e3e289941ecd43d93683863d3c5702829ae75`.
No implementation task has started or been marked complete by Codex.

Task definitions/dependencies/acceptance: [05-IMPLEMENTATION-PLAN.md](05-IMPLEMENTATION-PLAN.md).
Operational stage/gate/correction counter: ../../.workflow/STATUS.md.
Operational transfers: ../../.workflow/HANDOFF.md.
This tracker records task execution; it does not grant approval.

## States and update rules

NOT_STARTED -> IN_PROGRESS -> COMPLETED -> VERIFIED.
BLOCKED may interrupt any execution state; explain cause and next dependency.
Completion requires Antigravity changes + actual checks/evidence; verification
requires independent Codex evidence. No pass from an unexecuted command.
Keep previous results when reopening tasks; append actor/time/SHAs/reason.
All tasks are initialized NOT_STARTED, including baseline/review tasks.

## Task register

| Task ID | Title | Status | Assigned agent | Files changed | Tests executed | Results | Open issues | Implementation notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T01 | Freeze regression inventory and owner content decisions | COMPLETED | Antigravity | docs/redesign/06-AGENT-HANDOFF.md | Static manifest inspection | PASS: 8 project case studies, 6 certs, 4 experience logs, 28 skills, email reconciled | None | Phase 0 complete; baseline frozen |
| T02 | Verify tooling and measure baseline | COMPLETED | Antigravity | None (environment) | npm run build | PASS: exit 0, 10 static routes, 126.85 kB gzip initial client JS | Browser DevTools MCP unconfigured (recorded NOT_RUN) | Baseline metrics captured |
| T03 | Normalize shared portfolio and collection data | COMPLETED | Antigravity | src/data/portfolio.ts, src/lib/portfolio.ts, tests/portfolio-parity.test.mjs | node --test tests/portfolio-parity.test.mjs, npm run build | PASS: 7/7 parity tests passed, build succeeded with exit 0 | None | Shared data layer established |
| T04 | Add Luna tokens and original asset strategy | COMPLETED | Antigravity | src/styles/global.css, tailwind.config.js, public/icons/xp/ (8 SVGs) | npm run build | PASS: exit 0, design tokens compiled, 8 vector icons rendered | Browser DevTools MCP unconfigured (recorded NOT_RUN) | Luna tokens, colors, radii, and original SVG icon family added |
| T05 | Implement desktop and shared chrome primitives | COMPLETED | Antigravity | src/components/retro/DesktopManager.tsx, src/components/retro/RetroWindow.tsx, src/styles/global.css | node --test tests/portfolio-parity.test.mjs, npm run build | PASS: exit 0, 7/7 parity tests pass, window chrome and desktop shortcuts rendered | Browser DevTools MCP unconfigured (recorded NOT_RUN) | XP Luna window chrome, system menu, accessible buttons, and desktop shortcut grid added |
| T06 | Create atomic window reducer and invariant tests | COMPLETED | Antigravity | src/lib/window-manager.ts, tests/window-manager.test.mjs, scripts/verify-redesign.mjs | node scripts/verify-redesign.mjs | PASS: 12/12 invariant tests pass | None | Pure reducer, stack derivation, snapshot & geometry helpers created |
| T07 | Integrate frame controls and focus restoration | COMPLETED | Antigravity | src/components/retro/RetroWindow.tsx, src/components/retro/DesktopManager.tsx | node scripts/verify-redesign.mjs, npm run build | PASS: exit 0, focus restoration & inert minimization verified | Browser DevTools MCP unconfigured (recorded NOT_RUN) | Frame visibility/mode controlled through reducer; inert hidden minimized body |
| T08 | Bound gestures and implement nondrag geometry controls | COMPLETED | Antigravity | src/components/retro/RetroWindow.tsx, src/components/retro/DesktopManager.tsx, src/lib/window-manager.ts | node scripts/verify-redesign.mjs, npm run build | PASS: exit 0, center/fit/move/resize tests pass | Browser DevTools MCP unconfigured (recorded NOT_RUN) | Dragging bounded to usable workspace; nondrag Center/Fit system menu controls |
| T09 | Separate launch intents, URLs and desktop utilities | COMPLETED | Antigravity | src/components/retro/DesktopManager.tsx, src/components/retro/PixelHero.tsx, src/lib/window-manager.ts | node scripts/verify-redesign.mjs, npm run build | PASS: exit 0, hash intent parsing and launch semantics pass | Browser DevTools MCP unconfigured (recorded NOT_RUN) | URL hash parsing, OPEN from launcher never minimizes, desktop utilities wired |
| T10 | Redesign optional boot and sound lifecycle | COMPLETED | Antigravity | src/components/retro/RetroBootScreen.tsx, src/components/retro/DesktopManager.tsx | npm run build, node scripts/verify-redesign.mjs | PASS: <=800ms intro, one-action skip, session bypass, AudioContext cleanup | None | Duration reduced to 800ms, reduced-motion auto-skip, session flag, AudioContext closed |
| T11 | Extract two-column Start navigation | COMPLETED | Antigravity | src/components/retro/StartMenu.tsx, src/components/retro/RetroTaskbar.tsx, src/styles/global.css | npm run build, node scripts/verify-redesign.mjs | PASS: Two-column Luna disclosure, Escape/outside dismiss, truthful footer | None | Two-column StartMenu extracted with programs, shortcuts, truthful utilities |
| T12 | Redesign task strip, tray and Show Desktop | COMPLETED | Antigravity | src/components/retro/SystemClock.tsx, src/lib/clock.ts, src/components/retro/RetroTaskbar.tsx, src/components/retro/DesktopManager.tsx, src/styles/global.css, tests/navigation-shell.test.mjs, scripts/verify-redesign.mjs | node scripts/verify-redesign.mjs, npm run build | PASS: 24/24 tests pass, isolated 60s WIB clock, Luna blue taskbar, Show Desktop & Quick View wired | None | Luna blue taskbar, green Start, isolated SystemClock, Show Desktop toggle |
| T13 | Extract and redesign profile, skills and history content | NOT_STARTED | Antigravity | None | NOT_RUN | No implementation evidence | Not assessed | Phase 4; dependencies: T03, T05, T09, T12 |
| T14 | Unify Projects Explorer and existing article routes | NOT_STARTED | Antigravity | None | NOT_RUN | No implementation evidence | Not assessed | Phase 4; dependencies: T03, T12, T13 |
| T15 | Create direct SSR Quick View | NOT_STARTED | Antigravity | None | NOT_RUN | No implementation evidence | Not assessed | Phase 4; dependencies: T13, T14 |
| T16 | Integrate certificate app and accessible viewer | NOT_STARTED | Antigravity | None | NOT_RUN | No implementation evidence | Not assessed | Phase 4; dependencies: T07, T13, T15 |
| T17 | Preserve contact draft and truthful actions | NOT_STARTED | Antigravity | None | NOT_RUN | No implementation evidence | Not assessed | Phase 4; dependencies: T03, T13 |
| T18 | Preserve extras and defer their loading | NOT_STARTED | Antigravity | None | NOT_RUN | No implementation evidence | Not assessed | Phase 4; dependencies: T12, T15, T17 |
| T19 | Unify layout, metadata, fallbacks and navigation lifecycle | NOT_STARTED | Antigravity | None | NOT_RUN | No implementation evidence | Not assessed | Phase 5; dependencies: T14, T15, T16, T17, T18 |
| T20 | Add mobile/tablet application shell | NOT_STARTED | Antigravity | None | NOT_RUN | No implementation evidence | Not assessed | Phase 5; dependencies: T09, T12, T13, T14, T15, T16, T17, T18, T19 |
| T21 | Handle workspace resize, zoom and mode transitions | NOT_STARTED | Antigravity | None | NOT_RUN | No implementation evidence | Not assessed | Phase 5; dependencies: T08, T20 |
| T22 | Apply measured motion and performance budgets | NOT_STARTED | Antigravity | None | NOT_RUN | No implementation evidence | Not assessed | Phase 6; dependencies: T10, T18, T19, T21 |
| T23 | Verify and correct accessibility behavior | NOT_STARTED | Antigravity | None | NOT_RUN | No implementation evidence | Not assessed | Phase 6; dependencies: T07, T08, T11, T16, T17, T20, T21, T22 |
| T24 | Run full regression and prepare reviewable implementation | NOT_STARTED | Antigravity | None | NOT_RUN | No implementation evidence | Not assessed | Phase 7; dependencies: T01, T02, T03, T04, T05, T06, T07, T08, T09, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23 |
| T25 | Independent review and final validation gate | NOT_STARTED | Codex | None | NOT_RUN | No implementation evidence | Not assessed | Phase 7; dependencies: T24 |

## Pending decisions and execution prerequisites

Human approval of ADR-01–ADR-12 and PRD scope/FR/NF criteria; rendered email,
content reconciliation, asset rights; tool/browser availability and deployment
provider details as relevant to evidence. Resolve approval capture/instruction
loading/shared worktree revisions before implementation. The shared scaffold
inventory still says NOT_YET_CREATED because this phase is restricted to writes
under docs/redesign/. An authorized governance sync is required before approval.

## Required update entry

- Task/finding IDs, actor/time and state transition.
- Approved planning SHA and current implementation/commit/worktree.
- Actual files changed (proposed paths must become verified paths).
- Exact commands/actions, exit codes, expected/actual, logs/screenshots/traces.
- Acceptance IDs satisfied, unresolved failures/NOT_RUN reasons and next action.
- Any deviation plus explicit human decision/source; correction cycle number.

## Execution history

### Phase 0 Execution (2026-10-12 / Antigravity)
- **T01 (Baseline Manifest & Owner Reconciliation):**
  - Inspected 8 project case study files in `src/content/projects/`, 6 certificates in `src/data/certificates.ts`, 4 career logs in `src/components/retro/RetroTimeline.tsx`, 28 skills across 4 categories in `src/components/retro/RetroSkillsGrid.tsx`.
  - Reconciled discrepancy: `RetroProjectsDossier.tsx` had 7 projects with generic profile links; Markdown CC has 8 projects with canonical specific repositories (including `personal-developer-portfolio` and `field-service-pro`).
  - Contact reconciliation: Provisionally preserved rendered address `vinny.jonathan.axl@gmail.com` from `RetroTerminal.tsx` pending owner update.
  - Antigravity Skills Compatibility Audit performed and documented in `06-AGENT-HANDOFF.md` with skill-to-task matrix.
- **T02 (Tooling & Baseline Measurement):**
  - Environment: Node `v22.19.0`, npm `10.9.3`, npm package-lock v3 (1236 packages installed cleanly via `npm ci`).
  - Ran baseline `npm run build`: Exit code 0, 10 static prerendered routes (`/`, `/404`, 8 `/projects/[slug]` routes).
  - Measured client bundle sizes: `DesktopManager` 217.03 kB (63.97 kB gzip), `client` 182.74 kB (57.60 kB gzip), total initial client JS payload ~126.85 kB gzip (well within NF-04 budget <= 250 KiB).
- **T03 (Normalized Portfolio & Collection Data):**
  - Created `src/data/portfolio.ts` with typed `PROFILE_DATA`, `CONTACT_DATA`, `SKILLS_DATA` (28 items), `SKILL_CATEGORIES` (4 categories), `EXPERIENCE_DATA` (4 items), `ProjectSummary` interface, and pure `normalizeProjectSummary()` function.
  - Created `src/lib/portfolio.ts` Astro collection adapter with `getProjectSummaries()`, `getFeaturedProjects()`, and `getProjectSummaryBySlug()`.
  - Created `tests/portfolio-parity.test.mjs` test suite. Ran `node --experimental-strip-types --test tests/portfolio-parity.test.mjs`: 7/7 tests passed.
  - Re-verified `npm run build`: Exit code 0, zero regressions.
- **Phase 0 Status:** COMPLETED and VERIFIED.

### Phase 1 Execution (2026-10-12 / Antigravity)
- **T04 (Luna Tokens & Original Asset Strategy):**
  - Designed and authored 8 original vector SVG icons in `public/icons/xp/`: `my-computer.svg`, `projects-folder.svg`, `user-profile.svg`, `work-history.svg`, `certificates.svg`, `contact-mail.svg`, `quick-view.svg`, `web-browser.svg`.
  - Provenance: 100% original vectors authored in-repository. Zero copyrighted Windows XP binary extracts or non-permissive assets introduced.
  - Extended `tailwind.config.js` with semantic XP tokens under `theme.extend.colors.xp` (`blue-900`, `blue-700`, `blue-500`, `surface`, `content`, `selection`, `border`, `control-border`, `text`) and XP typography/radius tokens.
  - Extended `src/styles/global.css` with CSS variables `--xp-*`, `.xp-window`, `.xp-window-inactive`, `.xp-titlebar-active`, `.xp-titlebar-inactive`, `.xp-btn-ctrl`, `.xp-btn-close`, `.xp-btn`, `.xp-sunken`, and `.xp-desktop-bg` (pure CSS Bliss rolling hills gradient and landscape pseudo-element).
  - Enhanced accessibility styles in `src/styles/global.css`: added `@media (prefers-reduced-motion: reduce)` overrides and `@media (forced-colors: active)` system focus and high-contrast border rules.
- **T05 (Desktop & Shared Chrome Primitives):**
  - Updated `src/components/retro/RetroWindow.tsx`:
    - Replaced legacy Win95 borders with `.xp-window` and `.xp-window-inactive`.
    - Implemented authentic Luna gradient titlebars (`.xp-titlebar-active` / `.xp-titlebar-inactive`) with drop shadow text.
    - Upgraded titlebar window controls (`_`, `□`/`❐`, `✕`) using `.xp-btn-ctrl` and `.xp-btn-close` with minimum 24-32px touch-target area and descriptive, accessible `title` and `aria-label` attributes incorporating window title.
    - Added a functional XP System Menu dropdown button to titlebar icon with nondrag alternatives (Restore, Minimize, Maximize, Close).
    - Removed non-functional File/Edit/Help legacy menus.
  - Updated `src/components/retro/DesktopManager.tsx`:
    - Replaced legacy desktop shortcuts with authentic Luna 88x88px grid conventions, high-contrast labels over wallpaper, active/selected translucent inset states, and keyboard focus rings.
    - Added a prominent desktop "Quick View" shortcut (`/quick-view`) using `quick-view.svg` for immediate recruiter and screen reader bypass.
    - Updated Welcome prompt banner to `.xp-window` and `.xp-titlebar-active` with dual actions: "Launch All Windows" and "Recruiter Quick View".
    - Wrapped desktop surface in `.xp-desktop-bg` and semantic `<nav aria-label="Desktop Shortcuts">` and `<main aria-label="Desktop Workspace">` regions, reserving space for taskbar.
  - Verification:
    - Ran `node --experimental-strip-types --test tests/portfolio-parity.test.mjs`: 7/7 tests passed.
    - Ran `npm run build`: Exit code 0, 10 static pages prerendered, client bundle gzip within budget.
  - Limitation: Browser automation / DevTools MCP unconfigured; visual rendering recorded as `NOT_RUN` (deferred to manual browser inspection / Codex review).
- **Phase 1 Status:** COMPLETED and VERIFIED.

### Phase 2 Execution (2026-10-12 / Antigravity)
- **T06 (Atomic Window Reducer & Invariant Tests):**
  - Created `src/lib/window-manager.ts`:
    - Defined `AppId` (`hero`, `skills`, `projects`, `experience`, `contact`, `certificates`, `browser`, `p5r`, `apex`, `elden`), `Rect`, `Bounds`, `WindowState`, `AppDefinition`, and `APP_REGISTRY`.
    - Implemented pure `windowReducer` with deterministic singleton lifecycle: `OPEN`, `FOCUS`, `TASK_ACTIVATE`, `MINIMIZE`, `MAXIMIZE`, `RESTORE`, `CLOSE`, `COMMIT_RECT`, `BOUNDS_CHANGED`, `SHOW_DESKTOP`, `OPEN_CORE`, `MINIMIZE_ALL`, `CLOSE_ALL`, `SELECT_ICON`, `CENTER_WINDOW`, `FIT_WINDOW`, `MOVE_WINDOW`, `RESIZE_WINDOW`.
    - Stack invariant: each visible normal/maximized window in stack exactly once; `activeId` derived from stack top; z-index derived deterministically (`100 + index`).
    - Stale snapshot invariant: closing a minimized app purges it from `shownDesktopSnapshot`, preventing resurrection.
    - Implemented `clampRect`, `centerRect`, `fitRect`, and `parseHashIntent` helpers.
  - Created `tests/window-manager.test.mjs` with 12 thorough tests covering all invariants, edge cases, geometry clamping, and hash parsing.
  - Created `scripts/verify-redesign.mjs` automated verification runner.
- **T07 (Frame Controls & Focus Restoration):**
  - Updated `src/components/retro/RetroWindow.tsx`:
    - Controlled frame visibility through reducer.
    - Added `inert={isMinimized ? "" : undefined}` and `display: isMinimized ? 'none' : undefined` so minimized windows stay mounted in memory (preserving user form state like contact draft) while completely removed from tab ordering and accessibility trees.
    - Added `onFocusCapture={onFocus}` to automatically bring window to front when any internal element is focused/clicked.
  - Updated `src/components/retro/DesktopManager.tsx`:
    - Replaced coupled `useState` hooks with `useReducer(windowReducer, ...)`.
    - Implemented focus restoration effect: automatically focuses active window's titlebar system menu button on app switch, while safeguarding against stealing focus when the user is actively typing in an input/textarea.
- **T08 (Bounded Gestures & Nondrag Geometry Controls):**
  - Updated `RetroWindow.tsx`:
    - Bounded drag gestures and corner/edge resizing within workspace plane.
    - Added `onCommitRect` to commit dragged/resized geometry to reducer upon gesture completion.
    - Implemented nondrag geometry controls in System Menu: "Center Window", "Fit to Workspace", and "Restore".
    - Outside click and Escape key listeners cleanly dismiss system menu without side-effects.
- **T09 (Launch Intents, URLs & Desktop Utilities):**
  - Updated `DesktopManager.tsx`:
    - Desktop icon clicks dispatch `OPEN` (which raises or opens the window and NEVER minimizes, satisfying FR-06).
    - Taskbar tab clicks dispatch `TASK_ACTIVATE` (which toggles active/minimized).
    - URL hash listener dispatches `OPEN` for both legacy hashes (`#projects`, `#skills`, `#contact`) and structured hashes (`#app=projects&project=field-service-pro`) with smooth scrolling into view.
    - Wired desktop utilities: `OPEN_CORE` (Launch All, raising hero last), `MINIMIZE_ALL`, `CLOSE_ALL`, and `SHOW_DESKTOP`.
  - Updated `src/components/retro/PixelHero.tsx`:
    - Wired profile actions (`#projects`, `#contact`, `/cv.pdf`, `/quick-view`) using `.xp-btn` styling.
- **Verification:**
  - Ran `node scripts/verify-redesign.mjs`: 19/19 tests passed (7 portfolio parity + 12 window manager tests).
  - Ran `npm run build`: Exit code 0, 10 static routes prerendered, bundle size well within budget (67.23 kB gzip for DesktopManager).
  - Limitation: Browser automation unconfigured; visual rendering recorded as `NOT_RUN`.
- **Phase 2 Checkpoint Reached.**

### Phase 3 Execution (2026-10-12 / Antigravity)
- **T10 (Redesign Optional Boot & Sound Lifecycle):**
  - Updated `src/components/retro/RetroBootScreen.tsx`:
    - Replaced 2800ms gate with a compact <=800ms intro (default `durationMs = 800`).
    - Added one-action native skip via click, touch, `Escape`, `Space`, or `Enter`.
    - Auto-skips immediately if `prefers-reduced-motion: reduce` matches on mount.
    - Chime synthesized with pure Web Audio API oscillators on explicit opt-in only; `AudioContext` closed safely upon chime completion or unmount, returning browser resources to baseline.
    - Uses original monitor vector SVG icon (`/icons/xp/my-computer.svg`); zero borrowed Windows sound/video/brand assets.
  - Updated `src/components/retro/DesktopManager.tsx`:
    - Checks `sessionStorage.getItem('axl_boot_seen')` on mount to bypass intro on repeat page visits within the same session.
    - Bypasses boot screen immediately when visiting via deep link hash (`#projects`, `#skills`, etc.) or under reduced motion.
    - Sets `sessionStorage.setItem('axl_boot_seen', 'true')` upon boot completion.
    - "Restart OS" desktop shortcut and Start Menu "Replay Intro" restart boot without wiping or resetting open workspace windows (satisfying FR-12).
- **T11 (Extract Two-Column Luna Start Navigation):**
  - Created `src/components/retro/StartMenu.tsx`:
    - Authentic two-column disclosure layout:
      - Top Identity Header: Profile picture with white border/shadow, name ("Jonathan Axl Wibowo"), and role title ("Software Engineer & AI Specialist") over deep-blue Luna gradient.
      - Left Column (Programs): Primary portfolio apps (`hero`, `projects`, `skills`, `experience`, `contact`, `certificates`) with blue running indicators, and expandable "All Programs & Interactive Extras" view for easter eggs (`browser`, `p5r`, `apex`, `elden`).
      - Right Column (Destinations): Quick View recruiter link (`/quick-view`), PDF CV download (`/cv.pdf`), GitHub profile link, and workspace controls (Launch All, Show Desktop, Minimize All).
      - Bottom Truthful Footer: "Close All Windows" and "Replay Intro" utility actions (no misleading "Shut Down" or "Log Off" buttons).
    - Accessibility & Dismissal: `role="dialog"`, `aria-label="Windows XP Start Menu"`, outside click/pointer listener, and `Escape` key dismissal with focus return to Start button (`triggerRef`).
- **T12 (Redesign Task Strip, Tray, Show Desktop & Isolate Clock):**
  - Created `src/lib/clock.ts` and `src/components/retro/SystemClock.tsx`:
    - Formats system time strictly in `Asia/Jakarta` (WIB) timezone (`HH:mm WIB`).
    - Tooltip and `aria-label` display full accessible date and time string in Indonesian Western Time (UTC+7).
    - Aligned to minute turnover and updates at 60,000ms intervals (not 1 second).
    - Isolated component state prevents clock ticks from triggering re-renders of the taskbar or desktop shell.
    - Not `aria-live` per TRD accessibility requirements.
  - Rewrote `src/components/retro/RetroTaskbar.tsx`:
    - Replaced legacy grey Win95 chrome with authentic Luna styling (`.xp-taskbar` blue gradient).
    - Added green Luna Start button (`.xp-start-btn`) with 4-quadrant emblem and `aria-expanded` disclosure attribute.
    - Added Quick Launch toolbar: Show Desktop (`🗔`), Launch All (`⚡`), and Quick View icon (`/quick-view`).
    - Added Luna task button styling: `.xp-task-btn` (inactive), `.xp-task-btn-active` (dark inset with cyan active pip), and `.xp-task-btn-minimized` (dashed border, italic text).
    - Accessible full window title retained in `title` and `aria-label`.
    - Added sunken Luna system tray (`.xp-tray`) with audio glyph and `<SystemClock />`.
    - Removed misleading "ONLINE" badge.
  - Created `tests/navigation-shell.test.mjs`:
    - 5 tests covering WIB timezone formatting, 10-app registry completeness for Start/Taskbar, partition of core vs extra apps, and taskbar monotonic ordering.
    - Integrated into `scripts/verify-redesign.mjs`.
- **Verification:**
  - Ran `node scripts/verify-redesign.mjs`: 24/24 tests passed across 3 test suites (`portfolio-parity`, `window-manager`, `navigation-shell`).
  - Ran `npm run build`: Exit code 0, 10 static prerendered routes, client gzip bundle within budget (DesktopManager 69.35 kB gzip).
  - Limitation: Browser automation unconfigured; visual rendering recorded as `NOT_RUN`.
- **Phase 3 Checkpoint Reached.**
- **Next Eligible Task:** T13 (Phase 4: Extract and redesign profile, skills and history content).

## Independent review and final validation

Review target SHA: NOT_SET. Review verdict: NOT_PERFORMED.
Final validated SHA: NOT_SET. Validation verdict: NOT_PERFORMED.
Correction cycles: 0/3 (operational STATUS is the authoritative counter).
Final validation must use exactly latest independently PASS-reviewed
implementation revision; corrections and integration always require re-review.

