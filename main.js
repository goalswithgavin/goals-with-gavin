// Subtle scroll-reveal for elements marked [data-reveal]
document.addEventListener('DOMContentLoaded', function () {
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }
});

// Site stats: days building (calculated live, never needs updating),
// plus videos/subscribers/sales pulled from stats.json when available.
// stats.json is the single file to edit to update these numbers everywhere.
var SITE_STATS_DEFAULT = {
  launchDate: "2026-07-02",
  videosPosted: 20,
  emailSubscribers: 2,
  pdfsSold: 0,
  product2Status: "Idea stage"
};

function daysSinceLaunch(dateStr) {
  var start = new Date(dateStr + "T00:00:00");
  var now = new Date();
  var diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  return Math.max(diff, 0);
}

function renderSiteStats(stats) {
  var daysEl = document.querySelector('[data-stat="days"]');
  if (daysEl) daysEl.textContent = daysSinceLaunch(stats.launchDate);

  var videosEl = document.querySelector('[data-stat="videos"]');
  if (videosEl) videosEl.textContent = stats.videosPosted;

  document.querySelectorAll('[data-stat="subs"]').forEach(function (el) {
    el.textContent = stats.emailSubscribers;
  });
  document.querySelectorAll('[data-stat="pdfs"]').forEach(function (el) {
    el.textContent = stats.pdfsSold;
  });

  // Goal 1 — first 100 email subscribers
  var g1current = document.querySelector('[data-goal="1-current"]');
  var g1bar = document.querySelector('[data-goal="1-bar"]');
  if (g1current) g1current.textContent = stats.emailSubscribers + ' / 100 subscribers';
  if (g1bar) g1bar.style.width = Math.min(100, (stats.emailSubscribers / 100) * 100) + '%';

  // Goal 2 — first $100 earned (pdfs sold x $19)
  var earned = stats.pdfsSold * 19;
  var g2current = document.querySelector('[data-goal="2-current"]');
  var g2bar = document.querySelector('[data-goal="2-bar"]');
  if (g2current) g2current.textContent = '$' + earned + ' / $100';
  if (g2bar) g2bar.style.width = Math.min(100, (earned / 100) * 100) + '%';

  // Goal 3 — launch product #2 (status text, not numeric)
  var g3status = document.querySelector('[data-goal="3-status"]');
  if (g3status) g3status.textContent = stats.product2Status;
}

document.addEventListener('DOMContentLoaded', function () {
  renderSiteStats(SITE_STATS_DEFAULT);
  fetch('stats.json', { cache: 'no-store' })
    .then(function (r) { if (!r.ok) throw new Error('stats.json not found'); return r.json(); })
    .then(function (data) { renderSiteStats(data); })
    .catch(function () { /* keep defaults shown above */ });
});

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Email signup — submits to Formspree via fetch so the page doesn't
  // navigate away; shows the inline success message on a real response.
  var form = document.querySelector('#signup-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = document.querySelector('#signup-success');
      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          if (success) {
            success.textContent = "You're on the list — thanks for following along.";
            success.classList.add('show');
            success.focus();
          }
          form.reset();
        } else {
          if (success) {
            success.textContent = 'Something went wrong — please try again in a moment.';
            success.classList.add('show');
          }
        }
      }).catch(function () {
        if (success) {
          success.textContent = 'Something went wrong — check your connection and try again.';
          success.classList.add('show');
        }
      }).finally(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
    });
  }

  // Website-service contact form — same pattern as the signup form,
  // submits via fetch to Formspree so the page doesn't navigate away.
  var contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = document.querySelector('#contact-success');
      var submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          if (success) {
            success.classList.add('show');
            success.focus();
          }
          contactForm.reset();
        } else {
          if (success) {
            success.textContent = 'Something went wrong — please try again in a moment.';
            success.classList.add('show');
          }
        }
      }).catch(function () {
        if (success) {
          success.textContent = 'Something went wrong — check your connection and try again.';
          success.classList.add('show');
        }
      }).finally(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
    });
  }
});
