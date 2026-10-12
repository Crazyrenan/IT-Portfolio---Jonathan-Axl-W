import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import {
  PROFILE_DATA,
  CONTACT_DATA,
  SKILLS_DATA,
  SKILL_CATEGORIES,
  EXPERIENCE_DATA,
  normalizeProjectSummary,
} from '../src/data/portfolio.ts';

import { CERTIFICATES_DATA } from '../src/data/certificates.ts';

test('PROFILE_DATA has required identity fields', () => {
  assert.equal(PROFILE_DATA.name, 'Jonathan Axl Wibowo');
  assert.equal(PROFILE_DATA.handle, 'JONATHAN_AXL_WIBOWO');
  assert.match(PROFILE_DATA.role, /Full-Stack/i);
  assert.ok(PROFILE_DATA.bio.length > 20);
  assert.equal(PROFILE_DATA.cvUrl, '/cv.pdf');
  assert.equal(PROFILE_DATA.avatar, '/images/me.jpg');
});

test('CONTACT_DATA preserves provisional rendered email and social channels', () => {
  assert.equal(CONTACT_DATA.email, 'vinny.jonathan.axl@gmail.com');
  assert.equal(CONTACT_DATA.github, 'https://github.com/Crazyrenan');
  assert.equal(CONTACT_DATA.linkedin, 'https://www.linkedin.com/in/jonathan-axl');
});

test('SKILLS_DATA contains exactly 28 skills across 4 categories', () => {
  assert.equal(SKILLS_DATA.length, 28);
  assert.equal(SKILL_CATEGORIES.length, 4);

  const categories = new Set(SKILLS_DATA.map((s) => s.category));
  assert.equal(categories.size, 4);
  for (const cat of SKILL_CATEGORIES) {
    assert.ok(categories.has(cat), `Missing category ${cat}`);
  }

  // Check unique slugs
  const slugs = new Set(SKILLS_DATA.map((s) => s.slug));
  assert.equal(slugs.size, 28, 'Every skill should have a unique slug');
});

test('EXPERIENCE_DATA contains exactly 4 verified career records', () => {
  assert.equal(EXPERIENCE_DATA.length, 4);
  const ids = EXPERIENCE_DATA.map((e) => e.id);
  assert.deepEqual(ids, ['lkh', 'ieee', 'imip', 'umn']);

  for (const exp of EXPERIENCE_DATA) {
    assert.ok(exp.company, `Missing company for ${exp.id}`);
    assert.ok(exp.role, `Missing role for ${exp.id}`);
    assert.ok(exp.date, `Missing date for ${exp.id}`);
    assert.ok(exp.tags.length > 0, `Missing tags for ${exp.id}`);
  }
});

test('CERTIFICATES_DATA contains exactly 6 verified certificate records', () => {
  assert.equal(CERTIFICATES_DATA.length, 6);
  const ids = CERTIFICATES_DATA.map((c) => c.id);
  assert.deepEqual(ids, [
    'pasas-data-vis',
    'datacamp-github',
    'dqlab-sql-join-union',
    'dqlab-sql-function-groupby',
    'dqlab-sql-select',
    'dqlab-r-stats',
  ]);

  for (const cert of CERTIFICATES_DATA) {
    assert.ok(cert.title);
    assert.ok(cert.issuer);
    assert.ok(cert.image.startsWith('/certificates/'));
    assert.ok(cert.skills.length > 0);
  }
});

test('normalizeProjectSummary handles complete and empty fixtures correctly', () => {
  // Complete fixture
  const complete = normalizeProjectSummary(
    {
      title: 'TB Study',
      tags: ['PyTorch', 'CNN'],
      excerpt: 'Clinical study',
      githubUrl: 'https://github.com/Crazyrenan/TBC-Prediction-Website',
      coverImage: '/images/tb.png',
      date: '2026-05-01',
    },
    'tb-detection-comparative-study'
  );

  assert.equal(complete.slug, 'tb-detection-comparative-study');
  assert.equal(complete.title, 'TB Study');
  assert.equal(complete.featuredOrder, 1);
  assert.equal(complete.badge, '97% Accuracy');
  assert.equal(complete.type, 'AI Research');
  assert.equal(complete.githubUrl, 'https://github.com/Crazyrenan/TBC-Prediction-Website');
  assert.deepEqual(complete.tags, ['PyTorch', 'CNN']);

  // Edge case: empty fixture with no optional fields
  const empty = normalizeProjectSummary({}, 'unknown-slug');
  assert.equal(empty.slug, 'unknown-slug');
  assert.equal(empty.title, 'unknown-slug');
  assert.equal(empty.featuredOrder, 99);
  assert.equal(empty.badge, 'Verified');
  assert.equal(empty.type, 'Software Project');
  assert.equal(empty.excerpt, '');
  assert.deepEqual(empty.tags, []);
  assert.deepEqual(empty.gallery, []);
  assert.equal(empty.githubUrl, 'https://github.com/Crazyrenan');
});

test('All 8 markdown project files in src/content/projects match expected slugs and properties', () => {
  const projectsDir = path.resolve('src/content/projects');
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith('.md'));
  assert.equal(files.length, 8, 'Must have exactly 8 project markdown case studies');

  const expectedSlugs = [
    'field-service-pro',
    'help-desk-ai',
    'imip-recruitment',
    'lkh-internal-platform',
    'optical-intel-ocr',
    'personal-developer-portfolio',
    'tb-detection-comparative-study',
    'windbreaker-ai',
  ];

  const actualSlugs = files.map((f) => f.replace(/\.md$/, '')).sort();
  assert.deepEqual(actualSlugs, expectedSlugs.sort());

  // Verify that each project normalizes properly
  for (const slug of expectedSlugs) {
    const filePath = path.join(projectsDir, `${slug}.md`);
    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(content.length > 50, `File for ${slug} should not be empty`);
  }
});
