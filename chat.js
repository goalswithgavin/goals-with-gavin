/* Quote assistant — answers common questions and collects project details for Gavin.
   TO RECEIVE ANSWERS DIRECTLY: create a free form at formspree.io (or similar), then paste its
   endpoint URL below, e.g. 'https://formspree.io/f/abcdwxyz'. Leave '' to fall back to a pre-filled email. */
const CHAT_ENDPOINT = 'https://formspree.io/f/mgakbaon';
const CHAT_EMAIL = 'goalswithgavin@gmail.com';
/*FAQ-START*/const FAQ = [
 {
  "q": "How much does a website cost?",
  "a": "Packages start at $249. Simple is $249 (up to 3 pages), Standard is $499 (up to 6 pages) and Pro is $899 (up to 10 pages). The final cost depends on what your site needs — a free quote will pin it down.",
  "k": [
   "pric",
   "cost",
   "how much",
   "afford",
   "cheap",
   "expens",
   "rates?\\b",
   "\\$"
  ]
 },
 {
  "q": "What's included in each package?",
  "a": "Simple: up to 3 pages, mobile-friendly design, a contact form or click-to-call button, basic SEO setup and Google Analytics. Standard adds up to 6 pages, custom design matched to your logo and colors, an inquiry form, social links and a Google Maps embed, local SEO and two rounds of revisions. Pro adds up to 10 pages, fully custom design, booking/ordering/scheduling link integration, speed optimization, advanced SEO with Google Search Console and 30 days of post-launch support.",
  "k": [
   "includ",
   "packages?",
   "features?",
   "what do i get",
   "\\bsimple\\b",
   "\\bstandard\\b",
   "\\bpro\\b",
   "differen",
   "offer"
  ]
 },
 {
  "q": "Which package should I choose?",
  "a": "If you just need to get online with the basics, Simple is enough. If you want a fuller site that matches your branding, choose Standard. If you need booking or ordering links or a bigger site, go with Pro. Not sure? Request a free quote and I'll recommend one.",
  "k": [
   "which",
   "choose",
   "recommend",
   "best",
   "right package",
   "not sure",
   "should i"
  ]
 },
 {
  "q": "Can you redesign my existing website?",
  "a": "Yes. If your current site is outdated, hard to use on a phone, or just doesn't represent your business well anymore, I can rebuild it. Choose \"A redesign of my current site\" when you request a quote.",
  "k": [
   "redesign",
   "existing",
   "current (web)?site",
   "outdated",
   "old (web)?site",
   "rebuild",
   "refresh",
   "revamp"
  ]
 },
 {
  "q": "Will my website work on phones?",
  "a": "Yes. Every site I build is mobile-first, so it looks great and loads quickly on phones, tablets and computers.",
  "k": [
   "mobile",
   "phones?\\b",
   "responsive",
   "tablet",
   "iphone",
   "android"
  ]
 },
 {
  "q": "How does the process work?",
  "a": "1) We talk about your business, goals and customers — through this chat or a quick call. 2) I design and build your site, and every page is reviewed and refined by hand before you see it. 3) We launch it.",
  "k": [
   "process",
   "how does (it|this) work",
   "steps?\\b",
   "work together",
   "how do (we|i) (start|begin)",
   "what happens"
  ]
 },
 {
  "q": "Do you use AI to build websites?",
  "a": "Yes — I use AI tools to speed up parts of the design and build, which helps keep prices low and turnaround fast. Every page is still reviewed and refined by hand before you see it.",
  "k": [
   "\\bai\\b",
   "artificial",
   "chat ?gpt",
   "automat",
   "robot"
  ]
 },
 {
  "q": "Do you work with businesses outside New Hampshire?",
  "a": "I'm based in New Hampshire and focus on local and small businesses, but I work remotely, so location isn't a barrier.",
  "k": [
   "where",
   "locat",
   "based",
   "new hampshire",
   "\\bnh\\b",
   "remote",
   "outside",
   "out of state",
   "area"
  ]
 },
 {
  "q": "How long does it take to build a site?",
  "a": "It depends on the package and how quickly we can finalize your content and details. I'll give you a realistic timeline in your quote.",
  "k": [
   "how long",
   "timeline",
   "turnaround",
   "time ?frame",
   "how (fast|quick)",
   "\\bdays\\b",
   "\\bweeks?\\b",
   "deadline"
  ]
 },
 {
  "q": "What about my domain and hosting?",
  "a": "Domain and hosting depend on your setup. I'll go over the options and any costs with you in your quote so there are no surprises.",
  "k": [
   "domain",
   "hosting",
   "\\bhost\\b",
   "godaddy",
   "wix",
   "squarespace",
   "wordpress",
   "\\.com"
  ]
 },
 {
  "q": "Can I make changes after the site launches?",
  "a": "Standard includes two rounds of revisions and Pro includes 30 days of post-launch support. For updates beyond that, reach out and we can work something out.",
  "k": [
   "changes?\\b",
   "edit",
   "after (the )?(site )?launch",
   "revision",
   "update",
   "maintenance",
   "support"
  ]
 },
 {
  "q": "Can you help my business show up on Google?",
  "a": "Every package includes basic SEO setup (page titles and descriptions) and Google Analytics. Standard adds local SEO and Pro adds Google Search Console setup. I don't promise specific rankings — SEO takes time.",
  "k": [
   "seo",
   "google",
   "found",
   "search",
   "rank",
   "analytics",
   "traffic"
  ]
 },
 {
  "q": "Is the quote really free?",
  "a": "Yes — quotes are free with no obligation.",
  "k": [
   "free",
   "obligation",
   "commit",
   "charge for"
  ]
 },
 {
  "q": "How do I get a quote or contact you?",
  "a": "Use the quote chat on this site (it takes about 2 minutes) email goalswithgavin@gmail.com, or call 603-205-0235. I reply within 1–2 business days.",
  "k": [
   "quote",
   "contact",
   "email",
   "reach",
   "talk to",
   "call",
   "phone number",
   "speak",
   "hire",
   "get started"
  ]
 }
];/*FAQ-END*/

