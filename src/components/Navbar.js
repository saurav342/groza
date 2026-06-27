// ============================================
// GROZA — NAVBAR COMPONENT
// ============================================

import store from '../store.js';

export function renderNavbar() {
  const address = store.getCurrentAddress();
  const cartCount = store.getCartCount();

  return `
    <nav class="navbar" id="navbar" role="navigation" aria-label="Main navigation">
      <div class="navbar-inner">
        <a class="navbar-logo" href="#/" aria-label="Groza Home">groza</a>

        <div class="navbar-delivery" onclick="window.showAddressSelector()">
          <div>
            <div class="navbar-delivery-label">Deliver to</div>
            <div class="navbar-delivery-address">
              ${address ? address.label : 'Select address'}
              <i data-lucide="chevron-down" style="width:14px;height:14px"></i>
            </div>
          </div>
        </div>

        <div class="navbar-search" onclick="window.openSearch()">
          <i data-lucide="search" class="navbar-search-icon"></i>
          <input type="text" class="navbar-search-input" placeholder="Search groceries, fruits, snacks…" readonly aria-label="Search products" id="nav-search-input" />
        </div>

        <div class="navbar-actions">
          <button class="navbar-action-btn" onclick="window.toggleTheme()" aria-label="Toggle dark mode" id="theme-toggle-btn">
            <i data-lucide="sun" style="width:20px;height:20px"></i>
          </button>
          <button class="navbar-action-btn" onclick="window.openCart()" aria-label="Open cart" id="cart-btn">
            <i data-lucide="shopping-bag" style="width:20px;height:20px"></i>
            ${cartCount > 0 ? `<span class="badge-count" id="cart-badge">${cartCount}</span>` : ''}
          </button>
          <button class="navbar-action-btn" onclick="window.location.hash='#/account'" aria-label="Account" id="account-btn">
            <i data-lucide="user" style="width:20px;height:20px"></i>
          </button>
        </div>
      </div>
    </nav>
  `;
}

export function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });
}

export default renderNavbar;
