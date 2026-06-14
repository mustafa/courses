#!/usr/bin/env node

/**
 * export-pdf.js
 *
 * Renders a single course HTML file (public/<basename>.html) to a PDF with all
 * modules expanded and the nav/progress chrome hidden.
 * Output: notebooklm-exports/pdf/<basename>.pdf
 *
 * Usage:
 *   node scripts/export-pdf.js fanatics-collect-business-course
 *   node scripts/export-pdf.js fanatics          # substring match is allowed
 *
 * Uses puppeteer-core driving the locally-installed Google Chrome (no download).
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
const PDF_DIR = path.join(PROJECT_ROOT, 'notebooklm-exports', 'pdf');

// Candidate Chrome executables, in preference order.
const CHROME_CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  path.join(process.env.HOME || '', '.cache/puppeteer/chrome/mac_arm-127.0.6533.88/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'),
];

function findChrome() {
  for (const p of CHROME_CANDIDATES) {
    if (p && fs.existsSync(p)) return p;
  }
  throw new Error('No Chrome executable found. Checked:\n' + CHROME_CANDIDATES.join('\n'));
}

/**
 * Resolves the requested course argument to an actual HTML file in public/.
 * Accepts an exact basename, a filename, or a unique substring.
 */
function resolveCourse(arg) {
  if (!arg) {
    throw new Error('Usage: node scripts/export-pdf.js <course-basename-or-substring>');
  }
  const wanted = arg.replace(/\.html$/i, '').toLowerCase();
  const htmlFiles = fs.readdirSync(PUBLIC_DIR)
    .filter(f => f.endsWith('.html') && f.toLowerCase() !== 'index.html');

  // Exact basename match first, else substring match.
  let matches = htmlFiles.filter(f => f.replace(/\.html$/i, '').toLowerCase() === wanted);
  if (matches.length === 0) {
    matches = htmlFiles.filter(f => f.toLowerCase().includes(wanted));
  }

  if (matches.length === 0) {
    throw new Error(`No course in public/ matches "${arg}". Available:\n  ` + htmlFiles.join('\n  '));
  }
  if (matches.length > 1) {
    throw new Error(`"${arg}" is ambiguous, matches:\n  ` + matches.join('\n  '));
  }
  return matches[0];
}

async function main() {
  fs.mkdirSync(PDF_DIR, { recursive: true });

  const filename = resolveCourse(process.argv[2]);
  const basename = filename.replace(/\.html$/i, '');
  const htmlPath = path.join(PUBLIC_DIR, filename);
  const pdfPath = path.join(PDF_DIR, `${basename}.pdf`);

  const executablePath = findChrome();
  console.log(`Course: ${filename}`);
  console.log(`Using Chrome: ${executablePath}`);

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    const html = fs.readFileSync(htmlPath, 'utf-8');

    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });

    // Expand every module and strip interactive/nav chrome for a clean print.
    await page.evaluate(() => {
      // Expand all collapsible module bodies (support both class conventions)
      document.querySelectorAll('.module-content, .module-body').forEach(el => {
        el.classList.add('open');
        el.style.display = 'block';
      });
      document.querySelectorAll('.module').forEach(el => el.classList.add('open'));

      // Hide UI chrome that adds no value in a static PDF
      const hideSelectors = [
        'nav', '.nav-progress', '.nav-links', '.progress-check',
        '.progress-bar', '.progress-wrap', '.sidebar', '#sidebar',
        '.top-bar', '.hamburger', '.search-box', '.mark-complete',
      ];
      hideSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => { el.style.display = 'none'; });
      });

      document.querySelectorAll('input[type="checkbox"]').forEach(el => { el.style.display = 'none'; });

      // Let content use the full page width
      const main = document.querySelector('main, .main');
      if (main) {
        main.style.margin = '0 auto';
        main.style.maxWidth = '100%';
        main.style.padding = '0 8px';
        main.style.marginLeft = '0';
      }
    });

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: { top: '36px', right: '32px', bottom: '36px', left: '32px' },
      printBackground: true,
      preferCSSPageSize: false,
    });

    const sizeKB = (fs.statSync(pdfPath).size / 1024).toFixed(1);
    console.log(`\n✓ PDF written: ${pdfPath} (${sizeKB} KB)`);
  } finally {
    await browser.close();
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
