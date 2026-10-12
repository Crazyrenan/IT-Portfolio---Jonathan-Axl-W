/**
 * AXL_OS XP — Window Manager
 * Deterministic singleton lifecycle reducer, geometry calculation, and invariants.
 * Conforms to TRD contract (ADR-05).
 */

export type AppId =
  | 'hero'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'contact'
  | 'certificates'
  | 'browser'
  | 'p5r'
  | 'apex'
  | 'elden';

export type WindowPhase = 'closed' | 'normal' | 'maximized' | 'minimized';

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Bounds {
  width: number;
  height: number;
}

export interface WindowState {
  id: AppId;
  phase: WindowPhase;
  beforeMinimize: 'normal' | 'maximized';
  rect: Rect;
  restoreRect: Rect;
  visited: boolean;
}

export interface AppDefinition {
  id: AppId;
  title: string;
  exeName: string;
  icon: string;
  order: number;
  defaultRect: Rect;
  minSize: { width: number; height: number };
}

export const APP_REGISTRY: Record<AppId, AppDefinition> = {
  hero: {
    id: 'hero',
    title: 'Jonathan Axl — System Profile',
    exeName: 'My Profile',
    icon: '/icons/xp/my-computer.svg',
    order: 1,
    defaultRect: { x: 40, y: 30, width: 760, height: 540 },
    minSize: { width: 360, height: 260 }
  },
  skills: {
    id: 'skills',
    title: 'Skills & Technical Inventory',
    exeName: 'Skills & Tech',
    icon: '/icons/xp/user-profile.svg',
    order: 2,
    defaultRect: { x: 70, y: 50, width: 780, height: 520 },
    minSize: { width: 360, height: 260 }
  },
  projects: {
    id: 'projects',
    title: 'Projects Dossier',
    exeName: 'My Projects',
    icon: '/icons/xp/projects-folder.svg',
    order: 3,
    defaultRect: { x: 100, y: 70, width: 840, height: 580 },
    minSize: { width: 380, height: 280 }
  },
  experience: {
    id: 'experience',
    title: 'Experience & Career Log',
    exeName: 'Work History',
    icon: '/icons/xp/work-history.svg',
    order: 4,
    defaultRect: { x: 130, y: 90, width: 780, height: 540 },
    minSize: { width: 360, height: 260 }
  },
  contact: {
    id: 'contact',
    title: 'Contact Transmission',
    exeName: 'Contact Me',
    icon: '/icons/xp/contact-mail.svg',
    order: 5,
    defaultRect: { x: 160, y: 110, width: 680, height: 480 },
    minSize: { width: 360, height: 260 }
  },
  certificates: {
    id: 'certificates',
    title: 'Verified Credentials & Certificates',
    exeName: 'Certificates',
    icon: '/icons/xp/certificates.svg',
    order: 6,
    defaultRect: { x: 190, y: 80, width: 800, height: 540 },
    minSize: { width: 360, height: 260 }
  },
  browser: {
    id: 'browser',
    title: 'Retro Web Browser',
    exeName: 'Web Browser',
    icon: '/icons/xp/web-browser.svg',
    order: 7,
    defaultRect: { x: 120, y: 60, width: 780, height: 520 },
    minSize: { width: 360, height: 260 }
  },
  p5r: {
    id: 'p5r',
    title: 'Persona 5 Royal',
    exeName: 'Persona 5 Royal',
    icon: '/icons/retro/persona5.png',
    order: 8,
    defaultRect: { x: 150, y: 90, width: 720, height: 480 },
    minSize: { width: 360, height: 260 }
  },
  apex: {
    id: 'apex',
    title: 'Apex Legends',
    exeName: 'Apex Legends',
    icon: '/icons/retro/apex.png',
    order: 9,
    defaultRect: { x: 180, y: 110, width: 720, height: 480 },
    minSize: { width: 360, height: 260 }
  },
  elden: {
    id: 'elden',
    title: 'Elden Ring',
    exeName: 'Elden Ring',
    icon: '/icons/retro/eldenring.png',
    order: 10,
    defaultRect: { x: 210, y: 130, width: 720, height: 480 },
    minSize: { width: 360, height: 260 }
  }
};

