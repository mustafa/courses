/*!
 * course-framework.js — self-contained interactive layer for Mustafa's courses.
 * No dependencies, works offline. Include once per course:
 *   <link rel="stylesheet" href="course-framework.css">
 *   <script src="course-framework.js"></script>
 * Everything is namespaced cf-/cf: and each feature is independently guarded,
 * so a missing element or a single failure never breaks the course.
 */
(function () {
  'use strict';
  if (window.__cfLoaded) return;
  window.__cfLoaded = true;

  /* ---------- storage (per-course + global) ---------- */
  // Strip a trailing .html so /course.html and the clean /course URL (cleanUrls)
  // share the same progress/bookmark storage.
  var NS = 'cf:' + (location.pathname || '/').replace(/\.html?$/i, '').toLowerCase();
  function lget(k, d) { try { var v = localStorage.getItem(NS + ':' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }
  function lset(k, v) { try { localStorage.setItem(NS + ':' + k, JSON.stringify(v)); } catch (e) {} }
  function gget(k, d) { try { var v = localStorage.getItem('cf:g:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }
  function gset(k, v) { try { localStorage.setItem('cf:g:' + k, JSON.stringify(v)); } catch (e) {} }

  /* ---------- tiny DOM helpers ---------- */
  function h(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) { if (k === 'class') e.className = attrs[k]; else e.setAttribute(k, attrs[k]); }
    if (html != null) e.innerHTML = html;
    return e;
  }
  function qa(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function on(el, ev, fn, o) { el.addEventListener(ev, fn, o || false); }
  function safe(fn) { try { fn(); } catch (e) { /* one feature down, rest live */ if (window.console) console.warn('[cf]', e); } }

  /* ================= THEME ================= */
  function applyTheme(t) {
    document.documentElement.setAttribute('data-cf-theme', t);
    gset('theme', t);
    var b = document.getElementById('cf-theme-btn'); if (b) b.textContent = t === 'light' ? '☀' : '☾';
  }
  function initTheme() { applyTheme(gget('theme', 'dark')); }
  function toggleTheme() { applyTheme(document.documentElement.getAttribute('data-cf-theme') === 'light' ? 'dark' : 'light'); }

  /* ================= DOCK ================= */
  function initDock() {
    var dock = h('div', { 'class': 'cf-dock', role: 'toolbar', 'aria-label': 'Course tools' });
    var search = h('button', { 'class': 'cf-btn', id: 'cf-search-btn', title: 'Search (/)' }, '⌕');
    var bm = h('button', { 'class': 'cf-btn', id: 'cf-bm-btn', title: 'Bookmarks' }, '✦');
    var theme = h('button', { 'class': 'cf-btn', id: 'cf-theme-btn', title: 'Light / dark' }, '☾');
    var prog = h('button', { 'class': 'cf-btn cf-prog', id: 'cf-prog-btn', title: 'Jump to next unread' },
      '<span class="cf-ring"></span><span class="cf-pct">0%</span>');
    on(search, 'click', toggleSearch); on(bm, 'click', toggleBookmarks);
    on(theme, 'click', toggleTheme); on(prog, 'click', jumpNext);
    dock.appendChild(search); dock.appendChild(bm); dock.appendChild(theme); dock.appendChild(prog);
    document.body.appendChild(dock);
    applyTheme(gget('theme', 'dark'));
  }

  /* ================= MODULES: reading time + complete + progress ================= */
  function getModules() {
    return qa('.module').filter(function (m) { var p = m.parentElement; return !(p && p.closest('.module')); });
  }
  function initModules() {
    var mods = getModules();
    if (!mods.length) return;
    var done = lget('done', {});
    mods.forEach(function (m, i) {
      var words = (m.textContent || '').trim().split(/\s+/).length;
      var mins = Math.max(1, Math.round(words / 200));
      var hdr = m.querySelector('.module-header') || m.querySelector('h2, h3, h4') || m;
      var meta = h('div', { 'class': 'cf-modmeta' });
      meta.appendChild(h('span', { 'class': 'cf-rt' }, '◷ ' + mins + ' min'));
      var chk = h('button', { 'class': 'cf-done' + (done[i] ? ' on' : ''), 'aria-pressed': done[i] ? 'true' : 'false' }, done[i] ? '✓ Done' : 'Mark done');
      on(chk, 'click', function (ev) {
        ev.stopPropagation(); ev.preventDefault();
        var d = lget('done', {}); d[i] = !d[i]; if (!d[i]) delete d[i]; lset('done', d);
        var isOn = !!d[i]; chk.classList.toggle('on', isOn); chk.textContent = isOn ? '✓ Done' : 'Mark done';
        chk.setAttribute('aria-pressed', isOn ? 'true' : 'false');
        updateProgress();
      });
      meta.appendChild(chk);
      if (hdr === m) m.insertBefore(meta, m.firstChild); else hdr.appendChild(meta);
    });
    buildTopBar();
    updateProgress();
  }
  function buildTopBar() {
    if (document.querySelector('#progress-bar, #progressFill, .progress-bar-fill, .progress-bar-container, #cf-topbar')) return;
    var bar = h('div', { 'class': 'cf-topbar', id: 'cf-topbar' });
    bar.appendChild(h('div', { 'class': 'cf-topbar-fill', id: 'cf-topbar-fill' }));
    document.body.appendChild(bar);
  }
  function updateProgress() {
    var mods = getModules(); if (!mods.length) return;
    var done = lget('done', {}), c = 0;
    for (var i = 0; i < mods.length; i++) if (done[i]) c++;
    var pct = Math.round(c / mods.length * 100);
    var fill = document.getElementById('cf-topbar-fill'); if (fill) fill.style.width = pct + '%';
    var ring = document.querySelector('.cf-prog');
    if (ring) { ring.style.setProperty('--p', pct); var t = ring.querySelector('.cf-pct'); if (t) t.textContent = pct + '%'; }
    if (pct === 100 && !lget('celebrated', false)) { lset('celebrated', true); celebrate(); }
    if (pct < 100) lset('celebrated', false);
  }
  function jumpNext() {
    var mods = getModules(), done = lget('done', {});
    for (var i = 0; i < mods.length; i++) if (!done[i]) { scrollToEl(mods[i]); return; }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function celebrate() {
    var colors = ['#58a6ff', '#3fb950', '#d29922', '#f85149'];
    var cel = h('div', { 'class': 'cf-cel' }, '🎉 Course complete! Nice work.');
    document.body.appendChild(cel);
    for (var i = 0; i < 26; i++) {
      var c = h('div', { 'class': 'cf-confetti' });
      c.style.cssText = 'left:' + (Math.random() * 96) + 'vw;background:' + colors[i % 4] + ';animation-duration:' + (1.6 + Math.random() * 1.4) + 's';
      document.body.appendChild(c);
      setTimeout(c.remove.bind(c), 3600);
    }
    setTimeout(function () { cel.style.transition = 'opacity .4s'; cel.style.opacity = '0'; setTimeout(function () { cel.remove(); }, 420); }, 2600);
  }

  /* ================= CODE: copy + light highlight ================= */
  function initCode() {
    qa('pre').forEach(function (pre) {
      if (pre.querySelector('.cf-copy')) return;
      if (getComputedStyle(pre).position === 'static') pre.style.position = 'relative';
      var btn = h('button', { 'class': 'cf-copy' }, 'Copy');
      on(btn, 'click', function () { copyText((pre.querySelector('code') || pre).textContent, btn); });
      pre.appendChild(btn);
      safe(function () { highlight(pre.querySelector('code')); });
    });
  }
  function copyText(txt, btn) {
    function done() { btn.textContent = 'Copied!'; btn.classList.add('ok'); setTimeout(function () { btn.textContent = 'Copy'; btn.classList.remove('ok'); }, 1400); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, function () { legacyCopy(txt); done(); });
    else { legacyCopy(txt); done(); }
  }
  function legacyCopy(txt) {
    var ta = h('textarea'); ta.value = txt; ta.style.cssText = 'position:fixed;opacity:0;top:0';
    document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (e) {} ta.remove();
  }
  // Single pass: comment/string/number/keyword. String & comment alts come first,
  // so keywords *inside* them are consumed and never re-highlighted. Runs on
  // already-escaped text; guarded by the caller — any throw leaves code untouched.
  var HL = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|&lt;!--[\s\S]*?--&gt;)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|\b(0x[0-9a-fA-F]+|\d[\d_]*\.?\d*)\b|\b(function|const|let|var|if|else|return|for|while|class|import|from|export|async|await|def|new|try|catch|throw|True|False|None|true|false|null|func|type|switch|case|break|continue|print)\b/g;
  function highlight(code) {
    if (!code || code.children.length || !code.textContent) return;
    var t = code.textContent; if (t.length > 20000) return;
    code.innerHTML = esc(t).replace(HL, function (m, com, str, num, kw) {
      if (com) return '<span class="cf-c">' + com + '</span>';
      if (str) return '<span class="cf-s">' + str + '</span>';
      if (num) return '<span class="cf-n">' + num + '</span>';
      if (kw) return '<span class="cf-k">' + kw + '</span>';
      return m;
    });
  }

  /* ================= REVEAL ================= */
  function initReveal() {
    qa('details.reveal').forEach(function (d) {
      d.classList.add('cf-reveal');
      if (!d.querySelector('summary')) d.insertBefore(h('summary', null, 'Think about it…'), d.firstChild);
    });
  }

  /* ================= QUIZ ================= */
  function keyOf(s) { var hsh = 0, i; for (i = 0; i < s.length; i++) { hsh = (hsh << 5) - hsh + s.charCodeAt(i); hsh |= 0; } return 'k' + (hsh >>> 0); }
  function initQuiz() {
    var quizzes = qa('.quiz[data-question]');
    if (!quizzes.length) return;
    var state = lget('quizstate', {});
    quizzes.forEach(function (q) {
      if (q.getAttribute('data-cf')) return; q.setAttribute('data-cf', '1');
      var raw = q.getAttribute('data-options') || '';
      var opts = (raw.indexOf('|') >= 0 ? raw.split('|') : raw.split(',')).map(function (x) { return x.trim(); }).filter(Boolean);
      var ans = parseInt(q.getAttribute('data-answer'), 10);
      var expl = q.getAttribute('data-explanation') || '';
      var key = keyOf(q.getAttribute('data-question') + '|' + raw);
      q.classList.add('cf-quiz'); q.innerHTML = '';
      q.appendChild(h('div', { 'class': 'cf-q' }, esc(q.getAttribute('data-question'))));
      var ul = h('div', { 'class': 'cf-opts' });
      opts.forEach(function (o, i) {
        var b = h('button', { 'class': 'cf-opt' }, esc(o));
        on(b, 'click', function () { answerQuiz(q, ul, i, ans, expl, key, true); });
        ul.appendChild(b);
      });
      q.appendChild(ul);
      q.appendChild(h('div', { 'class': 'cf-fb' }));
      if (state[key] != null) answerQuiz(q, ul, state[key], ans, expl, key, false);
    });
    updateScore();
  }
  function answerQuiz(q, ul, chosen, ans, expl, key, record) {
    if (q.getAttribute('data-answered')) return; q.setAttribute('data-answered', '1');
    var ok = chosen === ans;
    qa('.cf-opt', ul).forEach(function (b, i) {
      b.disabled = true;
      if (i === ans) b.classList.add('cf-correct');
      if (i === chosen && !ok) b.classList.add('cf-wrong');
    });
    var fb = q.querySelector('.cf-fb');
    fb.innerHTML = '<div class="cf-fb-h ' + (ok ? 'ok' : 'no') + '">' + (ok ? '✓ Correct' : '✗ Not quite') + '</div>' +
      (expl ? '<div class="cf-expl">' + esc(expl) + '</div>' : '');
    requestAnimationFrame(function () { fb.classList.add('show'); });
    if (record) {
      var st = lget('quizstate', {}); st[key] = chosen; lset('quizstate', st);
      var sc = lget('score', {}); sc[key] = ok ? 1 : 0; lset('score', sc);
    }
    updateScore();
  }
  function updateScore() {
    var total = qa('.quiz[data-question]').length; if (!total) return;
    var sc = lget('score', {}), answered = 0, correct = 0;
    for (var k in sc) { if (sc.hasOwnProperty(k)) { answered++; correct += sc[k]; } }
    var chip = document.getElementById('cf-score');
    if (!chip) {
      chip = h('div', { 'class': 'cf-score', id: 'cf-score', title: 'Jump to next unanswered question' });
      on(chip, 'click', jumpQuiz); document.body.appendChild(chip);
    }
    if (answered) { chip.style.display = 'flex'; chip.innerHTML = '◆ Quiz score <b>' + correct + '/' + answered + '</b>'; }
  }
  function jumpQuiz() {
    var q = qa('.quiz[data-question]').filter(function (x) { return !x.getAttribute('data-answered'); })[0];
    if (q) scrollToEl(q); else window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ================= FLASHCARDS ================= */
  function initFlash() {
    qa('.flashcards').forEach(function (fc) {
      if (fc.getAttribute('data-cf')) return; fc.setAttribute('data-cf', '1');
      var cards = qa('.flashcard', fc).map(function (c) { return { f: c.getAttribute('data-front') || '', b: c.getAttribute('data-back') || '' }; })
        .filter(function (c) { return c.f || c.b; });
      if (!cards.length) return;
      fc.innerHTML = ''; fc.classList.add('cf-flash');
      var i = 0, flipped = false;
      var card = h('div', { 'class': 'cf-card', role: 'button', tabindex: '0', 'aria-label': 'Flashcard, activate to flip' });
      var inner = h('div', { 'class': 'cf-card-inner' });
      var front = h('div', { 'class': 'cf-card-face cf-front' });
      var back = h('div', { 'class': 'cf-card-face cf-back' });
      inner.appendChild(front); inner.appendChild(back); card.appendChild(inner);
      var ctrls = h('div', { 'class': 'cf-flash-ctrls' });
      var prev = h('button', { 'class': 'cf-fnav', 'aria-label': 'Previous' }, '‹');
      var count = h('span', { 'class': 'cf-fcount' });
      var next = h('button', { 'class': 'cf-fnav', 'aria-label': 'Next' }, '›');
      ctrls.appendChild(prev); ctrls.appendChild(count); ctrls.appendChild(next);
      fc.appendChild(card); fc.appendChild(ctrls);
      fc.appendChild(h('div', { 'class': 'cf-flash-hint' }, 'Tap to flip · swipe to move'));
      function render() { front.innerHTML = esc(cards[i].f); back.innerHTML = esc(cards[i].b); count.textContent = (i + 1) + ' / ' + cards.length; card.classList.toggle('flip', flipped); }
      function flip() { flipped = !flipped; card.classList.toggle('flip', flipped); }
      function go(d) { flipped = false; i = (i + d + cards.length) % cards.length; render(); }
      on(card, 'click', flip);
      on(card, 'keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } else if (e.key === 'ArrowRight') go(1); else if (e.key === 'ArrowLeft') go(-1); });
      on(prev, 'click', function (e) { e.stopPropagation(); go(-1); });
      on(next, 'click', function (e) { e.stopPropagation(); go(1); });
      var sx = 0;
      on(card, 'touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
      on(card, 'touchend', function (e) { var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); });
      render();
    });
  }

  /* ================= BOOKMARKS ================= */
  function slug(s) { return s.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'sec'; }
  function initBookmarks() {
    var used = {}, bm = lget('bm', []);
    qa('h2, h3').forEach(function (el) {
      if (el.closest('.cf-dock, .cf-panel, .cf-quiz, .cf-flash, .cf-search')) return;
      if (!el.textContent.trim() || el.querySelector('.cf-bm')) return;
      if (!el.id) { var id = slug(el.textContent); while (used[id] || document.getElementById(id)) id += '-' + (used[id] = (used[id] || 1) + 1); el.id = id; }
      used[el.id] = 1;
      var b = h('button', { 'class': 'cf-bm' + (bm.indexOf(el.id) >= 0 ? ' on' : ''), title: 'Bookmark this section' }, '✦');
      on(b, 'click', function (e) { e.preventDefault(); e.stopPropagation(); toggleBm(el.id, el.textContent.trim().replace(/✦$/, ''), b); });
      el.appendChild(b);
    });
    buildPanel();
  }
  function toggleBm(id, text, btn) {
    var bm = lget('bm', []), idx = -1;
    for (var i = 0; i < bm.length; i++) if (bm[i].id === id) idx = i;
    if (idx >= 0) { bm.splice(idx, 1); if (btn) btn.classList.remove('on'); }
    else { bm.push({ id: id, text: text }); if (btn) btn.classList.add('on'); }
    lset('bm', bm); renderBmList();
  }
  function buildPanel() {
    if (document.getElementById('cf-panel')) return;
    var p = h('div', { 'class': 'cf-panel', id: 'cf-panel', 'aria-hidden': 'true' });
    var head = h('div', { 'class': 'cf-panel-h' }, '<span>✦ My Bookmarks</span>');
    var x = h('button', { 'class': 'cf-panel-x', 'aria-label': 'Close' }, '✕');
    on(x, 'click', toggleBookmarks); head.appendChild(x);
    p.appendChild(head);
    p.appendChild(h('div', { 'class': 'cf-panel-body', id: 'cf-panel-body' }));
    p.style.display = 'none'; // stays out of layout while closed so its off-screen slide never adds page scroll
    document.body.appendChild(p);
    renderBmList();
  }
  function renderBmList() {
    var body = document.getElementById('cf-panel-body'); if (!body) return;
    var bm = lget('bm', []); body.innerHTML = '';
    if (!bm.length) { body.appendChild(h('div', { 'class': 'cf-empty' }, 'No bookmarks yet — tap ✦ by any heading.')); return; }
    bm.forEach(function (it) {
      var row = h('div', { 'class': 'cf-bm-item' }, '<span>' + esc(it.text) + '</span><span class="cf-bm-del" title="Remove">✕</span>');
      on(row, 'click', function (e) {
        var hd = document.getElementById(it.id);
        if (e.target.className === 'cf-bm-del') { toggleBm(it.id, it.text, hd && hd.querySelector('.cf-bm')); return; }
        if (hd) scrollToEl(hd); toggleBookmarks();
      });
      body.appendChild(row);
    });
  }
  function toggleBookmarks() {
    var p = document.getElementById('cf-panel'); if (!p) return;
    if (p.classList.contains('open')) {
      p.classList.remove('open'); p.setAttribute('aria-hidden', 'true');
      setTimeout(function () { if (!p.classList.contains('open')) p.style.display = 'none'; }, 300);
    } else {
      p.style.display = 'flex'; renderBmList();
      // double rAF: let the (now displayed) panel paint at its off-screen start before sliding in
      requestAnimationFrame(function () { requestAnimationFrame(function () { p.classList.add('open'); p.setAttribute('aria-hidden', 'false'); }); });
    }
  }

  /* ================= SEARCH ================= */
  var marks = [], cur = -1;
  function initSearch() {
    var box = h('div', { 'class': 'cf-search', id: 'cf-search' });
    var input = h('input', { type: 'search', placeholder: 'Search this course…', 'aria-label': 'Search course' });
    var count = h('span', { 'class': 'cf-scount' }, '');
    var prev = h('button', { 'class': 'cf-snav', 'aria-label': 'Previous match' }, '↑');
    var next = h('button', { 'class': 'cf-snav', 'aria-label': 'Next match' }, '↓');
    var close = h('button', { 'class': 'cf-snav', 'aria-label': 'Close search' }, '✕');
    box.appendChild(input); box.appendChild(count); box.appendChild(prev); box.appendChild(next); box.appendChild(close);
    document.body.appendChild(box);
    var t;
    on(input, 'input', function () { clearTimeout(t); t = setTimeout(function () { runSearch(input.value, count); }, 200); });
    on(input, 'keydown', function (e) { if (e.key === 'Enter') step(e.shiftKey ? -1 : 1); else if (e.key === 'Escape') closeSearch(); });
    on(prev, 'click', function () { step(-1); }); on(next, 'click', function () { step(1); });
    on(close, 'click', closeSearch);
    box._input = input; box._count = count;
  }
  function runSearch(term, count) {
    clearMarks();
    term = (term || '').trim();
    if (term.length < 2) { count.textContent = ''; return; }
    var q = term.toLowerCase();
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = n.parentNode; if (!p || !p.closest) return NodeFilter.FILTER_REJECT;
        if (p.nodeName === 'SCRIPT' || p.nodeName === 'STYLE' || p.nodeName === 'MARK') return NodeFilter.FILTER_REJECT;
        if (p.closest('.cf-dock, .cf-panel, .cf-search, .cf-topbar, .cf-copy, .cf-score, .cf-resume')) return NodeFilter.FILTER_REJECT;
        return n.nodeValue.toLowerCase().indexOf(q) >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) { wrapMatches(node, q); });
    count.textContent = marks.length ? '1/' + marks.length : '0';
    if (marks.length) { cur = 0; focusMark(); }
  }
  function wrapMatches(node, q) {
    var text = node.nodeValue, low = text.toLowerCase(), frag = document.createDocumentFragment(), idx = 0, pos;
    while ((pos = low.indexOf(q, idx)) >= 0) {
      if (pos > idx) frag.appendChild(document.createTextNode(text.slice(idx, pos)));
      var m = h('mark', { 'class': 'cf-hl' }); m.textContent = text.slice(pos, pos + q.length);
      frag.appendChild(m); marks.push(m); idx = pos + q.length;
    }
    if (idx < text.length) frag.appendChild(document.createTextNode(text.slice(idx)));
    if (node.parentNode) node.parentNode.replaceChild(frag, node);
  }
  function clearMarks() {
    marks.forEach(function (m) { if (m.parentNode) { var p = m.parentNode; p.replaceChild(document.createTextNode(m.textContent), m); p.normalize(); } });
    marks = []; cur = -1;
  }
  function step(d) {
    if (!marks.length) return;
    if (marks[cur]) marks[cur].classList.remove('cur');
    cur = (cur + d + marks.length) % marks.length; focusMark();
    var c = document.querySelector('#cf-search .cf-scount'); if (c) c.textContent = (cur + 1) + '/' + marks.length;
  }
  function focusMark() { var m = marks[cur]; if (!m) return; m.classList.add('cur'); m.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  function toggleSearch() {
    var box = document.getElementById('cf-search'); if (!box) return;
    var open = box.classList.toggle('open');
    if (open) box._input.focus(); else closeSearch();
  }
  function closeSearch() {
    var box = document.getElementById('cf-search'); if (!box) return;
    box.classList.remove('open'); clearMarks(); box._input.value = ''; box._count.textContent = '';
  }

  /* ================= RESUME ================= */
  function initResume() {
    var y = lget('scroll', 0);
    if (y > 700) {
      var toast = h('div', { 'class': 'cf-resume' }, '<span>Resume where you left off ↓</span>');
      var x = h('button', { 'class': 'cf-resume-x', 'aria-label': 'Dismiss' }, '✕');
      on(toast, 'click', function () { window.scrollTo({ top: y, behavior: 'smooth' }); dismiss(); });
      on(x, 'click', function (e) { e.stopPropagation(); dismiss(); });
      toast.appendChild(x); document.body.appendChild(toast);
      function dismiss() { toast.classList.add('hide'); setTimeout(function () { toast.remove(); }, 420); }
      setTimeout(dismiss, 8000);
    }
    var t;
    on(window, 'scroll', function () { clearTimeout(t); t = setTimeout(function () { lset('scroll', window.pageYOffset | 0); }, 400); }, { passive: true });
  }

  /* ================= misc ================= */
  function scrollToEl(el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.classList.add('cf-flash-hi'); setTimeout(function () { el.classList.remove('cf-flash-hi'); }, 1300);
  }
  function initKeys() {
    on(document, 'keydown', function (e) {
      var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.nodeName) || e.target.isContentEditable;
      if (e.key === '/' && !typing) { e.preventDefault(); toggleSearch(); }
      else if (e.key === 'Escape') { closeSearch(); var p = document.getElementById('cf-panel'); if (p && p.classList.contains('open')) toggleBookmarks(); }
    });
  }

  /* ================= boot ================= */
  function boot() {
    safe(initTheme); safe(initDock); safe(initModules); safe(initCode); safe(initReveal);
    safe(initQuiz); safe(initFlash); safe(initBookmarks); safe(initSearch); safe(initResume); safe(initKeys);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
