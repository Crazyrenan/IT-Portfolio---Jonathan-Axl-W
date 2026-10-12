# AXL_OS XP — Technical requirements and architecture

Draft 1, 2026-10-12; proposed decisions, approval PENDING. Source evidence revision:
`97718e55330aca669ec4063d64461a45eb149433`; planning worktree final audit HEAD:
`e48e3e289941ecd43d93683863d3c5702829ae75` (only scaffolding added).
Companions: [requirements](01-PRD.md), [flows](03-APP-FLOW.md),
[design](04-DESIGN-BRIEF.md), [implementation](05-IMPLEMENTATION-PLAN.md).

## Verified stack and runtime

Versions below are package-lock resolutions, not a claim of installed packages.
Current worktree has no node_modules. Local `node --version` = v22.19.0,
`npm --version` = 10.9.3; deployment runtime U. LockfileVersion 3 and
package-lock.json indicate npm; no packageManager or engines declaration in root.

| Package | Manifest range | Locked version / usage |
| --- | --- | --- |
| astro | ^5.17.1 | 5.18.2; routing/build, Vite internally; not Astro 4 |
| react / react-dom | ^19.2.4 | 19.2.4; homepage client:load island |
| @astrojs/react | ^4.4.2 | 4.4.2; experimentalReactChildren enabled |
| tailwindcss / @astrojs/tailwind | ^3.4.19 / ^6.0.2 | Tailwind 3.4.19; config.js + CSS @tailwind; v4 plugin dependency does not prove v4 usage |
| framer-motion | ^12.33.0 | 12.33.0; motion/AnimatePresence/useDragControls imports |
| typescript / tsx | ^5.9.3 / ^4.23.13 | 5.9.3 / 4.23.13; strict Astro config; tsx available in lock, not installed here |
| @astrojs/node | ^9.5.5 | 9.5.5; standalone adapter with static output |
| @keystatic/astro / core | ^5.0.6 / ^0.5.48 | 5.0.6 / 0.5.48; local storage configured |
| gsap / three | ^3.14.2 / ^0.182.0 | 3.14.2 / 0.182.0; no application runtime imports found |
| @react-three/fiber, drei; react-github-calendar; @tailwindcss/vite | Manifest dependencies | No application runtime imports found; unused dependency candidates, not proof they enter bundles |
| @fontsource/space-grotesk, jetbrains-mono | ^5.3.0 each | Layout imports; inline Tahoma/Segoe UI compete with Tailwind fonts |
| @ag-kit/agents, server | ^0.0.10 each | Manifest only; not proof of active Orca/Antigravity runtime |

Astro lock entry accepts Node 18.20.8, compatible 20.x or >=22 and npm >=9.6.5.
Keep lock-resolved architecture; no upgrades or installs in planning. Future
implementation must use the authorized environment, not reuse another worktree's
node_modules via symlinks or change global tools.

## Repository map (all existing paths verified)

```text
package.json / package-lock.json     scripts/dependencies/npm lock
astro.config.mjs                     static output + standalone Node adapter
tailwind.config.js / tsconfig.json   Tailwind 3 / strict types
keystatic.config.js                  local projects/status editorial schemas
src/
  pages/index.astro                  DesktopManager client:load
  pages/projects/[slug].astro        getStaticPaths + project.render()
  pages/404.astro                    themed article/error route
  layouts/Layout.astro              fonts, metadata, ClientRouter, video/reveal
  styles/global.css                 Win95 utilities + unused-looking HUD rules
  config/site.ts                    unconsumed nav/social config
  content/config.ts                 legacy type:content collections
  content/projects/                 8 Markdown case studies
  content/status/current.md         stored CMS status; desktop usage not found
  data/certificates.ts              6 file-backed certificates
  components/retro/
    DesktopManager.tsx              app registry + state + rendering + shortcuts
    RetroWindow.tsx                 frame + drag/resize/motion
    RetroTaskbar.tsx                Start menu + tabs + clock
    RetroBootScreen.tsx             timed intro + Web Audio
    PixelHero.tsx                   profile/CV/hash links
    RetroSkillsGrid.tsx             skills data/filter/detail
    RetroProjectsDossier.tsx        duplicated project data/select/preview
    RetroTimeline.tsx               experience/education data
    RetroTerminal.tsx               mailto contact draft
    RetroCertificateGallery.tsx     dock/drawer/modal/zoom independent state
    RetroEasterEggs.tsx             Persona, Apex, Elden, demo browser
public/
  cv.pdf, favicon.svg, favicon.ico
  assets/                          3 MP4 files
  icons/retro/, icons/              UI/game/social assets
  certificates/                    6 JPEGs
  images/, images/projects/        portraits, screenshots, duplicate copies
docs/                               3 historical guidance documents
cert-gallery-responsive.md          historical draft; preserve
AGENTS.md, .workflow/, docs/reviews/ shared governance; read, no writes this phase
.vscode/                            editor extensions/launch configuration
```

