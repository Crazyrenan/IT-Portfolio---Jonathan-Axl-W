# AXL_OS XP — Product requirements

Planning revision: draft 1, 2026-10-12. Author: Codex. Human approval: PENDING.
Read with [TRD](02-TRD.md), [flows](03-APP-FLOW.md), [design](04-DESIGN-BRIEF.md),
[tasks](05-IMPLEMENTATION-PLAN.md), [handoff](06-AGENT-HANDOFF.md), and
[progress](07-PROGRESS.md). This packet authorizes no implementation.

## Vision and audience

Evolve the existing Jonathan Axl Wibowo portfolio into a credible Windows XP
Luna-inspired desktop. Familiar operating-system interactions should organize
real professional information, with a direct Quick View for time-limited readers.
Preserve all content destinations and working interactions. The repository,
not imagined live-site capabilities, is the functional baseline.

| Persona | Need | Success story |
| --- | --- | --- |
| Recruiter with 30–60 seconds | Identity, specialization, projects, experience, CV, contact without learning a simulation | Open Quick View, identify full-stack engineering / applied deep learning, open CV in two actions or fewer |
| Engineering manager | Concrete work, technical detail and source links | Navigate an Explorer preview to the existing case study and its specific repository |
| Peer or curious visitor | Enjoy an interactive desktop without losing information | Open several apps, restore a minimized one, recover desktop, discover preserved extras |
| Touch, keyboard or assistive-technology visitor | Equivalent access and predictable focus | Browse full-screen apps or semantic Quick View; no pointer-only requirement |

## Evidence boundary and audit method

Source inspected at application baseline `97718e55330aca669ec4063d64461a45eb149433`.
During audit the human/external actor committed scaffolding; final planning
worktree HEAD is `e48e3e289941ecd43d93683863d3c5702829ae75`. The diff adds only
the six workflow files; application source is unchanged. No commit was made by
Codex. `project-implementation` now also exists at the application baseline.

V = verified source/inspection; H = HTTP retrieval; I = inferred runtime risk;
R = proposed design; U = unverified. Exact paths and sensitive distinctions
appear below. Commands included `rg --files`, import/event searches, source
reads, lock JSON parsing, file sizes/hashes, Git status/history/worktree reads,
`node --version`, `npm --version`. No environment file was opened.

Live URL: https://jonathanaxl.my.id/. Browser attempt: in-app browser unavailable;
browser inventory returned no surfaces. Web retrieval tool failed for this URL.
PowerShell HTTP retrieval succeeded with status 200, 33,003 HTML characters,
one Astro island and title “Jonathan Axl Wibowo | 8-Bit Neo-Retro OS Portfolio”.
H establishes returned markup only. No desktop/mobile screenshots, interaction
results, viewport measurements, accessibility audit or performance score were
obtained. Source findings must not be relabeled browser-verified.

## Current problems

