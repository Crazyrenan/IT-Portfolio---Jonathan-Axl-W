# AXL_OS XP — Design brief and visual contract

Draft 1, 2026-10-12; proposed design, human approval PENDING. This file is the
canonical redesign design/token document. Runtime adapters must refer here;
never invent a conflicting root design system. Source audit is in
[PRD](01-PRD.md); implementation tasks T04/T05/T13–T24 in
[plan](05-IMPLEMENTATION-PLAN.md).

## Philosophy and references

Treat the portfolio as a coherent desktop that organizes useful professional
information. Luna cues belong to shared chrome: blue title bars/taskbar, green
Start, warm off-white surfaces, subtly rounded frame tops, Explorer navigation,
clear active/inactive states. Body text stays readable and recruiter actions
stay explicit. Personality lives inside Extras; shell controls always match.

Microsoft's [Visual Styles Overview](https://learn.microsoft.com/en-us/windows/win32/controls/visual-styles-overview)
explains a visual style as a control appearance specification. Its illustrated
examples are newer Windows versions, not a verified XP screenshot moodboard.
XP Luna primitives below follow the user's brief and are interpretive design
recommendations; no historical asset or dimension is asserted as freely usable.

Moodboard descriptions to use during approved visual exploration:

1. Calm original landscape/abstract rolling hills with sky blue, open space and
   low detail where icon labels sit; evoke desktop ease without copying Bliss.
2. Glossy cobalt title bar with light upper edge, deep lower edge, rounded top
   corners and compact grouped controls; inactive chrome desaturated but readable.
3. Blue taskbar with green Start button, beveled task buttons, pale blue tray;
   white text only over validated darker surfaces.
4. Two-column Start panel: identity header, white app list, pale blue destination
   list, simple footer utilities. No modern floating glass dashboard treatment.
5. Explorer: command toolbar, location/breadcrumb, pale task pane, white file list
   and preview, understated selected row and useful content/status text.

No image generation or reference screenshot capture occurred during planning.
Original/licensed wallpaper and icons need a provenance record before use.

## Visual audit (source verified, browser unverified)

`src/styles/global.css:45–89` defines grey Win95 bevels; titlebar is a horizontal
navy/bright-cyan gradient. `RetroTaskbar.tsx:84–94` has a vertical 98 banner and
single menu column. `PixelHero.tsx` uses nonfunctional Paint tools and pixelates a
portrait. `Layout.astro` applies looping pixel video to all routes; article/404
templates use tactical red/navy styles. Fonts mix Tahoma, Space Grotesk, mono and
Segoe UI. Many 8.5–12px labels and 20px frame controls are source facts, not a
measured contrast or viewport failure. Desktop/mobile screenshots remain required.

## Tokens (proposed CSS custom properties)

Names use `--xp-*`, scoped by `[data-theme="xp"]` or a route/shell class so
unmigrated routes retain existing tokens temporarily. Hex tokens are specified
base surfaces; overlays/gradients must be tested at their lightest text-bearing
point. Do not claim contrast merely because endpoints appear acceptable.

| Token | Value | Use |
| --- | --- | --- |
| --xp-blue-900 | #123A7A | Deep edge, active text surface |
| --xp-blue-700 | #1854B4 | Taskbar/title main dark surface |
| --xp-blue-600 | #2466CF | Highlight strip; white text only after verification |
| --xp-blue-300 | #91B8ED | Inactive accent/Explorer task pane borders |
| --xp-blue-100 | #DCEBFA | Destination pane/hover background |
| --xp-start-900 | #19551F | Green dark edge |
| --xp-start-700 | #287D2D | Green Start base |
| --xp-start-400 | #78B66A | Gloss; keep text on darker lower base |
| --xp-surface | #ECE9D8 | Warm application chrome |
| --xp-surface-raised | #F8F6ED | Controls/panels |
| --xp-content | #FFFFFF | Reading/list body |
| --xp-text | #1B2533 | Primary text |
| --xp-text-muted | #46566B | Secondary text |
| --xp-border | #7890B1 | Decorative chrome outline; stronger control border when needed |
| --xp-control-border | #486587 | Input/interactive boundary |
| --xp-selected | #164DA6 | Selected item fill, white label |
| --xp-selected-text | #FFFFFF | Selected text |
| --xp-focus | #173F8A | 2px ring + white 1px offset separation |
| --xp-danger | #A52720 | Close/error base |
| --xp-danger-light | #DB786D | Close decorative highlight only |
| --xp-success | #25652C | Real success text; no fake online health |
| --xp-inactive | #496D9F | Inactive title text surface |

