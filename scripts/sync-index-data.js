#!/usr/bin/env node
/*
 * sync-index-data.js — stamp each course card in public/index.html with the
 * metadata the browser can't work out on its own, so the index can sort by
 * date and length:
 *   data-added="YYYY-MM-DD"    first commit that added the course file
 *   data-updated="YYYY-MM-DD"  last commit that meaningfully changed it
 *                              (omitted when it equals data-added)
 *   data-words="12345"         word count, used for reading time (words / 200)
 *   data-video="1"             course embeds an animated explainer
 *
 * Everything else the toolbar needs — title, description, type, category — is
 * read straight from the DOM at runtime, so editing a card's copy never needs
 * a rerun.
 *
 * WHY THE CHURN THRESHOLD: `git log -1` reports 2026-07-15 for 30 of 42
 * courses, because commit 7b6d63b (scripts/add-framework.js) injected two tags
 * into every file. So we walk history newest-first and take the first commit
 * whose churn for that one path exceeds CHURN_MIN lines. Real content edits run
 * 12+ lines; the codemod was exactly 2. If a future codemod ever crosses that
 * line, add its SHA to `ignoreCommits` in scripts/index-data.json rather than
 * moving the threshold.
 *
 * NEVER round-trip index.html through cheerio — it decodes 60+ hand-typed
 * entities (&rarr;, &middot;, &#9654;, &ldquo;, &mdash;) and mangles the file.
 * Cheerio reads the course files; index.html is rewritten by regex splice, so
 * the diff is exactly one line per card.
 *
 * Run:  npm run dates            (add --dry to preview, --check to verify)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const cheerio = require('cheerio');

const ROOT = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const INDEX = path.join(PUBLIC_DIR, 'index.html');
const OVERRIDES = path.join(__dirname, 'index-data.json');

const DRY = process.argv.includes('--dry');
const CHECK = process.argv.includes('--check');

const CHURN_MIN = 10;

const SKIP = new Set([
  'index.html',
  'sw.js',
  'manifest.json',
  'course-framework.css',
  'course-framework.js'
]);

const warnings = [];
const warn = m => warnings.push(m);

/* ---------------- git ---------------- */

function git(args) {
  try {
    return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 28 });
  } catch (e) {
    return ''; // not a repo, shallow clone, git missing — callers fall back to mtime
  }
}

// The oldest commit that added this path. --follow survives renames.
function addedDate(rel) {
  const out = git(['log', '--diff-filter=A', '--follow', '--format=%ad', '--date=short', '--', rel]);
  const lines = out.trim().split('\n').filter(Boolean);
  return lines.length ? lines[lines.length - 1] : '';
}

// Newest-first; first commit with real churn for THIS path wins.
function updatedDate(rel, ignoreShas) {
  const out = git(['log', '--numstat', '--format=C|%H|%ad', '--date=short', '--', rel]);
  let sha = '';
  let date = '';
  for (const line of out.split('\n')) {
    if (line.startsWith('C|')) {
      const p = line.split('|');
      sha = p[1] || '';
      date = p[2] || '';
      continue;
    }
    const p = line.split('\t');
    if (p.length !== 3 || p[2] !== rel) continue; // rows for other files in the same commit
    if (ignoreShas.some(s => sha.startsWith(s))) continue;
    if ((+p[0] || 0) + (+p[1] || 0) > CHURN_MIN) return date;
  }
  return '';
}

function mtimeDate(abs) {
  const d = fs.statSync(abs).mtime;
  const p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/* ---------------- course files ---------------- */

function readCourse(abs) {
  const $ = cheerio.load(fs.readFileSync(abs, 'utf8'), { decodeEntities: false });
  $('script, style, noscript').remove();
  const text = ($('body').text() || '').trim();
  return {
    words: text ? text.split(/\s+/).length : 0,
    video: $('video').length > 0
  };
}

/* ---------------- index.html rewrite ---------------- */

// Regenerated from the href alone, so any attributes already there are replaced
// rather than merged — which is what makes reruns idempotent.
const CARD = /<a class="card" href="([^"]+)"[^>]*>/g;

function attrsFor(d) {
  return [
    ['data-added', d.added],
    ['data-updated', d.updated && d.updated > d.added ? d.updated : ''],
    ['data-words', d.words || ''],
    ['data-video', d.video ? '1' : '']
  ]
    .filter(([, v]) => v !== '' && v != null)
    .map(([k, v]) => ` ${k}="${v}"`)
    .join('');
}

