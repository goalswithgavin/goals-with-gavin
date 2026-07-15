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

  // Demo email signup handling.
  // This does NOT send email anywhere yet — it just shows a success message
  // so you can see how it will feel. See the comment in subscribe.html for
  // how to connect it to a real list (Mailchimp / ConvertKit / beehiiv / Formspree).
  var form = document.querySelector('#signup-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = document.querySelector('#signup-success');
      if (success) {
        success.classList.add('show');
        success.focus();
      }
      form.reset();
    });
  }
});
