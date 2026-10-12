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
 */
export function clampRect(
  rect: Rect,
  bounds: Bounds,
  minSize: { width: number; height: number }
): Rect {
  const safeBoundsWidth = Math.max(320, bounds.width);
  const safeBoundsHeight = Math.max(240, bounds.height);

  const minW = Math.min(minSize.width, safeBoundsWidth);
  const minH = Math.min(minSize.height, safeBoundsHeight);

  const width = Math.max(minW, Math.min(safeBoundsWidth, rect.width));
  const height = Math.max(minH, Math.min(safeBoundsHeight, rect.height));

  const maxX = Math.max(0, safeBoundsWidth - width);
  const maxY = Math.max(0, safeBoundsHeight - height);

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

export interface LaunchIntent {
  appId: AppId | null;
  projectSlug?: string | null;
}

export function parseHashIntent(hash: string): LaunchIntent {
  if (!hash || hash === '#') return { appId: null };
  const clean = hash.startsWith('#') ? hash.slice(1) : hash;

  // Direct ID check like #projects, #skills, #contact
  if (clean in APP_REGISTRY) {
    return { appId: clean as AppId };
  }

  // URLSearchParams formatted check like app=projects&project=field-service-pro
  try {
    const params = new URLSearchParams(clean);
    const app = params.get('app');
    const project = params.get('project');
    if (app && app in APP_REGISTRY) {
      return { appId: app as AppId, projectSlug: project || null };
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

  const openTarget = initialOpenApp && APP_REGISTRY[initialOpenApp] ? initialOpenApp : 'hero';
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
  switch (action.type) {
    case 'OPEN': {
      const def = APP_REGISTRY[action.id];
      if (!def) return state; // Unknown ID no-op

      const win = state.windows[action.id];
      if (!win) return state;

      // New user action clears any lingering show-desktop snapshot
      const shownDesktopSnapshot = null;

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

      // Raise to top of stack
      const nextStack = state.stack.filter((id) => id !== action.id);
      nextStack.push(action.id);

      return {
        ...state,
        shownDesktopSnapshot,
        stack: nextStack,
        activeId: action.id,
        windows: {
          ...state.windows,
          [action.id]: {
            ...win,
            phase: nextPhase,
            rect: nextRect,
            visited: true
          }
        }
      };
    }

    case 'FOCUS': {
      if (!APP_REGISTRY[action.id]) return state;
      const win = state.windows[action.id];
      if (!win || win.phase === 'closed' || win.phase === 'minimized') return state;

      if (state.activeId === action.id) return state;

      const nextStack = state.stack.filter((id) => id !== action.id);
      nextStack.push(action.id);

      return {
        ...state,
        stack: nextStack,
        activeId: action.id
      };
    }

    case 'TASK_ACTIVATE': {
      if (!APP_REGISTRY[action.id]) return state;
      const win = state.windows[action.id];
      if (!win || win.phase === 'closed') return state;

      if (win.phase === 'minimized') {
        // Restore and raise
        const nextPhase = win.beforeMinimize;
        const nextRect =
          nextPhase === 'maximized'
            ? { x: 0, y: 0, width: state.bounds.width, height: state.bounds.height }
            : clampRect(win.restoreRect, state.bounds, APP_REGISTRY[action.id].minSize);

        const nextStack = state.stack.filter((id) => id !== action.id);
        nextStack.push(action.id);

        return {
          ...state,
          stack: nextStack,
          activeId: action.id,
          windows: {
            ...state.windows,
            [action.id]: {
              ...win,
              phase: nextPhase,
              rect: nextRect
            }
          }
        };
      }

      // If visible and active: minimize
      if (state.activeId === action.id) {
        const nextStack = state.stack.filter((id) => id !== action.id);
        const nextActive = nextStack.length > 0 ? nextStack[nextStack.length - 1] : null;

        return {
          ...state,
          stack: nextStack,
          activeId: nextActive,
          windows: {
            ...state.windows,
            [action.id]: {
              ...win,
              phase: 'minimized',
              beforeMinimize: win.phase === 'maximized' ? 'maximized' : 'normal'
            }
          }
        };
      }

      // If visible but inactive: raise to front
      const nextStack = state.stack.filter((id) => id !== action.id);
      nextStack.push(action.id);

      return {
        ...state,
        stack: nextStack,
        activeId: action.id
      };
    }

    case 'MINIMIZE': {
      if (!APP_REGISTRY[action.id]) return state;
      const win = state.windows[action.id];
      if (!win || win.phase === 'closed' || win.phase === 'minimized') return state;

      const nextStack = state.stack.filter((id) => id !== action.id);
      const nextActive = nextStack.length > 0 ? nextStack[nextStack.length - 1] : null;

      return {
        ...state,
        stack: nextStack,
        activeId: nextActive,
        windows: {
          ...state.windows,
          [action.id]: {
            ...win,
            phase: 'minimized',
            beforeMinimize: win.phase === 'maximized' ? 'maximized' : 'normal'
          }
        }
      };
    }

    case 'MAXIMIZE': {
      if (!APP_REGISTRY[action.id]) return state;
      const win = state.windows[action.id];
      if (!win || win.phase === 'closed' || win.phase === 'minimized') return state;
      if (win.phase === 'maximized') return state;

      const nextStack = state.stack.filter((id) => id !== action.id);
      nextStack.push(action.id);

      return {
        ...state,
        stack: nextStack,
        activeId: action.id,
        windows: {
          ...state.windows,
          [action.id]: {
            ...win,
            phase: 'maximized',
            restoreRect: win.rect,
            rect: { x: 0, y: 0, width: state.bounds.width, height: state.bounds.height }
          }
        }
      };
    }

    case 'RESTORE': {
      if (!APP_REGISTRY[action.id]) return state;
      const win = state.windows[action.id];
      if (!win || win.phase === 'closed') return state;

      const def = APP_REGISTRY[action.id];

      if (win.phase === 'maximized') {
        const nextRect = clampRect(win.restoreRect, state.bounds, def.minSize);
        const nextStack = state.stack.filter((id) => id !== action.id);
        nextStack.push(action.id);

        return {
          ...state,
          stack: nextStack,
          activeId: action.id,
          windows: {
            ...state.windows,
            [action.id]: {
              ...win,
              phase: 'normal',
              rect: nextRect
            }
          }
        };
      }

      if (win.phase === 'minimized') {
        const nextPhase = win.beforeMinimize;
        const nextRect =
          nextPhase === 'maximized'
            ? { x: 0, y: 0, width: state.bounds.width, height: state.bounds.height }
            : clampRect(win.restoreRect, state.bounds, def.minSize);

        const nextStack = state.stack.filter((id) => id !== action.id);
        nextStack.push(action.id);

        return {
          ...state,
          stack: nextStack,
          activeId: action.id,
          windows: {
            ...state.windows,
            [action.id]: {
              ...win,
              phase: nextPhase,
              rect: nextRect
            }
          }
        };
      }

      return state;
    }

    case 'CLOSE': {
      if (!APP_REGISTRY[action.id]) return state;
      const win = state.windows[action.id];
      if (!win || win.phase === 'closed') return state;

      const nextStack = state.stack.filter((id) => id !== action.id);
      const nextActive = nextStack.length > 0 ? nextStack[nextStack.length - 1] : null;

      // Stale snapshot must never resurrect a closed app
      const nextSnapshot = state.shownDesktopSnapshot
        ? state.shownDesktopSnapshot.filter((id) => id !== action.id)
        : null;

      return {
        ...state,
        shownDesktopSnapshot: nextSnapshot,
        stack: nextStack,
        activeId: nextActive,
        windows: {
          ...state.windows,
          [action.id]: {
            ...win,
            phase: 'closed',
            visited: false
          }
        }
      };
    }

    case 'COMMIT_RECT': {
      if (!APP_REGISTRY[action.id]) return state;
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
      if (!APP_REGISTRY[action.id]) return state;
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
      if (!APP_REGISTRY[action.id]) return state;
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
      if (!APP_REGISTRY[action.id]) return state;
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
      if (!APP_REGISTRY[action.id]) return state;
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
      // Toggle logic: If snapshot exists, restore surviving apps. If not, minimize all and snapshot.
      if (state.shownDesktopSnapshot === null) {
        if (state.stack.length === 0) return state; // nothing visible to minimize

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

      // Snapshot exists: restore only those apps that are still open/minimized (not closed)
      const surviving = state.shownDesktopSnapshot.filter((id) => {
        const win = state.windows[id];
        return win && win.phase === 'minimized';
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

      const nextActive = surviving.length > 0 ? surviving[surviving.length - 1] : null;

      return {
        ...state,
        stack: surviving,
        activeId: nextActive,
        shownDesktopSnapshot: null,
        windows: nextWindows
      };
    }

    case 'OPEN_CORE': {
      const nextWindows = { ...state.windows };
      const nextStack: AppId[] = [];

      for (const id of CORE_APP_IDS) {
        const win = nextWindows[id];
        const def = APP_REGISTRY[id];
        nextWindows[id] = {
          ...win,
          phase: 'normal',
          visited: true,
          rect: clampRect(win.restoreRect, state.bounds, def.minSize)
        };
        nextStack.push(id);
      }

      return {
        ...state,
        shownDesktopSnapshot: null,
        stack: nextStack,
        activeId: 'hero', // Explicitly raised last
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
