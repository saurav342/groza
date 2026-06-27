// ============================================
// GROZA — SETTINGS PAGE
// ============================================

import store from '../store.js';

export function renderSettingsPage() {
  return `
    <div class="page">
      <div class="account-page">
        <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-6)">
          <a href="#/account" style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:var(--radius-md);color:var(--text-secondary)">
            <i data-lucide="arrow-left" style="width:20px;height:20px"></i>
          </a>
          <h1 style="font-size:var(--font-2xl);font-weight:var(--weight-bold)">Settings</h1>
        </div>

        <!-- Profile -->
        <div class="settings-group">
          <h3 class="settings-group-title">Profile</h3>
          <div class="checkout-section" style="margin-bottom:0">
            <div class="checkout-form-group">
              <label class="checkout-label">Full Name</label>
              <input type="text" class="input" value="John Doe" />
            </div>
            <div class="checkout-form-group">
              <label class="checkout-label">Email</label>
              <input type="email" class="input" value="john.doe@email.com.au" />
            </div>
            <div class="checkout-form-group">
              <label class="checkout-label">Phone</label>
              <input type="tel" class="input" value="+61 4XX XXX XXX" />
            </div>
            <button class="btn btn-primary">Save Changes</button>
          </div>
        </div>

        <!-- Addresses -->
        <div class="settings-group">
          <h3 class="settings-group-title">Saved Addresses</h3>
          ${store.addresses.map(addr => `
            <div class="settings-item">
              <div>
                <div class="settings-item-label">${addr.label} ${addr.isDefault ? '<span class="badge badge-primary" style="margin-left:var(--space-1)">Default</span>' : ''}</div>
                <div class="settings-item-desc">${addr.address}</div>
              </div>
              <button class="btn btn-ghost btn-sm">
                <i data-lucide="edit-2" style="width:14px;height:14px"></i>
              </button>
            </div>
          `).join('')}
          <button class="btn btn-outline w-full" style="margin-top:var(--space-2)">
            <i data-lucide="plus" style="width:16px;height:16px"></i>
            Add New Address
          </button>
        </div>

        <!-- Preferences -->
        <div class="settings-group">
          <h3 class="settings-group-title">Preferences</h3>
          <div class="settings-item">
            <div>
              <div class="settings-item-label">Dark Mode</div>
              <div class="settings-item-desc">Use dark theme</div>
            </div>
            <div class="toggle ${store.theme === 'dark' ? 'active' : ''}" onclick="window.toggleTheme(); this.classList.toggle('active')" id="dark-mode-toggle"></div>
          </div>
          <div class="settings-item">
            <div>
              <div class="settings-item-label">Push Notifications</div>
              <div class="settings-item-desc">Order updates and deals</div>
            </div>
            <div class="toggle active" onclick="this.classList.toggle('active')"></div>
          </div>
          <div class="settings-item">
            <div>
              <div class="settings-item-label">Email Notifications</div>
              <div class="settings-item-desc">Weekly deals and newsletters</div>
            </div>
            <div class="toggle" onclick="this.classList.toggle('active')"></div>
          </div>
          <div class="settings-item">
            <div>
              <div class="settings-item-label">Language</div>
              <div class="settings-item-desc">English (Australia)</div>
            </div>
            <i data-lucide="chevron-right" style="width:18px;height:18px;color:var(--text-tertiary)"></i>
          </div>
        </div>

        <!-- Payment Methods -->
        <div class="settings-group">
          <h3 class="settings-group-title">Payment Methods</h3>
          <div class="settings-item">
            <div style="display:flex;align-items:center;gap:var(--space-3)">
              <span style="font-size:1.5rem">💳</span>
              <div>
                <div class="settings-item-label">Visa ending in 4242</div>
                <div class="settings-item-desc">Expires 12/28</div>
              </div>
            </div>
            <span class="badge badge-primary">Default</span>
          </div>
          <button class="btn btn-outline w-full" style="margin-top:var(--space-2)">
            <i data-lucide="plus" style="width:16px;height:16px"></i>
            Add Payment Method
          </button>
        </div>

        <!-- Danger Zone -->
        <div class="settings-group">
          <h3 class="settings-group-title" style="color:var(--text-error)">Danger Zone</h3>
          <button class="btn btn-secondary w-full" style="color:var(--text-error);border-color:var(--text-error)">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  `;
}

export default renderSettingsPage;
