#!/usr/bin/env node

/**
 * export-for-notebooklm.js
 *
 * Converts HTML course files from public/ into clean Markdown and plain-text
 * formats suitable for uploading to Google NotebookLM.
 *
 * Usage:
 *   node scripts/export-for-notebooklm.js
 *   npm run export-notebooklm
 *
 * Output:
 *   notebooklm-exports/
 *     markdown/   — .md files (primary format for NotebookLM)
 *     text/       — .txt files (backup/plain-text option)
 *     pdf/        — .pdf files (if Puppeteer is available)
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const TurndownService = require('turndown');

// ─── Configuration ───────────────────────────────────────────────────────────

const PROJECT_ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
const EXPORT_DIR = path.join(PROJECT_ROOT, 'notebooklm-exports');
const MD_DIR = path.join(EXPORT_DIR, 'markdown');
const TXT_DIR = path.join(EXPORT_DIR, 'text');
const PDF_DIR = path.join(EXPORT_DIR, 'pdf');

// Files to skip (not courses)
const SKIP_FILES = ['index.html'];

// ─── Turndown (HTML → Markdown) Configuration ───────────────────────────────

function createTurndownService() {
  const td = new TurndownService({
    headingStyle: 'atx',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    emDelimiter: '*',
    strongDelimiter: '**',
    hr: '---',
  });

  // Preserve table formatting — handle the whole table at once via cheerio
  // Also add a pass-through rule for tr/td/th so Turndown doesn't choke on them
  td.addRule('tableCell', {
    filter: ['td', 'th'],
    replacement(content) {
      return content.replace(/\n/g, ' ').trim();
    },
  });

  td.addRule('tableRow', {
    filter: 'tr',
    replacement(content) {
      return content;
    },
  });

  td.addRule('tableHead', {
    filter: ['thead', 'tbody', 'tfoot'],
    replacement(content) {
      return content;
    },
  });

  td.addRule('table', {
    filter: 'table',
    replacement(content, node) {
      // Use the node's outerHTML if available; fall back to reconstructing from content
      let html;
      try {
        html = node.outerHTML;
      } catch {
        return '\n\n' + content + '\n\n';
      }
      if (!html) return '\n\n' + content + '\n\n';

      const $t = cheerio.load(html);
      const rows = [];

      $t('tr').each((i, tr) => {
        const cells = [];
        $t(tr).children('th, td').each((_, cell) => {
          cells.push($t(cell).text().replace(/\n/g, ' ').trim());
        });
        if (cells.length > 0) rows.push(cells);
      });

      if (rows.length === 0) return '\n\n' + content + '\n\n';

      // Determine column count from widest row
      const colCount = Math.max(...rows.map(r => r.length));

      // Build markdown table
      let table = '\n\n';
      rows.forEach((row, i) => {
        // Pad row to colCount
        while (row.length < colCount) row.push('');
        table += '| ' + row.join(' | ') + ' |\n';
        if (i === 0) {
          table += '| ' + row.map(() => '---').join(' | ') + ' |\n';
        }
      });
      return table + '\n';
    },
  });

  // Handle highlighted/callout boxes
  td.addRule('calloutBoxes', {
    filter(node) {
      if (node.nodeName !== 'DIV') return false;
      const cls = node.getAttribute && node.getAttribute('class') || '';
      return /\b(highlight|warning|tip|example)\b/.test(cls);
    },
    replacement(content, node) {
      const cls = node.getAttribute && node.getAttribute('class') || '';
      let prefix = '';
      if (cls.includes('warning')) prefix = '> **Warning:**';
      else if (cls.includes('tip')) prefix = '> **Tip:**';
      else if (cls.includes('example')) prefix = '> **Example:**';
      else prefix = '> **Key Point:**';

      // If content already starts with bold text, don't double the prefix
      const trimmed = content.trim();
      if (
        (prefix.includes('Example') && trimmed.startsWith('**')) ||
        (prefix.includes('Key Point') && trimmed.startsWith('**'))
      ) {
        return '\n\n> ' + trimmed.replace(/\n/g, '\n> ') + '\n\n';
      }

      return '\n\n' + prefix + ' ' + trimmed.replace(/\n/g, '\n> ') + '\n\n';
    },
  });

  // Handle code/monospace spans (e.g. IRS references)
  td.addRule('irsRef', {
    filter(node) {
      const cls = node.getAttribute && node.getAttribute('class') || '';
      return node.nodeName === 'SPAN' && cls.includes('irs-ref');
    },
    replacement(content) {
      return '`' + content.trim() + '`';
    },
  });

  // Handle code blocks
  td.addRule('codeBlocks', {
    filter: 'pre',
    replacement(content, node) {
      // Turndown nodes may not have querySelector — use textContent or content
      let lang = '';
      let text = content;
      try {
        const code = node.querySelector && node.querySelector('code');
        if (code) {
          lang = (code.className && code.className.match(/language-(\w+)/) || [])[1] || '';
          text = code.textContent || content;
        } else {
          text = node.textContent || content;
        }
      } catch {
        text = node.textContent || content;
      }
      return '\n\n```' + lang + '\n' + text.trim() + '\n```\n\n';
    },
  });

  // Remove elements we don't want in output
  td.remove(['script', 'style', 'noscript', 'iframe']);

  return td;
}

// ─── HTML Content Extraction ─────────────────────────────────────────────────

/**
 * Extracts the course title from the HTML.
 */