Eight existing route slugs: `help-desk-ai`, `field-service-pro`,
`lkh-internal-platform`, `imip-recruitment`, `optical-intel-ocr`,
`personal-developer-portfolio`, `windbreaker-ai`, `tb-detection-comparative-study`.
Do not rename slugs because display titles change.

## Source-level audit by concern

| Concern | Verified finding / exact location | Proposed response |
| --- | --- | --- |
| Entry/rendering | `src/pages/index.astro:7` one large React island; core apps closed initially in manager | Keep coordinated shell island; SSR identity fallback + independent Quick View |
| Routing | `src/pages/projects/[slug].astro:5–15` legacy collection/static routes; ClientRouter in Layout | Preserve APIs in this scope; do not paste newer content-loader examples |
| Styling | global.css mixes Win95, cinematic tokens/HUD; Tailwind config v3; many inline hex values | New scoped xp tokens; migrate shell/apps/articles, remove only proved-unused rules |
| State | React local hooks; manager booleans/z/highest/active in separate setters | Pure reducer + explicit registry; no Zustand installation |
| Geometry | RetroWindow local size + FM transforms + relative document flow | Single managed Rect per app, bounded desktop plane; transient movement locally |
| Focus | Manager raises on pointer; frames no focus contract; active header generic labels | Named regions, focusin raises, programmatic entry/restore, system menu |
| Adaptive behavior | JS <768; Tailwind md=768, lg=1024; `xs:` used with no custom screens config | Central matchMedia policy + stable CSS first paint; remove unsupported xs assumptions |
| Assets | File stats: seamless_loop 2,026,129B, fallback Background 18,320,824B; IMIP cover 6,801,939B | Static original wallpaper, responsive derivative screenshots, no default video |
| Duplication | Landing page PNG and IMIP cover SHA256 equal; analogous duplicate paths/sizes exist | Preserve originals; generate derivatives for used paths, no unsolicited deletion |
| Content | Seven in-component summaries vs eight CC entries; certificates already shared module | Build-time normalized project view model; extract profile/skills/history |
| SEO | Layout description/title/lang; no canonical/OG/schema found | Render semantic Quick View/root identity + coherent per-route metadata |
| Accessibility | Outline suppression, 20px controls, unassociated labels; modal focus gaps | Acceptance matrix and actual keyboard/AT/contrast evidence |
| Motion | FM used; global reduced-motion covers only old HUD; looping video persists | CSS + FM policy, opt-in audio, scoped listeners and interruption tests |
| Testing | No test/lint scripts, test files or test framework config found | Existing Node-based pure behavior checks + browser protocol; additions need approval |
| Deployment/env | Static output + Node adapter and Keystatic local; no deployment manifest found; no source env read found | Provider, build env and CMS hosting U; no deployment changes; don't infer host from domain |
| Dead/fragile candidates | site.ts no consumers; HUD/hero CSS no matching current markup; crt-scanlines no CSS definition; unused RetroWindow props | Verify import/selector reachability before trimming; preserve project/404 legacy tokens until migrated |
| Performance evidence | Whole-shell eager imports; per-pointer React size state; mobile opens five apps; large assets | Byte/structure risks V, actual JS transfer/frame/CWV U. T02 baseline before claiming gain |

The four preserved documents: `docs/cinematic-hero-planning-doc.md` supplies
Astro/React boundary and lifecycle cautions; `docs/PERFORMANCE_CHECKLIST.md`
supplies measurement ideas only (2026-08-29 historical claims not retested);
`docs/neo-retro-8bit-prd.md` supplies desktop metaphor/content mapping;
`cert-gallery-responsive.md` supplies responsive certificate goals, not its older
invented five-entry seed list. Current source has six actual certificates.

