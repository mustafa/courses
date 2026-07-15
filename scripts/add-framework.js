#!/usr/bin/env node
/*
 * add-framework.js — retrofit every course in public/ with the interactive
 * framework by injecting two tags. Content-preserving and idempotent:
 *   • <link rel="stylesheet" href="course-framework.css"> before </head>
 *   • <script src="course-framework.js"></script> before </body>
 * Skips index.html, the framework files themselves, and non-course assets.
 * Run:  node scripts/add-framework.js   (add --dry to preview)
 */
'use strict';
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const DRY = process.argv.includes('--dry');

const SKIP = new Set([
  'index.html',
  'sw.js',
  'manifest.json',
  'course-framework.css',
  'course-framework.js'
]);

const CSS_TAG = '<link rel="stylesheet" href="course-framework.css">';
const JS_TAG = '<script src="course-framework.js"></script>';
const MARKER = 'course-framework.js';

function injectCss(html) {
  if (html.includes('course-framework.css')) return html;
  const idx = html.search(/<\/head\s*>/i);
  if (idx === -1) return html; // no head — leave untouched
  return html.slice(0, idx) + '  ' + CSS_TAG + '\n' + html.slice(idx);
}

function injectJs(html) {
  if (html.includes(JS_TAG)) return html;
  // inject before the LAST </body> so it runs after the course's own scripts
  const idx = html.toLowerCase().lastIndexOf('</body>');
  if (idx === -1) return html;
  return html.slice(0, idx) + JS_TAG + '\n' + html.slice(idx);
}

function main() {
  let files;
  try {
    files = fs.readdirSync(PUBLIC_DIR);
  } catch (e) {
    console.error('Could not read', PUBLIC_DIR, e.message);
    process.exit(1);
  }

  const htmlFiles = files
    .filter(f => f.toLowerCase().endsWith('.html'))
    .filter(f => !SKIP.has(f))
    .sort();

  const updated = [];
  const already = [];
  const skippedNoAnchor = [];

  for (const file of htmlFiles) {
    const full = path.join(PUBLIC_DIR, file);
    const orig = fs.readFileSync(full, 'utf8');

    if (orig.includes(MARKER)) { already.push(file); continue; }
    if (!/<\/head\s*>/i.test(orig) || !/<\/body\s*>/i.test(orig)) {
      skippedNoAnchor.push(file);
      continue;
    }

    let out = injectCss(orig);
    out = injectJs(out);

    if (out !== orig) {
      if (!DRY) fs.writeFileSync(full, out, 'utf8');
      updated.push(file);
    }
  }

  console.log(`\n${DRY ? '[DRY RUN] ' : ''}Interactive framework retrofit`);
  console.log('─'.repeat(48));
  console.log(`Scanned ${htmlFiles.length} course file(s) in public/\n`);

  if (updated.length) {
    console.log(`✅ ${DRY ? 'Would update' : 'Updated'} (${updated.length}):`);
    updated.forEach(f => console.log('   + ' + f));
  }
  if (already.length) {
    console.log(`\n↷  Already had framework (${already.length}) — skipped:`);
    already.forEach(f => console.log('   · ' + f));
  }
  if (skippedNoAnchor.length) {
    console.log(`\n⚠️  No <head>/<body> anchor (${skippedNoAnchor.length}) — skipped:`);
    skippedNoAnchor.forEach(f => console.log('   ! ' + f));
  }
  console.log(`\nSkipped by rule: ${[...SKIP].join(', ')}`);
  console.log('Done.\n');
}

main();