| ID | Evidence and location | Implication / confidence |
| --- | --- | --- |
| E-01 | `src/styles/global.css:45–89` defines Win95 bevels; `RetroTaskbar.tsx:84–94,214` is grey with a vertical menu banner; `RetroBootScreen.tsx` says 98 | V: style conflicts with requested Luna direction; visual severity is not browser-tested |
| E-02 | `RetroWindow.tsx:144–173` uses draggable transforms on relative flow boxes; `DesktopManager.tsx:503` uses a flex column | V: lacks a managed desktop coordinate plane; maximize expands width instead of occupying workspace |
| E-03 | `RetroWindow.tsx:47–138` has no drag bounds, 340px resize minimum, only pointer-up cleanup | V code omission; I: lost title bars, narrow viewport overflow or listeners surviving cancellation/unmount |
| E-04 | `DesktopManager.tsx:147–164` opens five apps on every resize below 768; gallery independently switches at 1024 | V: competing adaptive behaviors; I: user-closed apps reopen and tablet layout diverges |
| E-05 | `DesktopManager.tsx:185–255` shares toggle logic among taskbar/launchers; `PixelHero.tsx` links `#projects`, `#contact` while targets mount conditionally | V: a launcher can minimize active app; closed-app hashes do not create their targets |
| E-06 | `RetroProjectsDossier.tsx:4–99` contains seven hard-coded items; `src/content/projects/` has eight Markdown files | V: desktop and case-study data differ, including `field-service-pro` title and generic versus specific source links |
| E-07 | `RetroWindow.tsx:208,221,234` uses 20px controls and removes outlines; `RetroTerminal.tsx:34–79` labels lack input association | V source accessibility gaps; actual screen-reader/contrast results U |
| E-08 | `RetroCertificateGallery.tsx:185–243` stacks drawer/preview separately, with no focus containment/restoration; only preview has Escape handler | V omissions; I: focus escapes modal or becomes lost |
| E-09 | `Layout.astro:29–36` autoplays persistent video; reduced-motion CSS targets old HUD, not boot/video/windows | V incomplete motion coverage; byte sizes verified, CWV impact unmeasured |
| E-10 | Homepage core windows initially closed; boot defaults 2800ms; `Layout.astro` wrapper starts opacity 0 | V: deliberate content gate and JS reveal dependency; I: weak no-JS access and slow first useful view |
| E-11 | `src/config/site.ts` email differs from rendered contact; hard-coded data/content claims span components | V drift risk; preserve currently rendered contact until owner approves correction |
| E-12 | `RetroWindow.tsx:242–248`, gallery menu and PixelHero Paint tools look interactive but lack corresponding actions | V decorative affordances; no claim of working File/Edit/Help commands |

## Existing feature inventory (system of record)

Dependencies: WM = DesktopManager/RetroWindow, FM = installed framer-motion,
CC = Astro content collections, links = browser navigation. Actions propose
preserving behavior while changing presentation. Regression risk is qualitative.