export const CORE_APP_IDS: AppId[] = [
  'skills',
  'projects',
  'experience',
  'contact',
  'certificates',
  'hero' // Raised last to front
];

export const ALL_APP_IDS: AppId[] = Object.keys(APP_REGISTRY) as AppId[];

/**
 * Validates that an arbitrary value is an own registered AppId.
 * Guarantees prototype properties (e.g. constructor, toString) are rejected (R04).
 */
export function isValidAppId(id: unknown): id is AppId {
  return typeof id === 'string' && Object.prototype.hasOwnProperty.call(APP_REGISTRY, id);
}

export interface WorkspaceState {
  windows: Record<AppId, WindowState>;
  stack: AppId[];
  activeId: AppId | null;
  selectedIcon: AppId | null;
  shownDesktopSnapshot: AppId[] | null;
  bounds: Bounds;
}

export type WindowAction =
  | { type: 'OPEN'; id: AppId }
  | { type: 'FOCUS'; id: AppId }
  | { type: 'TASK_ACTIVATE'; id: AppId }
  | { type: 'MINIMIZE'; id: AppId }
  | { type: 'MAXIMIZE'; id: AppId }
  | { type: 'RESTORE'; id: AppId }
  | { type: 'CLOSE'; id: AppId }
  | { type: 'COMMIT_RECT'; id: AppId; rect: Rect }
  | { type: 'BOUNDS_CHANGED'; bounds: Bounds }
  | { type: 'SHOW_DESKTOP' }
  | { type: 'OPEN_CORE' }
  | { type: 'MINIMIZE_ALL' }
  | { type: 'CLOSE_ALL' }
  | { type: 'SELECT_ICON'; id: AppId | null }
  | { type: 'CENTER_WINDOW'; id: AppId }
  | { type: 'FIT_WINDOW'; id: AppId }
  | { type: 'MOVE_WINDOW'; id: AppId; dx: number; dy: number }
  | { type: 'RESIZE_WINDOW'; id: AppId; dw: number; dh: number };

/**
 * Bounds clamping ensuring windows remain completely accessible inside the usable workspace plane.
 * Never exceeds actual usable dimensions even on small/narrow viewports (R05).
 */
export function clampRect(
  rect: Rect,
  bounds: Bounds,
  minSize: { width: number; height: number }
): Rect {
  const actualBoundsW = Math.max(1, bounds.width);
  const actualBoundsH = Math.max(1, bounds.height);

  const minW = Math.min(minSize.width, actualBoundsW);
  const minH = Math.min(minSize.height, actualBoundsH);

  const width = Math.max(minW, Math.min(actualBoundsW, rect.width));
  const height = Math.max(minH, Math.min(actualBoundsH, rect.height));

  const maxX = Math.max(0, actualBoundsW - width);
  const maxY = Math.max(0, actualBoundsH - height);

  const x = Math.max(0, Math.min(maxX, rect.x));
  const y = Math.max(0, Math.min(maxY, rect.y));

  return { x, y, width, height };
}

export function centerRect(rect: Rect, bounds: Bounds): Rect {
  const x = Math.max(0, Math.round((bounds.width - rect.width) / 2));
  const y = Math.max(0, Math.round((bounds.height - rect.height) / 2));
  return { ...rect, x, y };
}

export function fitRect(bounds: Bounds, minSize: { width: number; height: number }): Rect {
  const width = Math.max(minSize.width, Math.round(bounds.width * 0.9));
  const height = Math.max(minSize.height, Math.round(bounds.height * 0.88));
  const x = Math.max(0, Math.round((bounds.width - width) / 2));
  const y = Math.max(0, Math.round((bounds.height - height) / 2));
  return { x, y, width, height };
}

/**
 * Enforces visible stack invariants across all transitions (R03):
 * 1. Every visible window (normal or maximized) is in stack exactly once.
 * 2. Minimized and closed windows are never in stack.
 * 3. activeId is the top of the stack (or null if stack is empty).
 */
