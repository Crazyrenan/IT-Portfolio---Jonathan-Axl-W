import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createInitialWorkspaceState,
  windowReducer,
  clampRect,
  getAppZIndex,
  APP_REGISTRY,
  CORE_APP_IDS,
  ALL_APP_IDS
} from '../src/lib/window-manager.ts';

test('Initial workspace opens only hero (My Profile) by default', () => {
  const state = createInitialWorkspaceState({ width: 1280, height: 800 });

  assert.equal(state.activeId, 'hero');
  assert.deepEqual(state.stack, ['hero']);
  assert.equal(state.windows.hero.phase, 'normal');
  assert.equal(state.windows.hero.visited, true);
  assert.equal(state.windows.projects.phase, 'closed');
  assert.equal(state.shownDesktopSnapshot, null);
});

test('OPEN is idempotent and never minimizes an already open window', () => {
  let state = createInitialWorkspaceState();

  state = windowReducer(state, { type: 'OPEN', id: 'projects' });
  assert.equal(state.activeId, 'projects');
  assert.deepEqual(state.stack, ['hero', 'projects']);
  assert.equal(state.windows.projects.phase, 'normal');

  // Second OPEN to same window must keep it at top and not minimize
  state = windowReducer(state, { type: 'OPEN', id: 'projects' });
  assert.equal(state.activeId, 'projects');
  assert.deepEqual(state.stack, ['hero', 'projects']);
  assert.equal(state.windows.projects.phase, 'normal');

  // OPEN to hero raises hero without duplicating in stack
  state = windowReducer(state, { type: 'OPEN', id: 'hero' });
  assert.equal(state.activeId, 'hero');
  assert.deepEqual(state.stack, ['projects', 'hero']);
});

test('TASK_ACTIVATE correctly handles closed, minimized, inactive, and active states', () => {
  let state = createInitialWorkspaceState();

  // 1. Closed window is ignored
  state = windowReducer(state, { type: 'TASK_ACTIVATE', id: 'skills' });
  assert.equal(state.windows.skills.phase, 'closed');
  assert.equal(state.activeId, 'hero');

  // 2. Open skills then projects
  state = windowReducer(state, { type: 'OPEN', id: 'skills' });
  state = windowReducer(state, { type: 'OPEN', id: 'projects' });
  assert.equal(state.activeId, 'projects');
  assert.deepEqual(state.stack, ['hero', 'skills', 'projects']);

  // 3. TASK_ACTIVATE on inactive visible window (skills) raises it to front
  state = windowReducer(state, { type: 'TASK_ACTIVATE', id: 'skills' });
  assert.equal(state.activeId, 'skills');
  assert.deepEqual(state.stack, ['hero', 'projects', 'skills']);

  // 4. TASK_ACTIVATE on active visible window (skills) minimizes it
  state = windowReducer(state, { type: 'TASK_ACTIVATE', id: 'skills' });
  assert.equal(state.windows.skills.phase, 'minimized');
  assert.equal(state.activeId, 'projects'); // Projects was previous on stack
  assert.deepEqual(state.stack, ['hero', 'projects']);

  // 5. TASK_ACTIVATE on minimized window (skills) restores and raises it
  state = windowReducer(state, { type: 'TASK_ACTIVATE', id: 'skills' });
  assert.equal(state.windows.skills.phase, 'normal');
  assert.equal(state.activeId, 'skills');
  assert.deepEqual(state.stack, ['hero', 'projects', 'skills']);
});

