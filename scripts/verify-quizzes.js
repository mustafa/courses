#!/usr/bin/env node
/* Verify agent-authored quiz/flashcard content: additive-only vs baseline,
   structural balance, and quiz/flashcard markup validity. */
'use strict';
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const PUB = path.join(__dirname, '..', 'public');
const BASE = process.env.BASELINE; // dir with pre-edit copies

const files = process.argv.slice(2);
let hadError = false;

for (const file of files) {
  console.log('\n══════ ' + file + ' ══════');
  const html = fs.readFileSync(path.join(PUB, file), 'utf8');
  const $ = cheerio.load(html, { decodeEntities: false });

  // 1) additive-only check vs baseline (every original non-blank line still present, in order)
  if (BASE && fs.existsSync(path.join(BASE, file))) {
    const orig = fs.readFileSync(path.join(BASE, file), 'utf8').split('\n');
    const now = html.split('\n');
    let i = 0, missing = 0, firstMissing = null;
    for (const line of orig) {
      const found = now.indexOf(line, i);
      if (found === -1) { missing++; if (!firstMissing) firstMissing = line.slice(0, 70); }
      else i = found + 1;
    }
    if (missing === 0) console.log('✅ additive-only: all ' + orig.length + ' baseline lines present in order (0 removed/modified)');
    else { console.log('❌ additive-only FAILED: ' + missing + ' baseline lines missing. First: ' + firstMissing); hadError = true; }
    console.log('   lines: ' + orig.length + ' → ' + now.length + ' (+' + (now.length - orig.length) + ')');
  }

  // 2) structural counts
  const modules = $('.module').length;
  const quizzes = $('.quiz[data-question]');
  const cards = $('.flashcard');
  const decks = $('.flashcards');
  console.log('   modules: ' + modules + ' | quizzes: ' + quizzes.length + ' | flashcard decks: ' + decks.length + ' | cards: ' + cards.length);

  // 3) quiz markup validity
  let badAnswer = 0, badOptions = 0, emptyQ = 0, quizNotInModule = 0;
  quizzes.each((_, el) => {
    const q = $(el);
    const question = q.attr('data-question') || '';
    const optsRaw = q.attr('data-options') || '';
    const opts = optsRaw.split('|').map(s => s.trim()).filter(Boolean);
    const ans = parseInt(q.attr('data-answer'), 10);
    if (!question.trim()) emptyQ++;
    if (opts.length < 2) badOptions++;
    if (isNaN(ans) || ans < 0 || ans >= opts.length) { badAnswer++; }
    if (!q.closest('.module').length) quizNotInModule++;
    if (q.text().trim()) console.log('   ⚠ quiz has inner text (should be empty): ' + q.text().slice(0,40));
  });
  const okAns = quizzes.length - badAnswer;
  console.log((badAnswer ? '❌' : '✅') + ' data-answer valid: ' + okAns + '/' + quizzes.length + (badAnswer ? ' (' + badAnswer + ' out of range!)' : ''));
  console.log((badOptions ? '❌' : '✅') + ' options (>=2): ' + (quizzes.length - badOptions) + '/' + quizzes.length);
  console.log((emptyQ ? '❌' : '✅') + ' non-empty questions: ' + (quizzes.length - emptyQ) + '/' + quizzes.length);
  console.log((quizNotInModule ? '❌' : '✅') + ' quizzes inside a .module: ' + (quizzes.length - quizNotInModule) + '/' + quizzes.length);

  // 4) flashcard validity
  let badCard = 0;
  cards.each((_, el) => { const c = $(el); if (!(c.attr('data-front') || '').trim() || !(c.attr('data-back') || '').trim()) badCard++; });
  console.log((badCard ? '❌' : '✅') + ' flashcards with front+back: ' + (cards.length - badCard) + '/' + cards.length);

  if (badAnswer || badOptions || emptyQ || quizNotInModule || badCard) hadError = true;
}

console.log('\n' + (hadError ? '❌ ISSUES FOUND' : '✅ ALL CHECKS PASSED'));
process.exit(hadError ? 1 : 0);
