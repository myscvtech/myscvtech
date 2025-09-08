document.addEventListener('DOMContentLoaded', function () {
  // Find the first <nav> (change 'nav' to '.site-nav' or '#mainNav' if needed)
  var nav = document.querySelector('nav');
  if (!nav || nav.dataset.scvNavInit === '1') return;

  // Find the first <ul> inside the nav (your existing links)
  var menu = nav.querySelector('ul');
  if (!menu) return;

  // Tag nav and menu for CSS targetting
  nav.classList.add('scv-nav');
  menu.classList.add('scv-menu');

  // Ensure menu has an id
  if (!menu.id) menu.id = 'scv-menu';

  // Create hamburger button
  var btn = document.createElement('button');
  btn.className = 'scv-menu-toggle';
  btn.setAttribute('aria-controls', menu.id);
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-label', 'Open menu');
  btn.innerHTML =
    '<span class="scv-bar" aria-hidden="true"></span>' +
    '<span class="scv-bar" aria-hidden="true"></span>' +
    '<span class="scv-bar" aria-hidden="true"></span>' +
    '<span class="scv-sr-only">Menu</span>';

  // Insert button before menu
  nav.insertBefore(btn, menu);

  // Toggle open/close
  btn.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('scv-open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Mark initialized
  nav.dataset.scvNavInit = '1';
});