function extractTitle(html) {
  const $ = cheerio.load(html);

  // Try <title> tag first
  let title = $('title').text().trim();

  // Fall back to first h1 or .logo text
  if (!title) {
    title = $('h1').first().text().trim();
  }
  if (!title) {
    title = $('.logo').first().text().trim();
  }

  // Clean up the title — remove trailing " — A Course for..." or similar
  return title || 'Untitled Course';
}

/**
 * Extracts the main educational content from a course HTML file.
 * Strips navigation, progress bars, search, sidebar, scripts, styles, and other UI chrome.
 */
function extractContent($) {
  // Clone the document so we don't mutate the original
  const $doc = cheerio.load($.html());

  // Remove all UI chrome elements
  const removeSelectors = [
    'script',
    'style',
    'noscript',
    'iframe',
    '.top-bar',
    '.sidebar',
    '#sidebar',
    '.search-box',
    '.search-results',
    '.progress-wrap',
    '.progress-bar',
    '.progress-fill',
    '.hamburger',
    '.nav-item',
    'nav',
    '.mark-complete',
    '.calc-btn',             // Calculator buttons (interactive, not content)
    'input',
    'select',
    'button',
    '.progress-check',       // Checkbox progress markers
    '[onclick]',             // Elements that are purely interactive
  ];

  removeSelectors.forEach(sel => {
    $doc(sel).remove();
  });

  // For module headers, unwrap the decorative elements but keep the text
  // Replace module-header structure with clean headings
  $doc('.module-header').each((_, el) => {
    const $el = $doc(el);
    const h2Text = $el.find('h2').text().trim();
    const subtitle = $el.find('p').text().trim();
    const modNum = $el.find('.mod-num, .num').text().trim();

    let replacement = '';
    if (h2Text) {
      replacement = `<h2>${modNum ? 'Module ' + modNum + ': ' : ''}${h2Text}</h2>`;
      if (subtitle) {
        replacement += `<p><em>${subtitle}</em></p>`;
      }
    }
    $el.replaceWith(replacement);
  });

  // Make all module bodies visible (they may be display:none by default)
  $doc('.module-body').css('display', 'block').addClass('open');
  $doc('.module').addClass('open');

  // Remove calculator interactive elements but keep any descriptive content
  $doc('.calc-box').each((_, el) => {
    const $el = $doc(el);
    // Keep the title and any descriptive text, remove inputs/buttons
    $el.find('input, select, button, .calc-btn, .calc-grid, .calc-result').remove();
    const heading = $el.find('h4').text().trim();
    if (heading && $el.text().trim() === heading) {
      // Only a heading left, just mention the calculator
      $el.replaceWith(`<p><em>[Interactive Calculator: ${heading}]</em></p>`);
    }
  });

  // Remove empty divs left behind
  $doc('div').each((_, el) => {
    const $el = $doc(el);
    if ($el.text().trim() === '' && $el.children().length === 0) {
      $el.remove();
    }
  });

  // Get the main content area
  let contentHtml = '';
  const $main = $doc('main, .main, .content, .course-content, article');
  if ($main.length) {
    contentHtml = $main.html();
  } else {
    // Fall back to body content
    contentHtml = $doc('body').html();
  }

  return contentHtml || '';
}

// ─── Conversion Functions ────────────────────────────────────────────────────

/**
 * Converts an HTML course file to clean Markdown.
 */
function htmlToMarkdown(htmlContent) {
  const $ = cheerio.load(htmlContent);
  const title = extractTitle(htmlContent);
  const contentHtml = extractContent($);

  const td = createTurndownService();
  let markdown = td.turndown(contentHtml);

  // Clean up excessive whitespace
  markdown = markdown
    .replace(/\n{4,}/g, '\n\n\n')     // Max 3 consecutive newlines
    .replace(/[ \t]+$/gm, '')          // Trailing whitespace per line
    .replace(/^\n+/, '')               // Leading newlines
    .replace(/\n+$/, '\n');            // Trailing newlines

  // Add title header at the top
  const output = `# ${title}\n\n${markdown}`;

  return output;
}