test('MAXIMIZE, RESTORE, and MINIMIZE maintain geometry and beforeMinimize invariants', () => {
  let state = createInitialWorkspaceState({ width: 1000, height: 700 });
  state = windowReducer(state, { type: 'OPEN', id: 'contact' });

  const initialNormalRect = state.windows.contact.rect;

  // Maximize
  state = windowReducer(state, { type: 'MAXIMIZE', id: 'contact' });
  assert.equal(state.windows.contact.phase, 'maximized');
  assert.deepEqual(state.windows.contact.rect, { x: 0, y: 0, width: 1000, height: 700 });
  assert.deepEqual(state.windows.contact.restoreRect, initialNormalRect);

  // Minimize while maximized
  state = windowReducer(state, { type: 'MINIMIZE', id: 'contact' });
  assert.equal(state.windows.contact.phase, 'minimized');
  assert.equal(state.windows.contact.beforeMinimize, 'maximized');

  // Restore returns to maximized mode
  state = windowReducer(state, { type: 'RESTORE', id: 'contact' });
  assert.equal(state.windows.contact.phase, 'maximized');

  // Restore while maximized returns to normal mode with restoreRect
  state = windowReducer(state, { type: 'RESTORE', id: 'contact' });
  assert.equal(state.windows.contact.phase, 'normal');
  assert.deepEqual(state.windows.contact.rect, initialNormalRect);
});

test('SHOW_DESKTOP snapshots visible apps and does not resurrect closed apps', () => {
  let state = createInitialWorkspaceState();
  state = windowReducer(state, { type: 'OPEN', id: 'skills' });
  state = windowReducer(state, { type: 'OPEN', id: 'projects' });

  assert.deepEqual(state.stack, ['hero', 'skills', 'projects']);

  // Toggle 1: Show Desktop minimizes all and snapshots ['hero', 'skills', 'projects']
  state = windowReducer(state, { type: 'SHOW_DESKTOP' });
  assert.equal(state.activeId, null);
  assert.deepEqual(state.stack, []);
  assert.deepEqual(state.shownDesktopSnapshot, ['hero', 'skills', 'projects']);
  assert.equal(state.windows.hero.phase, 'minimized');
  assert.equal(state.windows.skills.phase, 'minimized');
  assert.equal(state.windows.projects.phase, 'minimized');

  // Close skills while desktop is shown
  state = windowReducer(state, { type: 'CLOSE', id: 'skills' });
  assert.equal(state.windows.skills.phase, 'closed');
  assert.deepEqual(state.shownDesktopSnapshot, ['hero', 'projects']); // skills purged from snapshot

  // Toggle 2: Show Desktop restores only surviving apps in saved order
  state = windowReducer(state, { type: 'SHOW_DESKTOP' });
  assert.deepEqual(state.stack, ['hero', 'projects']);
  assert.equal(state.activeId, 'projects');
  assert.equal(state.windows.hero.phase, 'normal');
  assert.equal(state.windows.projects.phase, 'normal');
  assert.equal(state.windows.skills.phase, 'closed'); // must stay closed
  assert.equal(state.shownDesktopSnapshot, null);
});

test('OPEN_CORE opens all six core apps and explicitly raises hero last', () => {
  let state = createInitialWorkspaceState();
  state = windowReducer(state, { type: 'OPEN_CORE' });

  for (const id of CORE_APP_IDS) {
    assert.equal(state.windows[id].phase, 'normal');
    assert.equal(state.windows[id].visited, true);
    assert.ok(state.stack.includes(id));
  }

  assert.equal(state.activeId, 'hero');
  assert.equal(state.stack[state.stack.length - 1], 'hero');
});

test('clampRect enforces screen bounds and min dimensions', () => {
  const bounds = { width: 1000, height: 700 };
  const minSize = { width: 360, height: 260 };

  // Negative coordinates clamped to 0
  const clampedNeg = clampRect({ x: -50, y: -20, width: 500, height: 400 }, bounds, minSize);
  assert.equal(clampedNeg.x, 0);
  assert.equal(clampedNeg.y, 0);

  // Beyond boundary coordinates clamped inside
  const clampedFar = clampRect({ x: 900, y: 600, width: 400, height: 300 }, bounds, minSize);
  assert.equal(clampedFar.x, 1000 - 400); // 600
  assert.equal(clampedFar.y, 700 - 300); // 400

  // Oversized dimensions clamped to bounds
  const clampedOver = clampRect({ x: 0, y: 0, width: 2000, height: 1500 }, bounds, minSize);
  assert.equal(clampedOver.width, 1000);
  assert.equal(clampedOver.height, 700);

  // Sub-minimum dimensions raised to minSize
  const clampedSmall = clampRect({ x: 10, y: 10, width: 100, height: 50 }, bounds, minSize);
  assert.equal(clampedSmall.width, 360);
  assert.equal(clampedSmall.height, 260);
});