## Architecture decisions (proposed; require approval)

| ID | Decision / rationale | Tradeoff and alternative |
| --- | --- | --- |
| ADR-01 | Keep Astro 5/React 19/Tailwind 3, legacy collections and current deployment config | Limits migration risk; modern APIs deferred. No Next.js/SPA replacement |
| ADR-02 | `/` = interactive shell; proposed `src/pages/quick-view.astro` = static professional route | Direct/SEO/no-JS access beats an app-only Quick View; separate render compositions but shared data |
| ADR-03 | Build projects from Markdown CC; new shared portfolio module extracts existing profile/skills/history/contact | Eliminates source drift; reconcile seven/eight differences explicitly rather than merging unsupported metrics |
| ADR-04 | Keep current retro components as adapters; extract reusable content bodies before changing frames | Minimizes churn and preserves feature parity; no mass rename to xp tree |
| ADR-05 | React reducer owns app lifecycle/committed geometry; local gesture refs/Motion values own transient frames | Pure tests, atomic transitions; avoid global store/per-pointer shell rerender. More contract discipline |
| ADR-06 | >=1024 fine-pointer supports desktop; <1024 or coarse-primary uses one full-screen app | Honest touch UX and bounds; tablet cannot use unconstrained windows but retains app switcher |
| ADR-07 | Existing FM package for gestures/transitions, CSS for glossy chrome; no GSAP/WebGL addition | One motion policy; no new runtime/download. Do not change import package to motion/react based on current web docs |
| ADR-08 | Plain accessible links for CV; optional inline viewer not in base scope; browser remains demo/directory | Avoid PDF viewer/remote iframe complexity; retain all actual links/interactions |
| ADR-09 | Original CSS wallpaper/illustrated SVG icon family; video not default; licensed asset ledger | No unapproved XP/game redistributable assumptions; illustrations must be own work or documented licensed |
| ADR-10 | URL stores only selected app/project via hashes; no persistent arbitrary geometry/draft/PII | Shareable entry and refresh; window placement reset intentional. Full session persistence deferred |
| ADR-11 | No new test dependency in base plan: Node runner with temporary compiled reducer output + manual browser protocol | Lower setup friction, fewer automated UI tests. Optional Playwright/checker request must specify packages/commands before installing |
| ADR-12 | Design brief is token source; Antigravity root DESIGN.md rule needs documented human/runtime resolution | No conflicting copied design doc; approved alias/override later if genuinely needed, never during docs-only phase |

## Proposed component/data boundaries

Every path in this section marked NEW is proposed, not discovered or created.

- NEW `src/data/portfolio.ts`: typed profile, skill categories/items, experience,
  rendered social/contact/CV data extracted without invention. Keep existing
  `src/data/certificates.ts` authoritative. Also export the pure project-summary
  type/normalizer here so Node tests do not import Astro virtual modules.
- NEW `src/lib/portfolio.ts`: server/build-only Astro collection adapter to
  `ProjectSummary[]` (slug,title,excerpt,tags,date,coverImage,gallery,githubUrl).
  Do not ship full Markdown bodies/raw collection objects to React.
- NEW `src/components/portfolio/PortfolioContent.tsx`: named pure ProfileContent,
  SkillsContent, ExperienceContent exports; rendering shared data only. Astro
  can SSR these without a client directive; desktop adapters add interactivity.
- NEW `src/lib/window-manager.ts`: types, registry and pure reducer/geometry;
  no DOM references or navigation effects inside reducer.
- NEW `src/components/retro/StartMenu.tsx` and `SystemClock.tsx`: separate menu
  behavior and minute-level time updates from task-list rendering.
- NEW `src/components/retro/MobileAppShell.tsx`: single-app responsive shell using
  same registered app renderers; no alternate content database.
- Existing `RetroWindow.tsx`: one named frame, pointer behavior adapter, system
  menu, visible/focus state, content scrolling; bodies stop nesting frames.
- Existing `RetroCertificateGallery.tsx`: reusable list/detail with one app
  record and one actual modal; eliminate independent persistent dock state.