Gradients are derived: title/taskbar top blue-600 -> blue-700 -> blue-900;
small light edge inset, not a bright text-bearing stripe. Inactive title uses
inactive -> blue-900 with a reduced glossy highlight; do not lower whole-window
opacity because reading content still needs contrast. Start 400 edge -> 700
main -> 900 lower border. Close danger-light edge -> danger main; all glyphs
must pass contrast against the actual rendered surface.

| Token family | Values / rules |
| --- | --- |
| Font UI | Tahoma, "Segoe UI", Arial, sans-serif using system fonts; do not bundle proprietary Tahoma |
| Font reading | "Segoe UI", Arial, sans-serif; use current locally installed family only if route needs it, avoid extra downloads |
| Font code | Existing JetBrains Mono, then monospace; limited technical snippets, not entire experience/contact prose |
| Type | meta 12px; compact UI/body 14px; reading 16px; section 20/24px; profile 28–36px responsive; body line-height 1.5–1.6 |
| Space | 2,4,8,12,16,24,32,48px; align all chrome/content rather than ad hoc quarter-pixel utility values |
| Radius | control 3px; pane 4px; frame top 8px/bottom 3px; menu 8px; no pill cards except functional badge |
| Shadows | inset raised 0 1px 0 white/65%; inactive 0 3px 10px black/15%; active 0 10px 28px black/25%; modal 0 16px 44px black/30% |
| Chrome dimensions | taskbar 48px + safe area; titlebar >=36px; desktop control hitbox 32x32px, touch 44x44px; icon cell 88x88px, artwork 40–48px |
| Motion | instant feedback 80ms; menu 120ms; open/close 160ms; minimize/restore 140ms; no transition for pointer-driven drag/resize |
| Easing | enter cubic-bezier(0.16,1,0.3,1); exit cubic-bezier(0.4,0,1,1); neutral cubic-bezier(0.2,0,0,1) |

Treat color/spacing as named CSS vars with Tailwind v3 aliases where useful; do
not introduce v4 `@theme` or a component library. Resolve tokens in article prose
and basic form controls as well as shell. Default cursor stays native arrow/text/
pointer; original cursor artwork optional only if equally clear at all scales.

## Desktop and window anatomy

Desktop background is static and original, with color fallback and no network
third-party request. Icons on left in stable grid; utility/extras secondary.
Selection has translucent blue rectangle, dashed/focus indicator and high-contrast
label. Label background/outline ensures readability over wallpaper; not yellow
retro telemetry. Single/double-click behavior in flows; explicit Open available.
Quick View is always visible, not hidden behind game windows or boot.

Frame layers: 1px deep-blue outer border, thin inner glossy edge, top titlebar,
application toolbar if useful, bounded scrollable body, optional status/footer.
Title contains decorative icon with empty alt, unique name, grouped controls.
Body has 16px reading padding (8–12px dense Explorer cells), user-select text.
Active/inactive vary chrome only. Max mode occupies usable workspace above taskbar;
normal has movable rect; minimized has no visible frame. System menu is functional.
Resize handle has clear hover/focus cue and menu alternatives. Do not show fake
File/Edit/Help controls without implementation; decorative labels have no hover
pointer affordance. Preserve actual actions using real buttons.

## Taskbar and Start

Taskbar: green Start at left, Show Desktop and Quick View links, task strip, tray.
Dark active inset task, lighter inactive, visibly distinct minimized state plus
accessible description. Tab text truncates visually only, accessible full title
retained. Scroll buttons/overflow keep every task accessible. Tray clock displays
HH:mm WIB with full date/time in accessible label/title; minute updates inside
isolated clock. Sound toggle only if audio actually supported; no cosmetic ONLINE
indicator asserting network/backend status. Mobile simplifies rather than shrinking.

Start: user header/photo fallback, two-column lists with native controls, footer.
Desktop width 400–440px bounded to viewport; tablet/mobile navigation may use
single-column full-screen sheet. Dark header/white left/pale-blue right; highlight
state for focused/hovered row. Utility wording “Replay intro”, “Close all apps”
is truthful. Avoid pretending to turn off visitor's computer or log out an account.

## Explorer and application bodies