test('Unknown action and unknown AppId are safe no-ops', () => {
  const state = createInitialWorkspaceState();
  // @ts-ignore
  const next = windowReducer(state, { type: 'OPEN', id: 'nonexistent-app' });
  assert.deepEqual(next, state);
});

test('getAppZIndex derives deterministic z-index band (100-199)', () => {
  let state = createInitialWorkspaceState();
  state = windowReducer(state, { type: 'OPEN', id: 'skills' });
  state = windowReducer(state, { type: 'OPEN', id: 'projects' });

  // Stack is ['hero', 'skills', 'projects']
  assert.equal(getAppZIndex(state, 'hero'), 100);
  assert.equal(getAppZIndex(state, 'skills'), 101);
  assert.equal(getAppZIndex(state, 'projects'), 102);

  // Closed window gets inert background z-index
  assert.equal(getAppZIndex(state, 'contact'), 10);
});

test('CENTER_WINDOW and FIT_WINDOW calculate nondrag geometry correctly', () => {
  let state = createInitialWorkspaceState({ width: 1200, height: 800 });
  state = windowReducer(state, { type: 'OPEN', id: 'contact' });

  // Center contact window
  state = windowReducer(state, { type: 'CENTER_WINDOW', id: 'contact' });
  const centered = state.windows.contact.rect;
  assert.equal(centered.x, Math.round((1200 - centered.width) / 2));
  assert.equal(centered.y, Math.round((800 - centered.height) / 2));

  // Fit contact window
  state = windowReducer(state, { type: 'FIT_WINDOW', id: 'contact' });
  const fitted = state.windows.contact.rect;
  assert.equal(fitted.width, Math.round(1200 * 0.9));
  assert.equal(fitted.height, Math.round(800 * 0.88));
});

test('MOVE_WINDOW and RESIZE_WINDOW provide keyboard/nondrag offset controls', () => {
  let state = createInitialWorkspaceState({ width: 1200, height: 800 });
  state = windowReducer(state, { type: 'OPEN', id: 'skills' });
  const initial = state.windows.skills.rect;

  state = windowReducer(state, { type: 'MOVE_WINDOW', id: 'skills', dx: 30, dy: -20 });
  assert.equal(state.windows.skills.rect.x, initial.x + 30);
  assert.equal(state.windows.skills.rect.y, Math.max(0, initial.y - 20));

  state = windowReducer(state, { type: 'RESIZE_WINDOW', id: 'skills', dw: 40, dh: 50 });
  assert.equal(state.windows.skills.rect.width, initial.width + 40);
  assert.equal(state.windows.skills.rect.height, initial.height + 50);
});

test('parseHashIntent correctly parses legacy IDs, query params, and safely recovers from invalid hashes', () => {
  // @ts-ignore
  import('../src/lib/window-manager.ts').then(({ parseHashIntent }) => {
    assert.deepEqual(parseHashIntent('#projects'), { appId: 'projects' });
    assert.deepEqual(parseHashIntent('#skills'), { appId: 'skills' });
    assert.deepEqual(parseHashIntent('#app=projects&project=field-service-pro'), {
      appId: 'projects',
      projectSlug: 'field-service-pro'
    });
    assert.deepEqual(parseHashIntent('#unknown-slug'), { appId: null });
    assert.deepEqual(parseHashIntent(''), { appId: null });
    assert.deepEqual(parseHashIntent('#'), { appId: null });
    // R04: Reject prototype properties
    assert.deepEqual(parseHashIntent('#constructor'), { appId: null });
    assert.deepEqual(parseHashIntent('#toString'), { appId: null });
    assert.deepEqual(parseHashIntent('#__proto__'), { appId: null });
    assert.deepEqual(parseHashIntent('#app=constructor'), { appId: null });
  });
});

