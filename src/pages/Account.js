// ============================================
// GROZA — ACCOUNT PAGE
// ============================================

import store from '../store.js';

export function renderAccountPage() {
  const menuItems = [
    { icon: 'package', label: 'My Orders', desc: 'View order history', route: '#/orders' },
    { icon: 'heart', label: 'Wishlist', desc: `${store.wishlist.length} items saved`, route: '#/wishlist' },
    { icon: 'map-pin', label: 'Saved Addresses', desc: 'Manage delivery addresses', route: '#/settings' },
    { icon: 'credit-card', label: 'Payment Methods', desc: 'Manage payment options', route: '#/settings' },
    { icon: 'gift', label: 'Rewards & Loyalty', desc: 'Earn points on every order', route: '#/rewards' },
    { icon: 'bell', label: 'Notifications', desc: 'Manage notification preferences', route: '#/settings' },
    { icon: 'settings', label: 'Settings', desc: 'App preferences & theme', route: '#/settings' },
    { icon: 'help-circle', label: 'Help & Support', desc: 'FAQs and contact us', route: '#' },
  ];

  return `
    <div class="page">
      <div class="account-page">
        <div class="account-header">
          <div class="account-avatar">JD</div>
          <div>
            <h1 class="account-name">John Doe</h1>
            <p class="account-email">john.doe@email.com.au</p>
          </div>
        </div>

        <div class="account-stats stagger-children">
          <div class="account-stat-card animate-fade-in-up">
            <div class="account-stat-value">12</div>
            <div class="account-stat-label">Orders</div>
          </div>
          <div class="account-stat-card animate-fade-in-up">
            <div class="account-stat-value">${store.wishlist.length}</div>
            <div class="account-stat-label">Wishlist</div>
          </div>
          <div class="account-stat-card animate-fade-in-up">
            <div class="account-stat-value">450</div>
            <div class="account-stat-label">Points</div>
          </div>
          <div class="account-stat-card animate-fade-in-up">
            <div class="account-stat-value">Gold</div>
            <div class="account-stat-label">Tier</div>
          </div>
        </div>

        <div class="account-menu stagger-children">
          ${menuItems.map(item => `
            <a href="${item.route}" class="account-menu-item animate-fade-in-up">
              <div class="account-menu-icon">
                <i data-lucide="${item.icon}" style="width:20px;height:20px"></i>
              </div>
              <div class="account-menu-text">
                <div class="account-menu-label">${item.label}</div>
                <div class="account-menu-desc">${item.desc}</div>
              </div>
              <i data-lucide="chevron-right" class="account-menu-arrow" style="width:18px;height:18px"></i>
            </a>
          `).join('')}
        </div>

        <button class="btn btn-secondary w-full" style="margin-top:var(--space-6);color:var(--text-error)">
          <i data-lucide="log-out" style="width:18px;height:18px"></i>
          Sign Out
        </button>
      </div>
    </div>
  `;
}

export default renderAccountPage;
