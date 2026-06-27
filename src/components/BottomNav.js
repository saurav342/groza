// ============================================
// GROZA — BOTTOM NAVIGATION (MOBILE)
// ============================================

import store from '../store.js';

export function renderBottomNav() {
  const cartCount = store.getCartCount();
  const currentRoute = window.location.hash.slice(1) || '/';

  const items = [
    { route: '/', icon: 'home', label: 'Home' },
    { route: '/categories', icon: 'grid-2x2', label: 'Categories' },
    { route: '/search', icon: 'search', label: 'Search' },
    { route: '/cart', icon: 'shopping-bag', label: 'Cart', badge: cartCount },
    { route: '/account', icon: 'user', label: 'Account' },
  ];

  return `
    <nav class="bottom-nav" id="bottom-nav" role="navigation" aria-label="Bottom navigation">
      <div class="bottom-nav-inner">
        ${items.map(item => {
          const isActive = currentRoute === item.route || 
            (currentRoute === '/' && item.route === '/') ||
            (currentRoute.startsWith('/categor') && item.route === '/categories') ||
            (currentRoute.startsWith('/search') && item.route === '/search') ||
            (currentRoute.startsWith('/cart') && item.route === '/cart') ||
            (currentRoute.startsWith('/account') && item.route === '/account');

          return `
            <a class="bottom-nav-item ${isActive ? 'active' : ''}" 
               href="#${item.route}" 
               data-route="${item.route}"
               aria-label="${item.label}">
              <i data-lucide="${item.icon}" class="nav-icon"></i>
              <span class="nav-label">${item.label}</span>
              ${item.badge > 0 ? `<span class="nav-badge">${item.badge}</span>` : ''}
            </a>
          `;
        }).join('')}
      </div>
    </nav>
  `;
}

export default renderBottomNav;