test('R04: Prototype properties in createInitialWorkspaceState safely default to hero without crash', () => {
    // @ts-expect-error Testing invalid runtime input
    const state = createInitialWorkspaceState({ width: 1200, height: 750 }, 'constructor');
    assert.equal(state.activeId, 'hero');
    assert.deepEqual(state.stack, ['hero']);
    assert.equal(state.windows.hero.phase, 'normal');
    // Ensure APP_REGISTRY mapping runs without error
    const openTitles = Object.values(state.windows)
      .filter((w) => w.phase !== 'closed')
      .map((w) => APP_REGISTRY[w.id].title);
    assert.deepEqual(openTitles, ['Jonathan Axl — System Profile']);
  });

  test('R03: OPEN_CORE preserves already-open extra applications in stack and raises hero to front', () => {
    const initial = createInitialWorkspaceState({ width: 1200, height: 750 });
    // Open an extra app (apex)
    const withApex = windowReducer(initial, { type: 'OPEN', id: 'apex' });
    assert.ok(withApex.stack.includes('apex'));

    // Launch all core apps
    const withCore = windowReducer(withApex, { type: 'OPEN_CORE' });
    const visible = Object.values(withCore.windows)
      .filter((w) => w.phase === 'normal' || w.phase === 'maximized')
      .map((w) => w.id);

    // Visible set must contain apex plus all 6 core apps (7 total)
    assert.equal(visible.length, 7);
    assert.ok(visible.includes('apex'));
    assert.ok(visible.includes('hero'));

    // Stack must contain all 7 visible apps with hero at top
    assert.equal(withCore.stack.length, 7);
    assert.ok(withCore.stack.includes('apex'));
    assert.equal(withCore.activeId, 'hero');
    assert.equal(withCore.stack[withCore.stack.length - 1], 'hero');

    // Invariant: visible set strictly matches stack set
    assert.deepEqual(new Set(visible), new Set(withCore.stack));
  });

  test('R03: Mixed SHOW_DESKTOP and TASK_ACTIVATE sequences preserve exact visible stack invariants', () => {
    const initial = createInitialWorkspaceState({ width: 1200, height: 750 });
    let s = windowReducer(initial, { type: 'OPEN', id: 'projects' });
    s = windowReducer(s, { type: 'SHOW_DESKTOP' });
    assert.equal(s.stack.length, 0);

    // Manually restore hero
    s = windowReducer(s, { type: 'TASK_ACTIVATE', id: 'hero' });
    assert.deepEqual(s.stack, ['hero']);
    assert.equal(s.windows.hero.phase, 'normal');

    // Show desktop again -> minimizes hero
    s = windowReducer(s, { type: 'SHOW_DESKTOP' });
    assert.equal(s.stack.length, 0);
    assert.equal(s.windows.hero.phase, 'minimized');

    const visible = Object.values(s.windows)
      .filter((w) => w.phase === 'normal' || w.phase === 'maximized')
      .map((w) => w.id);
    assert.deepEqual(new Set(visible), new Set(s.stack));
  });

  test('R05: clampRect never exceeds actual dimensions even on viewports smaller than default minSize', () => {
    const smallBounds = { width: 290, height: 180 };
    const rect = { x: 0, y: 0, width: 700, height: 500 };
    const clamped = clampRect(rect, smallBounds, APP_REGISTRY.hero.minSize);

    assert.ok(clamped.width <= smallBounds.width, `width ${clamped.width} must not exceed bounds ${smallBounds.width}`);
    assert.ok(clamped.height <= smallBounds.height, `height ${clamped.height} must not exceed bounds ${smallBounds.height}`);
    assert.ok(clamped.x >= 0 && clamped.x + clamped.width <= smallBounds.width);
    assert.ok(clamped.y >= 0 && clamped.y + clamped.height <= smallBounds.height);
  });