export function ensureStackInvariants(
  stack: AppId[],
  windows: Record<AppId, WindowState>,
  preferredActiveId?: AppId | null
): { stack: AppId[]; activeId: AppId | null } {
  const visibleIds = ALL_APP_IDS.filter(
    (id) => windows[id]?.phase === 'normal' || windows[id]?.phase === 'maximized'
  );
  const visibleSet = new Set(visibleIds);

  // Preserve existing relative order for visible windows
  const nextStack = stack.filter((id) => visibleSet.has(id));

  // Append any visible windows not yet in stack
  for (const id of visibleIds) {
    if (!nextStack.includes(id)) {
      nextStack.unshift(id);
    }
  }

  // Raise preferredActiveId to top if specified and visible
  const targetActive =
    preferredActiveId !== undefined
      ? preferredActiveId
      : nextStack.length > 0
        ? nextStack[nextStack.length - 1]
        : null;

  if (targetActive && visibleSet.has(targetActive)) {
    const withoutActive = nextStack.filter((id) => id !== targetActive);
    withoutActive.push(targetActive);
    return { stack: withoutActive, activeId: targetActive };
  }

  const resolvedActive = nextStack.length > 0 ? nextStack[nextStack.length - 1] : null;
  return { stack: nextStack, activeId: resolvedActive };
}

export interface LaunchIntent {
  appId: AppId | null;
  projectSlug?: string | null;
}

export function parseHashIntent(hash: string): LaunchIntent {
  if (!hash || hash === '#') return { appId: null };
  const clean = hash.startsWith('#') ? hash.slice(1) : hash;

  // Direct ID check like #projects, #skills, #contact
  if (clean && isValidAppId(clean)) {
    return { appId: clean };
  }

  // URLSearchParams formatted check like app=projects&project=field-service-pro
  try {
    const params = new URLSearchParams(clean);
    const app = params.get('app');
    const project = params.get('project');
    if (app && isValidAppId(app)) {
      return { appId: app, projectSlug: project || null };
    }
  } catch {
    // safe fallback
  }

  return { appId: null };
}

/**
 * Creates the initial workspace state.
 * Opens only 'hero' (Welcome Center) unless specified otherwise.
 */
export function createInitialWorkspaceState(
  bounds: Bounds = { width: 1200, height: 750 },
  initialOpenApp?: AppId
): WorkspaceState {
  const windows = {} as Record<AppId, WindowState>;

  for (const id of ALL_APP_IDS) {
    const def = APP_REGISTRY[id];
    const clampedRect = clampRect(def.defaultRect, bounds, def.minSize);
    windows[id] = {
      id,
      phase: 'closed',
      beforeMinimize: 'normal',
      rect: clampedRect,
      restoreRect: clampedRect,
      visited: false
    };
  }

  const openTarget = initialOpenApp && isValidAppId(initialOpenApp) ? initialOpenApp : 'hero';
  windows[openTarget] = {
    ...windows[openTarget],
    phase: 'normal',
    visited: true
  };

  return {
    windows,
    stack: [openTarget],
    activeId: openTarget,
    selectedIcon: null,
    shownDesktopSnapshot: null,
    bounds
  };
}

/**
 * Pure window manager reducer. No DOM, timers, or side-effects.
 */
