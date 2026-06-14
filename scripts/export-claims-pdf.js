#!/usr/bin/env node

/**
 * export-claims-pdf.js
 *
 * Renders the Claims Systems Architecture course (public/claims-system-architecture-course.html)
 * to a single PDF with all 8 modules expanded and the nav/progress chrome hidden.
 * Output: notebooklm-exports/pdf/claims-system-architecture-course.pdf
 *
 * Uses puppeteer-core driving the locally-installed Google Chrome (no browser download).
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const HTML_PATH = path.join(PROJECT_ROOT, 'public', 'claims-system-architecture-course.html');
const PDF_DIR = path.join(PROJECT_ROOT, 'notebooklm-exports', 'pdf');
const PDF_PATH = path.join(PDF_DIR, 'claims-system-architecture-course.pdf');

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

async function main() {
  fs.mkdirSync(PDF_DIR, { recursive: true });

  const executablePath = findChrome();
  console.log(`Using Chrome: ${executablePath}`);

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    const html = fs.readFileSync(HTML_PATH, 'utf-8');

    // Load from disk-equivalent content so relative URLs (none here) behave.
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });

    // Expand every module and strip interactive/nav chrome for a clean print.
    await page.evaluate(() => {
      // Expand all collapsible module bodies
      document.querySelectorAll('.module-content').forEach(el => el.classList.add('open'));

      // Hide UI chrome that adds no value in a static PDF
      const hideSelectors = ['nav', '.nav-progress', '.progress-check', '.progress-bar'];
      hideSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => { el.style.display = 'none'; });
      });

      // Make the checkbox column collapse cleanly
      document.querySelectorAll('input[type="checkbox"]').forEach(el => { el.style.display = 'none'; });

      // Let content use the full page width
      const main = document.querySelector('main');
      if (main) {
        main.style.margin = '0 auto';
        main.style.maxWidth = '100%';
        main.style.padding = '0 8px';
      }
    });

    // Print-friendly background colors retained (printBackground: true).
    await page.pdf({
      path: PDF_PATH,
      format: 'A4',
      margin: { top: '36px', right: '32px', bottom: '36px', left: '32px' },
      printBackground: true,
      preferCSSPageSize: false,
    });

    const sizeKB = (fs.statSync(PDF_PATH).size / 1024).toFixed(1);
    console.log(`\n✓ PDF written: ${PDF_PATH} (${sizeKB} KB)`);
  } finally {
    await browser.close();
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