| Feature | Current location | Existing behavior / dependencies | Limitations | Action / risk / tasks |
| --- | --- | --- | --- | --- |
| Boot and restart | `RetroBootScreen.tsx`, `DesktopManager.tsx:140,667` | Timed intro, click/Enter/Space/Escape skip, gesture-triggered synthesized chime; FM/Web Audio | No stored session flag, reduced-motion branch or closed AudioContext; reboot replays intro, does not reset apps | Redesign / M / T04,T10 |
| Desktop shortcuts | `DesktopManager.tsx:359–460` | Single-click core and extra app buttons, Launch All and Restart | No selection/double-click model; launcher shares taskbar toggle | Refactor / H / T05,T09 |
| Welcome/profile | `PixelHero.tsx`, initial DesktopManager banner | Identity, portrait fallback, specialization, CV/project/contact links | Duplicate identity copy, hash navigation to unmounted targets, decorative Paint tools | Redesign / H / T03,T13 |
| Open/close/minimize | `DesktopManager.tsx:185–290` | One record per nine app IDs; closed taskbar tabs disappear, minimized stay | Visible content unmounts on minimize; focus restore absent | Refactor / H / T06,T07 |
| Maximize/restore/focus | `RetroWindow.tsx:149–173,177–178`, manager | Width change, transform reset; title double-click toggles; pointer raises z | No saved geometry; multiple state setters; active ID can diverge from stack | Refactor / H / T06–T08 |
| Drag/resize/multi-window | `RetroWindow.tsx:47–138`, manager | FM title drag, right/bottom/corner size updates, increasing z | No bounds/recovery/cancel cleanup; all windows remain flow-based | Refactor / H / T07,T08 |
| Start menu | `RetroTaskbar.tsx:63–209` | App buttons, CV, GitHub, launch/minimize/close all, restart; outside mousedown closes | Single column, no Escape/focus navigation contract | Redesign / H / T11 |
| Taskbar, tray, clock | `RetroTaskbar.tsx:212–318` | Open apps only, active/minimized state, overflow scroll; live seconds clock in Asia/Jakarta, decorative sound/status | Quick toggle checks all nine apps, label hidden on small widths; ONLINE is cosmetic | Redesign / H / T12 |
| Recruiter launch-all | `DesktopManager.tsx:303–334`, taskbar | Opens five core windows, scrolls page top | Does not include certificates; active hero differs from last raised window; not a compact content view | Preserve as Open portfolio apps; add Quick View / M / T09,T15 |
| Skills | `RetroSkillsGrid.tsx` | Category filters, selected skill properties; external simpleicons images with fallback | Selection can remain outside filtered category; skill claims not app-runtime proof | Refactor / M / T03,T13 |
| Projects Explorer | `RetroProjectsDossier.tsx` | Seven item buttons, preview, technologies/highlights, case-study/GitHub links | Duplicated content; generic GitHub destinations | Refactor / H / T03,T14 |
| Case studies | `src/pages/projects/[slug].astro`, eight Markdown files | Static slug pages, article body, tags/date, galleries/source links; CC | Old tactical styling, generic gallery alt, no screenshot dimensions in template | Preserve + redesign chrome / H / T14,T19 |
| Experience/education | `RetroTimeline.tsx` | Four records including LKH, IEEE, IMIP, UMN with dates/tags | Component-only data, unverified professional metrics | Refactor / M / T03,T13 |
| Certificates | `RetroCertificateGallery.tsx`, `src/data/certificates.ts` | Six real file-backed entries; desktop dock minimize/close/reopen, mobile modal, preview, 75–250% zoom/reset/raw link | Independent shell state/z-layer; modality gaps; descriptions include Indonesian | Preserve + refactor into managed app / H / T16 |
| Contact draft | `RetroTerminal.tsx` | Required name/email/message, optional subject; encoded mailto draft; clear form | Opens local mail client, not backend delivery; no success acknowledgement from server | Preserve / H / T17 |
| CV and external channels | PixelHero, Taskbar, Terminal, RetroBrowserWindow; `public/cv.pdf` | PDF opens new tab; rendered Gmail, LinkedIn, GitHub; no verified API | “Download” label does not force download; site.ts contact inconsistent | Preserve + accurate labels / H / T13,T17 |
| Persona extra | `RetroEasterEggs.tsx:5–148` | Calling card reveal/close and All-Out Attack toggle | Local-only themed novelty | Preserve in Extras / M / T18 |
| Apex extra | `RetroEasterEggs.tsx:149–256` | Randomized loot text | Flavor text is not verified engineering evidence | Preserve labeled extra / L / T18 |
| Elden extra | `RetroEasterEggs.tsx:257–359` | Cycles soapstone messages | Local state only | Preserve / L / T18 |
| Browser extra | `RetroEasterEggs.tsx:360+` | Mock address/search, known-keyword result strings, refresh/home/back reset, real external links | No general browsing engine, fake result count; Forward not genuinely functional | Refactor as labeled directory/demo; no iframe / M / T18 |
| Responsive layout | Manager, Window, gallery, Tailwind classes | Below 768 auto-opens core; md two-column panels; lg dock; sm task labels | Desktop gestures still enabled on small screens; undefined custom xs utilities | Redesign adaptively / H / T20,T21 |
| Keyboard and errors | Native buttons/links; boot, gallery; `src/pages/404.astro` | Basic native activation, boot skip, preview Escape, icon/photo fallbacks, 404 return link | No shell shortcut/focus model; nested main landmarks | Refactor / H / T07,T19,T23 |
| Background and transitions | `Layout.astro`, `global.css` | Persistent looping video, opacity reveal on Astro swaps, FM app transitions | Old HUD CSS retained; CRT class has no matching source rule | Replace default background treatment; preserve content navigation / M / T04,T19,T22 |
| Current-status CMS record | `src/content/status/current.md`, configs | Stored published/title/tech/status data | No source import into current desktop found; not claimed visible feature | Preserve data, no new widget required / L / T03 |

No functional feature is proposed for removal. Decorative menus/tool icons may
become noninteractive decoration or be omitted with rationale: they have no
implemented action. Game-specific artwork provenance must be reviewed before
redistribution; preserve access pending a human licensing decision.

## Functional requirements and traceability

All requirements below are proposed for human approval. IDs are normative.

