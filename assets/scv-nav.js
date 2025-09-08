(() => {
  // Find the first <nav> on the page
  const nav = document.querySelector('nav');
  if (!nav || nav.dataset.scvNavInit === '1') return;

  // Find the first UL inside the nav (your existing links)
  let menu = nav.querySelector('ul');
  if (!menu) return;

  // Tag nav and menu with scoped classes so CSS can target them
  nav.classList.add('scv-nav');
  menu.classList.add('scv-menu');

  // Ensure the menu has an id for aria-controls
  if (!menu.id) menu.id = 'scv-menu';

  // Create the hamburger button
  const btn = document.createElement('button');
  btn.className = 'scv-menu-toggle';
  btn.setAttribute('aria-controls', menu.id);
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-label', 'Open menu');
  btn.innerHTML = `
    <span class="scv-bar" aria-hidden="true"></span>
    <span class="scv-bar" aria-hidden="true"></span>
    <span class="scv-bar" aria-hidden="true"></span>
    <span class="scv-sr-only">Menu</span>
  `;

  // Insert button right before the menu
  nav.insertBefore(btn, menu);

  // Toggle open/close on click
  btn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('scv-open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Mark as initialized so it doesn't run twice
  nav.dataset.scvNavInit = '1';
})();