- Existing `DesktopManager.tsx`: reducer/effect integration, desktop icons,
  responsive renderer, URL intents, application registry composition.

Server imports remain server-side: index.astro/quick-view.astro read collection
data through lib adapter and pass only serializable summary props. Existing
project route keeps getCollection/project.render APIs. No external fetching of
professional content. Project “badge/metrics” data absent from schema must not be
invented; keep verified current body text or record a reconciliation decision.

## Window manager contract

Types (contract notation; not implementation code):

`AppId = hero | skills | projects | experience | contact | certificates |
browser | p5r | apex | elden` (existing IDs preserved; certificates newly managed).
`AppDefinition = {id,title,icon,defaultRect,minSize,renderKey}`.
`WindowState = {phase: closed|normal|maximized|minimized, beforeMinimize:
normal|maximized, rect: Rect, restoreRect: Rect, visited: boolean}`.
`Workspace = {windows: Record<AppId,WindowState>, stack: AppId[], activeId:
AppId|null, selectedIcon: AppId|null, shownDesktopSnapshot: AppId[]|null}`.
`Rect = {x,y,width,height}` in workspace-local CSS pixels.

All events are atomic and unknown IDs no-op. Closed has no task; minimized has
a task but no accessible body. Registry is singleton by AppId; project detail
selection is state within projects, not a new window. Stack contains each
visible normal/maximized app exactly once, front at final index; derive activeId
from it, and z=100+index. No unbounded highestZ counter. Layer bands: wallpaper
0, icons 10, app plane 100–199, taskbar 300, Start/system-menu 400, modal 500,
optional boot 600. Portal menus/modals to shell root to avoid transformed-parent
fixed positioning/z-index traps.

| Event | Deterministic result |
| --- | --- |
| OPEN(id) | Closed -> normal default clamped geometry; minimized -> beforeMinimize; otherwise preserve geometry. Always raise; never minimize from launcher |
| FOCUS(id) | Visible app moves to stack end, otherwise no-op; focus restoration scheduled outside reducer |
| TASK_ACTIVATE(id) | Closed ignored; minimized restores/raises; visible inactive raises; visible active minimizes |
| MINIMIZE(id) | Save normal/max mode, remove stack item; choose previous front visible; body inert/hidden, keep renderer mounted once visited |
| MAXIMIZE(id) | Normal -> maximized fill usable bounds, save normal restoreRect; focus app; already max no-op |
| RESTORE(id) | Max -> normal clamped restoreRect; minimized -> beforeMinimize; focus app |
| CLOSE(id) | Remove task/stack, mark closed, next front becomes active; unmount/reset app local ephemeral state. Preserve original lifecycle semantics |
| COMMIT_RECT(id,rect) | Normal app only; clamp and save rect/restoreRect after gesture; no motion state in global reducer |
| BOUNDS_CHANGED(bounds,mode) | Re-clamp normal + restore rects; maximized recalculates; in app-view ignore coordinates but retain normalized desktop geometry |
| SHOW_DESKTOP | Save currently visible IDs then minimize; next toggle restores still-open saved IDs in saved stacking order; explicit new app operation clears snapshot |
| OPEN_CORE / MINIMIZE_ALL / CLOSE_ALL | Operate on registry core IDs / open IDs; atomic and same invariant rules; last core app hero by explicit final raise |
| REPLAY_BOOT | Separate cosmetic effect; preserves app state, no hard page reload or draft reset |

Desktop usable bounds exclude 48px taskbar + safe area, 8px workspace margins;
observe shell ResizeObserver and visual viewport/zoom change. Preferred defaults:
width min(760,bounds.width-16), height min(560,bounds.height-16), centered with
24px cascade steps. Minimum 360x240 is capped by available dimensions (not a
floor exceeding screen). Clamp all edges inside usable bounds; narrow/coarse
screen switches to app-view, not a 340px forced width. Restore after resizing
uses clamped normal rect, never offscreen previous coordinates.

Initial reducer state opens only Welcome (`hero`) unless a valid URL intent
selects another app. Approved core utility IDs are hero, skills, projects,
experience, contact and certificates; OPEN_CORE explicitly raises hero last.