| ID | Requirement / user story | Acceptance criterion | Implementation tasks |
| --- | --- | --- | --- |
| FR-01 | Preserve all baseline destinations/content | Eight existing project slugs, six certificates, four experience records, skills, portrait/CV/contact and three game + browser extras remain reachable; parity manifest explains discrepancies | T01,T03,T13,T14,T16–T18,T24 |
| FR-02 | Desktop visitors recognize Luna | Blue glossy frame/taskbar, green Start, two-column identity menu, Explorer content and state variants meet design checklist | T04,T05,T11–T14,T24 |
| FR-03 | Open apps through mouse, touch or keyboard | Desktop single-click selects; double-click/Enter/Open button launches exactly one instance; touch single tap launches; every destination also available in Start/Quick View | T05,T09,T11,T20 |
| FR-04 | Manage a deterministic workspace | Open/focus/minimize/maximize/restore/close follow TRD transitions; closed task removed, minimized task retained; active ID equals top visible app | T06,T07,T12 |
| FR-05 | Move/size and recover apps | Drag/resize desktop only, geometry clamped; menu Move/Resize/Center alternatives work without dragging; viewport/zoom changes leave controls usable | T07,T08,T21 |
| FR-06 | Use Start/taskbar utilities | Escape/outside click dismiss Start with focus return; task click toggles correctly; Show Desktop restores saved visible set; open/minimize/close-all/restart preserved | T09–T12 |
| FR-07 | Recruiters bypass desktop simulation | `/quick-view/` is SSR/direct/refreshable with identity, skills, featured/all projects, history, CV/contact; visible root link; no boot; common data source | T03,T15,T19 |
| FR-08 | Explore truthful project content | Select preview/filter list then follow existing slug; actual Markdown title/excerpt/tags/source URL match Quick View; unavailable fields not fabricated | T03,T14 |
| FR-09 | Inspect certificates accessibly | Select all six, zoom 75–250% in 25% steps/reset, raw file fallback, Escape and focus restore; no stranded dock | T16,T23 |
| FR-10 | Contact and resume work unchanged | Correct encoded mailto draft and clear action, explicit local-client notice and copy/fallback email; `/cv.pdf` remains directly accessible, labeled open/download accurately | T03,T13,T17 |
| FR-11 | Responsive applications | <768 one full-screen app; 768–1023 tablet app view; >=1024 fine-pointer desktop; all core actions available; breakpoint changes preserve state | T20,T21 |
| FR-12 | Optional boot/personality | Identity remains immediately available; intro skippable in <=1 action, normal boot <=800ms, reduced-motion bypass; audio opt-in only; restart replays without changing content | T10,T18,T22 |
| FR-13 | Predictable direct navigation | Existing project routes survive; valid root app hash opens/focuses app; Back/Forward selection works; refresh defaults known geometry, no persisted contact draft | T09,T14,T15,T19 |
| FR-14 | Keyboard-equivalent OS flow | Complete flows without mouse; logical Tab order, app-specific labels, system Move/Resize alternative, scoped Escape and focus return; modal trap only for real modal | T07,T08,T11,T16,T17,T23 |
| FR-15 | Reliable fallback | No-JS root exposes identity and Quick View; Quick View/case studies/CV/email usable without JS; broken images/loading errors show real fallback without layout jump | T15,T19,T22,T23 |
| FR-16 | Honest novelty navigation | Extras accessible on all modes through directory links; demo browser explicitly mock, no remote sites embedded, no new “verified” metrics | T18,T20,T24 |

## Nonfunctional acceptance targets

Targets are release criteria, not measured results. Test protocol is in tasks.

