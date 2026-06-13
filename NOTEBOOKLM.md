# Exporting Courses for Google NotebookLM

This project includes a conversion pipeline that transforms the interactive HTML courses into clean formats suitable for [Google NotebookLM](https://notebooklm.google.com).

## Quick Start

```bash
npm run export-notebooklm
```

This scans `public/` for all HTML course files (skipping `index.html`), and generates:

```
notebooklm-exports/
  markdown/    ← Primary format — clean .md files with headers, lists, tables
  text/        ← Backup — plain .txt files, no formatting
  pdf/         ← PDF versions (requires Puppeteer — see below)
```

## Uploading to NotebookLM

1. Go to [notebooklm.google.com](https://notebooklm.google.com)
2. Create a new notebook (or open an existing one)
3. Click **Add source** and upload files from `notebooklm-exports/markdown/`
4. NotebookLM will index the content and let you generate audio overviews, ask questions, create study guides, etc.

**Recommended format:** Use the **Markdown (.md)** files. They preserve document structure (headings, lists, tables, code blocks) while being clean enough for NotebookLM to parse well. The plain text files are a fallback if markdown causes any issues.

## What the Converter Does

- Strips all JavaScript, CSS, and HTML tags
- Removes UI chrome: navigation bars, sidebars, progress bars, search boxes, interactive calculators
- Preserves educational content: headings, paragraphs, lists, tables, code blocks, callout boxes
- Converts callout boxes (tips, warnings, examples, highlights) into blockquotes
- Each file starts with the course title as an H1 heading
- Handles special characters and HTML entities

## PDF Generation (Optional)

To also generate PDF versions:

```bash
npm install puppeteer
npm run export-notebooklm
```

Puppeteer launches a headless browser to render each course with all modules expanded, then prints to PDF. If Puppeteer isn't installed, the script skips PDF generation and still produces markdown and text files.

## Re-running

The script overwrites existing exports, so you can re-run it any time after updating courses. Just run `npm run export-notebooklm` again.