Pointer capture on title/resize handle, exclude controls/inputs from gesture;
disable drag momentum/elasticity. Escape cancels gesture to pregesture rect,
pointerup commits, pointercancel/lost capture/unmount cleans listeners/RAF.
Update width/height for dragged app only on RAF; no heavy blur/filter motion.
System menu has Move/Resize mode with arrow keys and +/- or preset Center/Fit
buttons for nondrag pointer alternatives; Enter commits/Escape cancels. Scroll
inside body, not document on desktop. Enable text selection inside content.

## Content, focus and navigation contracts

- Profile actions dispatch OPEN(projects/contact); real anchor fallback targets
  `/quick-view/#projects` or `/quick-view/#contact`. Root `#app=projects` and
  `#app=projects&project=<existing-slug>` are approved hash forms; existing
  `#projects`, `#contact`, `#skills`, `#hero`, `#experience` aliases still work.
- URL effects parse/validate then dispatch; opening via user intent creates one
  history entry only when selection changes; focus/minimize/resize does not
  rewrite history. Back/Forward applies intent, never loops pushState.
- Full project links use `/projects/<slug>` and browser navigation. Back restores
  hash intent/selected project; no reliance on local window coordinates surviving
  island unmount. Invalid root hash shows normal welcome with concise message.
- Opening focuses titled region (tabIndex -1) after mount; focusing pointer
  content doesn't steal focus from inputs. focusin raises without cycles.
- Close/minimize selects front remaining app; restore focus to its remembered
  descendant if connected/visible, else heading. With no visible apps return
  to initiating launcher/task/Start fallback; never focus a hidden node.
- Nonmodal app regions do not trap focus; inactive covered windows are inert
  while a separate keyboard app-switcher exposes them, so Tab cannot reach
  obscured content. Taskbar/Start always accessible. App-switcher selects/raises.
- True certificate modal: focus inside, contain Tab, inert background, Escape
  closes top modal only, restore origin; don't nest mobile drawer + preview.
- Minimize keeps content state mounted but hidden/inert; do not eagerly mount
  unvisited apps. Close resets form/filter/extra local state as current unmount
  behavior; no sessionStorage/localStorage contact draft.

## Build, testing and migration safeguards

Keep existing scripts `npm run dev`, `npm run build`, `npm run preview` and
`npm run astro -- --help`. No npm test/lint/check:agents scripts exist.
No build or app tests executed during planning because node_modules is absent
and execution can create artifacts outside the documentation-only scope.

Base proposed NEW test paths: `tests/window-manager.test.mjs`,
`tests/portfolio-parity.test.mjs`, `scripts/verify-redesign.mjs`; none exists yet.
Use Node built-in test runner for meaningful reducer/geometry/data checks.
Verifier invokes local TypeScript compiler from node_modules to a temporary OS
directory for pure modules, runs Node tests and cleans its own checked temp
target. Compile only the pure window-manager and shared-data modules for Node
tests; test the Astro-only collection adapter through actual build/generated
HTML and eight-route parity, not an astro:content import in plain Node.
Do not pretend tsc checks Astro templates. Astro checker or Playwright
is optional only after dependency/browser availability and installation approval.
Manual browser suite remains mandatory; report blocked if no browser available.

Migration order: freeze baseline -> reconcile data -> tokens/frames -> reducer
and geometry -> launch/task/menu/boot -> content/Quick View/cert/contact/extras ->
adaptive shell -> metadata/motion/performance -> independent review/validation.
Use short phases/checkpoints; preserve old articles/tokens until consumers migrate.
Do not delete old assets/dependencies on suspicion. No deployment/infra edits.
Rollback through authorized additive revert of the responsible implementation
commit, never reset/clean. Preview is not deployment approval.

## Reference boundaries

Current [Astro view-transition documentation](https://docs.astro.build/en/guides/view-transitions/)
informs lifecycle checks; [content collections](https://docs.astro.build/en/guides/content-collections/)
now document newer APIs, so use the pinned 5.x repository APIs for this plan.
[Motion drag guidance](https://motion.dev/docs/react-drag) supports bounded
gestures conceptually; verify APIs against installed framer-motion 12.33.0.
[WAI modal pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
informs true-modal focus handling; it is not a license to trap every desktop app.