/**
 * Converts an HTML course file to plain text (no markdown formatting).
 */
function htmlToPlainText(htmlContent) {
  const $ = cheerio.load(htmlContent);
  const title = extractTitle(htmlContent);
  const contentHtml = extractContent($);

  // Load the extracted content
  const $content = cheerio.load(contentHtml);

  // Build plain text with structural hints

  // Replace headings with uppercase + underlines
  $content('h1').each((_, el) => {
    const text = $content(el).text().trim();
    $content(el).replaceWith(`\n${'='.repeat(text.length)}\n${text.toUpperCase()}\n${'='.repeat(text.length)}\n\n`);
  });
  $content('h2').each((_, el) => {
    const text = $content(el).text().trim();
    $content(el).replaceWith(`\n${'-'.repeat(text.length)}\n${text}\n${'-'.repeat(text.length)}\n\n`);
  });
  $content('h3').each((_, el) => {
    const text = $content(el).text().trim();
    $content(el).replaceWith(`\n${text}\n${'-'.repeat(Math.min(text.length, 40))}\n\n`);
  });
  $content('h4, h5, h6').each((_, el) => {
    const text = $content(el).text().trim();
    $content(el).replaceWith(`\n${text}\n\n`);
  });

  // Replace list items with bullets/numbers
  $content('ul li').each((_, el) => {
    const text = $content(el).text().trim();
    $content(el).replaceWith(`  * ${text}\n`);
  });
  $content('ol li').each((i, el) => {
    const text = $content(el).text().trim();
    $content(el).replaceWith(`  ${i + 1}. ${text}\n`);
  });

  // Handle tables → tab-separated
  $content('table').each((_, table) => {
    let tableText = '\n';
    $content(table).find('tr').each((_, tr) => {
      const cells = [];
      $content(tr).children('th, td').each((_, cell) => {
        cells.push($content(cell).text().trim());
      });
      tableText += cells.join('\t|\t') + '\n';
    });
    $content(table).replaceWith(tableText + '\n');
  });

  // Handle code blocks
  $content('pre').each((_, el) => {
    const text = $content(el).text().trim();
    $content(el).replaceWith(`\n---code---\n${text}\n---/code---\n\n`);
  });

  // Get text content
  let text = $content.text();

  // Clean up
  text = text
    .replace(/\n{4,}/g, '\n\n\n')
    .replace(/[ \t]+$/gm, '')
    .replace(/^\n+/, '')
    .replace(/\n+$/, '\n');

  return `${title.toUpperCase()}\n${'='.repeat(title.length)}\n\n${text}`;
}

// ─── File Discovery ──────────────────────────────────────────────────────────

/**
 * Finds all HTML course files in public/, excluding skip list.
 */
