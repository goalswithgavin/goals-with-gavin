/* Quote assistant — guided chat that collects project details and sends them to Gavin.
   TO RECEIVE ANSWERS DIRECTLY: create a free form at formspree.io (or similar), then paste its
   endpoint URL below, e.g. 'https://formspree.io/f/abcdwxyz'. Leave '' to fall back to a pre-filled email. */
const CHAT_ENDPOINT = '';
const CHAT_EMAIL = 'goalswithgavin@gmail.com';

(function () {
  const PACKAGES = ['Simple — from $249', 'Medium — from $499', 'Advanced — from $899', 'Not sure — help me choose'];
  const STEPS = [
    { key: 'name', type: 'text', ask: () => "What's your name?" },
    { key: 'business', type: 'text', ask: (a) => `Nice to meet you, ${a.name}! What's your business called, and what do you do?` },
    { key: 'need', type: 'choice', choices: ['A new website', 'A redesign of my current site', 'Not sure yet'], ask: () => 'What do you need?' },
    { key: 'url', type: 'text', when: (a) => /redesign/i.test(a.need || ''), ask: () => "What's the address of your current website?" },
    { key: 'package', type: 'choice', choices: PACKAGES, ask: () => 'Which package are you leaning toward?' },
    { key: 'goal', type: 'choice', choices: ['Bring in calls & bookings', 'Show off my work & services', 'Sell products online', 'Something else'], ask: () => "What's the main thing you want your website to do?" },
    { key: 'timeline', type: 'choice', choices: ['As soon as possible', 'Within 1–2 months', 'Just exploring'], ask: () => 'When would you like to launch?' },
    { key: 'contact', type: 'text', ask: () => "What's the best email or phone number to reach you?",
      validate: (v) => (/\S+@\S+\.\S+/.test(v) || v.replace(/\D/g, '').length >= 7) ? '' : "That doesn't look like an email or phone number — could you try again?" },
    { key: 'notes', type: 'text', optional: true, ask: () => "Anything else you'd like me to know? (Type \"no\" to skip.)" }
  ];
  const LABELS = { name: 'Name', business: 'Business', need: 'Needs', url: 'Current site', package: 'Package', goal: 'Main goal', timeline: 'Timeline', contact: 'Contact', notes: 'Notes' };
  const PRICING_TEXT = 'Packages: Simple from $249 (up to 3 pages), Medium from $499 (up to 6 pages), Advanced from $899 (up to 10 pages). Final cost depends on what your site needs.';

  let state = { answers: {}, step: -1, log: [], done: false };
  try { const s = JSON.parse(sessionStorage.getItem('quoteChat') || 'null'); if (s && s.log) state = s; } catch (e) {}
  const save = () => { try { sessionStorage.setItem('quoteChat', JSON.stringify(state)); } catch (e) {} };

  // ---------- DOM ----------
  const el = (tag, cls, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; return n; };
  const launcher = el('button', 'chat-launcher');
  launcher.type = 'button';
  launcher.setAttribute('aria-label', 'Open chat to get a free quote');
  launcher.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5h16v11H9l-5 4V5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg><span>Chat with me</span>';
  const panel = el('div', 'chat-panel');
  panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Quote assistant'); panel.hidden = true;
  const head = el('div', 'chat-head');
  const hi = el('div', 'chat-head-text');
  hi.append(el('strong', '', "Gavin's quote assistant"), el('span', '', 'A few quick questions — Gavin replies personally'));
  const closeBtn = el('button', 'chat-close', '✕'); closeBtn.type = 'button'; closeBtn.setAttribute('aria-label', 'Close chat');
  head.append(hi, closeBtn);
  const logEl = el('div', 'chat-log'); logEl.setAttribute('aria-live', 'polite');
  const chipsEl = el('div', 'chat-chips');
  const form = el('form', 'chat-form');
  const input = el('input'); input.type = 'text'; input.placeholder = 'Type your answer…'; input.autocomplete = 'off'; input.setAttribute('aria-label', 'Your message');
  const sendBtn = el('button', '', 'Send'); sendBtn.type = 'submit';
  form.append(input, sendBtn);
  panel.append(head, logEl, chipsEl, form);
  document.body.append(launcher, panel);

  // ---------- helpers ----------
  function addMsg(who, text, record = true) {
    const m = el('div', 'chat-msg ' + who, text); logEl.append(m); logEl.scrollTop = logEl.scrollHeight;
    if (record) { state.log.push({ who, text }); save(); }
    return m;
  }
  function setChips(items, onPick) {
    chipsEl.textContent = '';
    items.forEach((c) => { const b = el('button', 'chip', c); b.type = 'button'; b.addEventListener('click', () => onPick(c)); chipsEl.append(b); });
  }
  const nextIndex = (from) => {
    for (let i = from; i < STEPS.length; i++) {
      const s = STEPS[i];
      if (state.answers[s.key] !== undefined) continue;
      if (s.when && !s.when(state.answers)) continue;
      return i;
    }
    return STEPS.length;
  };
  function summaryText() {
    return STEPS.filter((s) => state.answers[s.key]).map((s) => `${LABELS[s.key]}: ${state.answers[s.key]}`).join('\n');
  }
  function ask() {
    state.step = nextIndex(0); save();
    chipsEl.textContent = '';
    if (state.step >= STEPS.length) return confirm();
    const s = STEPS[state.step];
    addMsg('bot', s.ask(state.answers));
    input.placeholder = s.type === 'choice' ? 'Or type your answer…' : 'Type your answer…';
    if (s.type === 'choice') setChips(s.choices, (c) => answer(c));
    input.focus();
  }
  function confirm() {
    addMsg('bot', "Thanks! Here's what I have:\n" + summaryText());
    setChips(['Send to Gavin', 'Start over'], (c) => (c === 'Start over' ? reset() : send()));
    input.placeholder = '';
  }
  function answer(text) {
    text = text.trim(); if (!text) return;
    if (state.done) return;
    const s = STEPS[state.step];
    if (!s) { addMsg('user', text); return; }
    addMsg('user', text);
    if (/(price|pricing|cost|how much)/i.test(text) && (s.type === 'choice' || s.key === 'notes')) {
      addMsg('bot', PRICING_TEXT); return ask();
    }
    if (s.type === 'choice') {
      const hit = s.choices.find((c) => c.toLowerCase() === text.toLowerCase()) || s.choices.find((c) => c.toLowerCase().includes(text.toLowerCase()) && text.length > 2);
      if (!hit) { addMsg('bot', 'Please pick one of the options below (or type part of one).'); return; }
      text = hit;
    }
    if (s.validate) { const err = s.validate(text); if (err) { addMsg('bot', err); return; } }
    if (s.optional && /^(no|none|nope|n\/a|skip)\.?$/i.test(text)) text = '';
    state.answers[s.key] = text; // '' = skipped optional answer
    save();
    // treat empty optional as answered
    setTimeout(ask, 350);
  }
  function mailtoLink() {
    const subject = `Website quote request — ${state.answers.business || state.answers.name || 'new lead'}`;
    return `mailto:${CHAT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summaryText() + '\n\nSent from ' + location.href)}`;
  }
  async function send() {
    chipsEl.textContent = '';
    const payload = Object.assign({}, state.answers, { page: location.href, _subject: 'Website quote request from the chat assistant' });
    if (CHAT_ENDPOINT) {
      addMsg('bot', 'Sending…', false);
      try {
        const r = await fetch(CHAT_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) });
        if (!r.ok) throw new Error('bad status');
        state.done = true; save();
        addMsg('bot', "All set — I've passed this to Gavin. He'll follow up within 1–2 business days. Thanks!");
        return;
      } catch (e) { addMsg('bot', "Hmm, that didn't go through. You can send it by email instead:"); }
    } else {
      addMsg('bot', 'Last step — tap below to send this to Gavin by email (it opens a pre-filled message):');
    }
    const a = el('a', 'chip chip-link', 'Email this to Gavin'); a.href = mailtoLink(); a.addEventListener('click', () => { state.done = true; save(); });
    chipsEl.append(a);
  }
  function reset() {
    state = { answers: {}, step: -1, log: [], done: false }; save(); logEl.textContent = ''; chipsEl.textContent = ''; start();
  }
  function start(preset) {
    addMsg('bot', "Hi! I'm Gavin's website assistant. Answer a few quick questions and I'll pass everything to Gavin — no back-and-forth texting.");
    if (preset) {
      if (preset.need) state.answers.need = preset.need;
      if (preset.pkg) state.answers.package = preset.pkg;
    }
    ask();
  }
  function open(preset) {
    panel.hidden = false; launcher.classList.add('open');
    if (!logEl.childElementCount) {
      if (state.log.length) {
        state.log.forEach((m) => addMsg(m.who, m.text, false));
        if (state.done) { /* finished */ } else if (state.step >= STEPS.length || nextIndex(0) >= STEPS.length) confirm(); else { const s = STEPS[nextIndex(0)]; if (s.type === 'choice') setChips(s.choices, (c) => answer(c)); }
      } else start(preset);
    }
    input.focus();
  }
  const close = () => { panel.hidden = true; launcher.classList.remove('open'); launcher.focus(); };

  launcher.addEventListener('click', () => (panel.hidden ? open() : close()));
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) close(); });
  form.addEventListener('submit', (e) => { e.preventDefault(); const v = input.value; input.value = ''; answer(v); });
  document.querySelectorAll('[data-open-chat]').forEach((n) => n.addEventListener('click', (e) => {
    e.preventDefault();
    const need = n.getAttribute('data-need'), pkg = n.getAttribute('data-package');
    open({ need, pkg });
  }));
})();
