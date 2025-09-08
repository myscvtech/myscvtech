document.addEventListener('DOMContentLoaded', function () {
  // Labels we expect in your main nav (adjust if needed)
  var LABELS = ['home','about','services','gallery','blog','faq','contact'];

  // Pick the nav that contains the most of those labels
  var navs = Array.from(document.querySelectorAll('nav'));
  if (!navs.length) return;

  function scoreNav(nav) {
    var links = Array.from(nav.querySelectorAll('a'));
    var score = 0;
    links.forEach(function (a) {
      var t = (a.textContent || '').trim().toLowerCase();
      if (LABELS.some(function (l) { return t === l || t.includes(l); })) score++;
    });
    return score;
  }

  var best = navs
    .map(function (n) { return { n: n, s: scoreNav(n) }; })
    .sort(function (a, b) { return b.s - a.s; })[0];

  var nav = (best && best.n) || navs[0];
  if (!nav || nav.dataset.scvNavInit === '1') return;

  // Find the element that holds your real links
  var candidates = Array.from(nav.querySelectorAll('ul, ol, .menu, .nav-links, .navbar, .navigation'))
    .map(function (el) { return { el: el, count: el.querySelectorAll('a').length }; })
    .filter(function (x) { return x.count >= 3; })
    .sort(function (a, b) { return b.count - a.count; });

  var menu = candidates.length ? candidates[0].el : nav.querySelector('ul');
  if (!menu) return;

  // Tag for our CSS (namespaced)
  nav.classList.add('scv-nav');
  menu.classList.add('scv-menu');
  if (!menu.id) menu.id = 'scv-menu';

  // Create the hamburger button (type=button to avoid form submits!)
  var btn = document.createElement('button');
  btn.className = 'scv-menu-toggle';
  btn.type = 'button';
  btn.setAttribute('aria-controls', menu.id);
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-label', 'Open menu');
  btn.innerHTML =
    '<span class="scv-bar" aria-hidden="true"></span>' +
    '<span class="scv-bar" aria-hidden="true"></span>' +
    '<span class="scv-bar" aria-hidden="true"></span>' +
    '<span class="scv-sr-only">Menu</span>';

  // Insert the button just before the menu
  menu.parentNode.insertBefore(btn, menu);

  // Toggle class; CSS handles mobile-only behavior
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('scv-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  nav.dataset.scvNavInit = '1';
});
