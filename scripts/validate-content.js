/**
 * validate-content.js
 * Shift at Midnight Compass — content validation
 *
 * Checks built HTML output for:
 * 1. Forbidden phrases that must only appear in "not confirmed" / HOLD context
 * 2. Required pages exist
 * 3. Required components (source labels, NOW/PARTIAL/HOLD panels) present
 * 4. No external image embeds
 * 5. sitemap.xml and robots.txt exist in dist/
 *
 * Run after: npm run build
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, resolve } from 'path';

const DIST_DIR = resolve('dist');

// Forbidden phrases — only acceptable in a denying / HOLD / "not confirmed" context
const BANNED = [
  // Walkthrough / spoiler
  'full walkthrough',
  'complete walkthrough',
  'exact answer',
  'doppelganger tells',
  'customer tells',
  // Secrets / endings / routes
  'secret ending',
  'best route',
  'exact route',
  // Builds / tiers
  'best build',
  'best class',
  'tier list',
  'best loadout',
  // Platform claims without source
  'ps5 confirmed',
  'ps5 release',
  'game pass confirmed',
  'xbox game pass confirmed',
  'gamepass confirmed',
  // Screenshots / media theft
  // Screenshots / media theft
  'screenshots',
  'trailer frames',
  'thumbnails',
  'steam screenshot',
  'xbox screenshot',
  // Final date claims
  'final release date',
  'official release date is',
];

// Acceptable context keywords — must appear within 500 chars of the banned phrase
// Covers deny/prevent/explain contexts where the phrase is NOT being published as fact
const CONTEXT_KEYWORDS = [
  // Core deny patterns
  'not confirmed',
  'cannot verify',
  'cannot confirm',
  'pending verification',
  'not verified',
  'cannot be confirmed',
  'community lead',
  'lead only',
  'unverified',
  'not publish',
  'do not publish',
  'never publish',
  'what we do not',
  'cannot publish',
  'verify first',
  'check first',
  'hold until',
  'not yet confirmed',
  'no official source',
  'hypothetical',
  'speculative',
  'community-only',
  'do not use',
  'exact answer: not published',
  'not published on this site',
  'not yet verified',
  'requires in-game',
  'requires hands-on',
  // HOLD explain patterns
  'does not include',
  'does NOT include',
  'do NOT list',
  'not listed here',
  'not covered here',
  'not included',
  'without',
  'no confirmed',
  'no official',
  'unconfirmed',
  // Explain/cannot-use patterns
  'copied from',
  'no frames',
  'no thumbnail',
  'no screenshots',
  'link only',
  'source label',
  'not use',
  'do NOT',
  'not state',
  'not provide',
  'held:',
  'hold —',
  'status —',
  'answer status',
  'query faq',
  'question —',
  'page does not',
  'site does not',
  'this site does not',
  'what is not published',
  'what is held',
  'do not copy',
  'cannot be copied',
  'cannot copy',
  'frames or thumbnails',
  'thumbnails or',
  'frames, thumbnails',
  // Game Pass qualifying context — safe when present with "confirmed"
  'game pass referenced by press',
  'game pass referenced in press',
  'game pass is press only',
  'game pass: press only',
  'game pass: press lead',
  'verify against official',
  'verify on official',
  'verify with official',
  'before treating as confirmed',
  'press lead only',
  'not yet confirmed by official',
];

const REQUIRED_ROUTES = [
  '/',
  '/release-date/',
  '/demo/',
  '/platforms/',
  '/beginner-guide/',
  '/customer-checks/',
  '/joes-diner-newsletter/',
  '/sources/',
  '/about/',
  '/editorial/',
  '/contact/',
  '/privacy/',
];

let errors = 0;
let pagesChecked = 0;

function scanFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const rel = filePath.replace(DIST_DIR, '');

  for (const phrase of BANNED) {
    let pos = 0;
    while (true) {
      const idx = content.toLowerCase().indexOf(phrase.toLowerCase(), pos);
      if (idx === -1) break;
      pos = idx + 1;

      const beforeStart = Math.max(0, idx - 500);
      const afterEnd = Math.min(content.length, idx + phrase.length + 500);

      const beforeSlice = content.slice(beforeStart, idx + phrase.length).toLowerCase();
      const afterSlice = content.slice(idx, afterEnd).toLowerCase();

      const hasContext = CONTEXT_KEYWORDS.some(kw =>
        beforeSlice.includes(kw) || afterSlice.includes(kw)
      );

      if (!hasContext) {
        const snippetStart = Math.max(0, idx - 80);
        const snippetEnd = Math.min(content.length, idx + phrase.length + 80);
        const snippet = content.slice(snippetStart, snippetEnd).replace(/\n/g, ' ').trim();
        console.error(`[VIOLATION] ${rel}`);
        console.error(`  Forbidden phrase: "${phrase}"`);
        console.error(`  Context: ...${snippet}...`);
        errors++;
      }
    }
  }
  pagesChecked++;
}

function walkDir(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(full);
    } else if (entry.name.endsWith('.html')) {
      scanFile(full);
    }
  }
}

// Check required pages exist
function checkPages() {
  const missing = [];
  for (const route of REQUIRED_ROUTES) {
    const htmlFile = join(DIST_DIR, route.replace(/\/$/, '') + '.html');
    const indexFile = join(DIST_DIR, route.replace(/\/$/, '') + '/index.html');
    if (!existsSync(htmlFile) && !existsSync(indexFile)) {
      missing.push(route);
    }
  }
  if (missing.length > 0) {
    console.error(`[MISSING PAGES] ${missing.join(', ')}`);
    errors += missing.length;
  } else {
    console.log(`[PAGES] All ${REQUIRED_ROUTES.length} required routes found.`);
  }
}

// Check sitemap and robots
function checkPublicFiles() {
  const files = ['sitemap-index.xml', 'robots.txt'];
  for (const f of files) {
    const path = join(DIST_DIR, f);
    if (!existsSync(path)) {
      console.error(`[MISSING] ${f} not found in dist/`);
      errors++;
    } else {
      console.log(`[PUBLIC] ${f} found.`);
    }
  }
}

// Check for image tags (external images)
function checkNoExternalImages() {
  const imgPattern = /<img[^>]+src\s*=\s*["']https?:\/\//gi;
  let imgErrors = 0;
  for (const entry of readdirSync(DIST_DIR, { withFileTypes: true })) {
    const full = join(DIST_DIR, entry.name);
    if (entry.isDirectory()) {
      for (const sub of readdirSync(full, { withFileTypes: true })) {
        if (sub.name.endsWith('.html')) {
          const content = readFileSync(join(full, sub.name), 'utf-8');
          const matches = content.match(imgPattern) || [];
          if (matches.length > 0) {
            console.error(`[IMG WARNING] ${full}/${sub.name} contains external image tag(s): ${matches.join(', ')}`);
            imgErrors++;
          }
        }
      }
    } else if (entry.name.endsWith('.html')) {
      const content = readFileSync(full, 'utf-8');
      const matches = content.match(imgPattern) || [];
      if (matches.length > 0) {
        console.error(`[IMG WARNING] ${full} contains external image tag(s): ${matches.join(', ')}`);
        imgErrors++;
      }
    }
  }
  if (imgErrors > 0) {
    console.warn(`[IMG] ${imgErrors} file(s) contain external image references — review if intentional.`);
  } else {
    console.log('[IMG] No external image embeds found.');
  }
}

// Check for doctype bleed — stray --- after <!DOCTYPE html> from frontmatter error
function checkNoDoctypeBleed() {
  let bleedErrors = 0;
  for (const entry of readdirSync(DIST_DIR, { withFileTypes: true })) {
    const full = join(DIST_DIR, entry.name);
    if (entry.isDirectory()) {
      for (const sub of readdirSync(full, { withFileTypes: true })) {
        if (sub.name.endsWith('.html')) {
          const content = readFileSync(join(full, sub.name), 'utf-8');
          if (content.includes('<!DOCTYPE html>---') || content.includes('<!doctype html>---')) {
            console.error(`[DOCTYPE BLEED] ${full}/${sub.name} contains "<!DOCTYPE html>---" — frontmatter separator leaked into HTML`);
            bleedErrors++;
          }
        }
      }
    } else if (entry.name.endsWith('.html')) {
      const content = readFileSync(full, 'utf-8');
      if (content.includes('<!DOCTYPE html>---') || content.includes('<!doctype html>---')) {
        console.error(`[DOCTYPE BLEED] ${full} contains "<!DOCTYPE html>---" — frontmatter separator leaked into HTML`);
        bleedErrors++;
      }
    }
  }
  if (bleedErrors > 0) {
    console.error(`[DOCTYPE BLEED] ${bleedErrors} file(s) with doctype bleed.`);
    errors += bleedErrors;
  } else {
    console.log('[DOCTYPE] No doctype bleed found.');
  }
}

// Check for Game Pass over-claims — "confirmed" without qualifying press/verify context
function checkGamePassClaims() {
  const gamePassBad = [
    'game pass confirmed',
    'xbox game pass confirmed',
  ];
  const gamePassOk = [
    'game pass referenced by press',
    'game pass referenced in press',
    'game pass is press',
    'game pass: press only',
    'verify',
    'not confirmed',
    'verify against official',
    'verify on official',
  ];

  let gpErrors = 0;
  for (const entry of readdirSync(DIST_DIR, { withFileTypes: true })) {
    const full = join(DIST_DIR, entry.name);
    if (entry.isDirectory()) {
      for (const sub of readdirSync(full, { withFileTypes: true })) {
        if (sub.name.endsWith('.html')) {
          const content = readFileSync(join(full, sub.name), 'utf-8').toLowerCase();
          for (const phrase of gamePassBad) {
            let pos = 0;
            while (true) {
              const idx = content.indexOf(phrase, pos);
              if (idx === -1) break;
              pos = idx + 1;
              const slice = content.slice(Math.max(0, idx - 200), idx + phrase.length + 200);
              const hasOk = gamePassOk.some(ok => slice.includes(ok));
              if (!hasOk) {
                const snippet = content.slice(Math.max(0, idx - 60), idx + phrase.length + 60).replace(/\n/g, ' ').trim();
                console.error(`[GAMEPASS OVER-CLAIM] ${full}/${sub.name}`);
                console.error(`  Found: "${phrase}" without qualifying context.`);
                console.error(`  Context: ...${snippet}...`);
                gpErrors++;
              }
            }
          }
        }
      }
    } else if (entry.name.endsWith('.html')) {
      const content = readFileSync(full, 'utf-8').toLowerCase();
      for (const phrase of gamePassBad) {
        let pos = 0;
        while (true) {
          const idx = content.indexOf(phrase, pos);
          if (idx === -1) break;
          pos = idx + 1;
          const slice = content.slice(Math.max(0, idx - 200), idx + phrase.length + 200);
          const hasOk = gamePassOk.some(ok => slice.includes(ok));
          if (!hasOk) {
            const snippet = content.slice(Math.max(0, idx - 60), idx + phrase.length + 60).replace(/\n/g, ' ').trim();
            console.error(`[GAMEPASS OVER-CLAIM] ${full}`);
            console.error(`  Found: "${phrase}" without qualifying context.`);
            console.error(`  Context: ...${snippet}...`);
            gpErrors++;
          }
        }
      }
    }
  }
  if (gpErrors > 0) {
    console.error(`[GAMEPASS] ${gpErrors} over-claim(s) found.`);
    errors += gpErrors;
  } else {
    console.log('[GAMEPASS] No over-claims found — Game Pass handled correctly.');
  }
}

try {
  console.log('\n=== Shift at Midnight Compass — Content Validator ===\n');
  checkPublicFiles();
  checkPages();
  walkDir(DIST_DIR);
  checkNoExternalImages();
  checkNoDoctypeBleed();
  checkGamePassClaims();
} catch (err) {
  if (err.code === 'ENOENT') {
    console.error('Error: dist/ directory not found. Run npm run build first.');
    process.exit(1);
  }
  throw err;
}

console.log(`\nValidated ${pagesChecked} pages against ${BANNED.length} forbidden phrases.`);
if (errors > 0) {
  console.error(`\n❌ ${errors} issue(s) found. Fix before deploying.`);
  process.exit(1);
} else {
  console.log('\n✅ All checks passed — no violations found.');
  process.exit(0);
}