(function () {
  const PACKAGES = ['Simple — from $249', 'Standard — from $499', 'Pro — from $899', 'Not sure — help me choose'];
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
  // step codes: -2 = menu, -3 = Q&A mode, 0.. = quote questions
  const MENU = -2, QA = -3;

  let state = { answers: {}, step: MENU, log: [], done: false, questions: [], started: false };
  try { const s = JSON.parse(sessionStorage.getItem('quoteChat2') || 'null'); if (s && s.log) state = s; } catch (e) {}
  const save = () => { try { sessionStorage.setItem('quoteChat2', JSON.stringify(state)); } catch (e) {} };

  // ---------- DOM ----------
  const el = (tag, cls, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; return n; };
  const launcher = el('button', 'chat-launcher');
  launcher.type = 'button';
  launcher.setAttribute('aria-label', 'Open chat to ask a question or get a free quote');
  launcher.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5h16v11H9l-5 4V5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg><span>Chat with me</span>';
  const panel = el('div', 'chat-panel');
  panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Quote assistant'); panel.hidden = true;
  const head = el('div', 'chat-head');
  const hi = el('div', 'chat-head-text');
  hi.append(el('strong', '', "Gavin's assistant"), el('span', '', 'Ask a question or get a free quote'));
  const closeBtn = el('button', 'chat-close', '✕'); closeBtn.type = 'button'; closeBtn.setAttribute('aria-label', 'Close chat');
  head.append(hi, closeBtn);
  const logEl = el('div', 'chat-log'); logEl.setAttribute('aria-live', 'polite');
  const chipsEl = el('div', 'chat-chips');
  const form = el('form', 'chat-form');
  const input = el('input'); input.type = 'text'; input.placeholder = 'Answer or ask a question…'; input.autocomplete = 'off'; input.setAttribute('aria-label', 'Your message');
  const sendBtn = el('button', '', 'Send'); sendBtn.type = 'submit';
  form.append(input, sendBtn);
  const note = el('div', 'chat-note'); note.append('Your messages are sent to Gavin. ');
  const pl = el('a', '', 'Privacy Policy'); pl.href = 'privacy.html'; note.append(pl);
  panel.append(head, logEl, chipsEl, form, note);
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
  const nextIndex = () => {
    for (let i = 0; i < STEPS.length; i++) {
      const s = STEPS[i];
      if (state.answers[s.key] !== undefined) continue;
      if (s.when && !s.when(state.answers)) continue;
      return i;
    }
    return STEPS.length;
  };
  function summaryText() {
    const lines = STEPS.filter((s) => state.answers[s.key]).map((s) => `${LABELS[s.key]}: ${state.answers[s.key]}`);
    if (state.questions.length) lines.push('Questions for Gavin: ' + state.questions.join(' | '));
    return lines.join('\n');
  }

  // ----- FAQ matching -----
  const FAQ_RE = FAQ.map((f) => f.k.map((k) => new RegExp(k, 'i')));
  function matchFaq(text) {
    let best = -1, bestScore = 0;
    FAQ_RE.forEach((res, i) => {
      const score = res.reduce((n, re) => n + (re.test(text) ? 1 : 0), 0);
      if (score > bestScore) { best = i; bestScore = score; }
    });
    return best >= 0 ? FAQ[best] : null;
  }
  const looksLikeQuestion = (t) => t.includes('?');

  function answerQuestion(text) {
    const hit = matchFaq(text);
    if (hit) addMsg('bot', hit.a);
    else {
      if (!state.questions.includes(text)) state.questions.push(text);
      save();
      addMsg('bot', "Good question — I don't want to guess on that one. I've added it to your request so Gavin can answer it personally.");
    }
    return !!hit;
  }

  // ----- screens -----
  function showMenu() {
    state.step = MENU; save();
    addMsg('bot', 'What would you like to do?');
    setChips(['Get a free quote', 'Ask a question'], (c) => answer(c));
  }
  function showQA(intro) {
    state.step = QA; save();
    if (intro) addMsg('bot', 'Ask me anything about pricing, packages or how it works — type your question, or tap a common one:');
    const top = FAQ.slice(0, 5).map((f) => f.q);
    setChips(top.concat(['Get a free quote']), (c) => answer(c));
  }
  function afterAnswer() {
    if (state.step >= 0) return setTimeout(ask, 400);           // back to the quote question
    setChips(['Get a free quote', 'Ask another question'], (c) => answer(c));
  }
  function startQuote() { state.started = true; ask(); }
  function ask() {
    state.step = nextIndex(); save();
    chipsEl.textContent = '';
    if (state.step >= STEPS.length) return confirm();
    const s = STEPS[state.step];
    addMsg('bot', s.ask(state.answers));
    if (s.type === 'choice') setChips(s.choices, (c) => answer(c));
    input.focus();
  }
  function confirm() {
    addMsg('bot', "Thanks! Here's what I have:\n" + summaryText());
    setChips(['Send to Gavin', 'Start over'], (c) => (c === 'Start over' ? reset() : send()));
  }

  function answer(text) {
    text = text.trim(); if (!text || state.done) return;
    addMsg('user', text);

    // menu / Q&A modes
    if (state.step === MENU || state.step === QA) {
      if (/^(get a )?(free )?quote$|^get a free quote$|^start( a)? (project|quote)$/i.test(text)) return startQuote();
      if (/^ask a question$|^ask another question$/i.test(text)) return showQA(true);
      answerQuestion(text); return afterAnswer();
    }
    if (/^send to gavin$/i.test(text) || /^start over$/i.test(text)) return;

    const s = STEPS[state.step];
    if (!s) { answerQuestion(text); return afterAnswer(); }

    // a question typed mid-quote gets answered, then the current question repeats
    if (looksLikeQuestion(text) && !(s.type === 'choice' && s.choices.some((c) => c.toLowerCase() === text.toLowerCase()))) {
      answerQuestion(text); return afterAnswer();
    }
    if (s.type === 'choice') {
      const lower = text.toLowerCase();
      const hit = s.choices.find((c) => c.toLowerCase() === lower) || (lower.length > 2 && s.choices.find((c) => c.toLowerCase().includes(lower)));
      if (!hit) {
        if (matchFaq(text)) { answerQuestion(text); return afterAnswer(); }
        addMsg('bot', 'Please pick one of the options below (or type part of one).'); return;
      }
      text = hit;
    }
    if (s.validate) { const err = s.validate(text); if (err) { addMsg('bot', err); return; } }
    if (s.optional && /^(no|none|nope|n\/a|skip)\.?$/i.test(text)) text = '';
    state.answers[s.key] = text; // '' = skipped optional answer
    save();
    setTimeout(ask, 350);
  }

  function mailtoLink() {
    const subject = `Website quote request — ${state.answers.business || state.answers.name || 'new lead'}`;
    return `mailto:${CHAT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summaryText() + '\n\nSent from ' + location.href)}`;
  }
  async function send() {
    chipsEl.textContent = '';
    const payload = Object.assign({}, state.answers, { message: summaryText(), email: /@/.test(state.answers.contact || '') ? state.answers.contact : undefined, questions: state.questions.join(' | '), page: location.href, _subject: 'Website quote request from the chat assistant' });
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
    state = { answers: {}, step: MENU, log: [], done: false, questions: [], started: false }; save();
    logEl.textContent = ''; chipsEl.textContent = ''; greet();
  }
  function greet(preset) {
    addMsg('bot', "Hi! I'm Gavin's website assistant. I can answer questions about pricing and how things work, or take a few details for a free quote.");
    if (preset && (preset.need || preset.pkg)) {
      if (preset.need) state.answers.need = preset.need;
      if (preset.pkg) state.answers.package = preset.pkg;
      return startQuote();
    }
    if (preset && preset.mode === 'faq') return showQA(true);
    showMenu();
  }
  function restoreChips() {
    if (state.done) return;
    if (state.step === MENU) setChips(['Get a free quote', 'Ask a question'], (c) => answer(c));
    else if (state.step === QA) showQA(false);
    else if (nextIndex() >= STEPS.length) confirm();
    else { const s = STEPS[nextIndex()]; if (s.type === 'choice') setChips(s.choices, (c) => answer(c)); }
  }
  function open(preset) {
    panel.hidden = false; launcher.classList.add('open');
    if (!logEl.childElementCount) {
      if (state.log.length) { state.log.forEach((m) => addMsg(m.who, m.text, false)); restoreChips(); }
      else greet(preset);
    } else if (preset && preset.mode === 'faq' && state.step === MENU) showQA(true);
    input.focus();
  }
  const close = () => { panel.hidden = true; launcher.classList.remove('open'); launcher.focus(); };

  launcher.addEventListener('click', () => (panel.hidden ? open() : close()));
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) close(); });
  form.addEventListener('submit', (e) => { e.preventDefault(); const v = input.value; input.value = ''; answer(v); });
  document.querySelectorAll('[data-open-chat]').forEach((n) => n.addEventListener('click', (e) => {
    e.preventDefault();
    open({ need: n.getAttribute('data-need'), pkg: n.getAttribute('data-package'), mode: n.getAttribute('data-mode') });
  }));
})();