Projects toolbar offers working category/reset controls and simple view toggle
(list/details only if it helps; base implementation list+preview). Breadcrumb is
“My Projects”; project selection path optional; no fake folder hierarchy without
real data. Sidebar groups actual categories derived from normalized summaries;
list includes title/tech/date where present, preview contains excerpt/cover/source/
case-study. At narrow content width stack list and preview, no iframe remote site.

My Computer groups skill capabilities with selected properties, not fake disk
capacities. Welcome is profile/photo/professional summary and three clear actions.
Work History is chronological readable cards/list using shared records. Contact
uses labels, calm instructions and visible email. Certificates use thumb grid/list
and true accessible viewer; image fits first, zoom/raw controls always usable.
Resume remains a real PDF link. Extras bodies may retain their game palette but
titlebar/taskbar/menu remain Luna; explicitly intentional personality boundary.

Quick View uses the same colors, large reading text, restrained blue headings,
plain semantic sections and minimal decorative chrome. It is a professional
page in the same identity, not another simulated desktop.

## Responsive, states and motion

Breakpoints from TRD: mobile <768, tablet 768–1023, desktop >=1024 fine pointer.
Layout also responds to app body width; a narrow desktop window must stack its
own panels independent of viewport Tailwind md classes. Use native CSS container
queries where supported with a flex-wrap fallback, not a framework upgrade.
App-view uses 100dvh/safe-area with sticky header/nav and internal body scrolling;
keyboard/screen zoom still usable, viewport resize never auto-opens apps.

| Component | Required states |
| --- | --- |
| Icon | normal, hover, selected, keyboard focus, launching/error |
| Button/control | default, hover, pressed, focus-visible, disabled (semantic), loading where actual |
| Frame/task | normal active, normal inactive, maximized, minimized task, closed absence |
| Menu | closed/open, focused item, outside/Escape dismissal; reachable with Tab |
| Explorer | selected/filtered/empty/missing-image/data fallback |
| Input | empty, filled, focused, required-invalid, type-invalid; error text associated |
| Certificate modal | opening/static, selected, zoom limits disabled, raw fallback, close/focus return |
| Shell | desktop/app-view/no-JS fallback/loading-module-error/reduced-motion/forced-colors |

Use CSS for hover/pressed/menu fade; FM existing package for app entrance and
bounded dragging. Open opacity + at most 4px translation, no dramatic scale or
brightness flash. Minimize may fade to taskbar cue; no long cross-screen travel.
Interrupted transition takes latest state without replay queue. Under reduced
motion all decorative transforms/loops and smooth scrolling disabled; immediate
visibility/state update. Pointer gesture stays directly coupled, never smoothed
with spring lag. Static wallpaper is default; opt-in chime only, AudioContext closed.

## Accessibility and visual fidelity acceptance

Test real rendered contrast, forced colors, text selection, focus ring, 200%
zoom and 320px reflow. Native labels/links, semantic headings, appropriate modal
behavior and nondrag equivalents are required. Use [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
as the accessibility target; dimensions here intentionally exceed historical XP
controls. Large hit targets can include invisible padding without misaligned glyphs.

Visual acceptance evidence: approved baseline and redesign screenshots at
1440x900 and 1920x1080 desktop, 1024x768 boundary, 768x1024 tablet, 375x667 and
390x844 mobile; capture Welcome, Projects, Start, multi-window inactive state,
certificate modal, Contact, Quick View, project article, 404, keyboard focus,
reduced-motion/forced-colors. Browser/OS/tool version documented.

- Recognizable blue glossy Luna chrome, green Start, warm content surfaces and
  two-column menu used consistently, not grey Win95 bevels or tactical overlays.
- No legacy red/orange HUD treatment in normal shell/article chrome after migration.
- All active/inactive/pressed/focus states distinguishable without color alone;
  inactive body never faded to low-contrast text.
- Every visible control has a function or clearly disabled/decorative status.
- Text not clipped/truncated where needed to understand identity/project/action;
  title ellipsis has full accessible name. No marketing copy reduced to 8px.
- Assets original/appropriately licensed with source/author/license/attribution;
  no Windows logo/Bliss/XP sound ripped from OS as default asset.

Anti-patterns: mixing Win95 grey bevels with XP curves, neon racing HUD, glass
cards, simulated system alerts, fake metric badges, unnecessary app wrappers,
fixed 640px mobile windows, autoplay/video wallpaper/audio, decorative clickable
menu labels, custom cursor on text inputs, inaccessible close controls, forced
double-tap, boot gating Quick View, screenshot PASS claims without captures.