function rewrite(html, meta, seen) {
  return html.replace(CARD, (m, href) => {
    if (seen.has(href)) warn(`duplicate card href: ${href}`);
    seen.add(href);
    const d = meta[href];
    if (!d) {
      warn(`card links to a file that doesn't exist: ${href}`);
      return m;
    }
    return `<a class="card" href="${href}"${attrsFor(d)}>`;
  });
}

/* ---------------- main ---------------- */

function main() {
  let overrides = { ignoreCommits: [], courses: {} };
  try {
    overrides = Object.assign(overrides, JSON.parse(fs.readFileSync(OVERRIDES, 'utf8')));
  } catch (e) {
    if (e.code !== 'ENOENT') warn(`could not read ${path.basename(OVERRIDES)}: ${e.message}`);
  }
  const ignoreShas = overrides.ignoreCommits || [];
  const courseOverrides = overrides.courses || {};

  const files = fs
    .readdirSync(PUBLIC_DIR)
    .filter(f => f.toLowerCase().endsWith('.html'))
    .filter(f => !SKIP.has(f))
    .sort();

  const meta = {};
  for (const file of files) {
    const abs = path.join(PUBLIC_DIR, file);
    const rel = `public/${file}`;
    const ov = courseOverrides[file] || {};

    let added = ov.added || addedDate(rel);
    let updated = ov.updated || updatedDate(rel, ignoreShas);
    if (!added) {
      added = mtimeDate(abs);
      warn(`${file} — not in git yet, using file mtime (${added})`);
    }
    if (!updated) updated = added;
    if (updated < added) {
      warn(`${file} — updated (${updated}) predates added (${added}); churn heuristic may need an override`);
      updated = added;
    }

    const { words, video } = readCourse(abs);
    meta[file] = { added, updated, words, video };
  }

  const orig = fs.readFileSync(INDEX, 'utf8');
  const seen = new Set();
  const out = rewrite(orig, meta, seen);

  for (const file of files) {
    if (!seen.has(file)) warn(`${file} exists but has no card in index.html`);
  }

  // The animated flag is hand-typed into .card-type today; make sure the two agree.
  const $idx = cheerio.load(orig, { decodeEntities: false });
  $idx('a.card').each((_, el) => {
    const href = $idx(el).attr('href');
    const d = meta[href];
    if (!d) return;
    const labelled = /Animated/i.test($idx(el).find('.card-type').text() || '');
    if (labelled && !d.video) warn(`${href} — card says "Animated" but the course has no <video>`);
    if (!labelled && d.video) warn(`${href} — course has a <video> but the card isn't labelled "Animated"`);
  });

  const changed = out !== orig;

  if (CHECK) {
    // A rerun over freshly written output must be a no-op.
    const second = rewrite(out, meta, new Set());
    if (second !== out) warn('rewrite is not idempotent — a second run would change the file');
  }

  // Report per-card diffs by comparing the old and new open tags.
  const oldTags = {};
  orig.replace(CARD, (m, href) => ((oldTags[href] = m), m));
  const updates = [];
  out.replace(CARD, (m, href) => {
    if (oldTags[href] !== undefined && oldTags[href] !== m) {
      updates.push({ href, added: meta[href].added, updated: meta[href].updated });
    }
    return m;
  });

  if (changed && !DRY && !CHECK) fs.writeFileSync(INDEX, out, 'utf8');

  /* ---- summary ---- */
  console.log(`\n${DRY ? '[DRY RUN] ' : CHECK ? '[CHECK] ' : ''}Course index metadata`);
  console.log('─'.repeat(56));
  console.log(`Scanned ${files.length} course file(s), ${seen.size} card(s) in index.html\n`);

  if (updates.length) {
    const verb = DRY || CHECK ? 'Would update' : 'Updated';
    console.log(`✅ ${verb} (${updates.length}):`);
    updates.forEach(u => {
      const dates = u.updated > u.added ? `added ${u.added}, updated ${u.updated}` : `added ${u.added}`;
      console.log(`   + ${u.href.padEnd(44)} ${dates}`);
    });
  }
  const unchanged = seen.size - updates.length;
  if (unchanged > 0) console.log(`\n↷  Already current (${unchanged}) — skipped`);

  if (warnings.length) {
    console.log(`\n⚠️  Warnings (${warnings.length}):`);
    warnings.forEach(w => console.log('   ! ' + w));
  }

  if (CHECK) {
    const stale = changed || warnings.length > 0;
    console.log(`\n${stale ? '❌ index.html is out of date — run: npm run dates' : '✅ index.html is up to date'}\n`);
    process.exit(stale ? 1 : 0);
  }

  console.log('\nDone.\n');
  process.exit(warnings.length ? 0 : 0);
}

main();