function findCourseFiles() {
  const files = fs.readdirSync(PUBLIC_DIR).filter(f => {
    return (
      f.endsWith('.html') &&
      !SKIP_FILES.includes(f.toLowerCase())
    );
  });
  return files.sort();
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║     NotebookLM Export — Course Content Converter            ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  // Create output directories
  [EXPORT_DIR, MD_DIR, TXT_DIR, PDF_DIR].forEach(dir => {
    fs.mkdirSync(dir, { recursive: true });
  });

  // Find course files
  const courseFiles = findCourseFiles();
  console.log(`Found ${courseFiles.length} course files in public/:\n`);
  courseFiles.forEach(f => console.log(`  • ${f}`));
  console.log('');

  const results = [];

  for (const filename of courseFiles) {
    const basename = filename.replace('.html', '');
    const htmlPath = path.join(PUBLIC_DIR, filename);
    const mdPath = path.join(MD_DIR, `${basename}.md`);
    const txtPath = path.join(TXT_DIR, `${basename}.txt`);

    console.log(`Processing: ${filename}`);

    try {
      const html = fs.readFileSync(htmlPath, 'utf-8');

      // Convert to Markdown
      const markdown = htmlToMarkdown(html);
      fs.writeFileSync(mdPath, markdown, 'utf-8');
      const mdSize = fs.statSync(mdPath).size;

      // Convert to Plain Text
      const plainText = htmlToPlainText(html);
      fs.writeFileSync(txtPath, plainText, 'utf-8');
      const txtSize = fs.statSync(txtPath).size;

      results.push({
        source: filename,
        markdown: { path: mdPath, size: mdSize },
        text: { path: txtPath, size: txtSize },
      });

      console.log(`  ✓ Markdown: ${formatSize(mdSize)}`);
      console.log(`  ✓ Text:     ${formatSize(txtSize)}`);
    } catch (err) {
      console.error(`  ✗ Error: ${err.message}`);
    }
  }

  // Try PDF generation with Puppeteer
  await generatePDFs(courseFiles, results);

  // Summary
  console.log('\n' + '─'.repeat(62));
  console.log('EXPORT SUMMARY');
  console.log('─'.repeat(62));
  console.log(`\nExported ${results.length} courses to: ${EXPORT_DIR}/\n`);

  console.log('Markdown files (primary — best for NotebookLM):');
  results.forEach(r => {
    console.log(`  ${path.basename(r.markdown.path).padEnd(45)} ${formatSize(r.markdown.size).padStart(10)}`);
  });

  console.log('\nPlain text files (backup):');
  results.forEach(r => {
    console.log(`  ${path.basename(r.text.path).padEnd(45)} ${formatSize(r.text.size).padStart(10)}`);
  });

  if (results.some(r => r.pdf)) {
    console.log('\nPDF files:');
    results.filter(r => r.pdf).forEach(r => {
      console.log(`  ${path.basename(r.pdf.path).padEnd(45)} ${formatSize(r.pdf.size).padStart(10)}`);
    });
  }

  const totalMd = results.reduce((s, r) => s + r.markdown.size, 0);
  const totalTxt = results.reduce((s, r) => s + r.text.size, 0);
  const totalPdf = results.filter(r => r.pdf).reduce((s, r) => s + r.pdf.size, 0);

  console.log(`\nTotal markdown: ${formatSize(totalMd)}`);
  console.log(`Total text:     ${formatSize(totalTxt)}`);
  if (totalPdf) console.log(`Total PDF:      ${formatSize(totalPdf)}`);
  console.log('\nReady to upload to Google NotebookLM!');
  console.log('  → Go to notebooklm.google.com');
  console.log('  → Create a new notebook');
  console.log('  → Upload files from notebooklm-exports/markdown/');
}

/**
 * Attempts to generate PDF versions using Puppeteer.
 * Falls back gracefully if Puppeteer is not installed.
 */
async function generatePDFs(courseFiles, results) {
  let puppeteer;
  try {
    puppeteer = require('puppeteer');
  } catch {
    console.log('\n⚠  Puppeteer not installed — skipping PDF generation.');
    console.log('   To generate PDFs, run: npm install puppeteer');
    console.log('   Then re-run this script.\n');
    return;
  }

  console.log('\nGenerating PDFs with Puppeteer...');
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    for (const filename of courseFiles) {
      const basename = filename.replace('.html', '');
      const htmlPath = path.join(PUBLIC_DIR, filename);
      const pdfPath = path.join(PDF_DIR, `${basename}.pdf`);

      try {
        const page = await browser.newPage();
        const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

        await page.setContent(htmlContent, { waitUntil: 'networkidle0', timeout: 30000 });

        // Expand all modules so all content is visible
        await page.evaluate(() => {
          document.querySelectorAll('.module-body').forEach(el => {
            el.style.display = 'block';
            el.classList.add('open');
          });
          document.querySelectorAll('.module').forEach(el => {
            el.classList.add('open');
          });
          // Hide UI chrome for print
          const hide = ['.top-bar', '.sidebar', '#sidebar', '.hamburger',
            '.search-box', '.progress-wrap', '.mark-complete', 'nav',
            '.progress-check'];
          hide.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => el.style.display = 'none');
          });
          // Remove sidebar margin
          const main = document.querySelector('.main, main');
          if (main) {
            main.style.marginLeft = '0';
            main.style.maxWidth = '100%';
          }
        });

        await page.pdf({
          path: pdfPath,
          format: 'A4',
          margin: { top: '40px', right: '40px', bottom: '40px', left: '40px' },
          printBackground: true,
        });

        const pdfSize = fs.statSync(pdfPath).size;
        const result = results.find(r => r.source === filename);
        if (result) result.pdf = { path: pdfPath, size: pdfSize };
        console.log(`  ✓ PDF: ${basename}.pdf (${formatSize(pdfSize)})`);

        await page.close();
      } catch (err) {
        console.error(`  ✗ PDF error for ${filename}: ${err.message}`);
      }
    }
  } catch (err) {
    console.error(`  ✗ Puppeteer error: ${err.message}`);
  } finally {
    if (browser) await browser.close();
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ─── Run ─────────────────────────────────────────────────────────────────────

main().catch(err => {
  console.error('\nFatal error:', err);
  process.exit(1);
});
