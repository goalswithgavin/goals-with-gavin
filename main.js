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
});
