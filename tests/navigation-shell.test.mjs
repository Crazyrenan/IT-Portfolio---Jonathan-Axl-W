import test from 'node:test';
import assert from 'node:assert/strict';

import { formatWibTime } from '../src/lib/clock.ts';
import { APP_REGISTRY, CORE_APP_IDS, ALL_APP_IDS } from '../src/lib/window-manager.ts';

test('formatWibTime produces valid Asia/Jakarta (WIB) time formatting', () => {
  // Test a known fixed UTC timestamp: 2026-10-12T07:30:00Z -> in UTC+7 (WIB) it is 14:30
  const fixedDate = new Date('2026-10-12T07:30:00Z');
  const result = formatWibTime(fixedDate);

  assert.ok(result.display.endsWith('WIB'), 'Display string must end with WIB');
  assert.equal(result.display, '14:30 WIB', 'WIB time should be 14:30 for UTC 07:30');
  assert.ok(result.fullDate.includes('WIB'), 'Full date string must mention WIB');
  assert.ok(result.fullDate.includes('2026'), 'Full date string must include the year 2026');
});

test('formatWibTime displays HH:mm without seconds', () => {
  const now = new Date();
  const { display } = formatWibTime(now);
  // Match format: 2 digits : 2 digits WIB
  assert.match(display, /^\d{2}:\d{2} WIB$/, 'Display string must match format HH:mm WIB');
});

test('APP_REGISTRY covers all 10 registered apps with valid metadata for StartMenu and Taskbar', () => {
  assert.equal(ALL_APP_IDS.length, 10, 'Must have exactly 10 registered application IDs');

  for (const appId of ALL_APP_IDS) {
    const app = APP_REGISTRY[appId];
    assert.ok(app, `Registry must contain metadata for app: ${appId}`);
    assert.equal(app.id, appId);
    assert.ok(app.title.length > 0, `App ${appId} must have a non-empty title`);
    assert.ok(app.exeName.length > 0, `App ${appId} must have a non-empty exeName`);
    assert.ok(app.icon.length > 0, `App ${appId} must have an icon path`);
    assert.ok(typeof app.order === 'number', `App ${appId} must have an ordering number`);
  }
});

test('CORE_APP_IDS partition matches 6 core portfolio applications', () => {
  assert.equal(CORE_APP_IDS.length, 6);
  assert.deepEqual(
    [...CORE_APP_IDS].sort(),
    ['hero', 'skills', 'projects', 'experience', 'contact', 'certificates'].sort()
  );

  const extraAppIds = ALL_APP_IDS.filter((id) => !CORE_APP_IDS.includes(id));
  assert.equal(extraAppIds.length, 4);
  assert.deepEqual(
    [...extraAppIds].sort(),
    ['browser', 'p5r', 'apex', 'elden'].sort()
  );
});

test('Taskbar windows ordering respects APP_REGISTRY order', () => {
  const sortedIds = [...ALL_APP_IDS].sort(
    (a, b) => APP_REGISTRY[a].order - APP_REGISTRY[b].order
  );
  // Verify order is strictly ascending
  for (let i = 0; i < sortedIds.length - 1; i++) {
    assert.ok(
      APP_REGISTRY[sortedIds[i]].order < APP_REGISTRY[sortedIds[i + 1]].order,
      'App orders must be strictly monotonically increasing'
    );
  }
});

test('R08: tailwind.config.js defines xs breakpoint for Quick Launch toolbar visibility', async () => {
  const fs = await import('node:fs');
  const tailwindContent = fs.readFileSync('tailwind.config.js', 'utf8');
  assert.ok(
    tailwindContent.includes("xs: '420px'") || tailwindContent.includes('xs: "420px"'),
    'tailwind.config.js must explicitly define the xs breakpoint so xs:flex is not hidden'
  );
});

test('R11: src/styles/global.css defines 32px desktop and 44px touch hitbox for window controls', async () => {
  const fs = await import('node:fs');
  const cssContent = fs.readFileSync('src/styles/global.css', 'utf8');
  assert.ok(
    cssContent.includes('min-width: 32px') && cssContent.includes('height: 32px'),
    '.xp-btn-ctrl must specify 32px desktop dimensions'
  );
  assert.ok(
    cssContent.includes('@media (pointer: coarse)') && cssContent.includes('min-width: 44px'),
    '.xp-btn-ctrl must include @media (pointer: coarse) with 44px touch hitbox'
  );
});

test('R09: Certificates window is fully registered in CORE_APP_IDS with valid defaultRect and minSize', () => {
  assert.ok(CORE_APP_IDS.includes('certificates'), 'certificates must be in CORE_APP_IDS');
  const certDef = APP_REGISTRY.certificates;
  assert.ok(certDef, 'certificates must be in APP_REGISTRY');
  assert.ok(certDef.defaultRect.width >= 320, 'certificates defaultRect width must be valid');
  assert.ok(certDef.defaultRect.height >= 220, 'certificates defaultRect height must be valid');
  assert.ok(certDef.minSize.width > 0 && certDef.minSize.height > 0, 'certificates must have positive minSize');
});