export function windowReducer(state: WorkspaceState, action: WindowAction): WorkspaceState {
  // Reject any action targeting an invalid/inherited AppId (R04)
  if ('id' in action && !isValidAppId(action.id)) {
    return state;
  }

  switch (action.type) {
    case 'OPEN': {
      const def = APP_REGISTRY[action.id];
      const win = state.windows[action.id];
      if (!win) return state;

      let nextPhase: WindowPhase = 'normal';
      let nextRect = win.rect;

      if (win.phase === 'closed') {
        nextPhase = 'normal';
        nextRect = clampRect(win.restoreRect, state.bounds, def.minSize);
      } else if (win.phase === 'minimized') {
        nextPhase = win.beforeMinimize;
        nextRect =
          nextPhase === 'maximized'
            ? { x: 0, y: 0, width: state.bounds.width, height: state.bounds.height }
            : clampRect(win.restoreRect, state.bounds, def.minSize);
      } else {
        // already normal or maximized
        nextPhase = win.phase;
      }

      const nextWindows = {
        ...state.windows,
        [action.id]: {
          ...win,
          phase: nextPhase,
          rect: nextRect,
          visited: true
        }
      };

      const { stack, activeId } = ensureStackInvariants(state.stack, nextWindows, action.id);
      const nextSnapshot = state.shownDesktopSnapshot
        ? state.shownDesktopSnapshot.filter((id) => id !== action.id)
        : null;

      return {
        ...state,
        shownDesktopSnapshot: nextSnapshot,
        stack,
        activeId,
        windows: nextWindows
      };
    }

    case 'FOCUS': {
      const win = state.windows[action.id];
      if (!win || win.phase === 'closed' || win.phase === 'minimized') return state;
      if (state.activeId === action.id) return state;

      const { stack, activeId } = ensureStackInvariants(state.stack, state.windows, action.id);

      return {
        ...state,
        stack,
        activeId
      };
    }

    case 'TASK_ACTIVATE': {
      const win = state.windows[action.id];
      if (!win || win.phase === 'closed') return state;

      if (win.phase === 'minimized') {
        // Restore and raise
        const nextPhase = win.beforeMinimize;
        const nextRect =
          nextPhase === 'maximized'
            ? { x: 0, y: 0, width: state.bounds.width, height: state.bounds.height }
            : clampRect(win.restoreRect, state.bounds, APP_REGISTRY[action.id].minSize);

        const nextWindows = {
          ...state.windows,
          [action.id]: {
            ...win,
            phase: nextPhase,
            rect: nextRect
          }
        };

        const { stack, activeId } = ensureStackInvariants(state.stack, nextWindows, action.id);
        const nextSnapshot = state.shownDesktopSnapshot
          ? state.shownDesktopSnapshot.filter((id) => id !== action.id)
          : null;

        return {
          ...state,
          shownDesktopSnapshot: nextSnapshot,
          stack,
          activeId,
          windows: nextWindows
        };
      }

      // If visible and active: minimize
      if (state.activeId === action.id) {
        const nextWindows = {
          ...state.windows,
          [action.id]: {
            ...win,
            phase: 'minimized' as WindowPhase,
            beforeMinimize: win.phase === 'maximized' ? ('maximized' as const) : ('normal' as const)
          }
        };

        const { stack, activeId } = ensureStackInvariants(state.stack, nextWindows);

        return {
          ...state,
          stack,
          activeId,
          windows: nextWindows
        };
      }

      // If visible but inactive: raise to front
      const { stack, activeId } = ensureStackInvariants(state.stack, state.windows, action.id);

      return {
        ...state,
        stack,
        activeId
      };
    }

    case 'MINIMIZE': {
      const win = state.windows[action.id];
      if (!win || win.phase === 'closed' || win.phase === 'minimized') return state;

      const nextWindows = {
        ...state.windows,
        [action.id]: {
          ...win,
          phase: 'minimized' as WindowPhase,
          beforeMinimize: win.phase === 'maximized' ? ('maximized' as const) : ('normal' as const)
        }
      };

      const { stack, activeId } = ensureStackInvariants(state.stack, nextWindows);

      return {
        ...state,
        stack,
        activeId,
        windows: nextWindows
      };
    }

    case 'MAXIMIZE': {
      const win = state.windows[action.id];
      if (!win || win.phase === 'closed' || win.phase === 'minimized') return state;
      if (win.phase === 'maximized') return state;

      const nextWindows = {
        ...state.windows,
        [action.id]: {
          ...win,
          phase: 'maximized' as WindowPhase,
          restoreRect: win.rect,
          rect: { x: 0, y: 0, width: state.bounds.width, height: state.bounds.height }
        }
      };

      const { stack, activeId } = ensureStackInvariants(state.stack, nextWindows, action.id);

      return {
        ...state,
        stack,
        activeId,
        windows: nextWindows
      };
    }

    case 'RESTORE': {
      const win = state.windows[action.id];
      if (!win || win.phase === 'closed') return state;

      const def = APP_REGISTRY[action.id];

      if (win.phase === 'maximized') {
        const nextRect = clampRect(win.restoreRect, state.bounds, def.minSize);
        const nextWindows = {
          ...state.windows,
          [action.id]: {
            ...win,
            phase: 'normal' as WindowPhase,
            rect: nextRect
          }
        };

        const { stack, activeId } = ensureStackInvariants(state.stack, nextWindows, action.id);

        return {
          ...state,
          stack,
          activeId,
          windows: nextWindows
        };
      }

      if (win.phase === 'minimized') {
        const nextPhase = win.beforeMinimize;
        const nextRect =
          nextPhase === 'maximized'
            ? { x: 0, y: 0, width: state.bounds.width, height: state.bounds.height }
            : clampRect(win.restoreRect, state.bounds, def.minSize);

        const nextWindows = {
          ...state.windows,
          [action.id]: {
            ...win,
            phase: nextPhase,
            rect: nextRect
          }
        };

        const { stack, activeId } = ensureStackInvariants(state.stack, nextWindows, action.id);

        return {
          ...state,
          stack,
          activeId,
          windows: nextWindows
        };
      }

      return state;
    }

    case 'CLOSE': {
      const win = state.windows[action.id];
      if (!win || win.phase === 'closed') return state;

      const nextWindows = {
        ...state.windows,
        [action.id]: {
          ...win,
          phase: 'closed' as WindowPhase,
          visited: false
        }
      };

      const { stack, activeId } = ensureStackInvariants(state.stack, nextWindows);

      // Stale snapshot must never resurrect a closed app
      const nextSnapshot = state.shownDesktopSnapshot
        ? state.shownDesktopSnapshot.filter((id) => id !== action.id)
        : null;

      return {
        ...state,
        shownDesktopSnapshot: nextSnapshot,
        stack,
        activeId,
        windows: nextWindows
      };
    }

    case 'COMMIT_RECT': {
      const win = state.windows[action.id];
      if (!win || win.phase !== 'normal') return state;

      const clamped = clampRect(action.rect, state.bounds, APP_REGISTRY[action.id].minSize);

      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: {
            ...win,
            rect: clamped,
            restoreRect: clamped
          }
        }
      };
    }

    case 'CENTER_WINDOW': {
      const win = state.windows[action.id];
      if (!win || win.phase !== 'normal') return state;
      const centered = centerRect(win.rect, state.bounds);
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: { ...win, rect: centered, restoreRect: centered }
        }
      };
    }

    case 'FIT_WINDOW': {
      const win = state.windows[action.id];
      if (!win || win.phase !== 'normal') return state;
      const fitted = fitRect(state.bounds, APP_REGISTRY[action.id].minSize);
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: { ...win, rect: fitted, restoreRect: fitted }
        }
      };
    }

    case 'MOVE_WINDOW': {
      const win = state.windows[action.id];
      if (!win || win.phase !== 'normal') return state;
      const moved = clampRect(
        { ...win.rect, x: win.rect.x + action.dx, y: win.rect.y + action.dy },
        state.bounds,
        APP_REGISTRY[action.id].minSize
      );
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: { ...win, rect: moved, restoreRect: moved }
        }
      };
    }

    case 'RESIZE_WINDOW': {
      const win = state.windows[action.id];
      if (!win || win.phase !== 'normal') return state;
      const resized = clampRect(
        { ...win.rect, width: win.rect.width + action.dw, height: win.rect.height + action.dh },
        state.bounds,
        APP_REGISTRY[action.id].minSize
      );
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: { ...win, rect: resized, restoreRect: resized }
        }
      };
    }

    case 'BOUNDS_CHANGED': {
      const nextWindows = { ...state.windows };
      for (const id of ALL_APP_IDS) {
        const win = nextWindows[id];
        const def = APP_REGISTRY[id];
        if (win.phase === 'maximized') {
          nextWindows[id] = {
            ...win,
            rect: { x: 0, y: 0, width: action.bounds.width, height: action.bounds.height },
            restoreRect: clampRect(win.restoreRect, action.bounds, def.minSize)
          };
        } else {
          nextWindows[id] = {
            ...win,
            rect: clampRect(win.rect, action.bounds, def.minSize),
            restoreRect: clampRect(win.restoreRect, action.bounds, def.minSize)
          };
        }
      }

      return {
        ...state,
        bounds: action.bounds,
        windows: nextWindows
      };
    }

    case 'SHOW_DESKTOP': {
      // If any window is currently visible: minimize all and take snapshot (R03)
      if (state.stack.length > 0) {
        const visibleIds = [...state.stack];
        const nextWindows = { ...state.windows };

        for (const id of visibleIds) {
          const win = nextWindows[id];
          nextWindows[id] = {
            ...win,
            phase: 'minimized',
            beforeMinimize: win.phase === 'maximized' ? 'maximized' : 'normal'
          };
        }

        return {
          ...state,
          stack: [],
          activeId: null,
          shownDesktopSnapshot: visibleIds,
          windows: nextWindows
        };
      }

      // If desktop is currently completely clear and snapshot exists: restore surviving apps
      if (state.shownDesktopSnapshot && state.shownDesktopSnapshot.length > 0) {
        const surviving = state.shownDesktopSnapshot.filter((id) => {
          const win = state.windows[id];
          return win && win.phase !== 'closed';
        });

        const nextWindows = { ...state.windows };
        for (const id of surviving) {
          const win = nextWindows[id];
          const nextPhase = win.beforeMinimize;
          nextWindows[id] = {
            ...win,
            phase: nextPhase,
            rect:
              nextPhase === 'maximized'
                ? { x: 0, y: 0, width: state.bounds.width, height: state.bounds.height }
                : clampRect(win.restoreRect, state.bounds, APP_REGISTRY[id].minSize)
          };
        }

        const { stack, activeId } = ensureStackInvariants(surviving, nextWindows, surviving[surviving.length - 1]);

        return {
          ...state,
          stack,
          activeId,
          shownDesktopSnapshot: null,
          windows: nextWindows
        };
      }

      return state;
    }

    case 'OPEN_CORE': {
      const nextWindows = { ...state.windows };

      for (const id of CORE_APP_IDS) {
        const win = nextWindows[id];
        const def = APP_REGISTRY[id];
        nextWindows[id] = {
          ...win,
          phase: 'normal',
          visited: true,
          rect: clampRect(win.restoreRect, state.bounds, def.minSize)
        };
      }

      // Existing visible extras must NOT be dropped from stack (R03)
      const existingVisibleExtras = state.stack.filter(
        (id) => !CORE_APP_IDS.includes(id) && nextWindows[id]?.phase !== 'closed' && nextWindows[id]?.phase !== 'minimized'
      );

      const baseStack = [
        ...existingVisibleExtras,
        ...CORE_APP_IDS.filter((id) => id !== 'hero'),
        'hero'
      ];

      const { stack, activeId } = ensureStackInvariants(baseStack, nextWindows, 'hero');

      return {
        ...state,
        shownDesktopSnapshot: null,
        stack,
        activeId,
        windows: nextWindows
      };
    }

    case 'MINIMIZE_ALL': {
      const nextWindows = { ...state.windows };
      for (const id of ALL_APP_IDS) {
        const win = nextWindows[id];
        if (win.phase === 'normal' || win.phase === 'maximized') {
          nextWindows[id] = {
            ...win,
            phase: 'minimized',
            beforeMinimize: win.phase === 'maximized' ? 'maximized' : 'normal'
          };
        }
      }

      return {
        ...state,
        shownDesktopSnapshot: null,
        stack: [],
        activeId: null,
        windows: nextWindows
      };
    }

    case 'CLOSE_ALL': {
      const nextWindows = { ...state.windows };
      for (const id of ALL_APP_IDS) {
        const win = nextWindows[id];
        nextWindows[id] = {
          ...win,
          phase: 'closed',
          visited: false
        };
      }

      return {
        ...state,
        shownDesktopSnapshot: null,
        stack: [],
        activeId: null,
        windows: nextWindows
      };
    }

    case 'SELECT_ICON': {
      return {
        ...state,
        selectedIcon: action.id
      };
    }

    default:
      return state;
  }
}

/**
 * Derives deterministic z-index for an application window.
 * Layer band for apps is 100..199 based on position in stack.
 */
export function getAppZIndex(state: WorkspaceState, id: AppId): number {
  const index = state.stack.indexOf(id);
  if (index === -1) return 10; // background/inert
  return 100 + index;
}