| ID | Target and measurement | Tasks |
| --- | --- | --- |
| NF-01 | WCAG 2.2 AA target: keyboard completion, associated labels/landmarks; text >=4.5:1 (large >=3:1), nontext state/focus >=3:1; controls >=24px with exceptions assessed, design prefers 32px desktop/44px touch; no obscured focus at 200% zoom, 320px reflow | T04,T07,T16,T17,T20,T23 |
| NF-02 | Reduced motion disables nonessential boot/window/loop animations and smooth-scroll; no default audio/video; no state change hidden behind motion | T10,T22,T23 |
| NF-03 | Root/Quick View/project lab targets: LCP <=2.5s, CLS <=0.1; real-user INP <=200ms at p75 when field data exists. Three cold-cache mobile lab runs with pinned tool/throttle/viewport; report median and range. Lab interaction proxy is not field INP | T02,T22,T24 |
| NF-04 | Initial desktop transferred JS <=250KiB gzip, CSS <=50KiB gzip; Quick View first render needs no application JS and total unavoidable route JS <=50KiB gzip; no eager extras/video; image initial viewport budget <=400KiB. Record build/network evidence, adjust only with human rationale | T02,T18,T19,T22 |
| NF-05 | 10-second desktop drag/resize with 3 apps at 1440x900 on recorded test hardware: no attributable task >50ms; target p95 frame <=20ms at 60Hz; root tree not rerendered per pointer movement; 50 open/minimize/restore/close cycles return listener/observer/timer counts to baseline | T06–T08,T22,T24 |
| NF-06 | At 320,375,390,768,1024,1440,1920 widths and relevant heights/orientations: no document horizontal overflow; bounded app scrolling, no title/action loss; browser zoom 200% and 400% reflow where applicable | T20,T21,T23,T24 |
| NF-07 | Root, Quick View and all eight slugs return HTML identity/content/unique titles; canonical/OG descriptions coherent, no invented sameAs/profile facts; root no-JS link visible | T15,T19,T24 |
| NF-08 | No dependency/framework/deployment/CMS migration in base redesign; pure reducer tests and parity checks run; no build/runtime regression; meaningful browser tests or documented blocked evidence | T01,T02,T06,T24,T25 |
| NF-09 | Tokens govern shell, app chrome and article routes; screenshots across active/inactive/hover/pressed/focus/disabled/loading/modal states; professional body copy >=14px, Quick View >=16px | T04,T13,T19,T24 |

Accessibility criteria reference [WCAG 2.2](https://www.w3.org/TR/WCAG22/).
Performance thresholds follow [Web Vitals](https://web.dev/articles/vitals);
numeric budgets/frame targets above are this project's proposed engineering limits.

## Scope and priorities

P0: source parity, shared content, Quick View/no-JS access, bounded window state,
mobile adaptation, keyboard/focus, working routes/CV/contact. P1: coherent Luna
shell, Explorer, certificates, motion/performance. P2: polish and retained extras.
These priorities do not permit dropping approved features to meet a deadline.

Out of scope: OS emulation, executable files/filesystem, accounts/logout service,
real shutdown, browser proxy/iframe engine, new backend contact delivery,
analytics or CMS authentication/storage redesign, framework/Tailwind migration,
WebGL/Three scenes, service worker/offline support, translated content campaign,
copyrighted XP asset extraction, deployments/migrations. No desktop context menu
is required; the title system menu supplies useful equivalent actions.

## Risks and human decisions

| ID | Risk / proposed resolution | Approval impact |
| --- | --- | --- |
| Q-01 | Approve static `/quick-view/` alongside `/` and existing slugs | Required architecture decision before implementation |
| Q-02 | Approve Luna as shell-wide direction superseding historical cinematic/Win95 chrome; preserve article/content facts | Required design/scope decision |
| Q-03 | Confirm rendered email versus older site.ts email; retain rendered address provisionally | Owner confirmation before contact-data edits |
| Q-04 | Claims (97%, 40%, high traffic, career dates) are content, not independently substantiated research | Preserve facts pending owner corrections; do not strengthen claims |
| Q-05 | Approve original wallpaper/icons; determine provenance of retained game artwork and resume | Rights review required for replacement/public release, no assumed XP license |
| Q-06 | Browser baseline and deployment provider/env requirements unknown | T01/T02 evidence before migration; deployment prohibited |
| Q-07 | Browser automation/checker tooling absent in current worktree | Base plan uses existing Node/manual browser; optional dependency add requires explicit separate approval |

Plan completeness does not imply human approval. Acceptance and deviations must
follow root AGENTS.md; all implementation tasks start NOT_STARTED.
